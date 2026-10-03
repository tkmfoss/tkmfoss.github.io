import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Execom } from './pages/Execom';
import { Manifesto } from './pages/Manifesto';
import { Projects } from './pages/Projects';
import { Community } from './pages/Community';
import { Terminal } from 'lucide-react';
import { subscribeLiveAnnouncements } from './services/dataService';
import type { Announcement } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // Subscribe to live announcements from admin Firestore
  useEffect(() => {
    const unsub = subscribeLiveAnnouncements((items) => {
      setAnnouncements(items);
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0d] text-[#e4e4e7] selection:bg-[#00ff66] selection:text-black overflow-x-hidden">
      {/* Background Subtle Grid Texture */}
      <div className="fixed inset-0 pointer-events-none bg-circuit-lines opacity-25 z-0"></div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <AnnouncementBanner announcements={announcements} />
        <Navbar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        <main className="flex-1 pb-16">
          {currentTab === 'home' && (
            <Home
              onSelectTab={setCurrentTab}
              onOpenTerminal={() => setTerminalOpen(true)}
            />
          )}

          {currentTab === 'manifesto' && <Manifesto />}

          {currentTab === 'events' && <Events />}

          {currentTab === 'projects' && <Projects />}

          {currentTab === 'execom' && <Execom />}

          {currentTab === 'community' && <Community />}
        </main>

        <Footer
          onSelectTab={setCurrentTab}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* Global Terminal CLI Modal */}
        <TerminalModal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onNavigate={(tab) => {
            setCurrentTab(tab);
            setTerminalOpen(false);
          }}
        />

        {/* Persistent Floating CLI Button for quick access */}
        <button
          onClick={() => setTerminalOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 brutal-btn p-2 sm:py-2.5 sm:px-4 bg-[#121316] border-2 border-[#3f3f46] text-[#00ff66] shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] hover:border-[#00ff66] flex items-center gap-2 font-mono text-xs cursor-pointer"
          title="Open Terminal (Ctrl+K)"
        >
          <Terminal size={14} />
          <span className="hidden sm:inline font-bold">$ CLI PROMPT</span>
        </button>
      </div>
    </div>
  );
}

export default App;
