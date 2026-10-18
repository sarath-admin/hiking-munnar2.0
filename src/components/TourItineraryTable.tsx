'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, Info } from 'lucide-react';
import { TourItineraryItem } from '@/data/toursData';

interface TourItineraryTableProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeSecondary?: string;
  columnType?: 'time' | 'sequence';
  itinerary: TourItineraryItem[];
  note?: string;
  className?: string;
}

export default function TourItineraryTable({
  title = 'Complete schedule for your website',
  subtitle,
  badge,
  badgeSecondary,
  columnType = 'time',
  itinerary,
  note,
  className = '',
}: TourItineraryTableProps) {
  const prefersReduced = useReducedMotion();
  const isSequence = columnType === 'sequence';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.06,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' as const },
    },
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Optional Header Block matching Screenshots */}
      {(title || subtitle || badge) && (
        <div className="mb-4 sm:mb-6">
          {(badge || badgeSecondary) && (
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {badge && (
                <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                  {badge}
                </span>
              )}
              {badgeSecondary && (
                <span className="text-[11px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-3 py-1 rounded-full border border-teal-200">
                  {badgeSecondary}
                </span>
              )}
            </div>
          )}
          {title && (
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Structured 2-Column Itinerary Table matching reference screenshots */}
      <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/90 text-zinc-700">
                <th className={`py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-bold tracking-wider uppercase ${isSequence ? 'w-[100px] sm:w-[130px]' : 'w-[140px] sm:w-[200px]'}`}>
                  {isSequence ? 'Sequence' : 'Time'}
                </th>
                <th className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-bold tracking-wider uppercase">
                  Activity
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="divide-y divide-gray-100"
            >
              {itinerary.map((item, index) => (
                <motion.tr
                  key={index}
                  variants={rowVariants}
                  className="transition-colors hover:bg-emerald-50/40 group"
                >
                  {/* Time / Sequence Column */}
                  <td className="py-4 px-4 sm:px-6 align-top">
                    {isSequence ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100/80 text-emerald-950 font-bold text-xs sm:text-sm font-mono border border-emerald-300/60 shadow-xs">
                        {item.time}
                      </span>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-zinc-900 font-mono tracking-tight bg-gray-100/80 group-hover:bg-emerald-100/60 group-hover:text-emerald-950 px-2.5 py-1 rounded-md transition-colors whitespace-nowrap">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item.time}</span>
                      </div>
                    )}
                  </td>

                  {/* Activity Column */}
                  <td className="py-4 px-4 sm:px-6 align-middle text-sm sm:text-base text-zinc-700 leading-relaxed font-normal group-hover:text-zinc-900 transition-colors">
                    {item.activity}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {/* Schedule Flexibility / Route Note */}
        <div className="px-4 sm:px-6 py-3.5 bg-gray-50/80 border-t border-gray-100 flex items-start sm:items-center gap-2.5 text-xs text-zinc-600">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
          <span className="leading-relaxed">
            {note || 'Exact timings and duration are configurable and adapt flexibly to weather, road conditions, and group pace.'}
          </span>
        </div>
      </div>
    </div>
  );
}
