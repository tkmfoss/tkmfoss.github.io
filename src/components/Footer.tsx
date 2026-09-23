import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, DiscordIcon, InstagramIcon, LinkedinIcon } from './Icons';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenTerminal }) => {
  return (
    <footer className="w-full bg-[#090a0c] border-t-2 border-[#27272a] text-neutral-400 font-mono text-xs">
      {/* Ticker separator */}
      <div className="border-b border-[#1f2024] bg-[#0f1013] py-1.5 sm:py-2 px-3 sm:px-4 overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-6 sm:gap-8 text-[10px] sm:text-[11px] text-neutral-500 animate-pulse">
          <span>// FREEDOM TO RUN</span>
          <span>&bull;</span>
          <span>FREEDOM TO STUDY</span>
          <span>&bull;</span>
          <span>FREEDOM TO REDISTRIBUTE</span>
          <span>&bull;</span>
          <span>FREEDOM TO MODIFY</span>
          <span>&bull;</span>
          <span>NO PROPRIETARY WALLS</span>
          <span>&bull;</span>
          <span>TKM COLLEGE OF ENGINEERING</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#18181b] border border-[#3f3f46] flex items-center justify-center shrink-0">
                <img 
                  src="/images/fosscell-logo.png" 
                  alt="FOSS Cell Logo" 
                  className="w-5 h-5 object-contain"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
              <span className="font-extrabold text-white text-sm sm:text-base tracking-tight">FOSS CELL TKMCE</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-md font-sans">
              Free and Open Source Software Cell at Thangal Kunju Musaliar College of Engineering, Kollam, Kerala.
              Educating engineers, demystifying the kernel, building public good software, and defending user software autonomy.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
              <span className="px-2 py-0.5 bg-[#16171b] border border-[#27272a] text-[9px] sm:text-[10px] text-[#00ff66]">
                [100% FLOSS]
              </span>
              <span className="px-2 py-0.5 bg-[#16171b] border border-[#27272a] text-[9px] sm:text-[10px] text-[#00f0ff]">
                [ZERO TELEMETRY]
              </span>
              <span className="px-2 py-0.5 bg-[#16171b] border border-[#27272a] text-[9px] sm:text-[10px] text-neutral-300">
                [GPL-3.0 / MIT]
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#27272a] pb-1.5 flex items-center gap-1.5">
              <span>// DIRECTORY</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onSelectTab('home')}
                  className="hover:text-[#00ff66] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>&gt;</span> <span>01 // Home Overview</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('manifesto')}
                  className="hover:text-[#00ff66] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>&gt;</span> <span>02 // FOSS Manifesto</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('events')}
                  className="hover:text-[#00ff66] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>&gt;</span> <span>03 // Events & Workshops</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('projects')}
                  className="hover:text-[#00ff66] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>&gt;</span> <span>04 // Repositories & Labs</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('execom')}
                  className="hover:text-[#f59e0b] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>&gt;</span> <span>05 // Execom [COMING SOON]</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTerminal}
                  className="hover:text-[#00ff66] text-[#00ff66] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>&gt;</span> <span>Launch Terminal CLI</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Network & Socials */}
          <div className="space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#27272a] pb-1.5">
              <span>// NETWORK</span>
            </div>
            <div className="space-y-2">
              <a 
                href="https://github.com/tkmfoss" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-[#121316] border border-[#27272a] hover:border-[#00ff66] hover:text-white flex items-center justify-between transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon size={14} className="text-[#00ff66]" />
                  <span>GitHub Org</span>
                </span>
                <ArrowUpRight size={12} />
              </a>

              <a 
                href="https://discord.gg/uXrWyWqvWx" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-[#121316] border border-[#27272a] hover:border-[#00f0ff] hover:text-white flex items-center justify-between transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <DiscordIcon size={14} className="text-[#00f0ff]" />
                  <span>Discord Server</span>
                </span>
                <ArrowUpRight size={12} />
              </a>

              <a 
                href="https://instagram.com/tkmcefosscell" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-[#121316] border border-[#27272a] hover:border-pink-500 hover:text-white flex items-center justify-between transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <InstagramIcon size={14} className="text-pink-400" />
                  <span>Instagram</span>
                </span>
                <ArrowUpRight size={12} />
              </a>

              <a 
                href="https://www.linkedin.com/company/foss-tkmce" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-[#121316] border border-[#27272a] hover:border-blue-400 hover:text-white flex items-center justify-between transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon size={14} className="text-blue-400" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight size={12} />
              </a>

              <a 
                href="mailto:fosscelltkmce@gmail.com" 
                className="p-2 bg-[#121316] border border-[#27272a] hover:border-[#f59e0b] hover:text-white flex items-center justify-between transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2 truncate">
                  <Mail size={14} className="text-[#f59e0b] shrink-0" />
                  <span className="truncate">Email Contact</span>
                </span>
                <ArrowUpRight size={12} className="shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-[#1f2024] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] text-neutral-500 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} FOSS Cell TKMCE. Released under GNU GPL v3.0 / MIT.
          </div>
          <div className="flex items-center gap-3">
            <span>GITHUB PAGES</span>
            <span>&bull;</span>
            <span>NO COOKIES &bull; NO ADS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
