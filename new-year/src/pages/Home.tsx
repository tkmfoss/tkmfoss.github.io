import React from 'react';
import { ArrowUpRight, Terminal, Shield, Users, Calendar, ChevronRight, GitBranch, ExternalLink } from 'lucide-react';
import { FOSS_EVENTS } from '../data/events';
import { FOUR_FREEDOMS } from '../data/freedoms';
import { FOSS_PROJECTS } from '../data/projects';

interface HomeProps {
  onSelectTab: (tab: string) => void;
  onOpenTerminal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectTab, onOpenTerminal }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Hero Card */}
          <div className="p-4 sm:p-8 lg:p-12 border-2 border-[#2b2c31] bg-[#101115] relative overflow-hidden shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000]">
            {/* Top Bar inside hero card */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-6 sm:pb-8 border-b border-[#232429] font-mono text-[10px] sm:text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00ff66] inline-block animate-pulse"></span>
                <span className="text-[#00ff66] font-bold">KERNEL: ACTIVE</span>
                <span className="hidden xs:inline">// NODE: TKMCE-KOL</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-1.5 sm:px-2 py-0.5 bg-[#18191e] border border-[#303138] text-[9px] sm:text-[10px]">REV: 2026.1</span>
                <span className="text-neutral-500">GNU GPL v3.0</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-6 sm:pt-10 items-center">
              {/* Left Column: Heading and Manifesto Intro */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1b20] border border-[#363842] text-[#00f0ff] font-mono text-[10px] sm:text-xs">
                  <span>[INIT]</span>
                  <span>FREE & OPEN SOURCE SOFTWARE CELL</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.1] font-sans">
                  Free Software <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] via-[#00f0ff] to-white">
                    Community
                  </span> <br />
                  of TKMCE.
                </h1>

                <p className="text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed font-sans max-w-xl">
                  FOSS Cell TKMCE is an open collective of student hackers, developers, and activists at Thangal Kunju Musaliar College of Engineering. 
                  We advocate for software freedom, organize Linux clinics, demystify open-source tools, and reject proprietary lock-in.
                </p>

                {/* Primary Action Buttons - Responsive Stack */}
                <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4 font-mono text-xs">
                  <button
                    onClick={() => onSelectTab('manifesto')}
                    className="brutal-btn-primary w-full sm:w-auto px-5 py-3 font-bold flex items-center justify-center gap-2"
                  >
                    <Shield size={16} />
                    <span>02 // READ MANIFESTO</span>
                  </button>

                  <button
                    onClick={() => onSelectTab('events')}
                    className="brutal-btn w-full sm:w-auto px-5 py-3 bg-[#18191e] text-white hover:text-black flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} />
                    <span>03 // EXPLORE EVENTS</span>
                  </button>

                  <button
                    onClick={onOpenTerminal}
                    className="brutal-btn w-full sm:w-auto px-4 py-3 bg-[#131418] border-[#383a45] text-[#00ff66] flex items-center justify-center gap-2"
                  >
                    <Terminal size={16} />
                    <span>$ CLI</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Brutalist Terminal Card */}
              <div className="lg:col-span-5">
                <div className="border-2 border-[#3f3f46] bg-[#0c0d10] p-3.5 sm:p-4 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] font-mono text-[11px] sm:text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#23242a] pb-2 text-neutral-400">
                    <span className="flex items-center gap-1.5 text-white">
                      <Terminal size={14} className="text-[#00ff66]" />
                      <span>kernel_boot.log</span>
                    </span>
                    <span className="text-[10px] text-[#00ff66]">[SYS_OK]</span>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2 text-neutral-300">
                    <div className="text-neutral-500">// Booting TKM FOSS environment...</div>
                    <div className="truncate">
                      <span className="text-[#00ff66]">[0.0001]</span> Linux tkmce-box 6.12.8-arch1-1
                    </div>
                    <div className="truncate">
                      <span className="text-[#00f0ff]">[0.0014]</span> git: tkmfoss.github.io repo sync OK
                    </div>
                    <div className="truncate">
                      <span className="text-[#f59e0b]">[0.0042]</span> execom: compiler 2026-27 in progress...
                    </div>
                    <div className="truncate">
                      <span className="text-[#00ff66]">[0.0089]</span> network: discord.gg/uXrWyWqvWx UP
                    </div>
                    <div className="pt-2 border-t border-[#1c1d22] text-white">
                      <span className="text-[#00ff66]">$</span> foss --proclaim <br />
                      <span className="text-neutral-400 italic text-[10px] sm:text-xs">
                        "Free software is a matter of liberty, not price."
                      </span>
                    </div>
                  </div>

                  {/* Interactive Button inside terminal */}
                  <div className="pt-2">
                    <button
                      onClick={onOpenTerminal}
                      className="w-full py-2 bg-[#17181d] border border-[#34353d] hover:border-[#00ff66] hover:text-[#00ff66] text-neutral-300 text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 text-[11px] sm:text-xs"
                    >
                      <span>LAUNCH INTERACTIVE CLI</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Ticker - Responsive Grid */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#232429] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 font-mono">
              <div className="space-y-0.5 sm:space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00ff66]">500+</div>
                <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">// COMMITS MERGED</div>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00f0ff]">100%</div>
                <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">// FREE & OPEN SOURCE</div>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">20+</div>
                <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">// WORKSHOPS & TALKS</div>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f59e0b]">1958</div>
                <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">// TKM HERITAGE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Four Essential Freedoms Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 mb-6 sm:mb-8 pb-4 border-b-2 border-[#27272a]">
          <div>
            <div className="font-mono text-[11px] sm:text-xs text-[#00ff66] uppercase tracking-wider">// PHILOSOPHICAL FOUNDATION</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-sans">
              The 4 Essential Freedoms
            </h2>
          </div>
          <p className="font-mono text-[11px] sm:text-xs text-neutral-400 max-w-md">
            As defined by the Free Software Foundation (FSF). Software is free only when users hold these four rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {FOUR_FREEDOMS.map((freedom) => (
            <div 
              key={freedom.number}
              className="brutal-card p-4 sm:p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#232429] font-mono text-xs">
                  <span className="text-[#00ff66] font-bold">{freedom.label}</span>
                  <span className="text-neutral-400 px-2 py-0.5 bg-[#17181c] border border-[#27272a] text-[10px] sm:text-xs">
                    RULE 0{freedom.number}
                  </span>
                </div>

                <div className="mt-3 sm:mt-4">
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight font-sans">
                    {freedom.tagline}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                    {freedom.summary}
                  </p>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="bg-[#090a0d] border border-[#27272a] p-2.5 sm:p-3 font-mono text-[11px] sm:text-xs text-[#00f0ff]">
                <div className="text-[9px] sm:text-[10px] text-neutral-500 mb-1">// CLI PARADIGM:</div>
                <div className="overflow-x-auto whitespace-nowrap">{freedom.shellCmd}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <button
            onClick={() => onSelectTab('manifesto')}
            className="brutal-btn w-full sm:w-auto text-xs py-2.5 px-6 font-mono text-white hover:text-black inline-flex items-center justify-center gap-2"
          >
            <span>DEEP DIVE: READ FULL MANIFESTO</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* Featured Events Dispatch */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 mb-6 sm:mb-8 pb-4 border-b-2 border-[#27272a]">
          <div>
            <div className="font-mono text-[11px] sm:text-xs text-[#00f0ff] uppercase tracking-wider">// DISPATCH LOGS</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-sans">
              Recent Dispatches & Events
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('events')}
            className="font-mono text-xs text-[#00ff66] hover:underline flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
          >
            <span>VIEW ALL DISPATCHES</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {FOSS_EVENTS.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="brutal-card flex flex-col justify-between overflow-hidden group"
            >
              {/* Event Poster or Graphic */}
              <div className="relative aspect-[16/10] bg-[#18191e] border-b border-[#27272a] overflow-hidden">
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/90 border border-white/20 font-mono text-[10px] text-[#00ff66]">
                  [{event.category}]
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/90 border border-white/20 font-mono text-[10px] text-white">
                  {event.date}
                </div>
              </div>

              {/* Event Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white font-sans tracking-tight group-hover:text-[#00ff66] transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-300 line-clamp-3 font-sans leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#232429] flex items-center justify-between font-mono text-[11px] text-neutral-400">
                  <span className="truncate max-w-[150px]">{event.location.split(',')[0]}</span>
                  <button
                    onClick={() => onSelectTab('events')}
                    className="text-[#00ff66] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>DETAILS</span>
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Execom Teaser Callout */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="border-2 border-[#f59e0b]/50 bg-[#12110c] p-4 sm:p-8 lg:p-10 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#241c0e] border border-[#f59e0b]/60 text-[#f59e0b] font-mono text-[11px] sm:text-xs">
                <span className="inline-block w-2 h-2 bg-[#f59e0b] animate-ping"></span>
                <span>STATUS: COMPILING 2026-2027 ROSTER</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white uppercase font-sans">
                Executive Committee 2026-2027: Coming Soon
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                The new leadership cohort for FOSS Cell TKMCE is being formalized. 
                View our build pipeline, check encrypted role slots, or browse the archived 2024-2025 roster.
              </p>
            </div>

            <button
              onClick={() => onSelectTab('execom')}
              className="brutal-btn w-full md:w-auto py-3 px-6 bg-[#f59e0b] text-black font-mono font-bold border-[#f59e0b] hover:bg-[#ffb429] hover:text-black flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Users size={16} />
              <span>VIEW PIPELINE [COMING SOON]</span>
            </button>
          </div>
        </div>
      </section>

      {/* Open Source Repositories Showcase */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 mb-6 sm:mb-8 pb-4 border-b-2 border-[#27272a]">
          <div>
            <div className="font-mono text-[11px] sm:text-xs text-[#00ff66] uppercase tracking-wider">// CODEBASE LABS</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-sans">
              Public Repositories
            </h2>
          </div>
          <a
            href="https://github.com/tkmfoss"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>GITHUB.COM/TKMFOSS</span>
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {FOSS_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="brutal-card p-4 sm:p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#232429] font-mono text-xs">
                  <span className="text-[#00ff66] font-bold flex items-center gap-1.5 truncate pr-2">
                    <GitBranch size={14} className="shrink-0" />
                    <span className="truncate">{project.repoName}</span>
                  </span>
                  <span className="px-1.5 sm:px-2 py-0.5 bg-[#17181c] border border-[#27272a] text-[10px] text-neutral-300 shrink-0">
                    {project.license}
                  </span>
                </div>

                <div className="mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
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
      </section>

      {/* Community Callout Banner */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="border-2 border-[#2b2c31] bg-[#111216] p-6 sm:p-12 text-center space-y-6 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000]">
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <div className="font-mono text-xs text-[#00ff66]">// JOIN THE COHORT</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase font-sans">
              No Permissions Needed. Just Fork and Hack.
            </h2>
            <p className="text-neutral-300 text-xs sm:text-base font-sans leading-relaxed">
              Whether you are an experienced systems programmer or a first-year student opening your first Linux terminal, FOSS Cell welcomes all curiosity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 font-mono text-xs pt-2">
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
              <span>ALL CHANNELS & MEETUPS</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
