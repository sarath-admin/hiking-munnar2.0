'use client';

import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface JournalHeaderProps {
  totalCount: number;
}

export const JournalHeader: React.FC<JournalHeaderProps> = ({ totalCount }) => {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4 flex items-center justify-center select-none relative z-20">
      {/* Center: "Munnar Hiking Tours" and Dynamic Page Count */}
      <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-md font-sans">
          Munnar Hiking Tours
        </h2>
        <div className="flex items-center gap-1.5 mt-1.5 text-white/70 hover:text-white/90 transition-colors text-xs sm:text-sm font-medium tracking-wide">
          <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
          <span>{totalCount} Pages</span>
        </div>
      </div>
    </header>
  );
};
