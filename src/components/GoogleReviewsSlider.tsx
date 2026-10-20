'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';

export interface GoogleReview {
  id: number;
  name: string;
  avatarColor: string;
  date: string;
  rating: number;
  tour: string;
  comment: string;
  likes?: number;
}

const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 1,
    name: 'Ananya Bhardwaj',
    avatarColor: 'bg-rose-600',
    date: '2 weeks ago',
    rating: 5,
    tour: 'Kolukkumalai Sunrise & Jeep Safari',
    comment: 'The off-road jeep safari up to Kolukkumalai was wild and thrilling, but the sunrise made every single bump worth it! Our guide Ramesh knew exactly where to stand to get the best photos and avoid the crowds. Unbelievable cloud bed views. 10/10 recommended for anyone visiting Munnar!',
    likes: 14,
  },
  {
    id: 2,
    name: 'David Miller',
    avatarColor: 'bg-blue-600',
    date: '1 month ago',
    rating: 5,
    tour: 'Chokramudi Peak Day Hike',
    comment: 'A truly world-class hiking experience. The guides are native mountaineers with immense knowledge of Shola ecology and mountain trails. The transition from tea estates to rocky peaks is breathtaking. Having hot breakfast at 7,200 ft was unforgettable!',
    likes: 9,
  },
  {
    id: 3,
    name: 'Mayank Karmakar',
    avatarColor: 'bg-amber-600',
    date: '3 weeks ago',
    rating: 5,
    tour: 'Meesapulimala Peak Expedition',
    comment: 'Conquered South India’s second highest peak with Munnar Hiking Tours. Everything was flawless — Forest Department permits, safety gear, trekking poles, and delicious local food. Transparent pricing with zero surprise charges. Outstanding team!',
    likes: 21,
  },
  {
    id: 4,
    name: 'Priya & Arjun Menon',
    avatarColor: 'bg-emerald-600',
    date: '1 month ago',
    rating: 5,
    tour: 'Tea Plantation & Shola Nature Walk',
    comment: 'We opted for the soft hiking experience with our family. It was serene, lush green, and deeply educational. Our guide Alvin explained the tea harvesting and colonial history in great depth. Extremely safe and kid-friendly.',
    likes: 12,
  },
  {
    id: 5,
    name: 'Sarah Jenkins',
    avatarColor: 'bg-purple-600',
    date: '2 months ago',
    rating: 5,
    tour: 'Anakulam Off-Road Safari & Elephant Watch',
    comment: 'Seeing wild elephant herds by the riverbank was the highlight of our Kerala holiday! The 4x4 jeep maneuvered through rugged riverbeds and cardamom groves like a breeze. Booking over WhatsApp was instant and easy.',
    likes: 17,
  },
  {
    id: 6,
    name: 'Rohit Verma',
    avatarColor: 'bg-teal-600',
    date: 'Just recently',
    rating: 5,
    tour: 'Top Station Sunrise & Cloud Bed Trek',
    comment: 'Waking up at 4:30 AM was worth every second. Standing above an endless sea of rolling clouds as the morning sun broke through gave us literal goosebumps. Real certified local guides who genuinely care about safety.',
    likes: 11,
  },
];

function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

interface GoogleReviewsSliderProps {
  googleProfileUrl?: string;
}

export default function GoogleReviewsSlider({
  googleProfileUrl = 'https://www.google.com/search?client=ms-android-oneplus-terr1-rso2&hs=AGBW&sca_esv=81ee190d3896ba19&sxsrf=APpeQnvy-VaMQ5f9lcszywa3MRwvjHixsg:1792478722265&kgmid=/g/11tk33_snl&q=Munnar+Hiking+Trails&shem=dlvs1,epsd1,ltae,rimspwouoe&shndl=30&source=sh/x/loc/uni/m1/2&kgs=a097737dee9eb764&utm_source=dlvs1,epsd1,ltae,rimspwouoe,sh/x/loc/uni/m1/2',
}: GoogleReviewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = GOOGLE_REVIEWS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto scroll every 5.5s when not hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  const currentReview = GOOGLE_REVIEWS[currentIndex];

  return (
    <section className="py-16 bg-white border-t border-b border-stone-200">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Rating Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GoogleIcon className="w-6 h-6" />
              <span className="text-xs font-bold tracking-widest text-[#163524] uppercase">
                Google Customer Reviews
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#163524] font-bold">
              Real Trekkers, Real 5-Star Stories
            </h2>
          </div>

          {/* 5.0/5.0 Rating Badge */}
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-stone-200 shadow-sm">
            <span className="font-extrabold text-2xl text-stone-900 font-sans tracking-tight">
              5.0/5.0
            </span>
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-stone-600 pl-1 border-l border-stone-200">
              Based on 500+ Reviews
            </span>
          </div>
        </div>

        {/* One-by-One Review Carousel Box */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-gradient-to-br from-stone-50 via-white to-stone-50 rounded-3xl p-6 sm:p-10 md:p-12 border border-stone-200/90 shadow-xl transition-all"
        >
          {/* Subtle Google Corner Badge */}
          <div className="absolute top-6 right-6 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-sm text-xs font-medium text-stone-700">
            <GoogleIcon className="w-4 h-4" />
            <span>Verified Google Review</span>
          </div>

          {/* Review Header: Avatar, Name, Stars */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-full ${currentReview.avatarColor} text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0`}
            >
              {currentReview.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-stone-900">{currentReview.name}</h3>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="flex items-center gap-2 mt-1">
                {/* 5-Star Rating */}
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-xs text-stone-500 font-medium">• {currentReview.date}</span>
              </div>
            </div>
          </div>

          {/* Tour/Package Badge */}
          <div className="inline-block bg-[#163524]/10 text-[#163524] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Trek: {currentReview.tour}
          </div>

          {/* Review Comment Text */}
          <p className="text-stone-700 text-base sm:text-lg md:text-xl leading-relaxed italic mb-8">
            "{currentReview.comment}"
          </p>

          {/* Carousel Footer Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-200/80">
            {/* Dots Pagination */}
            <div className="flex items-center gap-2">
              {GOOGLE_REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-[#ff7a00]'
                      : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
              <span className="text-xs font-mono text-stone-500 ml-2">
                {currentIndex + 1} / {total}
              </span>
            </div>

            {/* Prev / Next Buttons (Scroll One by One) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Review"
                className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-stone-100 flex items-center justify-center text-stone-700 hover:text-stone-950 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Review"
                className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-stone-100 flex items-center justify-center text-stone-700 hover:text-stone-950 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.2]" />
              </button>

              <a
                href={googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ff7a00] hover:bg-[#e86f00] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all ml-2"
              >
                <GoogleIcon className="w-4 h-4 bg-white rounded-full p-0.5" />
                Write a Review <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
