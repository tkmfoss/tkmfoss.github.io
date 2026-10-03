import type { FosEvent, Announcement, ExecomMember, PostEventReport, ClubSettings, FossProject } from '../types';

// Cache keys for live dynamic sync
const CACHE_KEYS = {
  EVENTS: 'tkmfoss_fe_events_v4_live',
  ANNOUNCEMENTS: 'tkmfoss_fe_announcements_v4_live',
  EXECOM: 'tkmfoss_fe_execom_v4_live',
  REPORTS: 'tkmfoss_fe_reports_v4_live',
  PROJECTS: 'tkmfoss_fe_projects_v4_live',
  SETTINGS: 'tkmfoss_fe_settings_v4_live'
};

// Purge any stale legacy local cache keys from storage
try {
  ['tkmfoss_fe_events_v3', 'tkmfoss_fe_announcements_v3', 'tkmfoss_fe_execom_v3', 'tkmfoss_fe_reports_v3', 'tkmfoss_fe_settings_v3', 'tkmfoss_fe_events_v2'].forEach(k => {
    localStorage.removeItem(k);
  });
} catch {
  // ignore
}

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

// Clean dynamic fallbacks - strictly empty arrays; all events/data/images/projects fetched from Admin Page
const fallbackEvents: FosEvent[] = [];
const fallbackExecom: ExecomGroups = {
  current: [],
  past: []
};

// No dummy announcements or projects - clean empty arrays
const fallbackAnnouncements: Announcement[] = [];
const fallbackProjects: FossProject[] = [];

// Single Admin API Endpoint URL configured in frontend .env
export const getAdminApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_ADMIN_URL;
  if (envUrl) {
    // Strip trailing slashes
    return envUrl.replace(/\/+$/, '');
  }
  return 'http://localhost:5173';
};

/**
 * Universal Asset URL resolver:
 * Ensures event posters, execom photos, and report covers are fetched
 * directly from the Admin Portal or Cloudinary/Storage, not from static assets.
 */
export const resolveAssetUrl = (url?: string): string => {
  if (!url) return '';
  // If already absolute URL (http, https, data:, blob:), return as is
  if (/^(https?:|\/\/|data:|blob:)/i.test(url)) {
    return url;
  }
  const adminUrl = getAdminApiUrl();
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${adminUrl}${cleanPath}`;
};

// Subscriber Registries
type Listener<T> = (data: T) => void;

const listeners = {
  events: new Set<Listener<FosEvent[]>>(),
  announcements: new Set<Listener<Announcement[]>>(),
  execom: new Set<Listener<ExecomGroups>>(),
  reports: new Set<Listener<PostEventReport[]>>(),
  projects: new Set<Listener<FossProject[]>>(),
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

    // 1. Process Events - map all images and details dynamically from Admin API
    if (Array.isArray(payload.events)) {
      const normalizedEvents: FosEvent[] = payload.events.map((ev: FosEvent) => ({
        ...ev,
        coverImage: resolveAssetUrl(ev.coverImage)
      }));
      const sortedEvents = [...normalizedEvents].sort(
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

    // 3. Process Execom - resolve member photo URLs to Admin API
    if (payload.execom) {
      let current: ExecomMember[] = [];
      let past: ExecomMember[] = [];

      if (Array.isArray(payload.execom.current) && Array.isArray(payload.execom.past)) {
        current = payload.execom.current.map((m: ExecomMember) => ({ ...m, photo: resolveAssetUrl(m.photo) }));
        past = payload.execom.past.map((m: ExecomMember) => ({ ...m, photo: resolveAssetUrl(m.photo) }));
      } else if (Array.isArray(payload.execom)) {
        current = payload.execom
          .filter((m: ExecomMember) => m.isCurrent)
          .map((m: ExecomMember) => ({ ...m, photo: resolveAssetUrl(m.photo) }));
        past = payload.execom
          .filter((m: ExecomMember) => !m.isCurrent)
          .map((m: ExecomMember) => ({ ...m, photo: resolveAssetUrl(m.photo) }));
      }

      const execomResult: ExecomGroups = {
        current,
        past
      };

      setCache(CACHE_KEYS.EXECOM, execomResult);
      listeners.execom.forEach((fn) => fn(execomResult));
    }

    // 4. Process Reports - resolve report cover images and galleries to Admin API
    if (Array.isArray(payload.reports)) {
      const normalizedReports: PostEventReport[] = payload.reports.map((rep: PostEventReport) => ({
        ...rep,
        coverImage: resolveAssetUrl(rep.coverImage),
        gallery: Array.isArray(rep.gallery) ? rep.gallery.map(resolveAssetUrl) : []
      }));
      const sortedReports = [...normalizedReports].sort(
        (a, b) => new Date(b.eventDate || 0).getTime() - new Date(a.eventDate || 0).getTime()
      );
      setCache(CACHE_KEYS.REPORTS, sortedReports);
      listeners.reports.forEach((fn) => fn(sortedReports));
    }

    // 5. Process Projects from Admin API
    if (Array.isArray(payload.projects)) {
      const sortedProjects = [...payload.projects].sort(
        (a, b) => (b.stars || 0) - (a.stars || 0)
      );
      setCache(CACHE_KEYS.PROJECTS, sortedProjects);
      listeners.projects.forEach((fn) => fn(sortedProjects));
    }

    // 6. Process Settings
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
    listeners.projects.size +
    listeners.settings.size;

  if (totalListeners > 0 && !pollIntervalId) {
    if (Date.now() - lastFetchTime > 3000) {
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

/**
 * Subscription to open-source projects from Admin API
 */
export function subscribeLiveProjects(callback: (projects: FossProject[]) => void): () => void {
  const cached = getCache<FossProject[]>(CACHE_KEYS.PROJECTS, fallbackProjects);
  callback(cached);

  listeners.projects.add(callback);
  checkPollingState();

  return () => {
    listeners.projects.delete(callback);
    checkPollingState();
  };
}

/**
 * Synchronous getters returning current memory/cached data without subscription
 */
export function getCachedEvents(): FosEvent[] {
  return getCache<FosEvent[]>(CACHE_KEYS.EVENTS, fallbackEvents);
}

export function getCachedExecom(): ExecomGroups {
  return getCache<ExecomGroups>(CACHE_KEYS.EXECOM, fallbackExecom);
}

export function getCachedAnnouncements(): Announcement[] {
  return getCache<Announcement[]>(CACHE_KEYS.ANNOUNCEMENTS, fallbackAnnouncements);
}

export function getCachedReports(): PostEventReport[] {
  return getCache<PostEventReport[]>(CACHE_KEYS.REPORTS, []);
}

export function getCachedProjects(): FossProject[] {
  return getCache<FossProject[]>(CACHE_KEYS.PROJECTS, fallbackProjects);
}

