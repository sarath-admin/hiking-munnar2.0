'use client';

import React from 'react';
import { TourPackageComparison } from '@/data/toursData';
import { Layers } from 'lucide-react';

interface TourPackageComparisonTableProps {
  comparison: TourPackageComparison;
  className?: string;
}

export default function TourPackageComparisonTable({
  comparison,
  className = '',
}: TourPackageComparisonTableProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4 sm:mb-6">
        <span className="text-[#FFA94D] text-xs font-bold tracking-widest uppercase mb-1.5 block">
          PACKAGE OPTIONS
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-serif flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          {comparison.title}
        </h3>
        {comparison.subtitle && (
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {comparison.subtitle}
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-zinc-950/80 text-gray-200">
                <th className="py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold tracking-wider uppercase w-[150px] sm:w-[190px]">
                  {comparison.columns[0]}
                </th>
                <th className="py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold tracking-wider uppercase text-emerald-400 bg-emerald-950/20">
                  {comparison.columns[1]}
                </th>
                <th className="py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold tracking-wider uppercase text-teal-300 bg-teal-950/20">
                  {comparison.columns[2]}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparison.rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="transition-colors hover:bg-white/[0.03]"
                >
                  <td className="py-4 px-4 sm:px-6 font-semibold text-xs sm:text-sm text-gray-200 bg-zinc-950/40 align-top">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-300 leading-relaxed align-top">
                    {row.fullDay}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-300 leading-relaxed align-top">
                    {row.halfDay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
