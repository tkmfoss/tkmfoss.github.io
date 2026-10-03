import React, { useState } from 'react';
import { Bell, ArrowUpRight, X, AlertTriangle, Sparkles } from 'lucide-react';
import type { Announcement } from '../types';

interface AnnouncementBannerProps {
  announcements: Announcement[];
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ announcements }) => {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeItems = announcements.filter(
    (a) => a.isActive && !dismissedIds.includes(a.id)
  );

  if (activeItems.length === 0) return null;

  const current = activeItems[currentIndex % activeItems.length];

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => [...prev, id]);
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-[#ff3b30]/10 border-[#ff3b30] text-[#ff3b30]';
      case 'PINNED':
        return 'bg-[#f59e0b]/10 border-[#f59e0b] text-[#f59e0b]';
      case 'ALERT':
        return 'bg-[#ff9500]/10 border-[#ff9500] text-[#ff9500]';
      default:
        return 'bg-[#00ff66]/10 border-[#00ff66] text-[#00ff66]';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return <AlertTriangle size={13} className="text-[#ff3b30] animate-bounce shrink-0" />;
      case 'PINNED':
        return <Sparkles size={13} className="text-[#f59e0b] shrink-0" />;
      default:
        return <Bell size={13} className="text-[#00ff66] shrink-0" />;
    }
  };

  return (
    <div className="w-full bg-[#0d0e12] border-b-2 border-[#2b2c31] px-3 sm:px-6 py-2.5 font-mono text-xs z-40 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 shrink-0">
            {getPriorityIcon(current.priority)}
            <span
              className={`px-1.5 py-0.5 border text-[9px] font-bold uppercase tracking-wider ${getPriorityStyle(
                current.priority
              )}`}
            >
              {current.priority} // {current.category}
            </span>
          </div>

          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-white truncate">{current.title}</span>
            <span className="hidden md:inline text-neutral-400 text-[11px] truncate">
              — {current.content}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          {activeItems.length > 1 && (
            <div className="text-[10px] text-neutral-500">
              {currentIndex + 1}/{activeItems.length}
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % activeItems.length)}
                className="ml-1 text-neutral-400 hover:text-white underline cursor-pointer"
              >
                next
              </button>
            </div>
          )}

          {current.actionUrl && (
            <a
              href={current.actionUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 bg-[#00ff66] text-black font-bold hover:bg-[#33ff85] transition-all flex items-center gap-1 text-[11px] shadow-[2px_2px_0px_#000]"
            >
              <span>{current.actionLabel || 'VIEW'}</span>
              <ArrowUpRight size={12} />
            </a>
          )}

          <button
            onClick={() => handleDismiss(current.id)}
            className="p-1 text-neutral-400 hover:text-white cursor-pointer transition-colors"
            title="Dismiss notice"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
