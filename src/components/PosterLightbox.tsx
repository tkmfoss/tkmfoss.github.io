import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, ExternalLink, Maximize2 } from 'lucide-react';

interface PosterLightboxProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  date?: string;
  category?: string;
  onClose: () => void;
}

export const PosterLightbox: React.FC<PosterLightboxProps> = ({
  imageUrl,
  title,
  subtitle,
  date,
  category,
  onClose,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Lightbox Top Header Toolbar */}
      <div
        className="w-full h-14 bg-[#0a0b0e]/90 border-b border-[#27272a] px-4 sm:px-6 flex items-center justify-between z-10 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 overflow-hidden pr-2">
          {category && (
            <span className="px-2 py-0.5 bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] font-mono text-[11px] font-bold shrink-0">
              [{category}]
            </span>
          )}
          <span className="text-white font-mono text-xs sm:text-sm font-bold truncate">
            {title}
          </span>
          {subtitle && (
            <span className="hidden md:inline font-mono text-xs text-neutral-400 shrink-0 truncate max-w-xs">
              - {subtitle}
            </span>
          )}
          {date && (
            <span className="hidden sm:inline font-mono text-xs text-neutral-400 shrink-0">
              // {date}
            </span>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsZoomed((prev) => !prev)}
            className="p-2 text-neutral-300 hover:text-[#00ff66] hover:bg-[#18191e] transition-colors rounded-none border border-[#27272a] flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            title={isZoomed ? 'Fit to Screen' : 'View Actual Size (100%)'}
          >
            {isZoomed ? <ZoomOut size={15} /> : <ZoomIn size={15} />}
            <span className="hidden md:inline">{isZoomed ? 'FIT' : '100%'}</span>
          </button>

          <a
            href={imageUrl}
            target="_blank"
            rel="noreferrer"
            download
            className="p-2 text-neutral-300 hover:text-[#00f0ff] hover:bg-[#18191e] transition-colors rounded-none border border-[#27272a] flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            title="Open Full Resolution Original"
          >
            <ExternalLink size={15} />
            <span className="hidden md:inline">ORIGINAL</span>
          </a>

          <button
            onClick={onClose}
            className="p-2 text-neutral-300 hover:text-white hover:bg-red-950/80 transition-colors border border-[#27272a] flex items-center gap-1 text-xs font-mono cursor-pointer"
            title="Close (Esc)"
          >
            <X size={16} />
            <span className="hidden md:inline">CLOSE</span>
          </button>
        </div>
      </div>

      {/* Main Poster Viewing Canvas */}
      <div
        className={`flex-1 w-full overflow-auto flex items-center justify-center p-3 sm:p-6 select-none ${
          isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={() => setIsZoomed((prev) => !prev)}
      >
        <div
          className="relative transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed((prev) => !prev);
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            className={`shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-[#2e2f38] transition-all duration-200 ${
              isZoomed
                ? 'max-w-none w-auto h-auto'
                : 'max-h-[82vh] max-w-[90vw] w-auto h-auto object-contain mx-auto'
            }`}
          />
        </div>
      </div>

      {/* Bottom Status Hint */}
      <div
        className="w-full py-2 px-4 bg-[#0a0b0e]/80 border-t border-[#1f2025] flex items-center justify-between text-[11px] font-mono text-neutral-400 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 truncate">
          <Maximize2 size={12} className="text-[#00ff66] shrink-0" />
          <span className="truncate">FULL RESOLUTION POSTER // FOSS CELL ARCHIVE</span>
        </div>
        <div className="text-neutral-400 shrink-0">
          Click image to toggle {isZoomed ? 'fit view' : '100% zoom'} &bull; Press ESC to close
        </div>
      </div>
    </div>
  );
};
