'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Clock, ChevronLeft, ChevronRight, Star, X, ZoomIn, ZoomOut, ExternalLink, Phone } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────────────────────── */
export interface PackageItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  duration: string;
  difficulty: string;
  badge?: string;
  description: string;
  highlights?: string[];
}

const CATEGORIES = [
  { key: 'all',      label: 'All Tours' },
  { key: 'trekking', label: 'Trekking Packages' },
  { key: 'tea',      label: 'Tea Experiences' },
  { key: 'jeep',     label: 'Jeep Safaris' },
  { key: 'sunrise',  label: 'Sunrise Points' },
  { key: 'wildlife', label: 'Wildlife Sanctuaries' },
  { key: 'heritage', label: 'Heritage & TukTuk' },
];

export const TOUR_PACKAGES: PackageItem[] = [
  /* ─── 1. DAY TREKKING ─── */
  {
    id: 'day-trekking',
    category: 'trekking',
    categoryLabel: 'TREKKING',
    title: 'Day Trekking',
    image: '/images/packages/day_trekking_1024.jpg',
    duration: '7 Hours (07:00 AM – 02:00 PM)',
    difficulty: 'Moderate',
    badge: 'MOST POPULAR',
    description: 'Start at 1550m and summit 2000m peak with homemade breakfast. Walk through tea plantations, grasslands, rocks, coffee & cardamom estates.',
    highlights: ['14 K.M.S walking distance', '2000m mountain summit homemade breakfast', 'Tea, grassland & rocks covering area', 'Food, water, guide & transportation included'],
  },

  /* ─── 2. HALF TREKKING ─── */
  {
    id: 'half-day-trekking',
    category: 'trekking',
    categoryLabel: 'TREKKING',
    title: 'Half Day Trekking and Hiking Tours',
    image: '/images/packages/half_day_trekking_v2_1024.jpg',
    duration: '5.5 Hours (07:00 AM – 12:30 PM)',
    difficulty: 'Moderate',
    badge: 'BEST SELLER',
    description: 'Start at 1550m and summit 2000m peak with homemade breakfast. 10 Kms guided walk through tea plantations, grasslands, rocks, coffee & cardamom. Minimum 2 Persons.',
    highlights: ['10 Kms walking distance', '2000m summit homemade breakfast', 'Tea, grassland, rocks, coffee & cardamom', 'Minimum persons: 2 Nos'],
  },

  /* ─── 3. SOFT TREKKING ─── */
  {
    id: 'soft-hiking',
    category: 'trekking',
    categoryLabel: 'TREKKING',
    title: 'Soft Hiking Tours',
    image: '/images/packages/soft_hiking_v2_1024.jpg',
    duration: '3 Hours (10:00 AM – 01:00 PM)',
    difficulty: 'Easy',
    badge: 'EASY & SCENIC',
    description: 'Walk gently, explore deeply. 6 Kms easy walk from 1550m to 1850m mountain top with snacks break through tea plantations, grasslands & rocks. Minimum 2 Persons.',
    highlights: ['6 Kms easy walking trail', '1850m mountain top snacks break', 'Tea plantation, grassland & rocks', 'Minimum persons: 2 Nos'],
  },

  /* ─── 4. FULL DAY TREKKING ─── */
  {
    id: 'full-day-mountain-hike',
    category: 'trekking',
    categoryLabel: 'TREKKING',
    title: 'Full Day Trekking',
    image: '/images/packages/full_day_trekking_hq.jpg',
    duration: '7-8 Hours',
    difficulty: 'Challenging',
    badge: 'ADVENTURE',
    description: 'Summit high-altitude grassy knolls, cross native shola forest corridors, and spot rare Neelakurinji blooms across Munnar ridges.',
    highlights: ['Summit climb to 2100m', 'Native shola forest crossing', 'Homemade breakfast & lunch', 'Local expert guide'],
  },

  /* ─── 5. SUN RISE TREKKING ─── */
  {
    id: 'sunrise-trekking',
    category: 'trekking',
    categoryLabel: 'TREKKING',
    title: 'Sun Rise Trekking',
    image: '/images/packages/sunrise_trekking_hq.jpg',
    duration: '5-6 Hours',
    difficulty: 'Moderate',
    badge: 'BEST SELLER',
    description: 'Chase the sun above the clouds. Trek high grasslands and feel the magic of a Munnar dawn with hot mountain breakfast.',
    highlights: ['Golden sunrise at 2400m', 'Cloud sea panoramic views', 'High grassland trails', 'Hot mountain breakfast'],
  },

  /* ─── 6. GRASS LAND HIKING TOURS ─── */
  {
    id: 'grassland-hiking',
    category: 'trekking',
    categoryLabel: 'TREKKING',
    title: 'Grass Land Hiking Tours',
    image: '/images/packages/grassland_hiking_hq.jpg',
    duration: '7 Hours',
    difficulty: 'Moderate',
    badge: 'NATURE TRAIL',
    description: "Walk through nature's purest beauty across Neelakurinji ridges & valleys reaching a panoramic 2250m peak.",
    highlights: ['Neelakurinji ridge walk', '2250m peak summit', 'Juice & snack stops', 'Homemade breakfast & guide'],
  },

  /* ─── 7. TEA FACTORY VISIT ─── */
  {
    id: 'tea-factory-visit',
    category: 'tea',
    categoryLabel: 'TEA EXPERIENCES',
    title: 'Tea Factory Visit',
    image: '/images/packages/tea_factory_visit_hq.jpg',
    duration: 'Approx. 2 Hours (10:00 AM – 12:00 PM)',
    difficulty: 'Easy',
    badge: 'MOST POPULAR',
    description: 'From fresh leaves to your cup: observe withering, rolling, oxidation, drying, grading & enjoy an authentic guided tea tasting.',
    highlights: ['Complete tea factory tour', 'Fresh leaf rolling & drying', 'Guided authentic tea tasting', 'Factory shop visit'],
  },

  /* ─── JEEP SAFARIS ─── */
  {
    id: 'kolukkumalai-jeep',
    category: 'jeep',
    categoryLabel: 'JEEP SAFARIS',
    title: 'Kollumazhai Jeep Safari',
    image: '/images/packages/kollumazhai_jeep_safari_hq.jpg',
    duration: '04:00 AM – 12:00 PM',
    difficulty: 'Moderate',
    badge: 'MOST POPULAR',
    description: "Witness breathtaking sunrise above the clouds, rugged mountain tracks, Kollumazhai village & tea factory visit.",
    highlights: ['Sunrise above the clouds', 'Kollumazhai village & tea factory', '20-25 Kms off-road route', 'Breakfast, tea & guide included'],
  },
  {
    id: 'anakulam-jeep-safari',
    category: 'jeep',
    categoryLabel: 'JEEP SAFARIS',
    title: 'Anakulam Jeep Safari',
    image: '/images/packages/anakulam_jeep_safari_hq.jpg',
    duration: 'Full Day',
    difficulty: 'Moderate',
    badge: 'BEST SELLER',
    description: 'Explore nature with off-road 4x4 adventure, hidden waterfalls and wild elephant spotting zones.',
    highlights: ['Viripara & 33 waterfalls', 'Elephant watering spot', 'Spice plantation tour', 'Chocolate estate visit'],
  },
  {
    id: 'kannan-devan-jeep',
    category: 'jeep',
    categoryLabel: 'JEEP SAFARIS',
    title: 'Kannan Devan Hills Jeep Safari',
    image: '/images/packages/kannan_devan_safari_full_hq.jpg',
    duration: 'Full Day / Half Day',
    difficulty: 'Moderate',
    badge: 'NEW',
    description: 'Scenic 12-stop 4x4 adventure across tea valleys, Idly Hills, Viripara Waterfalls, hanging bridge & Anakulam.',
    highlights: ['Shooting Point & Idly Hills', 'Viripara & Forest Waterfalls', 'Tiger Cave & Hanging Bridge', 'River Crossing & Anakulam'],
  },
  {
    id: 'tea-experience-program',
    category: 'tea',
    categoryLabel: 'TEA EXPERIENCES',
    title: 'Tea Experience Program',
    image: '/images/packages/tea_experience_hq.jpg',
    duration: '3.5-4 Hours',
    difficulty: 'Easy',
    description: 'Discover the complete journey of tea: Plantation • Factory • Tasting at Nullatanni Estate.',
    highlights: ['Factory machinery tour', 'Grades & aroma tasting', 'Guided plantation walk', 'Expert commentary'],
  },
  {
    id: 'soft-hiking-tea-combo',
    category: 'tea',
    categoryLabel: 'TEA EXPERIENCES',
    title: 'Soft Hiking & Tea Walk Combo',
    image: '/images/packages/tea_and_hiking_combo_hq.jpg',
    duration: 'Half Day',
    difficulty: 'Easy',
    badge: 'BEST VALUE',
    description: 'Morning summit walk + colonial tea masterclass — the best of Munnar in a single unforgettable program.',
    highlights: ['6km soft hike', 'Tea factory visit', 'Tasting session', 'Local guides throughout'],
  },

  /* ─── SUNRISE POINTS ─── */
  {
    id: 'kolukkumalai-sunrise',
    category: 'sunrise',
    categoryLabel: 'SUNRISE POINTS',
    title: "Kolukkumalai – World's Highest Tea Estate Sunrise",
    image: '/images/packages/kolukkumalai_sunrise_trek_1024.jpg',
    duration: '4-5 Hours',
    difficulty: 'Moderate',
    badge: 'MOST POPULAR',
    description: "Watch the sun rise over a 100-year-old colonial tea estate at 2100m — the world's highest organic tea garden.",
    highlights: ['2100m altitude sunrise', 'Colonial tea estate', 'Cloud sea panorama', '4x4 jeep adventure'],
  },

  /* ─── HERITAGE & TUKTUK ─── */
  {
    id: 'walking-tour-tea-plantation',
    category: 'heritage',
    categoryLabel: 'TREKKING & TEA WALK',
    title: 'Walking Tour in Tea Plantation',
    image: '/images/packages/walking_tour_tea_plantation_1024.jpg',
    duration: '2:30 Hours',
    difficulty: 'Easy',
    badge: 'MOST POPULAR',
    description: 'Walk. Breathe. Taste Nature. Approx. 5 – 6 K.M. walking tour through tea plantation trails, rolling hills, scenic views & shola forest edge. Minimum 2 Persons.',
    highlights: ['Approx. 5 - 6 K.M. walking tour', 'Tea plantation trails & rolling hills', 'Guide support, water & tea tasting (optional)', 'Minimum persons: 2 Nos'],
  },
  {
    id: 'top-valley-trekking',
    category: 'heritage',
    categoryLabel: 'TREKKING',
    title: 'TOP VALLEY TREKKING',
    image: '/images/packages/top_valley_trekking_1024.jpg',
    duration: '3-4 Hours (09:00 AM Start)',
    difficulty: 'Moderate',
    badge: 'BEST SELLER',
    description: 'A 3-4 hour trek from Yellapatty tea village through Shola forest and grasslands, en route to Mattupetty Dam, Echo Point and Kundale Dam. Minimum 2 Persons.',
    highlights: ['5-6 Kms walking trail (09:00 AM start)', 'Mattupetty Dam, Echo Point & Kundale Dam', 'Packed lunch, water, refreshments & guide fee', 'Minimum persons: 2 Nos'],
  },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
interface PackagesShowcaseProps {
  showTitle?: boolean;
  limit?: number;
}

export default function PackagesShowcase({ showTitle = true, limit }: PackagesShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayCategory, setDisplayCategory] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animDir, setAnimDir] = useState<'left' | 'right'>('right');
  const [selectedPkg, setSelectedPkg] = useState<PackageItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const sliderRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace('+', '') || '919496520787';

  /* filtered packages based on displayCategory */
  const filtered = TOUR_PACKAGES.filter(
    (p) => displayCategory === 'all' || p.category === displayCategory,
  );
  const displayed = limit ? filtered.slice(0, limit) : filtered;

  /* category switch with directional slide animation */
  const switchCategory = useCallback(
    (key: string) => {
      if (key === activeCategory || isAnimating) return;
      const currentIdx = CATEGORIES.findIndex((c) => c.key === activeCategory);
      const nextIdx = CATEGORIES.findIndex((c) => c.key === key);
      setAnimDir(nextIdx > currentIdx ? 'right' : 'left');
      setIsAnimating(true);
      setActiveCategory(key);

      const tabEl = tabsRef.current?.querySelector(`[data-cat="${key}"]`) as HTMLElement | null;
      tabEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

      setTimeout(() => {
        setDisplayCategory(key);
        setIsAnimating(false);
        sliderRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
      }, 260);
    },
    [activeCategory, isAnimating],
  );

  const scrollSlider = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.firstElementChild
      ? (sliderRef.current.firstElementChild as HTMLElement).offsetWidth + 24
      : 360;
    sliderRef.current.scrollBy({ left: dir === 'right' ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  const openPackageModal = (pkg: PackageItem) => {
    setSelectedPkg(pkg);
    setZoomLevel(1);
  };

  const navigateModal = useCallback(
    (direction: 'next' | 'prev') => {
      if (!selectedPkg || displayed.length === 0) return;
      const currentIndex = displayed.findIndex((p) => p.id === selectedPkg.id);
      if (currentIndex === -1) return;
      const nextIndex =
        direction === 'next'
          ? (currentIndex + 1) % displayed.length
          : (currentIndex - 1 + displayed.length) % displayed.length;
      setSelectedPkg(displayed[nextIndex]);
      setZoomLevel(1);
    },
    [displayed, selectedPkg],
  );

  useEffect(() => {
    document.body.style.overflow = selectedPkg ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPkg]);

  useEffect(() => {
    if (!selectedPkg) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPkg(null);
        setZoomLevel(1);
      } else if (e.key === 'ArrowRight') {
        navigateModal('next');
      } else if (e.key === 'ArrowLeft') {
        navigateModal('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPkg, navigateModal]);

  const difficultyColor = (d: string) => {
    if (d === 'Easy') return 'text-emerald-400';
    if (d === 'Challenging') return 'text-red-400';
    return 'text-amber-400';
  };

  return (
    <div className="w-full">
      {/* SECTION HEADER */}
      {showTitle && (
        <div className="text-center mb-10 md:mb-14 px-4">
          <span className="text-[#ff7700] font-bold tracking-widest uppercase text-xs md:text-sm bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20 inline-block mb-3">
            Handcrafted Itineraries
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Tour Packages – Munnar
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            High-quality guided adventures led by certified local trail experts. Browse by category and book instantly on WhatsApp.
          </p>
        </div>
      )}

      {/* CATEGORY TABS */}
      <div className="relative mb-8 px-4">
        <div className="absolute left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-[#081c15] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-[#081c15] to-transparent z-10 pointer-events-none" />
        <div
          ref={tabsRef}
          className="flex items-center gap-2 overflow-x-auto px-2 pb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              data-cat={cat.key}
              onClick={() => switchCategory(cat.key)}
              className={`
                flex-shrink-0 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold
                border transition-all duration-200 cursor-pointer whitespace-nowrap
                ${activeCategory === cat.key
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-950/50'
                  : 'bg-zinc-900/80 text-gray-300 border-white/10 hover:border-white/25 hover:text-white hover:bg-zinc-800/80'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* SLIDER */}
      <div className="relative">
        {/* Prev arrow */}
        <button
          onClick={() => scrollSlider('left')}
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-zinc-900/90 border border-white/15 text-white rounded-full p-2.5 shadow-xl hover:bg-emerald-700 hover:border-emerald-500 transition-all hidden md:flex items-center justify-center"
        >
          <ChevronLeft size={20} />
        </button>
        {/* Next arrow */}
        <button
          onClick={() => scrollSlider('right')}
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-zinc-900/90 border border-white/15 text-white rounded-full p-2.5 shadow-xl hover:bg-emerald-700 hover:border-emerald-500 transition-all hidden md:flex items-center justify-center"
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {/* Animated inner wrapper */}
          <div
            className="flex gap-6"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating
                ? `translateX(${animDir === 'right' ? '48px' : '-48px'})`
                : 'translateX(0px)',
              transition: 'opacity 0.26s cubic-bezier(0.4,0,0.2,1), transform 0.26s cubic-bezier(0.4,0,0.2,1)',
              minWidth: 'max-content',
            }}
          >
            {displayed.map((pkg) => {
              const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Hi! I would like to book the "${pkg.title}" package. Please share availability and details.`,
              )}`;

              return (
                <div
                  key={pkg.id}
                  className="snap-start flex-shrink-0 w-[310px] sm:w-[350px] md:w-[380px] group bg-zinc-900 rounded-2xl border border-white/10 hover:border-emerald-500/50 shadow-xl hover:shadow-emerald-950/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
                  onClick={() => openPackageModal(pkg)}
                >
                  {/* CARD TOP LABEL BAR */}
                  <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/10 bg-zinc-950/80">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400">
                      {pkg.categoryLabel}
                    </span>
                    {pkg.badge && (
                      <span className="bg-[#ff7700] text-white text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full uppercase shadow">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* FULL FLYER IMAGE CONTAINER - ASPECT-SQUARE TO SHOW SQUARE FLYER */}
                  <div className="relative aspect-square w-full bg-zinc-950 overflow-hidden group/img flex items-center justify-center border-b border-white/5">
                    <Image
                      src={pkg.image}
                      alt={`${pkg.title} - Full Official Tour Plan Flyer`}
                      fill
                      unoptimized
                      className="object-fill transition-transform duration-300 group-hover/img:scale-[1.02]"
                    />

                    {/* Subtle floating click/tap prompt pill that leaves flyer content fully visible */}
                    <div className="absolute bottom-2.5 inset-x-0 flex justify-center pointer-events-none z-10">
                      <div className="py-1 px-3 bg-black/80 hover:bg-black/90 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1.5 text-[11px] text-white font-medium shadow-lg transition-transform duration-200 group-hover/img:scale-105">
                        <ZoomIn size={13} className="text-[#FFA94D]" />
                        <span>Tap / Click to View Full Plan (HD)</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-emerald-400" />
                        {pkg.duration}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className={`font-semibold ${difficultyColor(pkg.difficulty)}`}>{pkg.difficulty}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="text-emerald-300 font-semibold">Min. 2 Persons</span>
                    </div>
                    <h3 className="text-white font-bold text-base md:text-lg leading-snug mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">{pkg.description}</p>
                    <div className="flex items-center gap-2 pt-3 border-t border-white/10 mt-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPackageModal(pkg);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-gray-200 hover:text-white text-xs font-semibold py-2.5 px-3 rounded-xl border border-white/15 transition-all shadow-sm cursor-pointer"
                      >
                        <ZoomIn size={14} className="text-[#FFA94D]" />
                        <span>View Full Plan</span>
                      </button>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1faa53] text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow transition-all hover:shadow-[#25D366]/30 active:scale-95 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                        </svg>
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}

            {displayed.length === 0 && (
              <div className="flex items-center justify-center w-full min-w-[300px] py-20 text-gray-500 text-sm">
                No packages in this category yet. Check back soon!
              </div>
            )}
          </div>
        </div>

        <div className="absolute left-0 top-0 bottom-4 w-6 bg-gradient-to-r from-[#081c15] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-4 w-6 bg-gradient-to-l from-[#081c15] to-transparent pointer-events-none z-10" />
      </div>

      {/* FULL HIGH-DEFINITION IMAGE PLAN LIGHTBOX MODAL */}
      {selectedPkg && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 pkg-modal-backdrop"
          onClick={() => {
            setSelectedPkg(null);
            setZoomLevel(1);
          }}
        >
          <div
            className="relative w-full max-w-5xl max-h-[96vh] bg-zinc-950 rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col pkg-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL TOP HEADER */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-zinc-900/95 shrink-0">
              <div className="flex items-center gap-3 min-w-0 pr-3">
                <span className="bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
                  {selectedPkg.categoryLabel}
                </span>
                <div className="truncate">
                  <h3 className="text-white font-bold text-sm sm:text-base md:text-lg truncate">
                    {selectedPkg.title}
                  </h3>
                  <p className="text-xs text-gray-400 hidden sm:block">
                    Official Itinerary Plan Flyer • Complete Schedule & Altitudes
                  </p>
                </div>
              </div>

              {/* Toolbar: Zoom controls + Open Original + Close */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:flex items-center bg-zinc-800/80 rounded-lg p-1 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(1, z - 0.3))}
                    className="p-1.5 text-gray-300 hover:text-white hover:bg-zinc-700 rounded transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <span className="text-[11px] font-mono text-gray-300 px-1.5 min-w-[42px] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.3))}
                    className="p-1.5 text-gray-300 hover:text-white hover:bg-zinc-700 rounded transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn size={15} />
                  </button>
                  {zoomLevel !== 1 && (
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1)}
                      className="text-[10px] font-semibold text-emerald-400 hover:text-emerald-300 px-1.5 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <a
                  href={selectedPkg.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-gray-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/15 transition-colors"
                  title="Open Full Image in New Tab"
                >
                  <ExternalLink size={13} className="text-orange-400" />
                  <span>Open HD</span>
                </a>

                <button
                  onClick={() => {
                    setSelectedPkg(null);
                    setZoomLevel(1);
                  }}
                  className="bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white p-2 rounded-lg transition-colors border border-white/10 cursor-pointer"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* MODAL MAIN CONTENT: Centered Full Flyer with Optional Next/Prev arrows */}
            <div className="relative flex-1 bg-black/70 overflow-auto flex items-center justify-center p-2 sm:p-4 min-h-[380px] md:min-h-[520px]">
              {/* Prev package in category */}
              <button
                onClick={() => navigateModal('prev')}
                aria-label="Previous Package Flyer"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-zinc-900/90 hover:bg-emerald-600 text-white p-2.5 sm:p-3 rounded-full border border-white/20 shadow-2xl transition-all cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Full Image */}
              <div
                className="relative max-h-[72vh] flex items-center justify-center transition-transform duration-200 cursor-zoom-in"
                style={{ transform: `scale(${zoomLevel})` }}
                onClick={() => setZoomLevel((z) => (z > 1 ? 1 : 1.6))}
                title="Click to toggle zoom"
              >
                <img
                  src={selectedPkg.image}
                  alt={selectedPkg.title}
                  className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl mx-auto border border-white/10 select-none"
                />
              </div>

              {/* Next package in category */}
              <button
                onClick={() => navigateModal('next')}
                aria-label="Next Package Flyer"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-zinc-900/90 hover:bg-emerald-600 text-white p-2.5 sm:p-3 rounded-full border border-white/20 shadow-2xl transition-all cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* MODAL BOTTOM BAR */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-zinc-900/95 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Clock size={13} /> {selectedPkg.duration}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className={`font-semibold ${difficultyColor(selectedPkg.difficulty)}`}>
                  {selectedPkg.difficulty}
                </span>
                <span className="hidden sm:inline text-gray-500">• Certified Local Guide Included</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                <a
                  href="tel:+919496520787"
                  className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-gray-200 text-xs sm:text-sm font-semibold py-2 px-3 sm:px-4 rounded-xl border border-white/15 transition-all"
                >
                  <Phone size={14} className="text-[#FFA94D]" />
                  <span className="hidden sm:inline">Call:</span>
                  <span>+91 94965 20787</span>
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hi! I am viewing the official tour plan flyer for "${selectedPkg.title}". Please share availability, departure points, and booking confirmation.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1faa53] text-white font-bold py-2 px-4 sm:px-5 rounded-xl text-xs sm:text-sm shadow-lg transition-all hover:shadow-[#25D366]/30 active:scale-95"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span>Book on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}