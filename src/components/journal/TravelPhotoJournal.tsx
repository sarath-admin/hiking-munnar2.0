'use client';

import React, { useState } from 'react';
import { INITIAL_JOURNAL_PAGES, JournalPhoto } from '@/data/journalData';
import { JournalHeader } from './JournalHeader';
import { Journal3DCarousel } from './Journal3DCarousel';
import { JournalLightbox } from './JournalLightbox';

interface TravelPhotoJournalProps {
  className?: string;
  isTopPosition?: boolean;
  theme?: 'light' | 'dark';
}

export default function TravelPhotoJournal({
  className = '',
  isTopPosition = false,
  theme = 'light',
}: TravelPhotoJournalProps) {
  const [photos] = useState<JournalPhoto[]>(INITIAL_JOURNAL_PAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState<JournalPhoto | null>(null);

  return (
    <section
      id="photo-journal"
      className={`relative w-full overflow-hidden ${
        theme === 'light'
          ? 'bg-white text-stone-900 border-b border-[#eae4d7]'
          : 'bg-[radial-gradient(ellipse_at_top,_#122244_0%,_#0a1428_45%,_#040714_100%)] text-white border-b border-white/10'
      } ${
        isTopPosition ? 'pt-24 sm:pt-28 md:pt-32' : 'pt-8'
      } pb-12 sm:pb-16 ${className}`}
      aria-label="Munnar Hiking Tours 3D Travel Photo Album"
    >
      {/* Atmospheric Ambient Glow (Dark mode only) */}
      {theme === 'dark' && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-sky-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-900/15 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      {/* Centered Header: "Munnar Hiking Tours" and Dynamic Page Count */}
      <JournalHeader totalCount={photos.length} theme={theme} />

      {/* 3D Photobook Carousel */}
      <Journal3DCarousel
        photos={photos}
        currentIndex={currentIndex}
        onChangeIndex={(newIdx) => setCurrentIndex(newIdx)}
        onOpenLightbox={(photo) => setLightboxPhoto(photo)}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((p) => !p)}
        theme={theme}
      />

      {/* Fullscreen Lightbox Photo Viewer (Opens when clicking center photo) */}
      <JournalLightbox
        photo={lightboxPhoto}
        photos={photos}
        onClose={() => setLightboxPhoto(null)}
        onSelectPhoto={(p) => {
          setLightboxPhoto(p);
          const idx = photos.findIndex((item) => item.id === p.id);
          if (idx !== -1) setCurrentIndex(idx);
        }}
      />
    </section>
  );
}
