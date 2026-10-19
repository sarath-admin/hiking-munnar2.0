'use client';

import React, { useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Keyboard, BookOpen, Layers, Info } from 'lucide-react';

interface JournalMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onJumpToPage: (pageIndex: number) => void;
  totalCount: number;
}

export const JournalMenuModal: React.FC<JournalMenuModalProps> = ({
  isOpen,
  onClose,
  isPlaying,
  onTogglePlay,
  onJumpToPage,
  totalCount,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-zinc-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-lg text-white">Journal Menu</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Jumps */}
        <div className="space-y-4 mb-6">
          <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
            Quick Navigation
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                onJumpToPage(0);
                onClose();
              }}
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-medium text-center transition-colors"
            >
              Start (Pg 1)
            </button>
            <button
              type="button"
              onClick={() => {
                onJumpToPage(Math.floor(totalCount / 2));
                onClose();
              }}
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-medium text-center transition-colors"
            >
              Middle (Pg {Math.floor(totalCount / 2) + 1})
            </button>
            <button
              type="button"
              onClick={() => {
                onJumpToPage(totalCount - 1);
                onClose();
              }}
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-medium text-center transition-colors"
            >
              End (Pg {totalCount})
            </button>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
            Carousel Controls
          </h4>
          <button
            type="button"
            onClick={onTogglePlay}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm"
          >
            <span className="flex items-center gap-2.5">
              {isPlaying ? (
                <Pause className="w-4 h-4 text-amber-400" />
              ) : (
                <Play className="w-4 h-4 text-emerald-400" />
              )}
              <span>Auto-Rotation (3.5s)</span>
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-mono ${
                isPlaying
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-zinc-700 text-zinc-300'
              }`}
            >
              {isPlaying ? 'ACTIVE' : 'PAUSED'}
            </span>
          </button>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="space-y-3 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs">
          <div className="flex items-center gap-2 text-white/70 font-semibold mb-2">
            <Keyboard className="w-4 h-4 text-amber-400" />
            <span>Keyboard Shortcuts</span>
          </div>
          <div className="space-y-1.5 text-white/60">
            <div className="flex justify-between">
              <span>Next Page</span>
              <kbd className="bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono text-white">
                →
              </kbd>
            </div>
            <div className="flex justify-between">
              <span>Previous Page</span>
              <kbd className="bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono text-white">
                ←
              </kbd>
            </div>
            <div className="flex justify-between">
              <span>Close Lightbox / Modal</span>
              <kbd className="bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono text-white">
                Esc
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
