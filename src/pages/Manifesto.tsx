import React, { useState, useRef } from 'react';
import { FOUR_FREEDOMS } from '../data/freedoms';

export const Manifesto: React.FC = () => {
  const [activeFreedom, setActiveFreedom] = useState(0);
  const freedomCarouselRef = useRef<HTMLDivElement | null>(null);

  // Native swipe handling is provided by the scroll container.

  const scrollFreedomTo = (index: number) => {
    const container = freedomCarouselRef.current;
    if (!container) return;
    container.scrollTo({
      left: index * container.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };

  const handleFreedomScroll = () => {
    const container = freedomCarouselRef.current;
    if (!container || container.clientWidth === 0) return;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    const clamped = Math.min(Math.max(index, 0), FOUR_FREEDOMS.length - 1);
    if (clamped !== activeFreedom) {
      setActiveFreedom(clamped);
    }
  };

  const comparisonRows = [
    {
      feature: 'Source Code Availability',
      foss: 'Full transparent access. Inspectable and auditable.',
      proprietary: 'Locked binary. Obfuscated and guarded by NDAs.'
    },
    {
      feature: 'Telemetric Surveillance',
      foss: 'Zero unsolicited tracking. User has total authority.',
      proprietary: 'Pervasive telemetry, behavioral fingerprinting.'
    },
    {
      feature: 'Vendor Lock-in',
      foss: 'Open standard formats (ODF, POSIX, SQL, Markdown).',
      proprietary: 'Proprietary binary blobs and subscription gates.'
    },
    {
      feature: 'Right to Repair & Modify',
      foss: 'Unconditional freedom to patch, compile, and improve.',
      proprietary: 'EULAs criminalize reverse engineering and repairs.'
    },
    {
      feature: 'Long-term Longevity',
      foss: 'Can be maintained by community indefinitely.',
      proprietary: 'Killed at company discretion or sunset notice.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-16 font-mono">
      {/* Header */}
      <div className="border-2 border-[#2b2c31] bg-[#101115] p-4 sm:p-8 lg:p-12 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#00ff66]">
          <span>// DECLARATION 001</span>
          <span>&bull;</span>
          <span>FREE SOFTWARE FOUNDATION PRINCIPLES</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight font-sans leading-tight">
          The FOSS Cell Manifesto
        </h1>
        <p className="text-neutral-300 text-xs sm:text-sm lg:text-base font-sans max-w-3xl leading-relaxed">
          At Thangal Kunju Musaliar College of Engineering, we believe software is not merely a consumable product;
          it is an intellectual medium that shapes how humans communicate, learn, and govern themselves. 
          When software is chained by proprietary restrictions, human inquiry is compromised.
        </p>
      </div>

      {/* The 4 Freedoms Breakdown */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b-2 border-[#27272a] pb-3">
          <div className="text-base sm:text-lg font-bold text-white uppercase font-sans">
            The Four Fundamental Freedoms
          </div>
          <span className="text-[10px] sm:text-xs text-[#00ff66]">[CORE TENET]</span>
        </div>

        {/* Mobile swipe carousel */}
        <div className="md:hidden">
          <div
            ref={freedomCarouselRef}
            onScroll={handleFreedomScroll}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollFreedomTo(Math.min(activeFreedom + 1, FOUR_FREEDOMS.length - 1));
              } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollFreedomTo(Math.max(activeFreedom - 1, 0));
              }
            }}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth outline-none [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="region"
            aria-label="The Four Fundamental Freedoms"
            aria-roledescription="carousel"
          >
            {FOUR_FREEDOMS.map((freedom) => (
              <div
                key={freedom.number}
                className="w-full shrink-0 snap-start px-0.5"
              >
                <div className="brutal-card p-4 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#232429] text-xs">
                      <span className="text-[#00ff66] font-bold">{freedom.label}</span>
                      <span className="text-neutral-500">FREEDOM_0{freedom.number}</span>
                    </div>

                    <div className="mt-3 space-y-1.5 sm:space-y-2">
                      <h3 className="text-base font-bold text-white uppercase font-sans">
                        {freedom.tagline}
                      </h3>
                      <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                        {freedom.detailed}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#090a0d] border border-[#27272a] p-2.5 text-[11px] text-[#00f0ff]">
                    <div className="text-[9px] text-neutral-500 mb-1">// SYSTEM EXECUTION:</div>
                    <div className="overflow-x-auto whitespace-nowrap">{freedom.shellCmd}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5" aria-hidden="true">
            {FOUR_FREEDOMS.map((freedom, idx) => (
              <button
                key={freedom.number}
                type="button"
                tabIndex={-1}
                onClick={() => scrollFreedomTo(idx)}
                className={`h-1.5 border cursor-pointer transition-all duration-300 ease-in-out motion-reduce:transition-none ${
                  idx === activeFreedom
                    ? 'w-5 bg-[#00ff66] border-[#00ff66] animate-pulse'
                    : 'w-1.5 bg-transparent border-[#27272a] hover:border-[#00ff66]'
                }`}
                aria-label={`Go to freedom ${idx + 1}`}
              />
            ))}
          </div>

          <div className="mt-2 flex items-center justify-center text-[10px] sm:text-[11px] font-mono text-neutral-500 uppercase">
            <span className="animate-pulse">SWIPE TO EXPLORE →</span>
          </div>
        </div>

        {/* Desktop four-freedom layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {FOUR_FREEDOMS.map((freedom) => (
            <div
              key={freedom.number}
              className="brutal-card p-4 sm:p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#232429] text-xs">
                  <span className="text-[#00ff66] font-bold">{freedom.label}</span>
                  <span className="text-neutral-500">FREEDOM_0{freedom.number}</span>
                </div>

                <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                  <h3 className="text-base sm:text-xl font-bold text-white uppercase font-sans">
                    {freedom.tagline}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                    {freedom.detailed}
                  </p>
                </div>
              </div>

              <div className="bg-[#090a0d] border border-[#27272a] p-2.5 sm:p-3 text-[11px] sm:text-xs text-[#00f0ff]">
                <div className="text-[9px] sm:text-[10px] text-neutral-500 mb-1">// SYSTEM EXECUTION:</div>
                <div className="overflow-x-auto whitespace-nowrap">{freedom.shellCmd}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison: Free vs Proprietary */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b-2 border-[#27272a] pb-3">
          <div className="text-base sm:text-lg font-bold text-white uppercase font-sans">
            Free Software vs Proprietary Enclosure
          </div>
          <div className="text-[10px] sm:text-xs text-neutral-400 flex items-center gap-1">
            <span className="md:hidden text-[#00f0ff]">// FIELD COMPARISON</span>
            <span className="hidden md:inline">// ARCHITECTURAL MATRIX</span>
          </div>
        </div>

        {/* Desktop side-by-side matrix */}
        <div className="hidden md:block border-2 border-[#2b2c31] bg-[#0c0d10] shadow-[4px_4px_0px_#000000] sm:shadow-[5px_5px_0px_#000000] overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[540px]">
            <thead>
              <tr className="border-b-2 border-[#27272a] bg-[#14151a] text-neutral-300">
                <th className="p-3 sm:p-4 font-bold uppercase w-1/3">Dimension</th>
                <th className="p-3 sm:p-4 font-bold uppercase text-[#00ff66] w-1/3">Free Software (FOSS)</th>
                <th className="p-3 sm:p-4 font-bold uppercase text-[#ff5555] w-1/3">Proprietary Software</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2025]">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#121317] transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-white align-top">{row.feature}</td>
                  <td className="p-3 sm:p-4 text-neutral-300 font-sans align-top">
                    <span className="text-[#00ff66] font-bold mr-1.5">[+]</span>
                    {row.foss}
                  </td>
                  <td className="p-3 sm:p-4 text-neutral-400 font-sans align-top">
                    <span className="text-[#ff5555] font-bold mr-1.5">[-]</span>
                    {row.proprietary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile compact comparison list */}
        <div className="md:hidden border-2 border-[#2b2c31] bg-[#0c0d10] divide-y divide-[#1f2025]">
          {comparisonRows.map((row, idx) => (
            <div key={idx} className="p-3 space-y-1.5">
              <div className="text-xs font-bold text-white uppercase tracking-wide">{row.feature}</div>
              <div className="flex items-start gap-2 text-xs">
                <span className="text-[#00ff66] font-bold shrink-0 leading-tight">+</span>
                <span className="text-neutral-300 font-sans leading-snug">
                  <span className="text-[#00ff66] font-bold">Free software</span> — {row.foss}
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <span className="text-[#ff5555] font-bold shrink-0 leading-tight">−</span>
                <span className="text-neutral-400 font-sans leading-snug">
                  <span className="text-[#ff5555] font-bold">Proprietary</span> — {row.proprietary}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Pledge */}
      <div className="border-2 border-[#2b2c31] bg-[#111216] p-4 sm:p-8 lg:p-10 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] space-y-4 sm:space-y-6">
        <div className="text-[10px] sm:text-xs text-[#00f0ff] uppercase">// THE TKMCE STUDENT PLEDGE</div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white uppercase font-sans">
          Building Sovereign Engineers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 pt-2 sm:pt-4 text-xs font-sans">
          <div className="p-3.5 sm:p-4 bg-[#16171d] border border-[#27272a] space-y-2">
            <div className="text-white font-bold font-mono text-xs sm:text-sm">// 01 &bull; OPEN LABS</div>
            <p className="text-neutral-300 leading-relaxed text-xs">
              We insist on running Linux distributions and open toolchains across student workstations, ensuring zero license encumbrances.
            </p>
          </div>
          <div className="p-3.5 sm:p-4 bg-[#16171d] border border-[#27272a] space-y-2">
            <div className="text-white font-bold font-mono text-xs sm:text-sm">// 02 &bull; PUBLIC GOOD</div>
            <p className="text-neutral-300 leading-relaxed text-xs">
              Projects developed under the club banner are licensed under recognized open source licenses (GPL, MIT, AGPL) for community reuse.
            </p>
          </div>
          <div className="p-3.5 sm:p-4 bg-[#16171d] border border-[#27272a] space-y-2">
            <div className="text-white font-bold font-mono text-xs sm:text-sm">// 03 &bull; MENTORSHIP</div>
            <p className="text-neutral-300 leading-relaxed text-xs">
              We mentor juniors without gatekeeping, introducing them to git, code review etiquette, and international open source sprints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
