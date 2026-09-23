import { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight, Shield, Code2, Users, Calendar, Layers } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenTerminal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Esc key or when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: '01 // HOME', icon: Terminal },
    { id: 'manifesto', label: '02 // MANIFESTO', icon: Shield },
    { id: 'events', label: '03 // EVENTS', icon: Calendar },
    { id: 'projects', label: '04 // PROJECTS', icon: Code2 },
    { id: 'execom', label: '05 // EXECOM', icon: Users, badge: 'SOON' },
    { id: 'community', label: '06 // COMMUNITY', icon: Layers },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0c0d0f]/95 backdrop-blur-md border-b-2 border-[#27272a]">
        {/* Top Ticker Status Bar - Hidden on very small screens, responsive text */}
        <div className="w-full bg-[#121316] border-b border-[#222326] px-3 sm:px-4 py-1 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider text-neutral-400">
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <span className="flex items-center gap-1.5 text-[#00ff66] shrink-0 font-bold">
              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00ff66] animate-pulse"></span>
              SYS: OK
            </span>
            <span className="text-neutral-600">|</span>
            <span className="truncate">TKMCE // KOLLAM</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <span className="hidden md:inline-block text-neutral-400">GNU/LINUX &bull; FREEDOM 0-3</span>
            <button
              onClick={onOpenTerminal}
              className="hover:text-[#00ff66] flex items-center gap-1 transition-colors cursor-pointer text-[10px] sm:text-[11px]"
              title="Open Terminal (Ctrl+K)"
            >
              <Terminal size={11} className="text-[#00ff66]" />
              <span className="hidden sm:inline">TERMINAL</span>
              <span className="text-[#00ff66] font-bold">[CLI]</span>
            </button>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <button 
            onClick={() => {
              onSelectTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 sm:gap-3 text-left cursor-pointer group min-w-0 shrink"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#17181c] border-2 border-[#3f3f46] flex items-center justify-center shrink-0 transition-all group-hover:border-[#00ff66] group-hover:shadow-[2px_2px_0px_#00ff66]">
              <img 
                src="/images/fosscell-logo.png" 
                alt="FOSS Cell Logo" 
                className="w-5 h-5 sm:w-7 sm:h-7 object-contain" 
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="font-mono font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                <span className="truncate">FOSS CELL</span>
                <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.2 bg-[#18181b] border border-[#3f3f46] text-[#00ff66] shrink-0">TKMCE</span>
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] text-neutral-400 tracking-wider hidden xs:block truncate">
                FREE SOFTWARE COMMUNITY
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-2 border transition-all cursor-pointer relative flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#00ff66] text-black font-bold border-[#00ff66] shadow-[2px_2px_0px_#ffffff]'
                      : 'bg-[#15161a] text-neutral-300 border-[#2b2c31] hover:border-neutral-400 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1 font-bold ${
                      isActive ? 'bg-black text-[#00ff66]' : 'bg-[#27272a] text-[#f59e0b] border border-[#f59e0b]/40'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenTerminal}
              className="hidden md:flex brutal-btn text-xs py-1.5 px-3 bg-[#18191d] border-[#3f3f46] text-[#00ff66]"
            >
              <Terminal size={14} />
              <span>$ CLI</span>
            </button>

            <button
              onClick={() => {
                onSelectTab('community');
                setMobileMenuOpen(false);
              }}
              className="brutal-btn-primary text-[11px] sm:text-xs py-1.5 px-2.5 sm:py-2 sm:px-3 font-mono font-bold flex items-center gap-1"
            >
              <span>JOIN</span>
              <span className="hidden xs:inline">US</span>
              <ArrowUpRight size={13} />
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 bg-[#18191d] border border-[#3f3f46] text-white hover:border-[#00ff66] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Backdrop & Drawer */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-x-0 top-[85px] bottom-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div 
              className="bg-[#0e0f12] border-b-2 border-[#27272a] p-4 space-y-2.5 font-mono text-sm max-h-[calc(100vh-90px)] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-[11px] text-neutral-500 pb-1 border-b border-[#1f2024] flex items-center justify-between">
                <span>// NAVIGATION DIRECTORY</span>
                <span>[TAP TO NAVIGATE]</span>
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left p-3 flex items-center justify-between border cursor-pointer transition-all ${
                      isActive
                        ? 'bg-[#00ff66] text-black font-bold border-[#00ff66] shadow-[2px_2px_0px_#ffffff]'
                        : 'bg-[#15161a] text-neutral-200 border-[#27272a] hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} />
                      <span className="text-xs sm:text-sm">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 font-bold ${
                        isActive ? 'bg-black text-[#00ff66]' : 'bg-black text-[#f59e0b] border border-[#f59e0b]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-[#27272a] grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenTerminal();
                    setMobileMenuOpen(false);
                  }}
                  className="brutal-btn text-xs py-2.5 bg-[#18191d] border-[#3f3f46] text-[#00ff66] flex items-center justify-center gap-1.5"
                >
                  <Terminal size={14} />
                  <span>$ CLI</span>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('community');
                    setMobileMenuOpen(false);
                  }}
                  className="brutal-btn-primary text-xs py-2.5 flex items-center justify-center gap-1.5"
                >
                  <span>JOIN CHANNELS</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
