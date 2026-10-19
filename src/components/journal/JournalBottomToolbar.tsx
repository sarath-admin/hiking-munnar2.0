'use client';

import React, { useState, useRef } from 'react';
import {
  MoreHorizontal,
  Upload,
  LayoutGrid,
  Plus,
  Play,
  Pause,
  Download,
  RotateCcw,
  Sparkles,
  Layers,
} from 'lucide-react';
import { JournalPhoto } from '@/data/journalData';

interface JournalBottomToolbarProps {
  currentPhoto: JournalPhoto;
  viewMode: 'carousel' | 'grid';
  onToggleViewMode: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onResetToFirst: () => void;
  onAddPhotos: (newPhotos: JournalPhoto[]) => void;
  onShowToast: (message: string) => void;
}

export const JournalBottomToolbar: React.FC<JournalBottomToolbarProps> = ({
  currentPhoto,
  viewMode,
  onToggleViewMode,
  isPlaying,
  onTogglePlay,
  onResetToFirst,
  onAddPhotos,
  onShowToast,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. More options handler
  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // 2. Share handler with native Web Share API and clipboard fallback
  const handleShare = async () => {
    const shareData = {
      title: 'Munnar Hiking Tours • 3D Travel Photo Journal',
      text: `Check out page ${currentPhoto.pageNumber} of the Munnar Travel Photo Journal: ${currentPhoto.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        onShowToast('Shared successfully!');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        onShowToast('Journal link copied to clipboard!');
      })
      .catch(() => {
        onShowToast('Link: ' + window.location.href);
      });
  };

  // 4. File input upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: JournalPhoto[] = [];
    Array.from(files).forEach((file, index) => {
      const url = URL.createObjectURL(file);
      newPhotos.push({
        id: Date.now() + index,
        pageNumber: 0, // will be reassigned in parent
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        location: 'User Contribution',
        src: url,
        width: 1600,
        height: 2000,
      });
    });

    onAddPhotos(newPhotos);
    onShowToast(`Added ${newPhotos.length} new photo page${newPhotos.length > 1 ? 's' : ''}!`);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Download current page
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentPhoto.src;
    link.download = `munnar-journal-page-${currentPhoto.pageNumber}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMenuOpen(false);
    onShowToast(`Downloading Page ${currentPhoto.pageNumber}...`);
  };

  return (
    <div className="relative z-30 flex items-center justify-center gap-4 sm:gap-6 mt-4 pb-10 select-none">
      {/* Hidden File Picker Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Button 1: More Options (...) */}
      <div className="relative">
        <button
          type="button"
          onClick={handleToggleMenu}
          title="More Options"
          aria-label="More Options"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
        </button>

        {/* More Options Popover Menu */}
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-56 bg-zinc-900/95 border border-white/20 backdrop-blur-xl rounded-2xl shadow-2xl py-2 px-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => {
                  onTogglePlay();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-left"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 text-amber-400" />
                    <span>Pause Auto-play</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-emerald-400" />
                    <span>Resume Auto-play</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  onResetToFirst();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-left"
              >
                <RotateCcw className="w-4 h-4 text-sky-400" />
                <span>Restart to Page 1</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-left"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Save This Photo</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Button 2: Share (Tray with Up Arrow) */}
      <button
        type="button"
        onClick={handleShare}
        title="Share Journal"
        aria-label="Share Journal"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <Upload className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
      </button>

      {/* Button 3: Toggle Grid/Gallery View */}
      <button
        type="button"
        onClick={onToggleViewMode}
        title={viewMode === 'carousel' ? 'Switch to Grid Gallery' : 'Switch to 3D Carousel'}
        aria-label={viewMode === 'carousel' ? 'Switch to Grid Gallery' : 'Switch to 3D Carousel'}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-all duration-200 ${
          viewMode === 'grid'
            ? 'bg-amber-400 text-zinc-950 font-bold ring-4 ring-amber-400/30'
            : 'bg-white text-zinc-900 hover:bg-zinc-100'
        }`}
      >
        {viewMode === 'carousel' ? (
          <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
        ) : (
          <Layers className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
        )}
      </button>

      {/* Button 4: Add Photos (+) */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        title="Upload & Add Photos to Journal"
        aria-label="Upload & Add Photos to Journal"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <Plus className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.4]" />
      </button>
    </div>
  );
};
