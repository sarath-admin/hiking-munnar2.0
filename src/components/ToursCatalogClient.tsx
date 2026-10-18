'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Compass, MessageCircle, Route } from 'lucide-react';
import TrekCard from '@/components/TrekCard';
import { getAllTours, TourItem } from '@/data/toursData';

const categories = [
  'All Tours',
  'Jeep Safaris',
  'Trekking Adventure',
  'Tea Experiences',
  'Wildlife Sanctuaries',
  'Sunrise Points',
  'Heritage & TukTuk',
];

export default function ToursCatalogClient() {
  const [activeCategory, setActiveCategory] = useState('All Tours');
  const [searchQuery, setSearchQuery] = useState('');

  const allTours = getAllTours();

  const filteredTours = allTours.filter((tour) => {
    // Category match
    const cat = tour.category.toLowerCase();
    const active = activeCategory.toLowerCase();
    let matchesCategory = false;

    if (active === 'all tours') {
      matchesCategory = true;
    } else if (active === 'trekking adventure') {
      matchesCategory = cat === 'trekking adventure' || cat === 'trekking';
    } else if (active === 'jeep safaris') {
      matchesCategory = cat === 'jeep safaris';
    } else if (active === 'tea experiences') {
      matchesCategory = cat === 'tea experiences';
    } else if (active === 'wildlife sanctuaries') {
      matchesCategory = cat === 'wildlife sanctuaries' || cat === 'wildlife';
    } else if (active === 'sunrise points') {
      matchesCategory = cat === 'sunrise points' || cat === 'sunrise';
    } else if (active === 'heritage & tuktuk') {
      matchesCategory = cat === 'heritage & tuktuk' || cat === 'heritage' || cat === 'sightseeing';
    } else {
      matchesCategory = cat === active;
    }

    // Search query match
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      tour.title.toLowerCase().includes(query) ||
      tour.shortDescription.toLowerCase().includes(query) ||
      tour.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919496520787';

  return (
    <div className="min-h-screen bg-[#14171A] text-zinc-100">
      {/* HERO BANNER */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/images/hero_scenic_sunrise.jpg"
            alt="Munnar Tours Catalog"
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-zinc-950/75 to-[#14171A]" />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFA94D] bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            OFFICIAL TOUR CATALOG
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white font-serif mb-4 drop-shadow-xl tracking-tight">
            Explore Munnar Tours & Treks
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
            Click any tour card to view detailed itineraries, time schedules, inclusions, and direct booking options with verified local guides.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tour name, jeep, sunrise..."
              className="w-full bg-zinc-900/90 border border-white/15 rounded-full py-3 pl-12 pr-6 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 shadow-xl backdrop-blur-md"
            />
          </div>
        </div>
      </section>

      {/* FILTER TABS & CATALOG GRID */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* CATEGORY FILTER BAR */}
          <div className="flex gap-2 bg-[#1C1F22] p-2 rounded-full overflow-x-auto hide-scrollbar mb-10 mx-auto w-fit max-w-full border border-white/10 shadow-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#2A4136] text-white shadow-md border border-emerald-500/40'
                    : 'bg-transparent hover:bg-[#2A2E33] text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-8 text-xs sm:text-sm text-gray-400">
            <span>
              Showing <strong className="text-white">{filteredTours.length}</strong> tours in Munnar
            </span>
            <a
              href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=Hi!%20I%20am%20looking%20for%20a%20custom%20Munnar%20tour.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <MessageCircle size={15} />
              <span>Need custom itinerary? Chat with guide</span>
            </a>
          </div>

          {/* TOURS GRID */}
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour, index) => (
                <TrekCard
                  key={`${tour.id || tour.slug}-${index}`}
                  title={tour.title}
                  slug={tour.slug}
                  duration={tour.duration}
                  difficulty={tour.difficulty}
                  imageUrl={tour.imageUrl}
                  category={tour.category}
                  description={tour.shortDescription}
                  isPopular={tour.isPopular}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-zinc-900/40 rounded-3xl border border-white/10 p-8">
              <Compass className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">No tours found matching &quot;{searchQuery}&quot;</h3>
              <p className="text-sm text-gray-400 mb-6">
                Try searching with different terms or reset your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All Tours');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
