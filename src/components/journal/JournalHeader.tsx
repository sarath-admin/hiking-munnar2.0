'use client';

import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface JournalHeaderProps {
  totalCount: number;
  theme?: 'light' | 'dark';
}

export const JournalHeader: React.FC<JournalHeaderProps> = ({ totalCount, theme = 'light' }) => {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2 flex items-center justify-center select-none relative z-20">
      {/* Center: "Munnar Hiking Tours" and Dynamic Page Count */}
      <div className="text-center flex flex-col items-center">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-sans ${
          theme === 'light' ? 'text-[#163524]' : 'text-white drop-shadow-md'
        }`}>
          Munnar Hiking Tours
        </h2>
        <div className={`flex items-center gap-1.5 mt-1.5 transition-colors text-xs sm:text-sm font-medium tracking-wide ${
          theme === 'light' ? 'text-stone-500' : 'text-white/70 hover:text-white/90'
        }`}>
          <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
          <span>{totalCount} Pages</span>
        </div>
      </div>
    </header>
  );
};
