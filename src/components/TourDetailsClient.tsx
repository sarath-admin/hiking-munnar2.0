'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Mountain,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Shield,
  Phone,
  MessageCircle,
  Sparkles,
  MapPin,
  Calendar,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  Sun,
  Backpack,
} from 'lucide-react';
import { TourItem, getRelatedTours } from '@/data/toursData';
import TourSummaryBox from '@/components/TourSummaryBox';
import TourItineraryTable from '@/components/TourItineraryTable';
import TourPackageComparisonTable from '@/components/TourPackageComparisonTable';
import TourBookingModal from '@/components/TourBookingModal';
import TrekCard from '@/components/TrekCard';

interface TourDetailsClientProps {
  tour: TourItem;
}

export default function TourDetailsClient({ tour }: TourDetailsClientProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<string>(
    tour.routeOptions?.[0]?.id || ''
  );
  const prefersReduced = useReducedMotion();

  const activeRoute = tour.routeOptions?.find((r) => r.id === selectedRouteId) || tour.routeOptions?.[0];
  const activeItinerary = activeRoute ? activeRoute.itinerary : tour.itinerary;
  const activeColumnType = activeRoute?.columnType || 'time';
  const activeTitle = activeRoute ? activeRoute.name : (tour.itineraryTitle || 'Complete itinerary');
  const activeSubtitle = activeRoute ? activeRoute.description : undefined;
  const activeBadge = activeRoute?.badge;
  const activeNote = activeRoute?.note || tour.note;

  const relatedTours = getRelatedTours(tour.slug, 3);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919496520787';
  const cleanPhone = whatsappNumber.replace('+', '').replace(/\s+/g, '');

  const whatsappDirectUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi Munnar Hiking Tours, I would like to enquire about the "${tour.title}". Please share itinerary details and availability.`
  )}`;

  const difficultyBadgeColor = {
    Easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Easy-Mod': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    Moderate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Challenging: 'bg-red-500/20 text-red-400 border-red-500/30',
  }[tour.difficulty] || 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';

  return (
    <div className="min-h-screen bg-[#14171A] text-zinc-100 selection:bg-orange-500 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. BREADCRUMBS & TOP NAV BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="pt-24 md:pt-28 pb-4 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          {/* Breadcrumbs: Home > Tours > Category > Tour Name */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-gray-400 overflow-x-auto py-1">
            <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">
              Home
            </Link>
            <ChevronRight size={14} className="text-gray-600 shrink-0" />
            <Link href="/tours" className="hover:text-white transition-colors whitespace-nowrap">
              Tours
            </Link>
            <ChevronRight size={14} className="text-gray-600 shrink-0" />
            <span className="text-emerald-400 font-medium whitespace-nowrap hidden sm:inline">
              {tour.category}
            </span>
            <ChevronRight size={14} className="text-gray-600 shrink-0 hidden sm:inline" />
            <span className="text-white font-semibold truncate max-w-[200px] md:max-w-xs" title={tour.title}>
              {tour.title}
            </span>
          </nav>

          {/* Working Back to Tours button */}
          <Link
            href="/tours"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Tours</span>
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION (High Quality Image + Titles + Key Stats)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 pt-8 pb-12 md:pb-16 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl min-h-[460px] md:min-h-[520px] flex items-end">
            {/* Background Image with Zoom on entry */}
            <motion.div
              initial={prefersReduced ? { scale: 1, opacity: 1 } : { scale: 1.08, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={tour.imageUrl}
                alt={tour.title}
                fill
                priority
                quality={95}
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              {/* Gradients for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent hidden md:block" />
            </motion.div>

            {/* Hero Content */}
            <motion.div
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 p-6 sm:p-10 md:p-12 w-full max-w-4xl"
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {tour.isPopular && (
                  <span className="bg-[#FFA94D] text-zinc-950 text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider shadow-lg">
                    {tour.badge || 'MOST POPULAR'}
                  </span>
                )}
                <span className="bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm border border-emerald-400/30">
                  {tour.category}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider border backdrop-blur-sm ${difficultyBadgeColor}`}>
                  {tour.difficulty}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-serif leading-tight tracking-tight drop-shadow-xl mb-3">
                {tour.title}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-6 drop-shadow-md">
                {tour.shortDescription}
              </p>

              {/* Quick Info Bar & CTAs */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/15">
                <div className="flex items-center gap-2 text-white">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Duration</span>
                    <span className="text-xl sm:text-2xl font-bold text-white font-serif">{tour.duration}</span>
                  </div>
                </div>

                <div className="hidden sm:block h-10 w-[1px] bg-white/20" />

                <div className="flex flex-wrap items-center gap-3">
                  {/* Primary CTA: Book This Tour */}
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-7 rounded-xl shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:shadow-[0_0_35px_rgba(249,115,22,0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm sm:text-base cursor-pointer flex items-center gap-2"
                  >
                    <Calendar size={18} />
                    <span>Book This Tour</span>
                  </button>

                  {/* Secondary CTA: WhatsApp Enquiry */}
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2A4136] hover:bg-[#1E3027] text-[#A3D0B6] border border-[#3E5C4E] hover:border-emerald-400/50 font-bold py-3.5 px-6 rounded-xl transition-all text-sm sm:text-base flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <MessageCircle size={18} className="text-[#25D366]" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN CONTENT LAYOUT (2 Columns: Details + Sticky Sidebar)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* LEFT COLUMN: Main Details & Itinerary (8 Columns on desktop) */}
            <div className="lg:col-span-8 space-y-10">
              {/* SECTION: Tour Information Summary Panel (Matching Screenshot 2) */}
              <div>
                <span className="text-[#FFA94D] text-xs font-bold tracking-widest uppercase mb-2 block">
                  TRIP ESSENTIALS
                </span>
                <TourSummaryBox
                  title={`${tour.title} — Key Details`}
                  summary={tour.summaryInfo}
                />
              </div>

              {/* SECTION: Overview */}
              <div className="bg-zinc-900/90 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg">
                <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2 block">
                  EXPLORE THE TRAIL
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-4">
                  Overview & Experience
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {tour.overview}
                </p>
              </div>

              {/* SECTION: Tour Highlights */}
              <div className="bg-zinc-900/90 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg">
                <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2 block">
                  WHAT MAKES THIS UNIQUE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#FFA94D]" />
                  Tour Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tour.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={15} />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-200 leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: Detailed 2-Column Itinerary Table (Matching Screenshots 2, 3, 4) */}
              <div>
                <span className="text-[#FFA94D] text-xs font-bold tracking-widest uppercase mb-2 block">
                  STEP-BY-STEP SCHEDULE
                </span>

                {/* 3-Photo Preview Gallery (Matching Screenshot 3) */}
                {tour.galleryImages && tour.galleryImages.length >= 3 && (
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                    {tour.galleryImages.slice(0, 3).map((img, idx) => (
                      <div
                        key={idx}
                        className="relative h-28 sm:h-40 rounded-2xl overflow-hidden border border-white/10 shadow-md group"
                      >
                        <Image
                          src={img}
                          alt={`${tour.title} trail photo ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 33vw, 260px"
                          className="object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Route Selector Tabs (if tour has multiple route options, e.g., Full Day vs Half Day) */}
                {tour.routeOptions && tour.routeOptions.length > 1 && (
                  <div className="flex flex-wrap gap-2.5 mb-6 p-1.5 bg-zinc-900/90 rounded-2xl border border-white/10 w-fit">
                    {tour.routeOptions.map((opt) => {
                      const isSelected = selectedRouteId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedRouteId(opt.id)}
                          className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{opt.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-gray-200">
                            {opt.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Route Overview Header Card (Matching Screenshots 2 and 3) */}
                <div className="bg-zinc-900/90 rounded-2xl p-4 sm:p-5 border border-white/10 shadow-lg mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md">
                    <Image
                      src={tour.imageUrl}
                      alt={tour.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5 text-xs sm:text-sm">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 px-2.5 py-0.5 rounded-md border border-emerald-500/25">
                        {tour.duration}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-400">
                        {tour.category}
                      </span>
                    </div>
                    <p className="text-gray-300">
                      <strong className="text-white font-semibold">Starting point:</strong>{' '}
                      {tour.startingPoint || (tour.meetingPoint.includes('Start:')
                        ? tour.meetingPoint.replace('Start:', '').split('End:')[0].replace(/\.$/, '').trim()
                        : tour.summaryInfo.pickupLocation)}
                    </p>
                    <p className="text-gray-300">
                      <strong className="text-white font-semibold">Ending point:</strong>{' '}
                      {tour.endingPoint || (tour.meetingPoint.includes('End:')
                        ? tour.meetingPoint.split('End:')[1].replace(/\.$/, '').trim()
                        : 'Return to the original meeting point')}
                    </p>
                    {tour.transport && (
                      <p className="text-gray-300">
                        <strong className="text-white font-semibold">Transport:</strong>{' '}
                        {tour.transport}
                      </p>
                    )}
                    {tour.tourType && (
                      <p className="text-gray-300">
                        <strong className="text-white font-semibold">Tour type:</strong>{' '}
                        {tour.tourType}
                      </p>
                    )}
                    {tour.mainHighlights && (
                      <p className="text-gray-300">
                        <strong className="text-white font-semibold">Main highlights:</strong>{' '}
                        {tour.mainHighlights}
                      </p>
                    )}
                    <p className="text-gray-300">
                      <strong className="text-white font-semibold">Duration:</strong>{' '}
                      {tour.durationDetails || tour.summaryInfo.duration || tour.duration}
                    </p>
                  </div>
                </div>

                <TourItineraryTable
                  title={activeTitle}
                  subtitle={activeSubtitle}
                  badge={activeBadge}
                  columnType={activeColumnType}
                  itinerary={activeItinerary}
                  note={activeNote}
                />

                {/* Package Details Comparison Table (Matching Screenshot 2) */}
                {tour.comparisonTable && (
                  <div className="mt-10">
                    <TourPackageComparisonTable comparison={tour.comparisonTable} />
                  </div>
                )}
              </div>

              {/* SECTION: Included & Excluded Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="bg-zinc-900/90 rounded-2xl p-6 border border-white/10 shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-serif">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3">
                    {tour.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-zinc-900/90 rounded-2xl p-6 border border-white/10 shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-serif">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    What&apos;s Not Included
                  </h3>
                  <ul className="space-y-3">
                    {tour.exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400">
                        <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SECTION: What to Bring & Safety Requirements */}
              <div className="bg-zinc-900/90 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg">
                <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2 block">
                  PACKING & SAFETY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mb-6 flex items-center gap-2">
                  <Backpack className="w-6 h-6 text-emerald-400" />
                  What to Bring & Trail Advice
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3">Recommended Items</h4>
                    <ul className="space-y-2.5">
                      {tour.whatToBring.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      Safety & Guidelines
                    </h4>
                    <ul className="space-y-2.5">
                      {tour.safetyInfo.map((info, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                          <span>{info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION: Meeting Point & Best Time to Visit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-zinc-900/90 rounded-2xl p-6 border border-white/10 shadow-lg">
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-serif">
                    <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                    Meeting Point & Pickup
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
                    {tour.meetingPoint}
                  </p>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 inline-block">
                    Exact GPS pin shared immediately upon booking
                  </span>
                </div>

                <div className="bg-zinc-900/90 rounded-2xl p-6 border border-white/10 shadow-lg">
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-serif">
                    <Sun className="w-5 h-5 text-[#FFA94D] shrink-0" />
                    Best Time to Visit
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {tour.bestTimeToVisit}
                  </p>
                </div>
              </div>

              {/* SECTION: Frequently Asked Questions */}
              {tour.faqs && tour.faqs.length > 0 && (
                <div className="bg-zinc-900/90 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg">
                  <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2 block">
                    NEED TO KNOW
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mb-6 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-emerald-400" />
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    {tour.faqs.map((faq, idx) => {
                      const isOpen = activeFaq === idx;
                      return (
                        <div
                          key={idx}
                          className="rounded-xl border border-white/10 bg-zinc-950/60 overflow-hidden transition-colors"
                        >
                          <button
                            onClick={() => setActiveFaq(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-gray-100 hover:text-emerald-400 transition-colors cursor-pointer"
                          >
                            <span>{faq.q}</span>
                            <ChevronDown
                              size={18}
                              className={`text-gray-400 transition-transform duration-200 shrink-0 ml-3 ${
                                isOpen ? 'rotate-180 text-emerald-400' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Sticky Booking & Support Panel (4 Columns on desktop) */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-36 space-y-6">
                {/* Main Booking Card */}
                <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider block">Official Package</span>
                      <span className="text-xl font-bold text-white font-serif">Trail Reservation</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Best Rates
                    </span>
                  </div>

                  {/* Summary Bullets */}
                  <div className="space-y-2.5 text-xs text-gray-300 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-emerald-400 shrink-0" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mountain size={14} className="text-emerald-400 shrink-0" />
                      <span>{tour.difficulty} Intensity Level</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span>Certified Local Munnar Guide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-emerald-400 shrink-0" />
                      <span>Includes Forest Permits & Taxes</span>
                    </div>
                  </div>

                  {/* Booking Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all cursor-pointer text-base flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <Calendar size={18} />
                      <span>Book This Tour</span>
                    </button>

                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#1faa53] text-white font-bold py-3.5 px-6 rounded-2xl shadow transition-all text-sm flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <MessageCircle size={18} />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>

                  {/* Trust guarantees */}
                  <div className="mt-6 pt-5 border-t border-white/10 space-y-2 text-[11px] text-gray-400">
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      Pay on arrival — zero advance booking fee
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      Free cancellation up to 24 hours prior
                    </p>
                  </div>
                </div>

                {/* Need Instant Help Card */}
                <div className="bg-zinc-900/60 rounded-2xl p-6 border border-white/10 text-center">
                  <h4 className="text-sm font-bold text-white mb-1">Questions about this route?</h4>
                  <p className="text-xs text-gray-400 mb-4">
                    Speak directly with our Munnar trail manager for group rates, private jeeps, or custom timings.
                  </p>
                  <a
                    href="tel:+919496520787"
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 py-2.5 px-4 rounded-xl border border-white/10 transition-colors"
                  >
                    <Phone size={14} className="text-emerald-400" />
                    <span>Call +91 94965 20787</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. RELATED TOURS SECTION
      ───────────────────────────────────────────────────────────── */}
      {relatedTours.length > 0 && (
        <section className="py-16 bg-zinc-950 border-t border-white/10">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[#FFA94D] text-xs font-bold tracking-widest uppercase block mb-1">
                  MORE ADVENTURES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                  Similar Tours & Expeditions
                </h2>
              </div>
              <Link
                href="/tours"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>View All Tours</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedTours.map((relTour, index) => (
                <TrekCard
                  key={`${relTour.id || relTour.slug}-${index}`}
                  title={relTour.title}
                  slug={relTour.slug}
                  duration={relTour.duration}
                  difficulty={relTour.difficulty}
                  imageUrl={relTour.imageUrl}
                  category={relTour.category}
                  description={relTour.shortDescription}
                  isPopular={relTour.isPopular}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. MOBILE STICKY BOTTOM ACTION BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-lg border-t border-white/10 p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">Munnar Hiking Tours</span>
          <span className="text-sm font-bold text-white leading-tight block truncate">{tour.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-3 rounded-xl flex items-center justify-center shrink-0"
            aria-label="Enquire on WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-2.5 px-5 rounded-xl text-sm shadow-md"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. BOOKING MODAL
      ───────────────────────────────────────────────────────────── */}
      <TourBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        tourName={tour.title}
        tourPrice={tour.price}
      />
    </div>
  );
}
