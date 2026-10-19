'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, MapPin, Maximize2 } from 'lucide-react';
import { JournalPhoto } from '@/data/journalData';

interface JournalLightboxProps {
  photo: JournalPhoto | null;
  photos: JournalPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: JournalPhoto) => void;
}

export const JournalLightbox: React.FC<JournalLightboxProps> = ({
  photo,
  photos,
  onClose,
  onSelectPhoto,
}) => {
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;
  const total = photos.length;

  const handleNext = useCallback(() => {
    if (currentIndex === -1 || total === 0) return;
    const nextIndex = (currentIndex + 1) % total;
    onSelectPhoto(photos[nextIndex]);
  }, [currentIndex, total, photos, onSelectPhoto]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1 || total === 0) return;
    const prevIndex = (currentIndex - 1 + total) % total;
    onSelectPhoto(photos[prevIndex]);
  }, [currentIndex, total, photos, onSelectPhoto]);

  useEffect(() => {
    if (!photo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose, handleNext, handlePrev]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between select-none overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="w-full px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 z-20 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-mono text-xs sm:text-sm font-semibold tracking-wider bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
              Page {photo.pageNumber} / {total}
            </span>
            {photo.location && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-white/60">
                <MapPin className="w-3.5 h-3.5 text-white/50" />
                {photo.location}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={photo.src}
              download={`munnar-journal-page-${photo.pageNumber}.jpg`}
              title="Download High-Res Photo"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onClose}
              title="Close (Esc)"
              aria-label="Close"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all active:scale-95"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Center Photo Display Area */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center px-4 sm:px-12 py-3 overflow-hidden">
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Page"
            className="absolute left-2 sm:left-6 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-200 active:scale-90 shadow-2xl backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Main Photo preserving original aspect ratio with object-fit: contain */}
          <div className="relative max-w-full max-h-full w-auto h-auto flex items-center justify-center">
            <motion.img
              key={photo.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              src={photo.src}
              alt={photo.title}
              className="max-h-[78vh] sm:max-h-[82vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 select-none"
              draggable={false}
            />
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Page"
            className="absolute right-2 sm:right-6 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-200 active:scale-90 shadow-2xl backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* Bottom Caption and Thumbnail Navigation Bar */}
        <div className="w-full px-4 sm:px-8 py-3.5 bg-black/50 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
          <div className="text-center sm:text-left truncate max-w-lg">
            <h3 className="text-white font-medium text-sm sm:text-base truncate">
              {photo.title}
            </h3>
            <p className="text-white/60 text-xs hidden sm:block">
              Preserved in original aspect ratio from the official Munnar Hiking Tours expedition journal.
            </p>
          </div>

          {/* Thumbnails strip for fast jumping */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full sm:max-w-md py-1 px-1 hide-scrollbar">
            {photos.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPhoto(p)}
                className={`relative shrink-0 w-8 h-10 sm:w-10 sm:h-12 rounded-md overflow-hidden border transition-all ${
                  p.id === photo.id
                    ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={p.src}
                  alt={`Thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
