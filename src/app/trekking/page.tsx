'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import RadialTourCarousel from '@/components/RadialTourCarousel';

// Map each filter button label to the tour category values it should match
const categoryFilterMap: Record<string, string[]> = {
  'All Tours': [],
  'Jeep Safaris': ['JEEP SAFARIS'],
  'Trekking & Hiking': ['TREKKING'],
  'Tea Experiences': ['TEA EXPERIENCES'],
  'Wildlife Sanctuaries': ['WILDLIFE'],
  'Sunrise Points': ['JEEP SAFARIS', 'TREKKING'],  // sunrise-related tours
  'Heritage & TukTuk': ['SIGHTSEEING', 'WATERFALL TOURS'],
};

const categories = Object.keys(categoryFilterMap);

const tours = [
  {
    title: 'Kolukkumalai Sunrise Trekking Adventure',
    category: 'JEEP SAFARIS',
    duration: '3-6 Hours',
    difficulty: 'Moderate',
    description: 'Ride rugged 4x4 trails to witness the golden sunrise at the world\'s highest organic tea plantation...',
    price: 'Custom Quote',
    imageUrl: '/images/kolukkumalai.png',
    isPopular: true
  },
  {
    title: 'Full Day Mountain Hiking in Munnar',
    category: 'TREKKING',
    duration: '5-8 Hours',
    difficulty: 'Challenging',
    description: 'Summit high-altitude grassy knolls, cross native shola forest corridors, and spot...',
    price: 'Custom Quote',
    imageUrl: '/images/chokramudi.png',
    isPopular: false
  },
  {
    title: 'Tea Plantation Walk with Sunset View',
    category: 'TEA EXPERIENCES',
    duration: '2-4 Hours',
    difficulty: 'Easy',
    description: 'Meander through private colonial trails, learn artisan plucking traditions, and enjoy freshly...',
    price: 'Custom Quote',
    imageUrl: '/images/tea_walk.png',
    isPopular: false
  },
  {
    title: 'Chinnar Wildlife & Valley View Tour',
    category: 'WILDLIFE',
    duration: '5 Hours',
    difficulty: 'Moderate',
    description: 'Journey to Munnar\'s dry-shadow wilderness to witness wild star tortoises, giant grizzled...',
    price: 'Custom Quote',
    imageUrl: '/images/meesapulimala.png',
    isPopular: false
  },
  {
    title: 'Waterfall Sightseeing Adventure',
    category: 'WATERFALL TOURS',
    duration: '4 Hours',
    difficulty: 'Easy-Mod',
    description: 'Explore Munnar\'s most stunning cascading waterfalls, lush forest streams, and scenic riverbed trails with local guides...',
    price: 'Custom Quote',
    imageUrl: '/images/slide2.jpg',
    isPopular: false
  },
  {
    title: 'Explore Munnar City on TukTuk',
    category: 'SIGHTSEEING',
    duration: '4 Hours',
    difficulty: 'Easy',
    description: 'Whip through local spice markets, old colonial churches, artisanal chocolate kitchens, and...',
    price: 'Custom Quote',
    imageUrl: '/images/tuktuk_munnar_tour.png',
    isPopular: false
  }
];

export default function TrekkingHub() {
  const [activeFilter, setActiveFilter] = useState('All Tours');

  const filteredTours = activeFilter === 'All Tours'
    ? tours
    : tours.filter(tour => {
        const matchCategories = categoryFilterMap[activeFilter] || [];
        return matchCategories.includes(tour.category);
      });

  return (
    <div className="bg-[#1a1c1a] min-h-screen text-gray-200 pb-20 pt-10">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-gray-800 pb-8">
          <div className="max-w-2xl">
            <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
              <span className="text-[var(--color-accent)] mr-2">▶</span> EXPLORE OUR CATALOG
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Adventure Starts Here</h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Explore pristine cloudscapes, world-heritage rainforests, colonial tea routes, or wildlife sanctuary boundaries.
            </p>
          </div>
          <a 
            href="https://wa.me/919496520787?text=Hi!%20I%20am%20looking%20for%20a%20custom%20trekking%20tour%20in%20Munnar." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#2d4a3e] hover:bg-[#3d5a4e] text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors border border-[#3d5a4e] self-start md:self-end"
          >
            <MessageCircle size={18} />
            Custom Request on Whatsapp
          </a>
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === cat 
                  ? 'bg-[#2d4a3e] text-white border border-[#3d5a4e]' 
                  : 'bg-[#252725] text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Radial Tour Carousel */}
        {filteredTours.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg font-medium">No tours found for this category.</p>
            <button
              onClick={() => setActiveFilter('All Tours')}
              className="mt-4 text-[#e8a365] hover:underline text-sm font-semibold cursor-pointer"
            >
              View All Tours
            </button>
          </div>
        ) : (
          <RadialTourCarousel key={activeFilter} tours={filteredTours} />
        )}
        
      </div>
    </div>
  );
}
