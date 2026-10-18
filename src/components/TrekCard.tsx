'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export interface TrekCardProps {
  title: string;
  slug: string;
  duration: string;
  difficulty: string;
  price?: string;
  imageUrl: string;
  category?: string;
  description?: string;
  isPopular?: boolean;
}

export default function TrekCard({
  title,
  slug,
  duration,
  difficulty,
  imageUrl,
  category,
  description,
  isPopular,
}: TrekCardProps) {
  const prefersReduced = useReducedMotion();
  const tourUrl = `/tours/${slug}`;

  return (
    <Link
      href={tourUrl}
      className="block group h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA94D] rounded-2xl"
      aria-label={`View details for ${title}`}
    >
      <motion.div
        whileHover={prefersReduced ? undefined : { y: -6 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#1C2024] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 flex flex-col h-full border border-gray-800 hover:border-emerald-500/40 relative cursor-pointer"
      >
        {/* Card Image Container */}
        <div className="relative h-60 w-full overflow-hidden bg-zinc-900">
          {isPopular && (
            <div className="absolute top-4 left-4 z-20 bg-[#FFA94D] text-[#1A1A1A] text-[11px] font-black px-3 py-1.5 rounded-sm shadow-md tracking-wider uppercase">
              MOST POPULAR
            </div>
          )}

          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#1C2024] via-transparent to-transparent opacity-80" />

          {category && (
            <div className="absolute bottom-4 right-4 z-10 bg-black/75 backdrop-blur-sm text-gray-200 text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider border border-white/10">
              {category}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            {/* Meta Row: Duration + Difficulty */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-[#FFA94D]" />
                <span>{duration}</span>
              </div>
              <span className="text-gray-600 px-1">•</span>
              <span className="text-emerald-400 font-semibold">{difficulty}</span>
            </div>

            {/* Title */}
            <h3 className="text-white font-bold text-xl sm:text-2xl leading-snug mb-3 group-hover:text-[#FFA94D] transition-colors font-serif line-clamp-2">
              {title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {description ||
                `Experience an unforgettable adventure with our certified guides on this ${title}. Witness breathtaking viewpoints and local landscapes.`}
            </p>
          </div>

          {/* Footer Bar: View Itinerary Arrow */}
          <div className="pt-3.5 border-t border-gray-800/80 flex items-center justify-between mt-auto">
            <span className="text-xs text-gray-400 font-medium">Certified Local Guide</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <span>View Itinerary</span>
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
