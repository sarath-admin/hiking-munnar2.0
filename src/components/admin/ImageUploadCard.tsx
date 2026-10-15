'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UploadCloud, X, Eye, CheckCircle2, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';
import { useAdminStore } from '@/lib/adminData';
import { useGallery } from '@/lib/galleryStore';

export default function ImageUploadCard() {
  const { images, addImage, deleteImage } = useAdminStore();
  const { addItem: addGalleryItem } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState<'NATURE' | 'ROOMS' | 'RESORT' | 'VIDEO'>('NATURE');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [previewModalImg, setPreviewModalImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = (file: File) => {
    if (!file) return;

    // Check size limit 25MB (support high-res camera photos!)
    if (file.size > 25 * 1024 * 1024) {
      alert('File size exceeds 25MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const resultUrl = e.target?.result as string;
      if (resultUrl) {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

        // Get exact image natural resolution without downscaling
        const imgObj = new window.Image();
        imgObj.onload = () => {
          const dims = `${imgObj.naturalWidth} × ${imgObj.naturalHeight} px`;

          // 1. Add to Admin dashboard store
          addImage({
            name: file.name,
            url: resultUrl,
            size: `${sizeMb} MB`,
            type: file.type,
          });

          // 2. Automatically sync to public Media Gallery in full resolution!
          addGalleryItem({
            title: cleanName,
            category: selectedCategory,
            imageUrl: resultUrl,
            dimensions: dims,
            fileSize: `${sizeMb} MB`,
            description: `High-resolution photograph of ${cleanName} in Munnar. Added from Admin Dashboard.`,
          });

          setUploadSuccess(`"${cleanName}" added to Media Gallery at full resolution (${dims})!`);
          setTimeout(() => setUploadSuccess(null), 5000);
        };
        imgObj.src = resultUrl;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const visibleThumbnails = images.slice(0, 4);
  const extraCount = Math.max(0, images.length - 4);

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-150 shadow-sm flex flex-col justify-between h-full">
      {/* Title & Category Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight">
            Upload Image
          </h3>
          <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles size={11} /> Syncs to Gallery
          </span>
        </div>

        {/* Gallery Target Category Selector */}
        <div className="mb-3.5">
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
            Gallery Category:
          </p>
          <div className="grid grid-cols-4 gap-1.5 bg-stone-100 p-1 rounded-xl">
            {(['NATURE', 'ROOMS', 'RESORT', 'VIDEO'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-1 text-[10px] font-bold rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileProcess(e.target.files[0]);
          }
        }}
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
      />

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
          isDragging
            ? 'border-orange-500 bg-orange-50/60 scale-[0.99]'
            : 'border-stone-200 hover:border-orange-400 hover:bg-orange-50/30'
        }`}
      >
        <div className="w-11 h-11 rounded-full bg-orange-100/70 text-orange-600 flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110">
          <UploadCloud size={22} />
        </div>

        <p className="text-xs sm:text-sm font-bold text-stone-800">
          Click to upload original image
        </p>
        <p className="text-[11px] text-stone-400 font-medium mt-0.5">
          Lossless Full Resolution • Auto-synced to /gallery
        </p>

        {uploadSuccess && (
          <div className="mt-3 text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl font-semibold border border-emerald-200/60 flex items-center gap-1.5">
            <CheckCircle2 size={13} className="shrink-0 text-emerald-600" />
            <span>{uploadSuccess}</span>
          </div>
        )}
      </div>

      {/* Thumbnails Gallery Strip */}
      <div className="mt-5 pt-3 border-t border-stone-100 flex items-center gap-2.5 overflow-x-auto pb-1">
        {visibleThumbnails.map((img) => (
          <div
            key={img.id}
            className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 group border border-stone-200/80 shadow-xs cursor-pointer"
            onClick={() => setPreviewModalImg(img.url)}
          >
            <Image
              src={img.url}
              alt={img.name}
              fill
              unoptimized={true}
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white">
              <Eye size={12} />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteImage(img.id);
              }}
              title="Delete Image"
              className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={10} />
            </button>
          </div>
        ))}

        {extraCount > 0 && (
          <div
            onClick={() => setPreviewModalImg(images[4]?.url || images[0]?.url)}
            className="w-14 h-14 rounded-xl bg-orange-100/70 border border-orange-200/80 text-orange-600 font-black text-sm flex items-center justify-center shrink-0 cursor-pointer hover:bg-orange-200/80 transition-colors shadow-xs"
          >
            +{extraCount}
          </div>
        )}
      </div>

      {/* Full Preview Modal */}
      {previewModalImg && (
        <div
          onClick={() => setPreviewModalImg(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-2xl w-full max-h-[85vh] bg-stone-900 rounded-2xl overflow-hidden p-3 border border-white/10"
          >
            <div className="flex items-center justify-between pb-2 px-2 border-b border-white/10 mb-2">
              <span className="text-xs font-bold text-white/80">Original Image Preview (100% Lossless)</span>
              <div className="flex items-center gap-2">
                <a
                  href={previewModalImg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-orange-600 hover:bg-orange-500 text-white px-3 py-1 rounded-lg font-bold inline-flex items-center gap-1"
                >
                  <ExternalLink size={12} /> Open Full Size
                </a>
                <button
                  onClick={() => setPreviewModalImg(null)}
                  className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="relative w-full h-[60vh] bg-black rounded-xl overflow-hidden">
              <Image
                src={previewModalImg}
                alt="Enlarged Preview"
                fill
                unoptimized={true}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
