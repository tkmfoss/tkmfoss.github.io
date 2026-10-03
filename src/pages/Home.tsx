import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  Terminal,
  Users,
  Calendar,
  ChevronRight,
  GitBranch,
  Code2,
  BookOpen,
  Sparkles,
  Clock,
  Maximize2,
  MapPin,
  X
} from 'lucide-react';
import { FOSS_PROJECTS } from '../data/projects';
import { subscribeLiveEvents, subscribeLiveExecom } from '../services/dataService';
import type { ExecomGroups } from '../services/dataService';
import type { FosEvent } from '../types';
import { PosterLightbox } from '../components/PosterLightbox';

interface HomeProps {
  onSelectTab: (tab: string) => void;
  onOpenTerminal: () => void;
}

type EventStatusTab = 'ALL' | 'UPCOMING' | 'ONGOING' | 'COMPLETED';
type ResourceTab = 'PROJECTS' | 'RESOURCES';

// Helper to determine if an event date has passed
export const isEventPast = (dateStr?: string, status?: string): boolean => {
  if (status === 'COMPLETED') return true;
  if (!dateStr) return false;
  const todayStr = new Date().toISOString().split('T')[0];
  return dateStr < todayStr;
};

export const Home: React.FC<HomeProps> = ({ onSelectTab, onOpenTerminal }) => {
  const [events, setEvents] = useState<FosEvent[]>([]);
  const [execomState, setExecomState] = useState<ExecomGroups>({ current: [], past: [] });
  const [eventTab, setEventTab] = useState<EventStatusTab>('ALL');
  const [resourceTab, setResourceTab] = useState<ResourceTab>('PROJECTS');
  const [posterPreview, setPosterPreview] = useState<{ url: string; title: string; date?: string; category?: string } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<FosEvent | null>(null);

  useEffect(() => {
    const unsubEvents = subscribeLiveEvents((liveList) => {
      setEvents(liveList);
    });
    const unsubExecom = subscribeLiveExecom((data) => {
      setExecomState(data);
    });

    return () => {
      unsubEvents();
      unsubExecom();
    };
  }, []);

  // Classify events into Upcoming, Ongoing, and Completed
  const { upcomingEvents, ongoingEvents, completedEvents } = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const upcoming: FosEvent[] = [];
    const ongoing: FosEvent[] = [];
    const completed: FosEvent[] = [];

    events.forEach((ev) => {
      if (isEventPast(ev.date, ev.status)) {
        completed.push(ev);
      } else if (ev.date === todayStr) {
        ongoing.push(ev);
      } else {
        upcoming.push(ev);
      }
    });

    return { upcomingEvents: upcoming, ongoingEvents: ongoing, completedEvents: completed };
  }, [events]);

  const displayedEvents = useMemo(() => {
    switch (eventTab) {
      case 'UPCOMING':
        return upcomingEvents;
      case 'ONGOING':
        return ongoingEvents;
      case 'COMPLETED':
        return completedEvents;
      default:
        return events;
    }
  }, [eventTab, events, upcomingEvents, ongoingEvents, completedEvents]);

  const curatedResources = [
    {
      title: 'GNU/Linux Dual-Boot & Distro Guide',
      category: 'Operating Systems',
      description: 'Step-by-step walkthrough for safely partitioning and installing Fedora, Ubuntu, or Arch Linux alongside Windows on modern UEFI laptops.',
      link: 'https://wiki.archlinux.org/title/Installation_guide',
      badge: 'ESSENTIAL'
    },
    {
      title: 'Interactive Git & GitHub Workflow Cheatsheet',
      category: 'Developer Tools',
      description: 'Master branch strategies, rebasing, resolving merge conflicts, and writing clean semantic commit messages for upstream contributions.',
      link: 'https://ohshitgit.com/',
      badge: 'CLI SKILLS'
    },
    {
      title: 'FOSS Software Alternatives Matrix',
      category: 'Libre Applications',
      description: 'Replace proprietary lock-in with libre tools: Blender for 3D, Krita/GIMP for graphics, LibreOffice for documents, and VS Code OSS.',
      link: 'https://www.osalt.com/',
      badge: 'TOOLKIT'
    },
    {
      title: 'Open Source Licensing Simplified (GPL vs MIT)',
      category: 'Legal & Ethics',
      description: 'Understand copyleft vs permissive licenses, patent grants, and how to choose the right software license for your college projects.',
      link: 'https://choosealicense.com/',
      badge: 'LEGAL'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 py-4 sm:py-8 font-sans">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 lg:p-10 border-2 border-[#2b2c31] bg-[#101115] relative overflow-hidden shadow-[4px_4px_0px_#000000]">
          {/* Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#232429] font-mono text-[11px] text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00ff66] inline-block animate-pulse"></span>
              <span className="text-[#00ff66] font-bold">SYSTEM ACTIVE</span>
              <span className="hidden sm:inline text-neutral-600">//</span>
              <span className="hidden sm:inline">TKMCE KOLLAM</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-[#18191e] border border-[#303138] text-[10px]">GNU GPL v3</span>
              <span className="text-neutral-500 hidden xs:inline">EST. 2012</span>
            </div>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-6 sm:pt-8 items-center">
            {/* Left Column: Heading and Mission */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1a1b20] border border-[#363842] text-[#00f0ff] font-mono text-[11px]">
                <Sparkles size={13} className="text-[#00f0ff]" />
                <span>FREE &amp; OPEN SOURCE SOFTWARE CELL</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.1] font-sans">
                Free Software <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] via-[#00f0ff] to-white">
                  Community
                </span> <br />
                of TKMCE.
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl">
                We are an open student collective at TKM College of Engineering. We advocate for GNU/Linux adoption, organize hands-on technical workshops, and mentor students into active open-source contributors.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3 font-mono text-xs">
                {/* Clear "Join Community" Button */}
                <a
                  href="https://discord.gg/uXrWyWqvWx"
                  target="_blank"
                  rel="noreferrer"
                  className="brutal-btn-primary px-5 py-3 font-bold flex items-center justify-center gap-2"
                >
                  <Users size={16} />
                  <span>JOIN COMMUNITY</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  onClick={() => onSelectTab('events')}
                  className="brutal-btn px-5 py-3 bg-[#18191e] text-white hover:text-black flex items-center justify-center gap-2"
                >
                  <Calendar size={16} />
                  <span>EXPLORE EVENTS</span>
                </button>

                <button
                  onClick={onOpenTerminal}
                  className="brutal-btn px-4 py-3 bg-[#131418] border-[#383a45] text-[#00ff66] flex items-center justify-center gap-1.5"
                  title="Open Interactive Terminal (Ctrl+K)"
                >
                  <Terminal size={15} />
                  <span>$ CLI</span>
                </button>
              </div>
            </div>

            {/* Right Column: Clean Interactive Status Terminal */}
            <div className="lg:col-span-5">
              <div className="border border-[#3f3f46] bg-[#0c0d10] p-4 shadow-[3px_3px_0px_#000000] font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#23242a] pb-2 text-neutral-400">
                  <span className="flex items-center gap-2 text-white font-bold">
                    <Terminal size={14} className="text-[#00ff66]" />
                    <span>system_status.sh</span>
                  </span>
                  <span className="text-[10px] text-[#00ff66] px-1.5 py-0.5 bg-[#102416] border border-[#00ff66]/30">
                    ONLINE
                  </span>
                </div>

                <div className="space-y-2 text-neutral-300 text-[11px] sm:text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-[#1a1b20]">
                    <span className="text-neutral-400">Organization:</span>
                    <span className="text-white font-bold">FOSS Cell TKMCE</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#1a1b20]">
                    <span className="text-neutral-400">Next Sprint:</span>
                    <span className="text-[#00ff66] font-bold">Terminal Clinics</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#1a1b20]">
                    <span className="text-neutral-400">Community Node:</span>
                    <span className="text-[#00f0ff]">discord.gg/uXrWyWqvWx</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-neutral-400">Core Philosophy:</span>
                    <span className="text-amber-400">Liberty, Not Price</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenTerminal}
                    className="w-full py-2 bg-[#17181d] border border-[#34353d] hover:border-[#00ff66] hover:text-[#00ff66] text-neutral-300 text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs"
                  >
                    <span>LAUNCH INTERACTIVE TERMINAL</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Strip */}
          <div className="mt-8 pt-6 border-t border-[#232429] grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
            <div className="space-y-0.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00ff66]">500+</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">// COMMITS MERGED</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00f0ff]">100%</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">// OPEN SOURCE</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">20+</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">// WORKSHOPS</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#f59e0b]">2012</div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">// ESTABLISHED</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars (Shortened "What We Do" Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 pb-3 border-b-2 border-[#27272a] flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="font-mono text-xs text-[#00ff66] uppercase tracking-wider">// MISSION ARCHITECTURE</div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              What We Do at FOSS Cell
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('manifesto')}
            className="font-mono text-xs text-neutral-400 hover:text-[#00ff66] flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>READ OUR MANIFESTO</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1 */}
          <div className="brutal-card p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#16291a] border border-[#00ff66]/40 text-[#00ff66] flex items-center justify-center font-mono font-bold text-sm mb-3">
                01
              </div>
              <h3 className="font-bold text-base text-white">GNU/Linux &amp; CLI Productivity</h3>
              <p className="text-neutral-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Hands-on dual-boot clinics, shell scripting, Neovim setups, and demystifying the Linux kernel for day-to-day engineering workflows.
              </p>
            </div>
            <div className="font-mono text-[11px] text-[#00ff66] pt-2 border-t border-[#232429]">
              // ARCH &bull; DEBIAN &bull; FEDORA
            </div>
          </div>

          {/* Card 2 */}
          <div className="brutal-card p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#0e222a] border border-[#00f0ff]/40 text-[#00f0ff] flex items-center justify-center font-mono font-bold text-sm mb-3">
                02
              </div>
              <h3 className="font-bold text-base text-white">Open Source Sprints</h3>
              <p className="text-neutral-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Structured mentorship during Season of Commits and Hacktoberfest, taking students from git init to merged upstream pull requests.
              </p>
            </div>
            <div className="font-mono text-[11px] text-[#00f0ff] pt-2 border-t border-[#232429]">
              // GIT &bull; GITHUB &bull; CODE REVIEWS
            </div>
          </div>

          {/* Card 3 */}
          <div className="brutal-card p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#291e12] border border-[#f59e0b]/40 text-[#f59e0b] flex items-center justify-center font-mono font-bold text-sm mb-3">
                03
              </div>
              <h3 className="font-bold text-base text-white">Digital Freedom &amp; Autonomy</h3>
              <p className="text-neutral-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Championing decentralized software, self-hosting, open data formats, and ethical technology free from corporate vendor lock-in.
              </p>
            </div>
            <div className="font-mono text-[11px] text-[#f59e0b] pt-2 border-t border-[#232429]">
              // FOUR FREEDOMS &bull; PRIVACY
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dispatches & Events (Clearly Separating Upcoming / Ongoing / Completed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-3 border-b-2 border-[#27272a]">
          <div>
            <div className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider">// DISPATCH LOGS</div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Events &amp; Workshops
            </h2>
          </div>

          {/* Clear Sub-section Status Filters */}
          <div className="flex items-center gap-1.5 font-mono text-xs flex-wrap">
            <button
              onClick={() => setEventTab('ALL')}
              className={`px-3 py-1.5 border transition-all cursor-pointer ${eventTab === 'ALL'
                  ? 'bg-white text-black font-bold border-white'
                  : 'bg-[#14151a] text-neutral-400 border-[#2b2c31] hover:text-white'
                }`}
            >
              ALL ({events.length})
            </button>

            <button
              onClick={() => setEventTab('UPCOMING')}
              className={`px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 ${eventTab === 'UPCOMING'
                  ? 'bg-[#00f0ff] text-black font-bold border-[#00f0ff]'
                  : 'bg-[#14151a] text-neutral-400 border-[#2b2c31] hover:text-white'
                }`}
            >
              <span>UPCOMING</span>
              <span className="text-[10px] px-1 bg-black text-[#00f0ff] font-bold">
                {upcomingEvents.length}
              </span>
            </button>

            <button
              onClick={() => setEventTab('ONGOING')}
              className={`px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 ${eventTab === 'ONGOING'
                  ? 'bg-[#00ff66] text-black font-bold border-[#00ff66]'
                  : 'bg-[#14151a] text-neutral-400 border-[#2b2c31] hover:text-white'
                }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping"></span>
              <span>LIVE</span>
              <span className="text-[10px] px-1 bg-black text-[#00ff66] font-bold">
                {ongoingEvents.length}
              </span>
            </button>

            <button
              onClick={() => setEventTab('COMPLETED')}
              className={`px-3 py-1.5 border transition-all cursor-pointer ${eventTab === 'COMPLETED'
                  ? 'bg-neutral-300 text-black font-bold border-neutral-300'
                  : 'bg-[#14151a] text-neutral-400 border-[#2b2c31] hover:text-white'
                }`}
            >
              COMPLETED ({completedEvents.length})
            </button>
          </div>
        </div>

        {/* Event Cards Grid */}
        {displayedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {displayedEvents.slice(0, 3).map((event) => {
              const todayStr = new Date().toISOString().split('T')[0];
              const isPast = isEventPast(event.date, event.status);
              const isLive = event.date === todayStr;
              const isUpcoming = !isPast && !isLive;

              return (
                <div
                  key={event.id}
                  className="brutal-card flex flex-col justify-between overflow-hidden group"
                >
                  {/* Poster Graphic - Full Size Uncropped (1:1 Square) */}
                  <div
                    onClick={() =>
                      setPosterPreview({
                        url: event.coverImage,
                        title: event.title,
                        date: event.date,
                        category: event.category
                      })
                    }
                    className="relative aspect-square bg-[#08090b] border-b border-[#27272a] overflow-hidden flex items-center justify-center cursor-pointer group/poster"
                    title="Click to view full size poster"
                  >
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-contain contrast-105 transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />

                    {/* Hover Overlay with View Full Poster Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 bg-black/90 border border-[#00ff66] text-[#00ff66] font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000]">
                        <Maximize2 size={13} />
                        <span>VIEW FULL POSTER</span>
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
                      {isLive ? (
                        <span className="px-2 py-0.5 bg-[#00ff66] text-black font-mono font-bold text-[10px] flex items-center gap-1 animate-pulse">
                          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                          LIVE NOW
                        </span>
                      ) : isUpcoming ? (
                        <span className="px-2 py-0.5 bg-[#00f0ff] text-black font-mono font-bold text-[10px]">
                          UPCOMING
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-black/90 border border-white/20 font-mono text-[10px] text-neutral-400">
                          COMPLETED
                        </span>
                      )}

                      <span className="px-1.5 py-0.5 bg-black/90 border border-white/20 font-mono text-[10px] text-[#00ff66]">
                        {event.category}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/90 border border-white/20 font-mono text-[10px] text-white pointer-events-none">
                      {event.date}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3
                        onClick={() => setSelectedEvent(event)}
                        className="font-bold text-base text-white hover:text-[#00ff66] transition-colors leading-snug cursor-pointer"
                      >
                        {event.title}
                      </h3>
                      <p className="mt-2 text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#232429] flex items-center justify-between font-mono text-[11px] text-neutral-400">
                      <span className="truncate max-w-[130px]">{event.location?.split(',')[0]}</span>
                      <div className="flex items-center gap-2">
                        {!isPast && event.registrationOpen && event.registrationUrl ? (
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2 py-1 bg-[#00ff66] text-black font-bold text-[10px] hover:bg-[#33ff85] flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_#000]"
                          >
                            <span>REGISTER</span>
                            <ArrowUpRight size={11} />
                          </a>
                        ) : isPast ? (
                          <button
                            type="button"
                            disabled
                            aria-disabled="true"
                            className="px-2 py-0.5 bg-[#17181c] border border-[#2b2c31] text-neutral-500 font-mono text-[10px] cursor-not-allowed opacity-60 pointer-events-none select-none"
                            title="Event date has passed. Registration is closed."
                          >
                            REG CLOSED
                          </button>
                        ) : null}
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="text-[#00ff66] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <span>DETAILS</span>
                          <ArrowUpRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Clean Empty Category Placeholder */
          <div className="border border-dashed border-[#2b2c31] bg-[#101115] p-8 text-center space-y-3 font-mono">
            <Clock size={24} className="mx-auto text-neutral-500" />
            <div className="text-white font-bold text-sm">NO EVENTS IN THIS CATEGORY</div>
            <p className="text-neutral-400 text-xs max-w-md mx-auto">
              {eventTab === 'UPCOMING'
                ? 'No upcoming workshops are open for registration right now. Our next sprint is currently being scheduled!'
                : 'No dispatches recorded in this status filter.'}
            </p>
            <button
              onClick={() => setEventTab('ALL')}
              className="brutal-btn text-xs py-1.5 px-4 mt-2 inline-flex items-center gap-1.5"
            >
              <span>VIEW ALL {events.length} ARCHIVED EVENTS</span>
            </button>
          </div>
        )}

        {/* View All Dispatches Link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => onSelectTab('events')}
            className="brutal-btn w-full sm:w-auto text-xs py-2.5 px-6 font-mono text-white hover:text-black inline-flex items-center justify-center gap-2"
          >
            <span>VIEW ALL {events.length} EVENTS &amp; REPORTS</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* 4. Projects & Resources Subsection (Sub sections pole kodukam) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-3 border-b-2 border-[#27272a]">
          <div>
            <div className="font-mono text-xs text-[#00ff66] uppercase tracking-wider">// ECOSYSTEM LABS</div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Projects &amp; Community Resources
            </h2>
          </div>

          {/* Sub-section Switcher */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => setResourceTab('PROJECTS')}
              className={`px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 ${resourceTab === 'PROJECTS'
                  ? 'bg-[#00ff66] text-black font-bold border-[#00ff66]'
                  : 'bg-[#14151a] text-neutral-400 border-[#2b2c31] hover:text-white'
                }`}
            >
              <Code2 size={13} />
              <span>PROJECTS ({FOSS_PROJECTS.length})</span>
            </button>

            <button
              onClick={() => setResourceTab('RESOURCES')}
              className={`px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 ${resourceTab === 'RESOURCES'
                  ? 'bg-[#00f0ff] text-black font-bold border-[#00f0ff]'
                  : 'bg-[#14151a] text-neutral-400 border-[#2b2c31] hover:text-white'
                }`}
            >
              <BookOpen size={13} />
              <span>RESOURCES &amp; GUIDES</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Open Source Projects */}
        {resourceTab === 'PROJECTS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {FOSS_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="brutal-card p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#232429] font-mono text-xs">
                    <span className="text-[#00ff66] font-bold flex items-center gap-1.5 truncate pr-2">
                      <GitBranch size={14} className="shrink-0" />
                      <span className="truncate">{project.repoName}</span>
                    </span>
                    <span className="px-1.5 py-0.5 bg-[#17181c] border border-[#27272a] text-[10px] text-neutral-300 shrink-0">
                      {project.license}
                    </span>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#232429] font-mono text-xs text-neutral-400">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold">{project.language}</span>
                    <span>&bull;</span>
                    <span>{project.stars} Stars</span>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00f0ff] hover:underline flex items-center gap-1 text-xs"
                  >
                    <span>SOURCE</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Curated Resources & Guides */}
        {resourceTab === 'RESOURCES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {curatedResources.map((res, idx) => (
              <a
                key={idx}
                href={res.link}
                target="_blank"
                rel="noreferrer"
                className="brutal-card p-5 flex flex-col justify-between space-y-3 group hover:border-[#00f0ff] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#232429] font-mono text-xs">
                    <span className="text-neutral-400 text-[10px] uppercase">// {res.category}</span>
                    <span className="px-1.5 py-0.2 bg-[#09212b] border border-[#00f0ff]/40 text-[#00f0ff] text-[10px] font-bold">
                      {res.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-[#00f0ff] transition-colors mt-2">
                    {res.title}
                  </h3>

                  <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#232429] font-mono text-xs text-[#00f0ff]">
                  <span>OPEN EXTERNAL GUIDE</span>
                  <ArrowUpRight size={13} />
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* 5. Execom Roster Status Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-[#f59e0b]/50 bg-[#12110c] p-5 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#000000]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#241c0e] border border-[#f59e0b]/60 text-[#f59e0b] font-mono text-[11px]">
                <span className="inline-block w-1.5 h-1.5 bg-[#f59e0b] animate-ping"></span>
                <span>
                  {execomState.current.length > 0
                    ? `STATUS: ${execomState.current.length} ACTIVE MEMBERS RATIFIED`
                    : 'STATUS: COMPILING 2026-2027 ROSTER'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">
                {execomState.current.length > 0
                  ? 'Meet the Executive Committee'
                  : 'Executive Committee 2026-2027: Under Formation'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {execomState.current.length > 0
                  ? 'Explore the student leadership driving open-source culture, workshops, and engineering sprints at TKMCE.'
                  : 'The leadership cohort for FOSS Cell TKMCE is being formalized. Browse the historical 2024-25 alumni directory or check the assembly pipeline.'}
              </p>
            </div>

            <button
              onClick={() => onSelectTab('execom')}
              className="brutal-btn w-full md:w-auto py-2.5 px-5 bg-[#f59e0b] text-black font-mono font-bold border-[#f59e0b] hover:bg-[#ffb429] hover:text-black flex items-center justify-center gap-2 shrink-0"
            >
              <Users size={15} />
              <span>
                {execomState.current.length > 0 ? 'VIEW EXECOM ROSTER' : 'VIEW PAST ALUMNI ROSTER'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. Prominent "Join Community" Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-[#2b2c31] bg-[#111216] p-6 sm:p-10 text-center space-y-5 shadow-[4px_4px_0px_#000000]">
          <div className="max-w-xl mx-auto space-y-2.5">
            <div className="font-mono text-xs text-[#00ff66]">// GET INVOLVED</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Build with Us?
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              No prior open-source experience needed. Whether you want to dual-boot Linux, write documentation, or submit your first pull request, there is a place for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 font-mono text-xs pt-1">
            <a
              href="https://discord.gg/uXrWyWqvWx"
              target="_blank"
              rel="noreferrer"
              className="brutal-btn-primary w-full sm:w-auto px-6 py-3 font-bold flex items-center justify-center gap-2"
            >
              <span>JOIN DISCORD SERVER</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              onClick={() => onSelectTab('community')}
              className="brutal-btn w-full sm:w-auto px-6 py-3 bg-[#18191e] text-white hover:text-black flex items-center justify-center gap-2"
            >
              <span>CAMPUS CHANNELS &amp; CONTACT</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Event Details Modal on Home */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#0c0d10] border-2 border-[#3f3f46] shadow-[6px_6px_0px_#000000] p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#23242a] pb-3 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-[#00ff66] font-bold">[{selectedEvent.category}] // {selectedEvent.year}</span>
                {!isEventPast(selectedEvent.date, selectedEvent.status) && selectedEvent.registrationOpen ? (
                  <span className="px-2 py-0.5 bg-[#00ff66] text-black font-bold text-[10px]">
                    REGISTRATION ACTIVE
                  </span>
                ) : isEventPast(selectedEvent.date, selectedEvent.status) ? (
                  <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-400 font-mono font-bold text-[10px]">
                    EVENT CONCLUDED
                  </span>
                ) : null}
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 text-neutral-400 hover:text-white hover:bg-[#1f2025] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white uppercase font-sans">
                {selectedEvent.title}
              </h2>

              <div className="flex flex-wrap gap-3 text-xs text-neutral-300 font-mono">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#00f0ff]" />
                  <span>{selectedEvent.date}</span>
                </div>
                {selectedEvent.time && (
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-neutral-400" />
                    <span>{selectedEvent.time}</span>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#f59e0b]" />
                    <span className="truncate">{selectedEvent.location}</span>
                  </div>
                )}
              </div>

              {/* Poster with click-to-expand */}
              {selectedEvent.coverImage && (
                <div className="space-y-2">
                  <div
                    onClick={() =>
                      setPosterPreview({
                        url: selectedEvent.coverImage,
                        title: selectedEvent.title,
                        date: selectedEvent.date,
                        category: selectedEvent.category
                      })
                    }
                    className="border border-[#27272a] bg-[#0c0d10] overflow-hidden flex items-center justify-center p-2 relative group/modalPoster cursor-pointer"
                    title="Click to view full size original poster"
                  >
                    <img
                      src={selectedEvent.coverImage}
                      alt={selectedEvent.title}
                      className="max-h-[460px] w-auto max-w-full object-contain mx-auto shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/modalPoster:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 bg-black/90 border border-[#00ff66] text-[#00ff66] font-mono text-xs font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000]">
                        <Maximize2 size={14} /> VIEW FULL POSTER (100% SIZE)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1">
                    <span>Click poster to expand to original full resolution</span>
                    <button
                      onClick={() =>
                        setPosterPreview({
                          url: selectedEvent.coverImage,
                          title: selectedEvent.title,
                          date: selectedEvent.date,
                          category: selectedEvent.category
                        })
                      }
                      className="text-[#00ff66] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Maximize2 size={11} />
                      <span>FULL SIZE</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Bar inside modal */}
              {!isEventPast(selectedEvent.date, selectedEvent.status) && selectedEvent.registrationOpen && selectedEvent.registrationUrl ? (
                <div className="p-3 bg-[#112415] border-2 border-[#00ff66] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-[#00ff66] font-bold text-xs">// REGISTRATION IS CURRENTLY OPEN</div>
                    <div className="text-neutral-300 text-[11px]">
                      {selectedEvent.contactPerson ? `Contact: ${selectedEvent.contactPerson}` : 'Reserve your slot before seats fill up.'}
                    </div>
                  </div>
                  <a
                    href={selectedEvent.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#00ff66] text-black font-bold text-xs hover:bg-[#33ff85] transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#000] shrink-0 cursor-pointer"
                  >
                    <span>REGISTER NOW</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              ) : isEventPast(selectedEvent.date, selectedEvent.status) ? (
                <div className="p-3 bg-[#141519] border border-[#27272a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-neutral-400 font-mono font-bold text-xs">// REGISTRATION CONCLUDED</div>
                    <div className="text-neutral-500 text-[11px]">
                      This event took place on {selectedEvent.date}. Registrations and admissions are now closed.
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="px-4 py-2 bg-[#1b1c22] border border-[#2e2f38] text-neutral-500 font-mono text-xs cursor-not-allowed opacity-60 pointer-events-none select-none flex items-center gap-1.5 shrink-0"
                    title="Event date is over. Registration is closed."
                  >
                    <span>REGISTRATION CLOSED</span>
                  </button>
                </div>
              ) : null}

              <div className="space-y-2 pt-2 border-t border-[#232429]">
                <h4 className="font-mono text-xs text-[#00ff66]">// OVERVIEW &amp; SYLLABUS</h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans whitespace-pre-line">
                  {selectedEvent.description}
                </p>
              </div>

              {selectedEvent.highlights && selectedEvent.highlights.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#232429]">
                  <h4 className="font-mono text-xs text-[#00ff66]">// WORKSHOP MODULES</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEvent.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 bg-[#17181d] border border-[#27272a] text-neutral-200 font-mono"
                      >
                        #{h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full-Size Poster Lightbox */}
      {posterPreview && (
        <PosterLightbox
          imageUrl={posterPreview.url}
          title={posterPreview.title}
          date={posterPreview.date}
          category={posterPreview.category}
          onClose={() => setPosterPreview(null)}
        />
      )}
    </div>
  );
};
