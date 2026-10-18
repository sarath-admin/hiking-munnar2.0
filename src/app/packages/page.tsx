import React from 'react';
import TrekCard from '@/components/TrekCard';
import Image from 'next/image';

export const metadata = {
  title: 'Multi-Day Packages | Munnar Hiking Tours',
  description: 'Explore our all-inclusive 2-day and 3-day trekking and camping packages in Munnar.',
};

export default function PackagesPage() {
  const packages = [
    {
      title: '2-Day Ultimate Munnar Explorer',
      slug: '2-day-munnar-explorer',
      duration: '2 Days / 1 Night',
      difficulty: 'Moderate',
      imageUrl: '/images/chokramudi.png',
      isPopular: true
    },
    {
      title: 'Meesapulimala Peak & Camp',
      slug: 'meesapulimala-camping',
      duration: '2 Days / 1 Night',
      difficulty: 'Challenging',
      imageUrl: '/images/meesapulimala.png',
      isPopular: false
    },
    {
      title: '3-Day Deep Forest Expedition',
      slug: '3-day-deep-forest',
      duration: '3 Days / 2 Nights',
      difficulty: 'Challenging',
      imageUrl: '/images/tea_walk.png',
      isPopular: false
    },
    {
      title: 'Kolukkumalai Sunrise + Jeep Safari',
      slug: 'sunrise-safari-combo',
      duration: '1 Day',
      difficulty: 'Easy',
      imageUrl: '/images/kolukkumalai.png',
      isPopular: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#14171A] pb-20 text-zinc-100">
      <div className="relative h-[48vh] md:h-[55vh] w-full mb-16 pt-24">
        <Image 
          src="/images/chokramudi.png" 
          alt="Camping in Munnar" 
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-zinc-950/70 to-black/50 flex items-center px-4">
          <div className="container mx-auto max-w-7xl pt-12">
            <span className="text-[#FFA94D] text-xs font-bold uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block mb-3">
              EXPEDITIONS & COMBOS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-serif mb-4 drop-shadow-xl">Multi-Day Packages</h1>
            <p className="text-gray-300 max-w-2xl text-base md:text-lg leading-relaxed drop-shadow-md">
              Combine trekking, jeep safaris, and overnight camping into one seamless adventure. All-inclusive packages with food, transport, and expert guides.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map(pkg => (
            <TrekCard key={pkg.slug} {...pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}
