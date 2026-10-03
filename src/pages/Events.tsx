import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, MapPin, ArrowUpRight, Search, X, Users, FileText, CheckCircle2, Clock, Maximize2 } from 'lucide-react';
import { subscribeLiveEvents, subscribeLiveReports } from '../services/dataService';
import type { FosEvent, PostEventReport } from '../types';
import { PosterLightbox } from '../components/PosterLightbox';

// Helper to determine if an event date has passed
export const isEventPast = (dateStr?: string, status?: string): boolean => {
  if (status === 'COMPLETED') return true;
  if (!dateStr) return false;
  const todayStr = new Date().toISOString().split('T')[0];
  return dateStr < todayStr;
};

export const Events: React.FC = () => {
  const [events, setEvents] = useState<FosEvent[]>([]);
  const [reports, setReports] = useState<PostEventReport[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeEvent, setActiveEvent] = useState<FosEvent | null>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'reports'>('events');
  const [posterLightbox, setPosterLightbox] = useState<{ url: string; title: string; date?: string; category?: string } | null>(null);

  // Subscribe to live Firestore updates
  useEffect(() => {
    const unsubEvents = subscribeLiveEvents((liveEvents) => {
      setEvents(liveEvents);
    });
    const unsubReports = subscribeLiveReports((liveReports) => {
      setReports(liveReports);
    });

    return () => {
      unsubEvents();
      unsubReports();
    };
  }, []);

  // Compute dynamic years and categories from available events
  const { years, categories } = useMemo(() => {
    const yrSet = new Set<string>();
    const catSet = new Set<string>();

    events.forEach((ev) => {
      if (ev.year) yrSet.add(ev.year.toString());
      if (ev.category) catSet.add(ev.category);
    });

    const sortedYears = ['ALL', ...Array.from(yrSet).sort((a, b) => Number(b) - Number(a))];
    const defaultCats = ['WORKSHOP', 'HACKATHON', 'COMMUNITY', 'TALK'];
    defaultCats.forEach((c) => catSet.add(c));
    const sortedCats = ['ALL', ...Array.from(catSet)];

    return { years: sortedYears, categories: sortedCats };
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesYear = selectedYear === 'ALL' || ev.year.toString() === selectedYear;
      const matchesCategory = selectedCategory === 'ALL' || ev.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ev.highlights && ev.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesYear && matchesCategory && matchesSearch;
    });
  }, [events, selectedYear, selectedCategory, searchQuery]);

  // Find report corresponding to active event
  const eventReport = useMemo(() => {
    if (!activeEvent) return null;
    return reports.find((r) => r.eventId === activeEvent.id || r.title.toLowerCase() === activeEvent.title.toLowerCase());
  }, [activeEvent, reports]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10 font-mono">
      {/* Page Header */}
      <div className="border-2 border-[#2b2c31] bg-[#101115] p-4 sm:p-8 lg:p-10 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#00ff66]">
            <span>// DISPATCH ARCHIVE</span>
            <span>&bull;</span>
            <span>TKMCE FOSS CELL</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3 py-1 text-xs font-bold transition-all cursor-pointer border ${
                activeTab === 'events'
                  ? 'bg-[#00ff66] text-black border-[#00ff66]'
                  : 'bg-[#15161b] text-neutral-300 border-[#27272a] hover:border-neutral-400'
              }`}
            >
              DISPATCHES ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-1 text-xs font-bold transition-all cursor-pointer border ${
                activeTab === 'reports'
                  ? 'bg-[#00f0ff] text-black border-[#00f0ff]'
                  : 'bg-[#15161b] text-neutral-300 border-[#27272a] hover:border-neutral-400'
              }`}
            >
              POST-EVENT REPORTS ({reports.length})
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight font-sans leading-tight">
          {activeTab === 'events' ? 'Events & Workshops' : 'Post-Event Reports & Outcomes'}
        </h1>
        <p className="text-neutral-300 text-xs sm:text-sm lg:text-base font-sans max-w-2xl leading-relaxed">
          {activeTab === 'events'
            ? 'From hands-on Linux system installation festivals to month-long Season of Commits sprints, we host regular open-source events designed to build genuine engineering competence.'
            : 'Detailed event recaps, attendee metrics, key outcomes, photo archives, and public documentation from our executed workshops and hackathons.'}
        </p>
      </div>

      {activeTab === 'events' ? (
        <>
          {/* Filter and Search Bar */}
          <div className="border-2 border-[#2b2c31] bg-[#0c0d10] p-3.5 sm:p-4 shadow-[4px_4px_0px_#000000] space-y-3.5">
            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, topic, or keyword..."
                  className="w-full bg-[#14151a] border border-[#2b2c31] pl-9 pr-8 py-2 text-xs text-white outline-none focus:border-[#00ff66]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Year Filters */}
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-neutral-500 mr-1 text-[10px] sm:text-[11px]">// YEAR:</span>
                  {years.map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setSelectedYear(yr)}
                      className={`px-2 py-1 sm:px-2.5 sm:py-1.5 border text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                        selectedYear === yr
                          ? 'bg-[#00ff66] text-black border-[#00ff66]'
                          : 'bg-[#15161b] text-neutral-300 border-[#27272a] hover:border-neutral-400'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap items-center gap-1 text-xs">
                  <span className="text-neutral-500 mr-1 text-[10px] sm:text-[11px]">// TAG:</span>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-1 sm:px-2.5 sm:py-1.5 border text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#00f0ff] text-black border-[#00f0ff]'
                          : 'bg-[#15161b] text-neutral-300 border-[#27272a] hover:border-neutral-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] sm:text-[11px] text-neutral-400 pt-2 border-t border-[#1f2025]">
              <div>FOUND: {filteredEvents.length} DISPATCH ENTRIES</div>
              <div>FILTERS: [YR: {selectedYear}] [TYPE: {selectedCategory}]</div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredEvents.map((event) => {
              const isPast = isEventPast(event.date, event.status);

              return (
                <div
                  key={event.id}
                  onClick={() => setActiveEvent(event)}
                  className="brutal-card flex flex-col justify-between overflow-hidden cursor-pointer group"
                >
                  {/* Poster / Header - Full Size Uncropped (1:1 Square) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveEvent(event);
                    }}
                    className="relative aspect-square bg-[#08090b] border-b border-[#27272a] overflow-hidden flex items-center justify-center group/poster cursor-pointer"
                    title="Click to view event details"
                  >
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-contain contrast-105 transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />

                    {/* Hover Overlay with View Details Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 bg-black/90 border border-[#00ff66] text-[#00ff66] font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000]">
                        <ArrowUpRight size={13} />
                        <span>VIEW DETAILS</span>
                      </span>
                    </div>

                    <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
                      <span className="px-2 py-0.5 bg-black/90 border border-white/20 text-[10px] text-[#00ff66] font-bold">
                        [{event.category}]
                      </span>
                      {!isPast && event.registrationOpen && (
                        <span className="px-1.5 py-0.5 bg-[#00ff66] text-black font-mono font-bold text-[9px] animate-pulse">
                          REGISTRATION OPEN
                        </span>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/90 border border-white/20 text-[10px] text-white pointer-events-none">
                      {event.year}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-[#00f0ff]" />
                          <span>{event.date}</span>
                        </div>
                        {event.time && (
                          <div className="flex items-center gap-1 text-[11px]">
                            <Clock size={11} className="text-neutral-500" />
                            <span>{event.time}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white font-sans group-hover:text-[#00ff66] transition-colors leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-xs text-neutral-300 line-clamp-3 font-sans leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Highlights tags */}
                    <div className="space-y-3 pt-3 border-t border-[#232429]">
                      <div className="flex flex-wrap gap-1">
                        {event.highlights &&
                          event.highlights.slice(0, 2).map((h, i) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 bg-[#17181d] border border-[#27272a] text-neutral-300">
                              #{h}
                            </span>
                          ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span className="flex items-center gap-1 text-[11px] truncate max-w-[150px]">
                          <MapPin size={12} className="text-neutral-500 shrink-0" />
                          <span className="truncate">{event.location.split(',')[0]}</span>
                        </span>

                        <div className="flex items-center gap-2">
                          {!isPast && event.registrationOpen && event.registrationUrl ? (
                            <a
                              href={event.registrationUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-2 py-0.5 bg-[#00ff66] text-black font-bold text-[10px] hover:bg-[#33ff85] flex items-center gap-1 shadow-[2px_2px_0px_#000]"
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
                              title="Event date is over. Registration is closed."
                            >
                              REG CLOSED
                            </button>
                          ) : null}
                          <span className="text-[#00ff66] font-bold text-xs flex items-center gap-1 shrink-0">
                            <span>VIEW</span>
                            <ArrowUpRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="border-2 border-dashed border-[#3f3f46] p-8 sm:p-12 text-center space-y-3">
              <div className="text-white font-bold text-sm">NO EVENT MATCHES FOUND</div>
              <p className="text-xs text-neutral-400">Try adjusting your search criteria or resetting filters.</p>
              <button
                onClick={() => {
                  setSelectedYear('ALL');
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="brutal-btn text-xs py-1.5 px-4 cursor-pointer"
              >
                RESET ALL FILTERS
              </button>
            </div>
          )}
        </>
      ) : (
        /* Post Event Reports Tab */
        <div className="space-y-6">
          {reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report) => (
                <div key={report.id} className="brutal-card p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#232429] pb-3 text-xs">
                    <span className="text-[#00f0ff] font-bold">// REPORT FILE</span>
                    <span className="text-neutral-400">{report.eventDate}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
                    {report.title}
                  </h3>

                  {report.coverImage && (
                    <div className="aspect-video bg-[#14151a] border border-[#27272a] overflow-hidden">
                      <img src={report.coverImage} alt={report.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    {report.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#232429] text-xs">
                    <div>
                      <div className="text-neutral-500 text-[10px]">ATTENDEES</div>
                      <div className="text-[#00ff66] font-bold text-base">{report.attendeeCount}+</div>
                    </div>
                    {report.speaker && (
                      <div>
                        <div className="text-neutral-500 text-[10px]">SPEAKER / LEAD</div>
                        <div className="text-white truncate font-medium">{report.speaker}</div>
                      </div>
                    )}
                  </div>

                  {report.outcomes && report.outcomes.length > 0 && (
                    <div className="space-y-1.5 text-xs">
                      <div className="text-neutral-400 font-bold">// OUTCOMES & IMPACT:</div>
                      {report.outcomes.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-neutral-300 text-[11px]">
                          <CheckCircle2 size={12} className="text-[#00ff66] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {report.driveFolderUrl && (
                      <a
                        href={report.driveFolderUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-[#17181d] border border-[#2e303a] hover:border-[#00f0ff] text-[#00f0ff] text-xs font-bold flex items-center gap-1.5"
                      >
                        <FileText size={13} />
                        <span>PHOTO GALLERY</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                    {report.reportDocUrl && (
                      <a
                        href={report.reportDocUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-[#17181d] border border-[#2e303a] hover:border-[#00ff66] text-[#00ff66] text-xs font-bold flex items-center gap-1.5"
                      >
                        <FileText size={13} />
                        <span>OFFICIAL DOC</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-[#3f3f46] p-8 sm:p-12 text-center space-y-3">
              <div className="text-white font-bold text-sm">NO REPORTS SUBMITTED YET</div>
              <p className="text-xs text-neutral-400">
                Post-event reports and documentation are compiled by our documentation team after workshop completion.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Event Details Modal */}
      {activeEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveEvent(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#0c0d10] border-2 border-[#3f3f46] shadow-[6px_6px_0px_#000000] p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#23242a] pb-3 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="text-[#00ff66] font-bold">[{activeEvent.category}] // {activeEvent.year}</span>
                {!isEventPast(activeEvent.date, activeEvent.status) && activeEvent.registrationOpen ? (
                  <span className="px-2 py-0.5 bg-[#00ff66] text-black font-bold text-[10px]">
                    REGISTRATION ACTIVE
                  </span>
                ) : isEventPast(activeEvent.date, activeEvent.status) ? (
                  <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-400 font-mono font-bold text-[10px]">
                    EVENT CONCLUDED
                  </span>
                ) : null}
              </div>
              <button
                onClick={() => setActiveEvent(null)}
                className="p-1 text-neutral-400 hover:text-white hover:bg-[#1f2025] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white uppercase font-sans">
                {activeEvent.title}
              </h2>

              <div className="flex flex-wrap gap-3 text-xs text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#00f0ff]" />
                  <span>{activeEvent.date}</span>
                </div>
                {activeEvent.time && (
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-neutral-400" />
                    <span>{activeEvent.time}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#f59e0b]" />
                  <span className="truncate">{activeEvent.location}</span>
                </div>
                {activeEvent.maxSeats && (
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-neutral-400" />
                    <span>CAPACITY: {activeEvent.maxSeats} SEATS</span>
                  </div>
                )}
              </div>

              {activeEvent.coverImage && (
                <div className="space-y-2">
                  <div
                    onClick={() =>
                      setPosterLightbox({
                        url: activeEvent.coverImage,
                        title: activeEvent.title,
                        date: activeEvent.date,
                        category: activeEvent.category
                      })
                    }
                    className="border border-[#27272a] bg-[#0c0d10] overflow-hidden flex items-center justify-center p-2 relative group/modalPoster cursor-pointer"
                    title="Click to view full size original poster"
                  >
                    <img
                      src={activeEvent.coverImage}
                      alt={activeEvent.title}
                      className="max-h-[500px] w-auto max-w-full object-contain mx-auto shadow-lg"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
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
                        setPosterLightbox({
                          url: activeEvent.coverImage,
                          title: activeEvent.title,
                          date: activeEvent.date,
                          category: activeEvent.category
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
              {!isEventPast(activeEvent.date, activeEvent.status) && activeEvent.registrationOpen && activeEvent.registrationUrl ? (
                <div className="p-3 bg-[#112415] border-2 border-[#00ff66] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-[#00ff66] font-bold text-xs">// REGISTRATION IS CURRENTLY OPEN</div>
                    <div className="text-neutral-300 text-[11px]">
                      {activeEvent.contactPerson ? `Contact: ${activeEvent.contactPerson}` : 'Reserve your slot before seats fill up.'}
                    </div>
                  </div>
                  <a
                    href={activeEvent.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#00ff66] text-black font-bold text-xs hover:bg-[#33ff85] transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#000] shrink-0"
                  >
                    <span>REGISTER NOW</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              ) : isEventPast(activeEvent.date, activeEvent.status) ? (
                <div className="p-3 bg-[#141519] border border-[#27272a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-neutral-400 font-mono font-bold text-xs">// REGISTRATION CONCLUDED</div>
                    <div className="text-neutral-500 text-[11px]">
                      This event took place on {activeEvent.date}. Registrations and admissions are now closed.
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="px-4 py-2 bg-[#1b1c22] border border-[#2e2f38] text-neutral-500 font-mono text-xs cursor-not-allowed opacity-60 pointer-events-none select-none flex items-center gap-1.5 shrink-0"
                    title="Event date is over. Registration is not available."
                  >
                    <span>REGISTRATION CLOSED</span>
                  </button>
                </div>
              ) : null}

              <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
                {activeEvent.description}
              </p>

              {activeEvent.highlights && activeEvent.highlights.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs text-neutral-400 font-bold">// KEY HIGHLIGHTS:</div>
                  <div className="space-y-1">
                    {activeEvent.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="text-[#00ff66] font-bold">&gt;</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Linked Report if available */}
              {eventReport && (
                <div className="p-3 bg-[#0d1620] border border-[#00f0ff]/50 space-y-2">
                  <div className="text-[#00f0ff] font-bold text-xs flex items-center gap-1.5">
                    <FileText size={13} />
                    <span>POST-EVENT REPORT ATTACHED</span>
                  </div>
                  <p className="text-xs text-neutral-300">{eventReport.summary}</p>
                  <div className="flex gap-2 pt-1">
                    {eventReport.driveFolderUrl && (
                      <a
                        href={eventReport.driveFolderUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#00f0ff] hover:underline flex items-center gap-1"
                      >
                        <span>View Photos & Drive</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#23242a] flex justify-end">
              <button
                onClick={() => setActiveEvent(null)}
                className="brutal-btn w-full sm:w-auto text-xs py-2 px-6 cursor-pointer"
              >
                CLOSE DISPATCH
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Size Poster Lightbox */}
      {posterLightbox && (
        <PosterLightbox
          imageUrl={posterLightbox.url}
          title={posterLightbox.title}
          date={posterLightbox.date}
          category={posterLightbox.category}
          onClose={() => setPosterLightbox(null)}
        />
      )}
    </div>
  );
};
