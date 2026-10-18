'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Pause, Play } from 'lucide-react';

export interface CarouselTour {
  title: string;
  slug?: string;
  category: string;
  duration: string;
  difficulty: string;
  description: string;
  price?: string;
  imageUrl: string;
  isPopular: boolean;
}

interface Props {
  tours: CarouselTour[];
  autoplayMs?: number;
}

const SPRING = 'cubic-bezier(0.22, 1.18, 0.36, 1)';
const STEP_DEG = 30; // angular gap between cards on the orbit

/** Wrap a relative offset into the range (-n/2, n/2] for seamless looping. */
function wrap(d: number, n: number) {
  if (n <= 1) return 0;
  let r = ((d % n) + n) % n;
  if (r > n / 2) r -= n;
  return r;
}

export default function RadialTourCarousel({ tours, autoplayMs = 5000 }: Props) {
  const n = tours.length;
  const [{ active, from }, setPos] = useState({ active: 0, from: 0 });
  const setActive = useCallback((next: number) => setPos((p) => ({ from: p.active, active: next })), []);
  const [drag, setDrag] = useState(0); // drag distance in "card units"
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [width, setWidth] = useState(1024);

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number; moved: boolean; id: number } | null>(null);
  const wheelAcc = useRef(0);
  const wheelLock = useRef(0);

  // Responsive sizing
  const cardW = Math.round(Math.min(400, Math.max(260, width * (width < 640 ? 0.8 : width < 1024 ? 0.46 : 0.34))));
  const radius = cardW * 1.5;
  const spacingPx = radius * Math.sin((STEP_DEG * Math.PI) / 180);
  const maxVisible = width < 640 ? 1 : Math.min(2, Math.floor((n - 1) / 2) || 1);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) setAutoplay(false);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const go = useCallback((delta: number) => {
    if (n < 2) return;
    setPos((p) => ({ from: p.active, active: (((p.active + delta) % n) + n) % n }));
  }, [n]);

  // Autoplay with pause-on-hover / drag
  useEffect(() => {
    if (!autoplay || paused || dragging || n < 2) return;
    const t = setTimeout(() => go(1), autoplayMs);
    return () => clearTimeout(t);
  }, [autoplay, paused, dragging, active, n, go, autoplayMs]);

  // Trackpad / horizontal wheel navigation (non-passive so we can stop page scroll sideways)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // let vertical page scroll through
      e.preventDefault();
      const now = Date.now();
      if (now < wheelLock.current) return;
      wheelAcc.current += e.deltaX;
      if (Math.abs(wheelAcc.current) > 60) {
        go(wheelAcc.current > 0 ? 1 : -1);
        wheelAcc.current = 0;
        wheelLock.current = now + 450;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [go]);

  // Pointer drag (mouse + touch + pen)
  const onPointerDown = (e: React.PointerEvent) => {
    if (n < 2 || (e.pointerType === 'mouse' && e.button !== 0)) return;
    dragStart.current = { x: e.clientX, y: e.clientY, moved: false, id: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = dragStart.current;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (!s.moved) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) { dragStart.current = null; return; } // vertical scroll intent
      s.moved = true;
      setDragging(true);
      (e.currentTarget as HTMLElement).setPointerCapture(s.id);
    }
    setDrag(dx / spacingPx);
  };
  const endDrag = () => {
    const s = dragStart.current;
    dragStart.current = null;
    if (!s?.moved) return;
    const steps = Math.round(-drag + (Math.abs(drag) > 0.18 && Math.abs(drag) < 0.5 ? -Math.sign(drag) * 0.5 : 0));
    setDragging(false);
    setDrag(0);
    if (steps) go(steps);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  const stageH = width < 640 ? 540 : 580;
  const duration = reducedMotion ? 0 : 750;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Munnar tours"
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* ambient glow behind the active card */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full bg-[#2d4a3e]/40 blur-[110px]" />

      <div
        ref={stageRef}
        id="tour-carousel-stage"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`relative w-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#e8a365]/50 rounded-2xl ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ height: stageH, perspective: '1800px', perspectiveOrigin: '50% 35%', touchAction: 'pan-y' }}
      >
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {tours.map((tour, i) => {
            const base = wrap(i - active, n);
            const d = wrap(base + drag, n);
            const prev = wrap(i - from, n);
            const teleport = Math.abs(prev - base) > n / 2;

            const ad = Math.abs(d);
            const theta = (d * STEP_DEG * Math.PI) / 180;
            const x = radius * Math.sin(theta);
            const z = radius * (Math.cos(theta) - 1);
            const y = ad * ad * 14; // cards dip slightly along the arc
            const rotY = -d * STEP_DEG * 0.85;
            const scale = Math.max(0.62, 1 - ad * 0.13);
            const visible = ad <= maxVisible + 0.5;
            const isActive = base === 0 && Math.abs(drag) < 0.5;

            return (
              <article
                key={tour.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}: ${tour.title}`}
                aria-hidden={!isActive}
                onClick={(e) => {
                  if (base !== 0) { e.preventDefault(); go(base); }
                }}
                className="absolute left-1/2 top-6"
                style={{
                  width: cardW,
                  marginLeft: -cardW / 2,
                  transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                  opacity: visible ? 1 : 0,
                  zIndex: 100 - Math.round(ad * 10),
                  pointerEvents: visible ? 'auto' : 'none',
                  transition: dragging || teleport
                    ? 'none'
                    : `transform ${duration}ms ${SPRING}, opacity ${duration * 0.6}ms ease, filter ${duration}ms ease`,
                  filter: isActive ? 'none' : `brightness(${Math.max(0.45, 1 - ad * 0.3)}) saturate(${1 - ad * 0.2})`,
                  willChange: 'transform',
                }}
              >
                <div
                  className={`bg-[#252725] rounded-xl overflow-hidden border flex flex-col group h-[490px] transition-[border-color,box-shadow] duration-500 ${
                    isActive
                      ? 'border-[#3d5a4e] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(232,163,101,0.15)]'
                      : 'border-gray-800 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] cursor-pointer'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden shrink-0">
                    {tour.isPopular && (
                      <div className="absolute top-4 left-4 z-10 bg-[#e8a365] text-black text-[10px] font-bold px-3 py-1 rounded shadow-md tracking-wider">
                        MOST POPULAR
                      </div>
                    )}
                    <Image
                      src={tour.imageUrl}
                      alt={tour.title}
                      fill
                      draggable={false}
                      sizes="(max-width: 640px) 80vw, 400px"
                      priority={ad < 1.5}
                      className={`object-cover transition-transform duration-[1200ms] ${isActive ? 'scale-105' : 'scale-100'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#252725]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-gray-300 text-[10px] font-bold px-3 py-1 rounded tracking-wider border border-white/10">
                      {tour.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow min-h-0">
                    <div className="flex items-center gap-4 text-xs text-[#e8a365] font-medium mb-3">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <span className="w-1 h-1 bg-gray-500 rounded-full" />
                        <span>{tour.difficulty}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-serif leading-snug line-clamp-2">{tour.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 flex-grow">{tour.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-auto">
                      <span className="text-xs text-gray-400 font-medium">Guided Trail Tour</span>
                      <Link
                        href={`/tours/${tour.slug || 'kolukkumalai-sunrise-jeep-safari'}`}
                        tabIndex={isActive ? 0 : -1}
                        draggable={false}
                        onClick={(e) => { if (!isActive) e.preventDefault(); }}
                        className="flex items-center gap-2 bg-[#2d4a3e] hover:bg-[#3d5a4e] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-[#3d5a4e]"
                      >
                        View Details <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* edge fades for cinematic depth */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#1a1c1a] to-transparent z-[200]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#1a1c1a] to-transparent z-[200]" />

        {n > 1 && (
          <>
            <button
              id="tour-carousel-prev"
              type="button"
              aria-label="Previous tour"
              onClick={() => go(-1)}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute left-2 sm:left-6 top-[42%] -translate-y-1/2 z-[300] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#2d4a3e] hover:border-[#3d5a4e] hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              id="tour-carousel-next"
              type="button"
              aria-label="Next tour"
              onClick={() => go(1)}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute right-2 sm:right-6 top-[42%] -translate-y-1/2 z-[300] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#2d4a3e] hover:border-[#3d5a4e] hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Pagination + indicator */}
      {n > 1 && (
        <div className="relative flex items-center justify-center gap-5 mt-4">
          <span className="text-xs font-semibold tracking-widest text-gray-500 tabular-nums w-14 text-right">
            <span className="text-[#e8a365]">{String(active + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose tour">
            {tours.map((t, i) => (
              <button
                key={t.title}
                id={`tour-carousel-dot-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to ${t.title}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  i === active ? 'w-8 bg-[#e8a365]' : 'w-2 bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          <button
            id="tour-carousel-autoplay"
            type="button"
            aria-label={autoplay ? 'Pause autoplay' : 'Start autoplay'}
            onClick={() => setAutoplay((a) => !a)}
            className="w-8 h-8 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            {autoplay ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>
      )}
    </section>
  );
}
