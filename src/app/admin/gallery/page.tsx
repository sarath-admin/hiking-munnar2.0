'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { useGallery, GalleryItem } from '@/lib/galleryStore';
import { 
  UploadCloud, 
  Trash2, 
  Eye, 
  ExternalLink, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Play, 
  Image as ImageIcon,
  Video,
  X,
  Search,
  Filter
} from 'lucide-react';

export default function AdminGalleryPage() {
  const { items, addItem, deleteItem, resetAll } = useGallery();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  
  // Upload form state
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileDimensions, setFileDimensions] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'ROOMS' | 'RESORT' | 'NATURE' | 'VIDEO'>('NATURE');
  const [description, setDescription] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Full resolution preview modal
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert('File size exceeds 25MB limit.');
      return;
    }

    const sizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    setFileSize(sizeFormatted);
    setFileName(file.name);
    setSelectedFile(file);

    // Derive auto-title
    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setTitle(cleanName);

    // Preview only (base64 is NOT sent to Supabase — the real File is uploaded)
    const reader = new FileReader();
    reader.onload = (e) => {
      const resultUrl = e.target?.result as string;
      if (resultUrl) {
        setFileDataUrl(resultUrl);

        // Detect original lossless pixel dimensions
        const imgObj = new window.Image();
        imgObj.onload = () => {
          setFileDimensions(`${imgObj.naturalWidth} \u00d7 ${imgObj.naturalHeight} px`);
        };
        imgObj.src = resultUrl;
      }
    };
    reader.readAsDataURL(file);
    setShowUploadForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileDataUrl) {
      alert('Please select an image to upload.');
      return;
    }
    if (!title.trim()) {
      alert('Please enter a title for the gallery photo.');
      return;
    }

    if (!selectedFile) {
      alert('Please select an image file to upload.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addItem({
        title: title.trim(),
        category,
        imageUrl: fileDataUrl ?? '',
        description: description.trim() || `High-resolution visual portrait of ${title.trim()} in Munnar.`,
        dimensions: fileDimensions || 'Original Full Resolution',
        fileSize,
        isVideo,
        videoUrl: isVideo ? videoUrl.trim() : undefined,
        _file: selectedFile,
      });

      setUploadSuccess(`"${title}" uploaded to Supabase and added to Gallery!`);
      // Reset form
      setFileDataUrl(null);
      setSelectedFile(null);
      setFileName('');
      setTitle('');
      setDescription('');
      setFileDimensions('');
      setFileSize('');
      setIsVideo(false);
      setVideoUrl('');
      setShowUploadForm(false);
      setTimeout(() => setUploadSuccess(null), 4500);
    } catch (err: any) {
      console.error('[GalleryUploadError]', err);
      alert(`Upload to Supabase failed: ${err?.message || 'Check the console for details.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCat = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <AdminLayout title="Media Gallery Management" searchQuery={search} onSearchChange={setSearch}>
      <div className="space-y-6">
        
        {/* Top Action Bar */}
        <div className="bg-white rounded-3xl p-5 border border-stone-150 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <ImageIcon size={18} />
              </span>
              <h2 className="text-lg font-extrabold text-stone-900 tracking-tight">
                Media Gallery Items ({items.length})
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Upload images at 100% uncompressed resolution. Changes automatically sync to the public website at <span className="font-semibold text-orange-600">/gallery</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors"
            >
              <ExternalLink size={14} /> Live Gallery View
            </Link>

            <button
              onClick={() => {
                if (confirm('Restore default gallery photos? Custom uploads will be cleared.')) {
                  resetAll();
                }
              }}
              title="Reset to default items"
              className="p-2.5 rounded-2xl border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <RotateCcw size={16} />
            </button>

            <button
              onClick={() => {
                setShowUploadForm(!showUploadForm);
                if (!showUploadForm) fileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
            >
              <Plus size={16} /> Upload New Photo
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {uploadSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>{uploadSuccess}</span>
            </div>
            <Link href="/gallery" target="_blank" className="underline font-black text-emerald-900 flex items-center gap-1">
              View on live site <ExternalLink size={12} />
            </Link>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileSelect(e.target.files[0]);
            }
          }}
          accept="image/jpeg,image/png,image/webp,image/jpg"
          className="hidden"
        />

        {/* Dedicated Upload Drawer / Modal Card */}
        {showUploadForm && (
          <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative animate-in fade-in slide-in-from-top-4 duration-300">
            <button
              onClick={() => {
                setShowUploadForm(false);
                setFileDataUrl(null);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
                <Sparkles size={12} /> Lossless High-Resolution Uploader
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Upload Original Image to Media Gallery
            </h3>
            <p className="text-xs text-stone-400 mt-1 max-w-xl">
              Upload full-resolution camera photographs. Images are stored with 0% compression, maintaining 100% pixel sharpness on the live website.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Image Dropzone / Preview */}
              <div className="lg:col-span-5 flex flex-col">
                {fileDataUrl ? (
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/60 border border-white/20 shadow-lg group">
                    <Image
                      src={fileDataUrl}
                      alt="Selected upload"
                      fill
                      unoptimized={true}
                      className="object-contain"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-amber-400 font-bold block">
                          {fileDimensions || 'Detecting resolution...'}
                        </span>
                        <span className="text-[10px] text-stone-300 font-mono">
                          {fileSize} • Lossless Original
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[11px] bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-lg font-bold transition-colors"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileSelect(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`aspect-[16/10] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-white/20 hover:border-orange-400 hover:bg-white/5'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
                      <UploadCloud size={24} />
                    </div>
                    <p className="text-sm font-bold text-white">
                      Drop high-resolution photo here
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      JPG, PNG, WEBP up to 25MB • Full Quality
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Metadata Form Fields */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Kolukkumalai Sunrise Ridge Panorama"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-400 focus:outline-hidden focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    Target Gallery Category *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['NATURE', 'ROOMS', 'RESORT', 'VIDEO'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setCategory(cat);
                          if (cat === 'VIDEO') setIsVideo(true);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                          category === cat
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30'
                            : 'bg-white/10 hover:bg-white/15 text-stone-300 border border-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    Description / Caption (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description that displays when tourists open the lightbox in the gallery..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Video Reel Toggle */}
                <div className="pt-1 flex items-center justify-between border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="videoToggle"
                      checked={isVideo}
                      onChange={(e) => setIsVideo(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400 accent-orange-500"
                    />
                    <label htmlFor="videoToggle" className="text-xs text-stone-300 font-semibold cursor-pointer flex items-center gap-1.5">
                      <Video size={14} className="text-amber-400" />
                      Mark as Video Reel (displays play overlay)
                    </label>
                  </div>

                  {isVideo && (
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="YouTube / Video URL"
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-xs text-white placeholder-stone-400 w-48"
                    />
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadForm(false);
                      setFileDataUrl(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 text-xs font-bold transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !fileDataUrl}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02]"
                  >
                    <Plus size={16} />
                    {isSubmitting ? 'Saving to Gallery...' : 'Add to Media Gallery (Full Res)'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Gallery Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-150 shadow-xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(['ALL', 'ROOMS', 'RESORT', 'NATURE', 'VIDEO'] as const).map((cat) => {
              const count = cat === 'ALL' ? items.length : items.filter((i) => i.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-orange-600 text-white' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-xs text-stone-400 font-medium">
            Showing {filteredItems.length} of {items.length} items
          </span>
        </div>

        {/* Gallery Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-150 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Media Thumbnail */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-stone-100 cursor-pointer"
                  onClick={() => setPreviewItem(item)}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    unoptimized={true}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-orange-600 shadow-xs">
                    {item.category}
                  </div>

                  {/* Video Indicator */}
                  {item.isVideo && (
                    <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-amber-400 p-1.5 rounded-full">
                      <Play size={12} className="fill-amber-400" />
                    </div>
                  )}

                  {/* Resolution Badge */}
                  {item.dimensions && (
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                      {item.dimensions}
                    </div>
                  )}

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Eye size={20} />
                    </span>
                  </div>
                </div>

                {/* Caption & Metadata */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-stone-900 text-base leading-snug line-clamp-1">
                      {item.title}
                    </h3>
                  </div>

                  {item.description && (
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1.5">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-stone-400 mt-4 pt-3 border-t border-stone-100 font-mono">
                    <span>{item.fileSize || 'Standard Asset'}</span>
                    <span>{item.createdAt || 'Active'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 flex items-center justify-between gap-2">
                <a
                  href={item.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-600 hover:text-orange-600 transition-colors px-2.5 py-1.5 rounded-lg border border-stone-200 hover:border-orange-400"
                >
                  <ExternalLink size={12} /> Full Res
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="p-1.5 rounded-xl border border-stone-200 text-stone-600 hover:text-orange-600 hover:border-orange-500 transition-colors"
                    title="Preview in Lightbox"
                  >
                    <Eye size={15} />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove "${item.title}" from Media Gallery?`)) {
                        deleteItem(item.id);
                      }
                    }}
                    className="p-1.5 rounded-xl border border-red-200 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-150">
            <ImageIcon size={40} className="mx-auto text-stone-300 mb-3" />
            <h4 className="text-base font-bold text-stone-700">No media items found</h4>
            <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
              {search ? 'Try clearing your search query.' : 'Upload photos to populate this category.'}
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs shadow-xs"
            >
              Upload Photo Now
            </button>
          </div>
        )}

      </div>

      {/* Full-Resolution Modal Preview */}
      {previewItem && (
        <div
          onClick={() => setPreviewItem(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] bg-stone-900 rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl"
          >
            {/* Modal Top Header */}
            <div className="p-4 px-6 bg-stone-950 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block font-sans">
                  {previewItem.category} • Lossless Preview
                </span>
                <h3 className="text-white font-serif text-lg font-bold">
                  {previewItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={previewItem.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white px-3.5 py-1.5 rounded-xl transition-colors"
                >
                  <ExternalLink size={13} /> Original Full Res
                </a>

                <button
                  onClick={() => setPreviewItem(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Image Display */}
            <div className="relative w-full h-[60vh] md:h-[70vh] bg-black">
              <Image
                src={previewItem.imageUrl}
                alt={previewItem.title}
                fill
                unoptimized={true}
                className="object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 bg-stone-950 border-t border-white/10 flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>Resolution: {previewItem.dimensions || 'Full Quality'}</span>
              <span>Size: {previewItem.fileSize || 'Standard'}</span>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
