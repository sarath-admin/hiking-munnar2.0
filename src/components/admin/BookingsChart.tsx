'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ChartDataPoint {
  label: string;
  value: number;
  highlight?: boolean;
}

const filterDatasets: Record<string, ChartDataPoint[]> = {
  'This Month': [
    { label: 'Week 1', value: 8 },
    { label: 'Week 2', value: 14 },
    { label: 'Week 3', value: 18, highlight: true },
    { label: 'Week 4', value: 12 },
  ],
  'This Week': [
    { label: 'Mon', value: 3 },
    { label: 'Tue', value: 5 },
    { label: 'Wed', value: 8 },
    { label: 'Thu', value: 6 },
    { label: 'Fri', value: 11, highlight: true },
    { label: 'Sat', value: 15 },
    { label: 'Sun', value: 9 },
  ],
  'This Year': [
    { label: 'Q1 (Jan-Mar)', value: 14 },
    { label: 'Q2 (Apr-Jun)', value: 17 },
    { label: 'Q3 (Jul-Sep)', value: 20, highlight: true },
    { label: 'Q4 (Oct-Dec)', value: 13 },
  ],
  'Custom Date': [
    { label: 'Sep 1-7', value: 9 },
    { label: 'Sep 8-14', value: 16, highlight: true },
    { label: 'Sep 15-21', value: 14 },
    { label: 'Sep 22-28', value: 11 },
  ],
};

export default function BookingsChart() {
  const [activeFilter, setActiveFilter] = useState<'This Month' | 'This Week' | 'This Year' | 'Custom Date'>('This Month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = filterDatasets[activeFilter] || filterDatasets['This Month'];
  const maxValue = 20; // Fixed y-axis ceiling for clean scale

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-150 shadow-sm flex flex-col justify-between h-full">
      {/* Top Header & Filter Dropdown */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight">
          This Month Bookings
        </h3>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <span>{activeFilter}</span>
            <ChevronDown size={14} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-stone-200 p-1.5 z-30 animate-in fade-in duration-150">
              {(['This Week', 'This Month', 'This Year', 'Custom Date'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-orange-50 text-orange-600 font-bold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="flex items-end gap-3 sm:gap-4 h-48 sm:h-52 pt-4 relative">
        {/* Y-axis Guides */}
        <div className="flex flex-col justify-between h-full text-[11px] font-bold text-stone-300 pr-2 select-none">
          <span>20</span>
          <span>15</span>
          <span>10</span>
          <span>5</span>
          <span>0</span>
        </div>

        {/* Horizontal subtle guide lines */}
        <div className="absolute left-8 right-0 top-4 bottom-6 flex flex-col justify-between pointer-events-none opacity-40">
          <div className="border-b border-dashed border-stone-200 w-full" />
          <div className="border-b border-dashed border-stone-200 w-full" />
          <div className="border-b border-dashed border-stone-200 w-full" />
          <div className="border-b border-dashed border-stone-200 w-full" />
          <div className="border-b border-stone-200 w-full" />
        </div>

        {/* Bars Container */}
        <div className="flex-1 flex items-end justify-around h-full z-10 pb-6">
          {data.map((item, index) => {
            const heightPercent = Math.min(100, Math.max(10, (item.value / maxValue) * 100));
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex flex-col items-center flex-1 max-w-[56px] h-full justify-end group cursor-pointer relative"
              >
                {/* Floating Value Tag on Top */}
                <span className="text-xs font-bold text-stone-900 mb-2 transition-transform duration-200 group-hover:-translate-y-1">
                  {item.value}
                </span>

                {/* Animated Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  className={`w-full rounded-xl transition-all duration-300 shadow-sm ${
                    item.highlight || isHovered
                      ? 'bg-gradient-to-t from-orange-600 via-orange-500 to-amber-500 shadow-orange-500/25 scale-[1.03]'
                      : 'bg-gradient-to-t from-orange-500 to-orange-400 opacity-90 group-hover:opacity-100'
                  }`}
                />

                {/* X-axis Label below */}
                <span className="absolute -bottom-6 text-[11px] sm:text-xs font-bold text-stone-500 whitespace-nowrap">
                  {item.label}
                </span>

                {/* Tooltip on Hover */}
                {isHovered && (
                  <div className="absolute -top-12 bg-stone-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap z-30 pointer-events-none animate-in fade-in zoom-in-95">
                    {item.value} Bookings
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
