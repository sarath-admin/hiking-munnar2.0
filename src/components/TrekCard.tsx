import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';

interface TrekCardProps {
  title: string;
  slug: string;
  duration: string;
  difficulty: string;
  price: string;
  imageUrl: string;
  category?: string;
  description?: string;
  isPopular?: boolean;
}

export default function TrekCard({ title, slug, duration, difficulty, price, imageUrl, category, description, isPopular }: TrekCardProps) {
  return (
    <Link href="/contact" className="block">
      <div className="bg-[#1C2024] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full border border-gray-800">
        <div className="relative h-56 w-full overflow-hidden">
          {isPopular && (
            <div className="absolute top-4 left-4 z-10 bg-[#FFA94D] text-[#1A1A1A] text-xs font-bold px-3 py-1.5 rounded-sm shadow-md tracking-wider">
              MOST POPULAR
            </div>
          )}
          <Image 
            src={imageUrl} 
            alt={title} 
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {category && (
            <div className="absolute bottom-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
              {category}
            </div>
          )}
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#FFA94D]" />
              <span>{duration}</span>
            </div>
            <span className="text-gray-600 px-1">•</span>
            <span>{difficulty}</span>
          </div>
          
          <h3 className="text-white font-bold text-2xl leading-snug mb-3 group-hover:text-[#FFA94D] transition-colors">
            {title}
          </h3>

          <p className="text-gray-400 text-base leading-relaxed mb-4 line-clamp-2">
            {description || `Experience the ultimate adventure with our expertly guided ${title}. Witness breathtaking views and create unforgettable memories.`}
          </p>
          
        </div>
      </div>
    </Link>
  );
}
