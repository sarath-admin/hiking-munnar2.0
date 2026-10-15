'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, X, ChevronLeft, ChevronRight, Eye, ExternalLink, Sparkles } from 'lucide-react';
import { useGallery, GalleryItem } from '@/lib/galleryStore';

export type { GalleryItem };

const categories = ['ALL', 'ROOMS', 'RESORT', 'NATURE', 'VIDEO'] as const;

export default function MediaGallery() {
  const { items, loading } = useGallery();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'ALL'
    ? items
    : items.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredItems.length);
  };

  const showPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <section className="bg-[#fcfbf7] py-16 md:py-24 border-b border-[#eae4d7]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <span className="text-[#9c783e] font-semibold text-xs md:text-sm tracking-[0.25em] uppercase block mb-2 font-sans">
            VISUAL PORTRAIT
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#163524] tracking-tight font-normal">
            Media Gallery
          </h2>
          <div className="w-16 h-[2px] bg-[#c39b5c] mx-auto mt-3 mb-8"></div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 mt-6">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-md text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#163524] text-white shadow-md'
                      : 'text-stone-700 hover:text-[#163524] hover:bg-stone-200/50'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#eae4d7] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  unoptimized={true}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />

                {/* Resolution / Custom Badge */}
                {item.dimensions && (
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white tracking-wide shadow-sm flex items-center gap-1 opacity-90">
                    <Sparkles size={10} className="text-amber-400" />
                    {item.dimensions}
                  </div>
                )}

                {/* Video Play Button Overlay */}
                {item.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#c39b5c]/90 text-stone-900 group-hover:bg-[#b88c49] group-hover:scale-110 flex items-center justify-center shadow-xl transition-transform duration-300">
                      <Play size={22} className="fill-stone-900 ml-1 text-stone-900" />
                    </div>
                  </div>
                )}

                {/* View Icon for Non-Video */}
                {!item.isVideo && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm text-white p-2 rounded-full">
                    <Eye size={16} />
                  </div>
                )}
              </div>

              {/* Card Caption Information */}
              <div className="p-5 bg-white flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-base md:text-lg font-bold text-[#163524] group-hover:text-[#2d6a4f] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#9c783e] uppercase block font-sans">
                      {item.category}
                    </span>
                    {item.fileSize && (
                      <span className="text-[10px] text-stone-400 font-mono">
                        {item.fileSize}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State if needed */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-stone-500">
            No media items found for this category.
          </div>
        )}
      </div>

      {/* Interactive Lightbox Modal */}
      {currentItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <X size={26} />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <ChevronLeft size={30} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <ChevronRight size={30} />
          </button>

          {/* Main Modal Content */}
          <div 
            className="relative max-w-5xl w-full max-h-[88vh] flex flex-col items-center bg-stone-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[55vh] md:h-[68vh] bg-black">
              <Image
                src={currentItem.imageUrl}
                alt={currentItem.title}
                fill
                priority
                unoptimized={true}
                className="object-contain"
              />

              {currentItem.isVideo && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                  <div className="w-20 h-20 rounded-full bg-[#c39b5c] text-stone-900 flex items-center justify-center shadow-2xl mb-4 hover:scale-105 transition-transform cursor-pointer">
                    <Play size={36} className="fill-stone-900 ml-1" />
                  </div>
                  <span className="text-white text-sm font-medium bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-sm">
                    Watch Munnar Video Reel
                  </span>
                </div>
              )}
            </div>

            {/* Modal Caption */}
            <div className="w-full bg-stone-950 px-6 py-4 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#c39b5c] uppercase">
                    {currentItem.category}
                  </span>
                  <span className="text-stone-500 text-xs">
                    {selectedIndex !== null ? selectedIndex + 1 : 1} of {filteredItems.length}
                  </span>
                  {currentItem.dimensions && (
                    <span className="text-stone-400 text-xs px-2.5 py-0.5 rounded bg-white/10 font-mono">
                      {currentItem.dimensions}
                    </span>
                  )}
                </div>
                <h4 className="text-white font-serif text-xl font-bold mt-1">
                  {currentItem.title}
                </h4>
                {currentItem.description && (
                  <p className="text-stone-400 text-xs md:text-sm mt-1 max-w-2xl">
                    {currentItem.description}
                  </p>
                )}
              </div>

              {/* Full Original Resolution Link */}
              <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                <a
                  href={currentItem.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
                  title="Open original lossless image in new tab"
                >
                  <ExternalLink size={14} /> Full Resolution
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
