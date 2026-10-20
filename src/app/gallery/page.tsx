import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import TravelPhotoJournal from '@/components/journal/TravelPhotoJournal';
import MediaGallery from '@/components/MediaGallery';

export const metadata: Metadata = {
  title: 'Media Gallery – Munnar Hiking Tours & Mountain Resort',
  description: 'Explore the visual portrait of Munnar. Stunning photographs and videos of sunrise treks, luxury suites, infinity pool vistas, and lush cardamom nature walks.',
  keywords: 'Munnar photos, Munnar gallery, Kolukkumalai sunrise photos, Munnar resort infinity pool, trekking photos Kerala',
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf7]">
      {/* 3D Photobook / Coverflow Carousel (Top Position) */}
      <TravelPhotoJournal isTopPosition={true} />

      {/* Media Gallery Component */}
      <MediaGallery />

      {/* Call To Action Section */}
      <section className="py-20 bg-stone-900 text-white relative overflow-hidden border-t border-stone-800">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck size={16} /> Certified Local Guides & Verified Stays
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
            Ready to Live These Moments in Person?
          </h2>
          <p className="text-stone-300 text-base md:text-lg mb-8 leading-relaxed">
            Book your sunrise trekking, off-road jeep safari, or customized Kerala hill holiday today with zero upfront booking fees.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105"
            >
              Plan Your Adventure <ArrowRight size={18} />
            </Link>
            <Link
              href="/tours-packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all"
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
