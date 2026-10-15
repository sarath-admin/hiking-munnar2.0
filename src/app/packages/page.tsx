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
      price: '₹5,500',
      imageUrl: '/images/chokramudi.png',
      isPopular: true
    },
    {
      title: 'Meesapulimala Peak & Camp',
      slug: 'meesapulimala-camping',
      duration: '2 Days / 1 Night',
      difficulty: 'Challenging',
      price: '₹6,000',
      imageUrl: '/images/meesapulimala.png',
      isPopular: false
    },
    {
      title: '3-Day Deep Forest Expedition',
      slug: '3-day-deep-forest',
      duration: '3 Days / 2 Nights',
      difficulty: 'Challenging',
      price: '₹9,500',
      imageUrl: '/images/tea_walk.png',
      isPopular: false
    },
    {
      title: 'Kolukkumalai Sunrise + Jeep Safari',
      slug: 'sunrise-safari-combo',
      duration: '1 Day',
      difficulty: 'Easy',
      price: '₹2,500',
      imageUrl: '/images/kolukkumalai.png',
      isPopular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="relative h-[40vh] w-full mb-16">
        <Image 
          src="/images/chokramudi.png" 
          alt="Camping in Munnar" 
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 flex items-center px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">Multi-Day Packages</h1>
            <p className="text-gray-200 max-w-2xl text-lg">
              Combine trekking, jeep safaris, and overnight camping into one seamless adventure. All-inclusive packages with food, transport, and expert guides.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map(pkg => (
            <TrekCard key={pkg.slug} {...pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}
