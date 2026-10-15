'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X, ChevronLeft, ChevronRight, MapPin, Clock, Mountain,
  Compass, TreePine, Sun, Camera, Phone, ArrowRight, Sparkles
} from 'lucide-react';

/* ── Slide data ─────────────────────────────────────────────── */
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  color: string;        // gradient accent
  icon: React.ElementType;
  highlights: string[];
  duration: string;
  tag: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Kolukkumalai\nSunrise Safari',
    subtitle: 'World\'s Highest Organic Tea Plantation',
    image: '/images/kolukkumalai_sunrise_view.jpg',
    color: 'from-amber-600 via-orange-500 to-rose-500',
    icon: Sun,
    highlights: ['4×4 Off-road Jeep', 'Golden Sunrise View', 'Tea Factory Visit', 'Cloud Walk'],
    duration: '3-6 hrs',
    tag: 'MOST POPULAR',
  },
  {
    id: 2,
    title: 'Meesapulimala\nSummit Trek',
    subtitle: '2nd Highest Peak in South India',
    image: '/images/meesapulimala.png',
    color: 'from-emerald-600 via-green-500 to-teal-500',
    icon: Mountain,
    highlights: ['High-Altitude Grasslands', 'Shola Forest Crossing', 'Wildlife Spotting', 'Panoramic Views'],
    duration: '5-8 hrs',
    tag: 'CHALLENGING',
  },
  {
    id: 3,
    title: 'Tea Plantation\nHeritage Walk',
    subtitle: 'Colonial Trails & Artisan Plucking',
    image: '/images/tea_walk.png',
    color: 'from-lime-600 via-emerald-500 to-green-600',
    icon: TreePine,
    highlights: ['Private Estate Access', 'Fresh Tea Tasting', 'Sunset Viewpoint', 'Photo Opportunities'],
    duration: '2-4 hrs',
    tag: 'EASY & SCENIC',
  },
  {
    id: 4,
    title: 'Eravikulam\nWildlife Safari',
    subtitle: 'Home of the Nilgiri Tahr',
    image: '/images/eravikulam_national_park.jpg',
    color: 'from-cyan-600 via-blue-500 to-indigo-500',
    icon: Compass,
    highlights: ['Rare Nilgiri Tahr', 'Neelakurinji Blooms', 'Anamudi Peak View', 'Guided Nature Walk'],
    duration: '3-5 hrs',
    tag: 'WILDLIFE',
  },
  {
    id: 5,
    title: 'Munnar City\nTukTuk Tour',
    subtitle: 'Heritage, Spices & Colonial Charm',
    image: '/images/tuktuk_munnar_tour.png',
    color: 'from-violet-600 via-purple-500 to-fuchsia-500',
    icon: Camera,
    highlights: ['Spice Markets', 'Colonial Churches', 'Chocolate Kitchens', 'Local Street Food'],
    duration: '3-4 hrs',
    tag: 'FUN & UNIQUE',
  },
];

/* ── Route data for mini map ──────────────────────────────────── */
const routes = [
  { name: 'To Coimbatore', color: '#1565C0', spots: 'Eravikulam → Lakkam Falls → Chinnar' },
  { name: 'To Cochin', color: '#2E7D32', spots: 'Blossom Park → Attukad Falls → Spice Garden' },
  { name: 'To Top Station', color: '#E65100', spots: 'Rose Garden → Echo Point → Top Station' },
  { name: 'To Thekkady', color: '#6A1B9A', spots: 'Lockhart → Kolukkumalai → Suryanelli' },
];

/* ── Component ────────────────────────────────────────────────── */
export default function AdventurePlannerModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setActiveSlide(0);
      setShowContent(false);
      const t = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Auto-advance slides
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      goNext();
    }, 6000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeSlide]);

  const goNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('next');
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('prev');
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === activeSlide) return;
    setIsAnimating(true);
    setDirection(index > activeSlide ? 'next' : 'prev');
    setActiveSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, activeSlide]);

  if (!isOpen) return null;

  const slide = slides[activeSlide];
  const SlideIcon = slide.icon;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* ── Animated backdrop ── */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500"
        style={{ opacity: showContent ? 1 : 0 }}
        onClick={onClose}
      />

      {/* ── Main container ── */}
      <div
        className="relative z-10 w-full h-full flex items-center justify-center p-3 sm:p-6"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="w-full max-w-6xl h-[90vh] max-h-[750px] bg-zinc-950 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row relative">

          {/* ── Close button ── */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer hover:rotate-90 duration-300"
          >
            <X size={20} />
          </button>

          {/* ═══ LEFT: Image + Story Slide ═══ */}
          <div className="relative w-full lg:w-[55%] h-[45%] lg:h-full overflow-hidden">

            {/* Background image with Ken Burns */}
            <div
              key={`img-${activeSlide}`}
              className="absolute inset-0"
              style={{
                animation: `kenBurns 6s ease-in-out infinite alternate, ${
                  direction === 'next' ? 'slideInRight' : 'slideInLeft'
                } 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-20 mix-blend-overlay`} />

            {/* Story progress bar */}
            <div className="absolute top-4 left-4 right-14 flex gap-1.5 z-20">
              {slides.map((_, i) => (
                <div key={i} className="h-[3px] flex-1 rounded-full bg-white/30 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: i < activeSlide ? '100%' : i === activeSlide ? '100%' : '0%',
                      background: i <= activeSlide
                        ? 'linear-gradient(90deg, #f97316, #fbbf24)'
                        : 'transparent',
                      animation: i === activeSlide ? 'progressFill 6s linear' : 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Tag badge */}
            <div
              key={`tag-${activeSlide}`}
              className="absolute top-12 left-5 z-20"
              style={{ animation: 'fadeSlideUp 0.5s ease-out 0.2s both' }}
            >
              <span className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${slide.color} text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wider`}>
                <Sparkles size={12} /> {slide.tag}
              </span>
            </div>

            {/* Title + subtitle */}
            <div className="absolute bottom-6 left-5 right-5 z-20">
              <div
                key={`title-${activeSlide}`}
                style={{ animation: 'fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both' }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.05] whitespace-pre-line drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                  {slide.title}
                </h2>
              </div>
              <div
                key={`sub-${activeSlide}`}
                style={{ animation: 'fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }}
              >
                <p className="text-sm text-white/80 font-medium mt-2 flex items-center gap-2">
                  <MapPin size={14} className="text-orange-400" />
                  {slide.subtitle}
                </p>
              </div>
            </div>

            {/* Nav arrows */}
            <div className="absolute bottom-6 right-5 z-20 flex gap-2">
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all cursor-pointer active:scale-90"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all cursor-pointer active:scale-90"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* ═══ RIGHT: Content panel ═══ */}
          <div className="flex-1 flex flex-col overflow-y-auto bg-zinc-950">

            {/* Top: slide details */}
            <div className="p-5 sm:p-7 flex-1">
              {/* Icon + duration chip */}
              <div
                key={`chip-${activeSlide}`}
                className="flex items-center gap-3 mb-5"
                style={{ animation: 'fadeSlideUp 0.5s ease-out 0.2s both' }}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${slide.color} flex items-center justify-center shadow-lg`}>
                  <SlideIcon size={22} className="text-white" />
                </div>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                  <Clock size={13} className="text-orange-400" />
                  <span className="text-xs font-bold text-white">{slide.duration}</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-semibold">{activeSlide + 1}/{slides.length}</span>
              </div>

              {/* Highlights */}
              <div
                key={`hl-${activeSlide}`}
                className="space-y-2 mb-6"
                style={{ animation: 'fadeSlideUp 0.5s ease-out 0.35s both' }}
              >
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Tour Highlights</p>
                <div className="grid grid-cols-2 gap-2">
                  {slide.highlights.map((h, i) => (
                    <div
                      key={h}
                      className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 rounded-xl px-3 py-2.5 group hover:border-orange-500/40 transition-all"
                      style={{ animation: `fadeSlideUp 0.4s ease-out ${0.4 + i * 0.08}s both` }}
                    >
                      <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${slide.color} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
                        {i + 1}
                      </span>
                      <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide selectors (thumbnail strip) */}
              <div
                className="mb-5"
                style={{ animation: 'fadeSlideUp 0.5s ease-out 0.55s both' }}
              >
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Choose Experience</p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => goToSlide(i)}
                      className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        i === activeSlide
                          ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)] scale-105'
                          : 'border-zinc-800 hover:border-zinc-600 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={s.image} alt={s.title} fill className="object-cover" />
                      {i === activeSlide && (
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-transparent" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mini route map */}
              <div style={{ animation: 'fadeSlideUp 0.5s ease-out 0.65s both' }}>
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  <MapPin size={12} className="inline mr-1 text-orange-400" />
                  Tourist Routes from Munnar
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {routes.map((r) => (
                    <div
                      key={r.name}
                      className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-2.5 hover:border-zinc-600 transition-all group cursor-default"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full shadow-sm"
                          style={{ background: r.color }}
                        />
                        <span className="text-[11px] font-bold text-white">{r.name}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-relaxed">{r.spots}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA bar */}
            <div
              className="p-5 sm:px-7 border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur-sm"
              style={{ animation: 'fadeSlideUp 0.5s ease-out 0.7s both' }}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:shadow-[0_0_35px_rgba(249,115,22,0.5)] transition-all text-sm active:scale-[0.98]"
                >
                  Book This Adventure <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/919496520787?text=Hi!%20I%20would%20like%20to%20plan%20an%20adventure%20tour%20in%20Munnar."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold py-3 px-5 rounded-xl transition-all text-sm"
                >
                  <Phone size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe animations (injected once) ── */}
      <style jsx global>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes slideInRight {
          from { transform: translateX(40px) scale(1.05); opacity: 0; }
          to   { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-40px) scale(1.05); opacity: 0; }
          to   { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { transform: translateY(18px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
