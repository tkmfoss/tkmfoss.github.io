import React from 'react';
import { FOUR_FREEDOMS } from '../data/freedoms';

export const Manifesto: React.FC = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
            <span className="md:hidden text-[#00f0ff]">[SCROLL HORIZONTALLY &rarr;]</span>
            <span className="hidden md:inline">// ARCHITECTURAL MATRIX</span>
          </div>
        </div>

        <div className="border-2 border-[#2b2c31] bg-[#0c0d10] shadow-[4px_4px_0px_#000000] sm:shadow-[5px_5px_0px_#000000] overflow-x-auto">
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
