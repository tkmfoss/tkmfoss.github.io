import { useState, useEffect } from 'react';
import { Terminal, ArrowUpRight, Shield, Code2, Users, Calendar, Layers } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when pressing Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll (and layout shift) when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [mobileMenuOpen]);

  const toggleMenu = () => setMobileMenuOpen((open) => !open);

  const handleNavigate = (tab: string) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

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
      <header className="fixed lg:sticky top-0 left-0 right-0 z-40 w-full bg-[#0c0d0f]/95 backdrop-blur-md border-b-2 border-[#27272a]">
        {/* Top Ticker Status Bar */}
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
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavigate('home')}
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
              onClick={() => handleNavigate('community')}
              className="brutal-btn-primary text-[11px] sm:text-xs py-1.5 px-2.5 sm:py-2 sm:px-3 font-mono font-bold flex items-center gap-1"
            >
              <span>JOIN</span>
              <span className="hidden xs:inline">US</span>
              <ArrowUpRight size={13} />
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative h-10 w-10 flex items-center justify-center bg-[#18191d] border border-[#3f3f46] text-white hover:border-[#00ff66] transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              <span className="relative block w-5 h-4" aria-hidden="true">
                <span
                  className="absolute left-0 w-full h-0.5 bg-current rounded motion-reduce:transition-none"
                  style={{
                    top: mobileMenuOpen ? '7px' : '0px',
                    transform: mobileMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'top 300ms ease-in-out, transform 300ms ease-in-out',
                  }}
                />
                <span
                  className="absolute left-0 top-[7px] w-full h-0.5 bg-current rounded motion-reduce:transition-none"
                  style={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    transition: 'opacity 300ms ease-in-out',
                  }}
                />
                <span
                  className="absolute left-0 w-full h-0.5 bg-current rounded motion-reduce:transition-none"
                  style={{
                    top: mobileMenuOpen ? '7px' : '14px',
                    transform: mobileMenuOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
                    transition: 'top 300ms ease-in-out, transform 300ms ease-in-out',
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          id="mobile-nav-menu"
          inert={!mobileMenuOpen}
          aria-hidden={!mobileMenuOpen}
          className={`lg:hidden absolute left-0 right-0 top-full z-50 origin-top border-b-2 border-[#27272a] bg-[#0e0f12]/98 backdrop-blur-md shadow-2xl motion-reduce:transition-none motion-reduce:transform-none ${
            mobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          } transform-gpu transition-all duration-250 ease-in-out`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-5 space-y-2.5 font-mono text-sm">
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
                  onClick={() => handleNavigate(item.id)}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  className={`w-full text-left p-3 sm:p-3.5 flex items-center justify-between border cursor-pointer transition-all min-h-[44px] ${
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

            <div className="pt-3 border-t border-[#27272a]">
              <button
                onClick={() => handleNavigate('community')}
                tabIndex={mobileMenuOpen ? 0 : -1}
                className="brutal-btn-primary w-full text-xs py-2.5 flex items-center justify-center gap-1.5"
              >
                <span>JOIN CHANNELS</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Background overlay / blur for mobile menu */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-[35] backdrop-blur-sm bg-black/50 motion-reduce:transition-none transition-all duration-250 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );
};