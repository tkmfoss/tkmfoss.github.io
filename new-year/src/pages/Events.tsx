import React, { useState } from 'react';
import { Calendar, MapPin, ArrowUpRight, Search, X } from 'lucide-react';
import { FOSS_EVENTS, type FosEvent } from '../data/events';

export const Events: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeEvent, setActiveEvent] = useState<FosEvent | null>(null);

  const categories = ['ALL', 'WORKSHOP', 'HACKATHON', 'COMMUNITY', 'TALK'];
  const years = ['ALL', '2025', '2024'];

  const filteredEvents = FOSS_EVENTS.filter((ev) => {
    const matchesYear = selectedYear === 'ALL' || ev.year.toString() === selectedYear;
    const matchesCategory = selectedCategory === 'ALL' || ev.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesYear && matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10 font-mono">
      {/* Page Header */}
      <div className="border-2 border-[#2b2c31] bg-[#101115] p-4 sm:p-8 lg:p-10 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#00ff66]">
          <span>// DISPATCH ARCHIVE</span>
          <span>&bull;</span>
          <span>TKMCE FOSS CELL</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight font-sans leading-tight">
          Events & Workshops
        </h1>
        <p className="text-neutral-300 text-xs sm:text-sm lg:text-base font-sans max-w-2xl leading-relaxed">
          From hands-on Linux system installation festivals to month-long Season of Commits sprints, 
          we host regular open-source events designed to build genuine engineering competence.
        </p>
      </div>

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
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => setActiveEvent(event)}
            className="brutal-card flex flex-col justify-between overflow-hidden cursor-pointer group"
          >
            {/* Poster / Header */}
            <div className="relative aspect-[16/10] bg-[#16171d] border-b border-[#27272a] overflow-hidden">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/90 border border-white/20 text-[10px] text-[#00ff66] font-bold">
                [{event.category}]
              </div>
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/90 border border-white/20 text-[10px] text-white">
                {event.year}
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <Calendar size={12} className="text-[#00f0ff]" />
                  <span>{event.date}</span>
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
                  {event.highlights.slice(0, 2).map((h, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-[#17181d] border border-[#27272a] text-neutral-300">
                      #{h}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1 text-[11px] truncate max-w-[170px]">
                    <MapPin size={12} className="text-neutral-500 shrink-0" />
                    <span className="truncate">{event.location.split(',')[0]}</span>
                  </span>
                  <span className="text-[#00ff66] font-bold text-xs flex items-center gap-1 shrink-0">
                    <span>VIEW</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="border-2 border-dashed border-[#3f3f46] p-8 sm:p-12 text-center space-y-3">
          <div className="text-white font-bold text-sm">NO EVENT MATCHES FOUND</div>
          <p className="text-xs text-neutral-400">Try adjusting your search criteria or resetting filters.</p>
          <button
            onClick={() => { setSelectedYear('ALL'); setSelectedCategory('ALL'); setSearchQuery(''); }}
            className="brutal-btn text-xs py-1.5 px-4 cursor-pointer"
          >
            RESET ALL FILTERS
          </button>
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
              <span className="text-[#00ff66] font-bold">[{activeEvent.category}] // {activeEvent.year}</span>
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
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#f59e0b]" />
                  <span className="truncate">{activeEvent.location}</span>
                </div>
              </div>

              {activeEvent.coverImage && (
                <div className="border border-[#27272a] bg-[#14151a] overflow-hidden max-h-56 sm:max-h-72">
                  <img
                    src={activeEvent.coverImage}
                    alt={activeEvent.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                </div>
              )}

              <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
                {activeEvent.description}
              </p>

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
    </div>
  );
};
