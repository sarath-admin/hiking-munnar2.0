'use client';

import React, { useState } from 'react';
import { INITIAL_JOURNAL_PAGES, JournalPhoto } from '@/data/journalData';
import { JournalHeader } from './JournalHeader';
import { Journal3DCarousel } from './Journal3DCarousel';
import { JournalLightbox } from './JournalLightbox';

export default function TravelPhotoJournal() {
  const [photos] = useState<JournalPhoto[]>(INITIAL_JOURNAL_PAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState<JournalPhoto | null>(null);

  return (
    <section
      id="photo-journal"
      className="relative w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,_#122244_0%,_#0a1428_45%,_#040714_100%)] text-white pt-8 pb-14 sm:pb-20 border-t border-b border-white/10"
      aria-label="Munnar Hiking Tours 3D Travel Photo Album"
    >
      {/* Subtle Atmospheric Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-sky-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-900/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Centered Header: "Munnar Hiking Tours" and Dynamic Page Count */}
      <JournalHeader totalCount={photos.length} />

      {/* 3D Photobook Carousel */}
      <Journal3DCarousel
        photos={photos}
        currentIndex={currentIndex}
        onChangeIndex={(newIdx) => setCurrentIndex(newIdx)}
        onOpenLightbox={(photo) => setLightboxPhoto(photo)}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((p) => !p)}
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
