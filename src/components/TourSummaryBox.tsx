'use client';

import React from 'react';
import { Clock, Route as RouteIcon, Mountain, Users, MapPin, Compass } from 'lucide-react';
import { TourSummaryInfo } from '@/data/toursData';

interface TourSummaryBoxProps {
  title?: string;
  summary: TourSummaryInfo;
  className?: string;
}

export default function TourSummaryBox({ title, summary, className = '' }: TourSummaryBoxProps) {
  return (
    <div className={`bg-white text-zinc-900 rounded-2xl p-6 sm:p-7 border border-gray-200/90 shadow-sm transition-all duration-300 hover:shadow-md ${className}`}>
      {title && (
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-6 font-serif">
          {title}
        </h3>
      )}

      <div className="space-y-5">
        {/* Duration */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 mt-0.5">
            <Clock className="w-5 h-5" strokeWidth={2} />
          </div>
          <div className="flex-grow">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-0.5">
              Duration
            </div>
            <div className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug">
              {summary.duration}
            </div>
          </div>
        </div>

        {/* Trekking Distance */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 mt-0.5">
            <RouteIcon className="w-5 h-5" strokeWidth={2} />
          </div>
          <div className="flex-grow">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-0.5">
              Trekking distance
            </div>
            <div className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug">
              {summary.distance}
            </div>
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 mt-0.5">
            <Mountain className="w-5 h-5" strokeWidth={2} />
          </div>
          <div className="flex-grow">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-0.5">
              Difficulty
            </div>
            <div className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug">
              {summary.difficulty}
            </div>
          </div>
        </div>

        {/* Minimum Group */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 mt-0.5">
            <Users className="w-5 h-5" strokeWidth={2} />
          </div>
          <div className="flex-grow">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-0.5">
              Minimum group
            </div>
            <div className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug">
              {summary.minGroup}
            </div>
          </div>
        </div>

        {/* Optional Guide or Pickup Info */}
        {(summary.guide || summary.pickupLocation) && (
          <div className="pt-4 mt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-600">
            {summary.guide && (
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Guide: <strong className="text-zinc-800">{summary.guide}</strong></span>
              </div>
            )}
            {summary.pickupLocation && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pickup: <strong className="text-zinc-800">{summary.pickupLocation}</strong></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
