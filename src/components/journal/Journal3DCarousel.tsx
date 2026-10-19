'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { JournalPhoto } from '@/data/journalData';

interface Journal3DCarouselProps {
  photos: JournalPhoto[];
  currentIndex: number;
  onChangeIndex: (newIndex: number) => void;
  onOpenLightbox: (photo: JournalPhoto) => void;
  isPlaying: boolean;
  onTogglePlay?: () => void;
}

export const Journal3DCarousel: React.FC<Journal3DCarouselProps> = ({
  photos,
  currentIndex,
  onChangeIndex,
  onOpenLightbox,
  isPlaying,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef<number>(0);
  const total = photos.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    onChangeIndex((currentIndex + 1) % total);
  }, [currentIndex, total, onChangeIndex]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    onChangeIndex((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onChangeIndex]);

  // Auto rotation every 3.5 seconds when not hovered and playing
  useEffect(() => {
    if (!isPlaying || isHovered || total <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, total, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if active element is not an input/textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Non-hijacking horizontal wheel navigation
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 350) return;

    // Trigger on explicit horizontal scroll (deltaX) or Shift + scroll
    if (Math.abs(e.deltaX) > 25 || (e.shiftKey && Math.abs(e.deltaY) > 25)) {
      if (e.deltaX > 25 || e.deltaY > 25) {
        nextSlide();
      } else {
        prevSlide();
      }
      lastWheelTime.current = now;
    }
  };

  if (total === 0) {
    return (
      <div className="w-full py-28 text-center text-gray-400">
        No journal photos found. Click "+" below to add some!
      </div>
    );
  }

  // Calculate visible range of cards (-4 to +4) around current index
  const VISIBLE_RADIUS = 4;
  const visibleCards: { photo: JournalPhoto; offset: number }[] = [];

  for (let offset = -VISIBLE_RADIUS; offset <= VISIBLE_RADIUS; offset++) {
    const wrappedIndex = (currentIndex + offset + total * 10) % total;
    visibleCards.push({
      photo: photos[wrappedIndex],
      offset,
    });
  }

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-7xl mx-auto py-6 sm:py-10 md:py-14 px-2 sm:px-4 flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ perspective: '1400px' }}
      aria-label="3D Travel Photo Journal Carousel"
    >
      {/* Background Soft Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main 3D Card Stage */}
      <div
        className="relative w-full h-[420px] sm:h-[480px] md:h-[530px] flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {visibleCards.map(({ photo, offset }) => {
          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);

          // 3D positioning calculations
          // Horizontal step: responsive distance
          const xOffset = offset * (absOffset === 1 ? 130 : 95);
          const zOffset = -absOffset * 85;
          const scale = isCenter ? 1.0 : Math.max(0.68, 1 - absOffset * 0.08);
          // Left cards tilt rightwards (+deg), Right cards tilt leftwards (-deg)
          const rotateY = offset === 0 ? 0 : offset < 0 ? 16 + absOffset * 2 : -(16 + absOffset * 2);
          const zIndex = 40 - absOffset;
          const opacity = isCenter ? 1 : Math.max(0.3, 1 - absOffset * 0.16);

          return (
            <motion.div
              key={`${photo.id}-${offset}`}
              layout
              initial={false}
              animate={{
                x: xOffset,
                z: zOffset,
                scale,
                rotateY,
                opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
                mass: 0.8,
              }}
              drag={isCenter ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -45) nextSlide();
                else if (info.offset.x > 45) prevSlide();
              }}
              onClick={() => {
                if (isCenter) {
                  onOpenLightbox(photo);
                } else {
                  onChangeIndex((currentIndex + offset + total) % total);
                }
              }}
              className={`absolute top-0 bottom-0 m-auto cursor-pointer flex flex-col justify-center items-center ${
                isCenter ? 'cursor-zoom-in' : 'cursor-pointer hover:brightness-110'
              }`}
              style={{
                zIndex,
                width: 'clamp(260px, 34vw, 420px)',
                height: 'clamp(370px, 48vw, 510px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Photo Card Container */}
              <div
                className={`relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ${
                  isCenter
                    ? 'border border-white/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.08)] ring-1 ring-white/20'
                    : 'border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)]'
                }`}
              >
                {/* Image */}
                <img
                  src={photo.src}
                  alt={photo.title || `Journal Page ${photo.pageNumber}`}
                  loading={absOffset <= 2 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                  draggable={false}
                />

                {/* Subtle Sheen / Gradient Highlight on Card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 pointer-events-none" />

                {/* Center Card Tap-to-view Indicator Overlay */}
                {isCenter && (
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between text-white pointer-events-none">
                    <div className="truncate pr-2">
                      <p className="text-xs sm:text-sm font-semibold truncate drop-shadow">
                        {photo.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-white/70">
                        Page {photo.pageNumber} of {total}
                      </p>
                    </div>
                    <span className="shrink-0 flex items-center gap-1 text-[10px] sm:text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white font-medium">
                      <Eye className="w-3 h-3" />
                      View
                    </span>
                  </div>
                )}
              </div>

              {/* Realistic Floor Reflection / Soft Shadow underneath */}
              {isCenter && (
                <div
                  className="absolute -bottom-8 w-4/5 h-6 bg-black/70 rounded-full blur-xl pointer-events-none"
                  style={{ transform: 'rotateX(80deg)' }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Subtle Desktop Hover Arrow Controls */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Page"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 backdrop-blur-md items-center justify-center text-white transition-all duration-200 active:scale-95 shadow-lg opacity-70 hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6 stroke-[2]" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Page"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 backdrop-blur-md items-center justify-center text-white transition-all duration-200 active:scale-95 shadow-lg opacity-70 hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6 stroke-[2]" />
      </button>

      {/* Subdued page indicator indicator bar */}
      <div className="mt-4 flex items-center gap-1.5 z-20">
        <span className="text-white/60 text-xs font-mono tracking-wider">
          {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};
