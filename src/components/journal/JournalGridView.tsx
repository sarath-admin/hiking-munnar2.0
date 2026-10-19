'use client';

import React from 'react';
import { Eye, Layers } from 'lucide-react';
import { JournalPhoto } from '@/data/journalData';

interface JournalGridViewProps {
  photos: JournalPhoto[];
  onSelectPhoto: (photo: JournalPhoto) => void;
  onReturnToCarousel: () => void;
}

export const JournalGridView: React.FC<JournalGridViewProps> = ({
  photos,
  onSelectPhoto,
  onReturnToCarousel,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-300">
      {/* Return to 3D Carousel pill */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-white/70 text-sm">
          Showing all <span className="text-white font-semibold">{photos.length} pages</span> in gallery grid.
        </p>
        <button
          type="button"
          onClick={onReturnToCarousel}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium backdrop-blur-md transition-all active:scale-95 shadow-md"
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Switch to 3D Photobook</span>
        </button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => onSelectPhoto(photo)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/15 bg-white/5 hover:border-amber-400/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[3/4] w-full overflow-hidden bg-black/40">
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Overlay Gradient & Details */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
              <div className="flex justify-start">
                <span className="text-[10px] sm:text-xs font-mono font-bold bg-black/60 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded-full border border-white/10">
                  #{String(photo.pageNumber).padStart(2, '0')}
                </span>
              </div>

              <div className="text-left">
                <h4 className="text-white text-xs sm:text-sm font-medium line-clamp-1 drop-shadow-md">
                  {photo.title}
                </h4>
                {photo.location && (
                  <p className="text-white/60 text-[10px] sm:text-xs truncate">
                    {photo.location}
                  </p>
                )}
              </div>
            </div>

            {/* Quick View Hover Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
              <span className="w-9 h-9 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg">
                <Eye className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
