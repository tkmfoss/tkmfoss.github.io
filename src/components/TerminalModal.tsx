import React, { useState, useEffect, useRef } from 'react';
import { X, CornerDownLeft } from 'lucide-react';
import { FOSS_EVENTS } from '../data/events';
import { FOUR_FREEDOMS } from '../data/freedoms';
import { FOSS_PROJECTS } from '../data/projects';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

interface CommandHistory {
  cmd: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      cmd: 'foss --version',
      output: (
        <div className="space-y-1 text-neutral-300">
          <div className="text-[#00ff66] font-bold">FOSS Cell TKMCE OS // Interactive Shell v2.4</div>
          <div className="text-neutral-400">GNU Coreutils & Free Software Environment. Type <span className="text-[#00f0ff] font-bold">help</span> to view available operations.</div>
        </div>
      )
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    const cmd = trimmed.toLowerCase();

    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-neutral-300 text-xs sm:text-sm">
            <div className="text-white font-bold border-b border-[#27272a] pb-1">AVAILABLE FOSS COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] sm:text-xs">
              <div><span className="text-[#00ff66] font-bold">events</span> - List recent workshops & hackathons</div>
              <div><span className="text-[#00ff66] font-bold">freedom</span> - The 4 Essential Software Freedoms</div>
              <div><span className="text-[#00ff66] font-bold">projects</span> - View active open source repos</div>
              <div><span className="text-[#00ff66] font-bold">execom</span> - Check 2026-2027 Execom status</div>
              <div><span className="text-[#00ff66] font-bold">manifesto</span> - View FOSS Cell philosophy</div>
              <div><span className="text-[#00ff66] font-bold">join</span> - Community links and channels</div>
              <div><span className="text-[#00ff66] font-bold">whoami</span> - Identify user session</div>
              <div><span className="text-[#00ff66] font-bold">clear</span> - Flush terminal screen buffer</div>
              <div><span className="text-[#00ff66] font-bold">exit</span> - Close terminal prompt</div>
            </div>
          </div>
        );
        break;

      case 'events':
        output = (
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="text-[#00ff66] font-bold">RECENT EVENTS & INITIATIVES:</div>
            {FOSS_EVENTS.slice(0, 4).map((ev) => (
              <div key={ev.id} className="border-l-2 border-[#3f3f46] pl-2 text-xs">
                <span className="text-white font-bold">{ev.title}</span> ({ev.date})
                <div className="text-neutral-400">{ev.description}</div>
              </div>
            ))}
            <div className="text-[10px] sm:text-[11px] text-[#00f0ff]">Tip: Use web navigation [03 // EVENTS] for full archive.</div>
          </div>
        );
        break;

      case 'freedom':
      case 'freedoms':
        output = (
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="text-[#00ff66] font-bold">THE FOUR ESSENTIAL FREEDOMS (FSF):</div>
            {FOUR_FREEDOMS.map((f) => (
              <div key={f.number} className="text-xs">
                <span className="text-[#00f0ff] font-bold">Freedom {f.number}:</span> {f.summary}
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="text-[#00ff66] font-bold">OPEN SOURCE REPOSITORIES:</div>
            {FOSS_PROJECTS.map((p) => (
              <div key={p.id} className="text-xs">
                <span className="text-white font-bold">{p.repoName}</span> [{p.license}] - {p.description}
              </div>
            ))}
          </div>
        );
        break;

      case 'execom':
        output = (
          <div className="space-y-2 p-2 bg-[#17181c] border border-[#f59e0b]/40 text-[#f59e0b] text-xs sm:text-sm">
            <div className="font-bold flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#f59e0b] animate-ping"></span>
              STATUS: TRANSMISSION PENDING // COMING SOON
            </div>
            <div className="text-xs text-neutral-300">
              The 2026-2027 Executive Committee is currently being compiled.
              Visit the <button onClick={() => { onClose(); onNavigate('execom'); }} className="underline text-white font-bold cursor-pointer">Execom page</button> for pipeline status and past archives.
            </div>
          </div>
        );
        break;

      case 'manifesto':
        output = (
          <div className="space-y-1 text-xs text-neutral-300">
            <div className="text-white font-bold">FOSS CELL TKMCE MANIFESTO:</div>
            <p>We are a community of student engineers advocating for Free Software at Thangal Kunju Musaliar College of Engineering.</p>
            <p>We reject vendor lock-in, proprietary surveillance, and artificial limitations on learning.</p>
            <p className="text-[#00ff66]">Code is meant to be shared, inspected, improved, and celebrated.</p>
          </div>
        );
        break;

      case 'join':
      case 'contact':
        output = (
          <div className="space-y-1 text-xs">
            <div className="text-white font-bold">CONNECT WITH TKM FOSS:</div>
            <div>GitHub: <a href="https://github.com/tkmfoss" target="_blank" rel="noreferrer" className="text-[#00ff66] underline">github.com/tkmfoss</a></div>
            <div>Discord: <a href="https://discord.gg/uXrWyWqvWx" target="_blank" rel="noreferrer" className="text-[#00f0ff] underline">discord.gg/uXrWyWqvWx</a></div>
            <div>Email: <span className="text-neutral-200">fosscelltkmce@gmail.com</span></div>
            <div>Campus: TKM College of Engineering, Karicode, Kollam</div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      case 'whoami':
        output = (
          <div className="text-xs text-[#00ff66]">
            guest@tkmfoss // Authorized student collaborator & open source advocate.
          </div>
        );
        break;

      case 'sudo':
        output = (
          <div className="text-xs text-neutral-400">
            Permission denied: In a true FOSS ecosystem, you already possess root autonomy over your personal computing.
          </div>
        );
        break;

      case 'date':
        output = (
          <div className="text-xs text-neutral-300">
            {new Date().toISOString()} // UTC+05:30
          </div>
        );
        break;

      default:
        output = (
          <div className="text-xs text-[#ff5555]">
            Command not recognized: <span className="text-white font-bold">{trimmed}</span>. Type <span className="text-[#00ff66] font-bold">help</span> for supported options.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output }]);
    setInput('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-[95vw] sm:w-full max-w-3xl bg-[#0c0d10] border-2 border-[#3f3f46] shadow-[6px_6px_0px_#000000] font-mono text-xs sm:text-sm overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="bg-[#18191d] border-b-2 border-[#2b2c31] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#ff5f56] inline-block border border-black/40"></span>
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#ffbd2e] inline-block border border-black/40"></span>
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#27c93f] inline-block border border-black/40"></span>
            <span className="ml-1 sm:ml-2 font-bold text-neutral-200 truncate">guest@tkmfoss: ~ (sh)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-400 hidden sm:inline-block">[ESC to close]</span>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#27272a] text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 flex-1 bg-[#090a0d] text-neutral-200 text-xs sm:text-sm font-mono">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-400">
                <span className="text-[#00ff66] font-bold">guest@tkmce:~$</span>
                <span className="text-white font-bold">{item.cmd}</span>
              </div>
              <div className="pl-3 sm:pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="border-t-2 border-[#27272a] bg-[#121316] p-2.5 sm:p-3 flex items-center gap-2"
        >
          <span className="text-[#00ff66] font-bold text-xs sm:text-sm shrink-0">
            <span className="hidden xs:inline">guest@tkmce:~$</span>
            <span className="xs:hidden">$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'events', 'execom', 'freedom'..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm placeholder:text-neutral-600 min-w-0"
          />
          <button
            type="submit"
            className="p-1.5 bg-[#1f2025] border border-[#3f3f46] hover:bg-[#00ff66] hover:text-black transition-colors cursor-pointer shrink-0"
          >
            <CornerDownLeft size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};
