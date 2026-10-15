'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, X } from 'lucide-react';
import { useAdminStore, CalendarEvent } from '@/lib/adminData';

export default function InteractiveCalendar() {
  const { events } = useAdminStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Month navigation state
  const currentMonthName = "September 2026";
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Calendar cells matching September 2026 exactly:
  // Sept 1 is Tuesday, so Monday is Aug 31 (faded)
  const calendarDays = [
    { day: 31, isCurrentMonth: false, date: '2026-08-31' },
    { day: 1, isCurrentMonth: true, date: '2026-09-01' },
    { day: 2, isCurrentMonth: true, date: '2026-09-02' },
    { day: 3, isCurrentMonth: true, date: '2026-09-03' },
    { day: 4, isCurrentMonth: true, date: '2026-09-04' },
    { day: 5, isCurrentMonth: true, date: '2026-09-05' },
    { day: 6, isCurrentMonth: true, date: '2026-09-06' },
    { day: 7, isCurrentMonth: true, date: '2026-09-07' },
    { day: 8, isCurrentMonth: true, date: '2026-09-08' },
    { day: 9, isCurrentMonth: true, date: '2026-09-09', highlight: 'bg-[#7C3AED] text-white', eventType: 'booking' },
    { day: 10, isCurrentMonth: true, date: '2026-09-10' },
    { day: 11, isCurrentMonth: true, date: '2026-09-11' },
    { day: 12, isCurrentMonth: true, date: '2026-09-12' },
    { day: 13, isCurrentMonth: true, date: '2026-09-13' },
    { day: 14, isCurrentMonth: true, date: '2026-09-14' },
    { day: 15, isCurrentMonth: true, date: '2026-09-15' },
    { day: 16, isCurrentMonth: true, date: '2026-09-16' },
    { day: 17, isCurrentMonth: true, date: '2026-09-17', highlight: 'bg-[#10B981] text-white', eventType: 'departure' },
    { day: 18, isCurrentMonth: true, date: '2026-09-18', highlight: 'bg-[#059669] text-white', eventType: 'enquiry' },
    { day: 19, isCurrentMonth: true, date: '2026-09-19' },
    { day: 20, isCurrentMonth: true, date: '2026-09-20' },
    { day: 21, isCurrentMonth: true, date: '2026-09-21' },
    { day: 22, isCurrentMonth: true, date: '2026-09-22' },
    { day: 23, isCurrentMonth: true, date: '2026-09-23', highlight: 'bg-[#F97316] text-white', eventType: 'safari' },
    { day: 24, isCurrentMonth: true, date: '2026-09-24' },
    { day: 25, isCurrentMonth: true, date: '2026-09-25' },
    { day: 26, isCurrentMonth: true, date: '2026-09-26' },
    { day: 27, isCurrentMonth: true, date: '2026-09-27' },
    { day: 28, isCurrentMonth: true, date: '2026-09-28' },
    { day: 29, isCurrentMonth: true, date: '2026-09-29' },
    { day: 30, isCurrentMonth: true, date: '2026-09-30' },
    { day: 1, isCurrentMonth: false, date: '2026-10-01' },
    { day: 2, isCurrentMonth: false, date: '2026-10-02' },
    { day: 3, isCurrentMonth: false, date: '2026-10-03' },
    { day: 4, isCurrentMonth: false, date: '2026-10-04' },
  ];

  const activeEvent = events.find(e => e.date === selectedDate);

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-150 shadow-sm relative">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight">
          Calendar
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700">
            {currentMonthName}
          </span>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((dow) => (
          <span key={dow} className="text-[11px] font-bold text-stone-400">
            {dow}
          </span>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {calendarDays.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDate(item.date)}
            className={`h-8 w-8 sm:h-9 sm:w-9 mx-auto rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
              item.highlight
                ? `${item.highlight} shadow-md scale-105 font-black ring-2 ring-white`
                : item.isCurrentMonth
                ? 'text-stone-800 hover:bg-orange-50 hover:text-orange-600'
                : 'text-stone-300'
            }`}
          >
            {item.day}
          </button>
        ))}
      </div>

      {/* Event Details Modal / Flyout when date clicked */}
      {selectedDate && (
        <div className="mt-4 pt-3 border-t border-stone-100 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 flex items-center gap-1">
              <CalendarIcon size={12} /> {selectedDate}
            </span>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-stone-400 hover:text-stone-700 text-xs p-1"
            >
              <X size={14} />
            </button>
          </div>

          {activeEvent ? (
            <div className="mt-2 p-2.5 rounded-xl bg-orange-50/80 border border-orange-200/60">
              <p className="text-xs font-extrabold text-stone-900">{activeEvent.title}</p>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-white px-2 py-0.5 rounded-md inline-block mt-1">
                {activeEvent.type}
              </span>
            </div>
          ) : (
            <p className="text-xs text-stone-400 mt-2 italic">
              No scheduled trips or follow-ups for this date.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
