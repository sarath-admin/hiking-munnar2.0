'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { JournalPhoto } from '@/data/journalData';

interface JournalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: JournalPhoto[];
  onSelectPhoto: (photo: JournalPhoto) => void;
}

export const JournalSearchModal: React.FC<JournalSearchModalProps> = ({
  isOpen,
  onClose,
  photos,
  onSelectPhoto,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = photos.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      (p.location && p.location.toLowerCase().includes(q)) ||
      String(p.pageNumber) === q ||
      `page ${p.pageNumber}`.includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-zinc-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-zinc-950/60">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, location, or page number (e.g. 7, Meesapulimala)..."
            className="w-full bg-transparent text-white text-sm sm:text-base placeholder-white/40 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-white/50 text-sm">
              No matching pages found for "{query}".
            </div>
          ) : (
            filtered.map((photo) => (
              <div
                key={photo.id}
                onClick={() => {
                  onSelectPhoto(photo);
                  onClose();
                }}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/10 cursor-pointer transition-colors group border border-transparent hover:border-white/10"
              >
                <div className="w-14 h-18 sm:w-16 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-black border border-white/10">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                      Page {photo.pageNumber}
                    </span>
                    {photo.location && (
                      <span className="text-[11px] text-white/50 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3" />
                        {photo.location}
                      </span>
                    )}
                  </div>
                  <h4 className="text-white text-sm font-medium truncate group-hover:text-amber-300 transition-colors">
                    {photo.title}
                  </h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
