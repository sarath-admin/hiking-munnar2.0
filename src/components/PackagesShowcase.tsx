'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, Clock, MapPin, Users, CheckCircle2, X, ZoomIn } from 'lucide-react';

export interface PackageItem {
  id: string;
  title: string;
  category: 'trekking' | 'safari' | 'tea';
  subtitle: string;
  image: string;
  distance: string;
  time: string;
  price: string;
  minPersons: string;
  altitude: string;
  highlights: string[];
  inclusions: string;
}

export const TOUR_PACKAGES: PackageItem[] = [
  {
    id: 'sunrise-trekking',
    category: 'trekking',
    title: 'Sun Rise Trekking',
    subtitle: 'Chase the sun. Feel the magic above the clouds.',
    image: '/images/packages/sunrise_trekking_hq.jpg',
    distance: '10 Kms',
    time: '05:30 AM – 11:30 AM',
    price: '₹2,000 / Person',
    minPersons: '4 Nos',
    altitude: '2,400 Mtrs Peak',
    highlights: ['Drive to base (1750m)', 'Golden sunrise view over cloud beds', 'Trek through high grasslands & rocks', 'Hot homemade mountain breakfast'],
    inclusions: 'Food, Water, Guide and Jeep Transportation',
  },
  {
    id: 'soft-hiking',
    category: 'trekking',
    title: 'Soft Hiking Tours',
    subtitle: 'Walk gently. Explore deeply. Feel Munnar.',
    image: '/images/packages/soft_hiking_hq.jpg',
    distance: '6 Kms (Easy Walk)',
    time: '10:00 AM – 01:00 PM',
    price: '₹800 / Person',
    minPersons: '2 Nos',
    altitude: '1,850 Mtrs Summit',
    highlights: ['Gentle slopes & tea plantation walk', 'Scenic rolling grasslands & rock points', 'Mountain top snack break', 'Ideal for families, couples & beginners'],
    inclusions: 'Snacks, Expert Local Guide, Water, Forest Entry Pass',
  },
  {
    id: 'half-day-trekking',
    category: 'trekking',
    title: 'Half Day Trekking & Hiking',
    subtitle: 'Explore the beauty of Munnar with our guided half-day adventure.',
    image: '/images/packages/half_day_trekking_hq.jpg',
    distance: '10 Kms',
    time: '07:00 AM – 12:30 PM',
    price: '₹1,000 / Person',
    minPersons: '2 Nos',
    altitude: '2,000 Mtrs Summit',
    highlights: ['Ascend from 1550m to 2000m mountain top', 'Fresh homemade breakfast at summit', 'Pass through cardamom, coffee & tea estates', 'Return to Munnar by vehicle'],
    inclusions: 'Homemade Breakfast, Guide, Water, Forest Entry Pass',
  },
  {
    id: 'full-day-trekking',
    category: 'trekking',
    title: 'Full Day Trekking',
    subtitle: 'A day of grand adventure, lush nature & lasting memories.',
    image: '/images/packages/full_day_trekking_hq.jpg',
    distance: '17 Kms',
    time: '07:00 AM – 04:30 PM',
    price: '₹2,000 / Person',
    minPersons: '3 Nos',
    altitude: '2,100 Mtrs Summit',
    highlights: ['Summit climb (2100m) with breakfast', 'Native shola forest & spice plantations', 'Traditional homemade lunch at 1700m', 'Return to Munnar town by vehicle'],
    inclusions: 'Breakfast, Lunch, Water, Expert Trekking Guide',
  },
  {
    id: 'grassland-hiking',
    category: 'trekking',
    title: 'Grass Land Hiking Tours',
    subtitle: 'Walk through nature\'s purest beauty across Neelakurinji ridges & valleys.',
    image: '/images/packages/grassland_hiking_hq.jpg',
    distance: '12 Kms',
    time: '07:00 AM – 02:00 PM',
    price: '₹1,800 / Person',
    minPersons: '3 Nos',
    altitude: '2,250 Mtrs Peak',
    highlights: ['Drive to base (1550m)', 'Walk along expansive mountain grassland ridges', 'Summit top at 2250m with homemade food', 'Juice, fresh snacks and fruit stops'],
    inclusions: 'Food (Homemade Breakfast), Guide, Water, Juice & Forest Pass',
  },
  {
    id: 'anakulam-jeep-safari',
    category: 'safari',
    title: 'Anakulam Jeep Safari',
    subtitle: 'Explore nature. Feel the off-road adventure, waterfalls & wild elephant spots.',
    image: '/images/packages/anakulam_jeep_safari_hq.jpg',
    distance: 'Off-Road 4x4 Circuit',
    time: 'Full Circuit Safari',
    price: '₹5,000 / Jeep',
    minPersons: '2 to 6 People',
    altitude: 'Scenic Waterfalls & Jungle',
    highlights: ['Kotta para hill view & Viripara waterfalls', 'Chocolate & spice plantation tour', 'Perambankuthu & 33 waterfalls with privacy trek', 'Anakulam elephant watering spot'],
    inclusions: '4x4 Off-Road Jeep, Fuel, Certified Mountain Driver',
  },
  {
    id: 'tea-experience-program',
    category: 'tea',
    title: 'Tea Experience Program',
    subtitle: 'Discover the complete journey of tea: Plantation • Factory • Tasting.',
    image: '/images/packages/tea_experience_hq.jpg',
    distance: 'Guided Walk & Tasting',
    time: '3½ – 4 Hours Total',
    price: 'Special Experience',
    minPersons: 'Solo, Couples & Families',
    altitude: 'Nullatanni & Tea Valleys',
    highlights: ['2-Hour guided walk through tea plantation', 'Step-by-step factory visit & machinery tour (45-60m)', 'Tea tasting session of grades & aroma (30m)', 'Learn artisan plucking from local planters'],
    inclusions: 'Tea Plantation Guided Walk, Factory Entry Tour, Tea Tasting',
  },
  {
    id: 'soft-hiking-tea-combo',
    category: 'tea',
    title: 'Soft Hiking & Tea Walk Combo',
    subtitle: 'Experience the best of Munnar: Morning summit walk + colonial tea masterclass.',
    image: '/images/packages/tea_and_hiking_combo_hq.jpg',
    distance: '6 Kms + Tea Estate',
    time: 'Full Experience Program',
    price: '₹800 / ₹1,500 Options',
    minPersons: '2 Nos',
    altitude: '1,850 Mtrs & Estate',
    highlights: ['Program 1: 6km Soft Hiking Tour (Grassland & Rocks)', 'Program 2: Tea Plantation Walk + Factory + Tasting', 'Learn cultivation, grades, flavor notes', 'Authentic local experience with local guides'],
    inclusions: 'Hike Guide, Snacks, Water, Factory Entry & Tea Tasting',
  },
];

interface PackagesShowcaseProps {
  showTitle?: boolean;
  limit?: number;
}

export default function PackagesShowcase({ showTitle = true, limit }: PackagesShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'trekking' | 'safari' | 'tea'>('all');
  const [selectedImage, setSelectedImage] = useState<PackageItem | null>(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace('+', '') || '919496520787';

  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    if (selectedCategory === 'all') return true;
    return pkg.category === selectedCategory;
  });

  const displayedPackages = limit ? filteredPackages.slice(0, limit) : filteredPackages;

  return (
    <div className="w-full">
      {showTitle && (
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[#ff7700] font-bold tracking-widest uppercase text-xs md:text-sm bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20 inline-block mb-3">
            Handcrafted Itineraries
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Tour Packages – Munnar
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            High-quality guided adventures led by certified local trail experts. View our complete tour itineraries below and book instantly on WhatsApp.
          </p>
        </div>
      )}

      {/* CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
        {[
          { key: 'all', label: `All Packages (${TOUR_PACKAGES.length})` },
          { key: 'trekking', label: `Trekking & Hiking (${TOUR_PACKAGES.filter(p => p.category === 'trekking').length})` },
          { key: 'safari', label: `Jeep Safari (${TOUR_PACKAGES.filter(p => p.category === 'safari').length})` },
          { key: 'tea', label: `Tea Experiences (${TOUR_PACKAGES.filter(p => p.category === 'tea').length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedCategory(tab.key as any)}
            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 border ${
              selectedCategory === tab.key
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-950/40'
                : 'bg-zinc-900/80 text-gray-300 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2-COLUMN GRID — balanced, equal-width poster cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {displayedPackages.map((pkg, index) => {
          const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            `Hi! I would like to book the "${pkg.title}" package (${pkg.price}). Please share availability and details.`
          )}`;

          return (
            <div
              key={pkg.id}
              className="group bg-zinc-900/90 rounded-3xl border border-white/10 hover:border-emerald-500/40 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/30 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* IMAGE POSTER PREVIEW — constrained, centered, equal-height */}
              <div
                className="relative cursor-pointer bg-zinc-800/60 px-4 pt-4 pb-2"
                onClick={() => setSelectedImage(pkg)}
              >
                {/* Fixed-height poster container: 15-20% smaller than before */}
                <div className="relative w-full" style={{ maxHeight: '560px', aspectRatio: '680 / 1024', margin: '0 auto', overflow: 'hidden' }}>
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    width={680}
                    height={1024}
                    quality={95}
                    priority={index < 2}
                    className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ display: 'block' }}
                  />
                </div>

                {/* Hover overlay hint to view/zoom */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none rounded-t-3xl">
                  <span className="bg-black/80 backdrop-blur-md text-white font-medium text-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
                    <ZoomIn size={16} className="text-emerald-400" />
                    Click to view full poster
                  </span>
                </div>
              </div>

              {/* CARD DETAILS & ACTION BAR */}
              <div className="p-6 md:p-8 flex flex-col flex-grow justify-between bg-zinc-900/95 border-t border-white/10">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {pkg.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {pkg.subtitle}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-white/10 mb-6 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-emerald-400 shrink-0" />
                      <span>{pkg.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-emerald-400 shrink-0" />
                      <span>{pkg.altitude}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-emerald-400 shrink-0" />
                      <span>Min {pkg.minPersons}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span className="truncate">{pkg.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1faa53] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-[#25D366]/30 active:scale-[0.98] text-sm text-center"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Book on WhatsApp
                  </a>

                  <button
                    onClick={() => setSelectedImage(pkg)}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-5 rounded-xl border border-white/15 transition-all text-sm active:scale-[0.98]"
                  >
                    <Eye size={16} />
                    View Itinerary
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[95vh] w-full flex flex-col items-center bg-zinc-950 rounded-2xl border border-white/20 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-white/10">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-gray-400">
                  {selectedImage.distance} • {selectedImage.price}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Poster Image in full view */}
            <div className="w-full overflow-y-auto max-h-[75vh] flex justify-center p-4 bg-black/50">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={850}
                height={1200}
                quality={100}
                className="max-h-[72vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Modal Footer with Direct WhatsApp */}
            <div className="w-full p-4 bg-zinc-900 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-gray-400 hidden sm:inline">
                Call / WhatsApp directly at: <strong className="text-white">+91 94965 20787</strong>
              </span>
              <div className="flex gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hi! I would like to book the "${selectedImage.title}" (${selectedImage.price}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1faa53] text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all"
                >
                  Book on WhatsApp
                </a>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-5 rounded-xl text-sm transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
