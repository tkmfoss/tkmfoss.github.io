import type { FosEvent, Announcement, ExecomMember, PostEventReport, ClubSettings } from '../types';
import { FOSS_EVENTS } from '../data/events';
import { PAST_EXECOM_2024_25 } from '../data/pastExecom';

// Cache keys for offline resilience
const CACHE_KEYS = {
  EVENTS: 'tkmfoss_fe_events_v3',
  ANNOUNCEMENTS: 'tkmfoss_fe_announcements_v3',
  EXECOM: 'tkmfoss_fe_execom_v3',
  REPORTS: 'tkmfoss_fe_reports_v3',
  SETTINGS: 'tkmfoss_fe_settings_v3'
};

const getCache = <T>(key: string, fallback: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const setCache = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
};

export interface ExecomGroups {
  current: ExecomMember[];
  past: ExecomMember[];
}

// Convert fallback data to match types - only 8 original OG events
const fallbackEvents: FosEvent[] = FOSS_EVENTS.map((e) => ({
  ...e,
  status: e.status as 'UPCOMING' | 'COMPLETED',
  category: e.category as any
}));

// Current is empty (user will add 2025-26 and 2026-27 manually), past has verified 2024-25
const fallbackExecom: ExecomGroups = {
  current: [],
  past: PAST_EXECOM_2024_25
};

// No dummy announcements - clean empty array
const fallbackAnnouncements: Announcement[] = [];

// Single Admin API Endpoint URL configured in frontend .env
const getAdminApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_ADMIN_URL;
  if (envUrl) {
    // Strip trailing slashes
    return envUrl.replace(/\/+$/, '');
  }
  return 'http://localhost:5173';
};

// Subscriber Registries
type Listener<T> = (data: T) => void;

const listeners = {
  events: new Set<Listener<FosEvent[]>>(),
  announcements: new Set<Listener<Announcement[]>>(),
  execom: new Set<Listener<ExecomGroups>>(),
  reports: new Set<Listener<PostEventReport[]>>(),
  settings: new Set<Listener<ClubSettings | null>>()
};

let pollIntervalId: any = null;
let lastFetchTime = 0;
const POLL_INTERVAL_MS = 20000; // 20s background sync

/**
 * Unified data fetcher querying the single Admin Portal API endpoint (/api/data)
 */
export async function refreshAllData(): Promise<void> {
  const adminUrl = getAdminApiUrl();
  const endpoint = `${adminUrl}/api/data`;

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Admin API responded with HTTP ${res.status}`);
    }

    const payload = await res.json();
    lastFetchTime = Date.now();

    // 1. Process Events
    if (Array.isArray(payload.events)) {
      const sortedEvents = [...payload.events].sort(
        (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      );
      setCache(CACHE_KEYS.EVENTS, sortedEvents);
      listeners.events.forEach((fn) => fn(sortedEvents));
    }

    // 2. Process Announcements (filter active for frontend, sort by priority)
    if (Array.isArray(payload.announcements)) {
      const activeList = payload.announcements.filter((a: Announcement) => a.isActive !== false);
      const priorityScore: Record<string, number> = { PINNED: 4, URGENT: 3, NORMAL: 2, LOW: 1 };
      activeList.sort((a: Announcement, b: Announcement) => {
        const scoreDiff = (priorityScore[b.priority] || 0) - (priorityScore[a.priority] || 0);
        if (scoreDiff !== 0) return scoreDiff;
        return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
      });

      setCache(CACHE_KEYS.ANNOUNCEMENTS, activeList);
      listeners.announcements.forEach((fn) => fn(activeList));
    }

    // 3. Process Execom
    if (payload.execom) {
      let current: ExecomMember[] = [];
      let past: ExecomMember[] = [];

      if (Array.isArray(payload.execom.current) && Array.isArray(payload.execom.past)) {
        current = payload.execom.current;
        past = payload.execom.past;
      } else if (Array.isArray(payload.execom)) {
        current = payload.execom.filter((m: ExecomMember) => m.isCurrent);
        past = payload.execom.filter((m: ExecomMember) => !m.isCurrent);
      }

      const execomResult: ExecomGroups = {
        current,
        past: past.length > 0 ? past : PAST_EXECOM_2024_25
      };

      setCache(CACHE_KEYS.EXECOM, execomResult);
      listeners.execom.forEach((fn) => fn(execomResult));
    }

    // 4. Process Reports
    if (Array.isArray(payload.reports)) {
      const sortedReports = [...payload.reports].sort(
        (a, b) => new Date(b.eventDate || 0).getTime() - new Date(a.eventDate || 0).getTime()
      );
      setCache(CACHE_KEYS.REPORTS, sortedReports);
      listeners.reports.forEach((fn) => fn(sortedReports));
    }

    // 5. Process Settings
    if (payload.settings) {
      setCache(CACHE_KEYS.SETTINGS, payload.settings);
      listeners.settings.forEach((fn) => fn(payload.settings));
    }
  } catch (err) {
    // Quiet debug log: offline resilience keeps local cached data active
    console.debug('[TKMFOSS API Gateway] Offline or unreachable, served local cache:', err);
  }
}

// Background polling lifecycle manager
function checkPollingState() {
  const totalListeners =
    listeners.events.size +
    listeners.announcements.size +
    listeners.execom.size +
    listeners.reports.size +
    listeners.settings.size;

  if (totalListeners > 0 && !pollIntervalId) {
    // Initial fetch if older than 5s
    if (Date.now() - lastFetchTime > 5000) {
      refreshAllData();
    }
    pollIntervalId = setInterval(refreshAllData, POLL_INTERVAL_MS);
  } else if (totalListeners === 0 && pollIntervalId) {
    clearInterval(pollIntervalId);
    pollIntervalId = null;
  }
}

/**
 * Subscription to events from Admin API with immediate cached fallback
 */
export function subscribeLiveEvents(callback: (events: FosEvent[]) => void): () => void {
  const cached = getCache<FosEvent[]>(CACHE_KEYS.EVENTS, fallbackEvents);
  callback(cached);

  listeners.events.add(callback);
  checkPollingState();

  return () => {
    listeners.events.delete(callback);
    checkPollingState();
  };
}

/**
 * Subscription to active announcements from Admin API
 */
export function subscribeLiveAnnouncements(callback: (announcements: Announcement[]) => void): () => void {
  const cached = getCache<Announcement[]>(CACHE_KEYS.ANNOUNCEMENTS, fallbackAnnouncements);
  callback(cached);

  listeners.announcements.add(callback);
  checkPollingState();

  return () => {
    listeners.announcements.delete(callback);
    checkPollingState();
  };
}

/**
 * Subscription to executive committee roster from Admin API
 */
export function subscribeLiveExecom(callback: (groups: ExecomGroups) => void): () => void {
  const cached = getCache<ExecomGroups>(CACHE_KEYS.EXECOM, fallbackExecom);
  callback(cached);

  listeners.execom.add(callback);
  checkPollingState();

  return () => {
    listeners.execom.delete(callback);
    checkPollingState();
  };
}

/**
 * Subscription to post-event reports from Admin API
 */
export function subscribeLiveReports(callback: (reports: PostEventReport[]) => void): () => void {
  const cached = getCache<PostEventReport[]>(CACHE_KEYS.REPORTS, []);
  callback(cached);

  listeners.reports.add(callback);
  checkPollingState();

  return () => {
    listeners.reports.delete(callback);
    checkPollingState();
  };
}

/**
 * Subscription to club settings from Admin API
 */
export function subscribeLiveSettings(callback: (settings: ClubSettings | null) => void): () => void {
  const cached = getCache<ClubSettings | null>(CACHE_KEYS.SETTINGS, null);
  callback(cached);

  listeners.settings.add(callback);
  checkPollingState();

  return () => {
    listeners.settings.delete(callback);
    checkPollingState();
  };
}
