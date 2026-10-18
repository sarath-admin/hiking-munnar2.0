'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ROOMS' | 'RESORT' | 'NATURE' | 'VIDEO';
  imageUrl: string;
  isVideo?: boolean;
  videoUrl?: string;
  description?: string;
  createdAt?: string;
  fileSize?: string;
  dimensions?: string;
  isCustomUpload?: boolean;
  storagePath?: string;
}

// --- Static default gallery items (public images already on the server) -------

export const defaultGalleryItems: GalleryItem[] = [
  { id: 'default-1', title: 'Deluxe Room Bedding', category: 'ROOMS', imageUrl: '/images/gallery/deluxe_room_bedding.png', description: 'Serene luxury bedrooms in Munnar.', dimensions: '1920 x 1200 px', fileSize: '1.4 MB', createdAt: '2026-09-01' },
  { id: 'default-2', title: 'Infinity Pool View', category: 'RESORT', imageUrl: '/images/gallery/infinity_pool_view.png', description: 'Breathtaking infinity cliffside pool.', dimensions: '2048 x 1365 px', fileSize: '1.8 MB', createdAt: '2026-09-02' },
  { id: 'default-3', title: 'Cardamom Field Walk', category: 'NATURE', imageUrl: '/images/gallery/cardamom_field_walk.png', description: 'Guided pathways through cardamom groves.', dimensions: '1920 x 1280 px', fileSize: '1.6 MB', createdAt: '2026-09-03' },
  { id: 'default-4', title: 'Misty Mountain Lake Dawn', category: 'VIDEO', imageUrl: '/images/gallery/misty_lake_sunrise.png', isVideo: true, description: 'Cinematic dawn timelapses.', dimensions: '1920 x 1080 px', fileSize: '2.1 MB', createdAt: '2026-09-04' },
  { id: 'default-5', title: 'Resort Infinity Sunset Deck', category: 'RESORT', imageUrl: '/images/gallery/resort_infinity_sunset.png', description: 'Unwind at dusk.', dimensions: '2048 x 1365 px', fileSize: '1.7 MB', createdAt: '2026-09-05' },
  { id: 'default-6', title: 'Mountain View Luxury Suite', category: 'ROOMS', imageUrl: '/images/gallery/mountain_view_suite.png', description: 'Expansive glass walls overlooking emerald hills.', dimensions: '1920 x 1280 px', fileSize: '1.5 MB', createdAt: '2026-09-06' },
  { id: 'default-7', title: 'Tea Plantation Valley Trek', category: 'NATURE', imageUrl: '/images/tea_walk.png', description: 'Morning walks through tea plantations.', dimensions: '1920 x 1080 px', fileSize: '1.2 MB', createdAt: '2026-09-07' },
  { id: 'default-8', title: 'Kolukkumalai Sunrise Ridge', category: 'NATURE', imageUrl: '/images/kolukkumalai_sunrise_view.jpg', description: 'Highest organic tea estate sunrise in the world.', dimensions: '2400 x 1600 px', fileSize: '850 KB', createdAt: '2026-09-08' },
  { id: 'default-9', title: 'Jeep Safari Expedition Video', category: 'VIDEO', imageUrl: '/images/slide4.jpg', isVideo: true, description: 'Rugged 4x4 off-road trails.', dimensions: '1920 x 1080 px', fileSize: '1.1 MB', createdAt: '2026-09-09' },
];

const BUCKET = 'gallery';

// --- Helper: convert DB row to GalleryItem ------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): GalleryItem {
  const bytes = row.size_bytes ?? 0;
  const fileSize =
    row.file_size ??
    (bytes > 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
      : bytes > 0
      ? `${Math.round(bytes / 1024)} KB`
      : undefined);

  return {
    id: row.id,
    title: row.title ?? row.name ?? row.alt_text ?? 'Gallery Image',
    category: (row.category ?? 'NATURE') as GalleryItem['category'],
    imageUrl: row.image_url,
    description: row.description ?? row.alt_text ?? undefined,
    fileSize,
    dimensions: row.dimensions ?? undefined,
    isVideo: row.is_video ?? false,
    videoUrl: row.video_url ?? undefined,
    createdAt: row.created_at?.split('T')[0],
    storagePath: row.storage_path ?? (row.image_url?.includes('/gallery/') ? row.image_url.split('/gallery/')[1] : undefined),
    isCustomUpload: true,
  };
}

// --- Upload a File to Supabase Storage then save metadata to DB ---------------

export async function uploadGalleryFile(
  file: File,
  meta: {
    title: string;
    category: GalleryItem['category'];
    description?: string;
    dimensions?: string;
    isVideo?: boolean;
    videoUrl?: string;
  }
): Promise<GalleryItem> {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // 1. Upload to Supabase Storage
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (upErr) {
    console.error('[uploadGalleryFile] storage upload failed', upErr);
    throw upErr;
  }

  // 2. Get public URL
  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const publicUrl = urlData.publicUrl;

  const bytes = file.size;
  const fileSizeStr =
    bytes > 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.round(bytes / 1024)} KB`;

  // 3. Save metadata to DB matching the actual gallery table schema
  const { data, error: dbErr } = await supabase
    .from('gallery')
    .insert({
      title: meta.title,
      category: meta.category || 'NATURE',
      image_url: publicUrl,
      description: meta.description ?? meta.title,
      dimensions: meta.dimensions ?? 'Original Full Resolution',
      file_size: fileSizeStr,
      is_video: meta.isVideo ?? false,
      video_url: meta.videoUrl ?? null,
    })
    .select()
    .single();

  if (dbErr) {
    const errorMsg = dbErr.message || dbErr.details || JSON.stringify(dbErr);
    console.error('[uploadGalleryFile] db insert failed:', errorMsg);
    // Attempt cleanup of the uploaded file
    await supabase.storage.from(BUCKET).remove([path]);
    throw new Error(errorMsg);
  }

  const item = mapRow(data);
  // Attach extra metadata that was provided
  item.category = meta.category;
  item.dimensions = meta.dimensions;
  item.isVideo = meta.isVideo;
  item.videoUrl = meta.videoUrl;

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('treker-gallery-updated', { detail: item }));
  }

  return item;
}

// --- Fetch all uploaded gallery items from Supabase --------------------------

export async function fetchAllGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[fetchAllGalleryItems] Using fallback default items:', error?.message || error);
    return defaultGalleryItems;
  }

  const dbItems = (data ?? []).map(mapRow);
  // Merge: default static items first, then DB-uploaded items
  return [...defaultGalleryItems, ...dbItems];
}

// --- Delete a gallery item (storage file + DB row) ----------------------------

export async function removeGalleryItem(id: string): Promise<void> {
  // Only remove from DB (default items are static, skip them)
  if (id.startsWith('default-')) return;

  // Fetch the image_url so we can remove the file from storage too
  const { data: row } = await supabase
    .from('gallery')
    .select('image_url')
    .eq('id', id)
    .single();

  const { error: dbErr } = await supabase.from('gallery').delete().eq('id', id);
  if (dbErr) { console.error('[removeGalleryItem] db delete failed', dbErr); throw dbErr; }

  if (row?.image_url && row.image_url.includes('/gallery/')) {
    const storagePath = row.image_url.split('/gallery/')[1];
    if (storagePath) {
      const { error: storErr } = await supabase.storage.from(BUCKET).remove([storagePath]);
      if (storErr) console.warn('[removeGalleryItem] storage delete failed', storErr);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('treker-gallery-updated'));
  }
}

// --- Kept for backward-compatibility with gallery/page.tsx addItem call -------

export async function saveGalleryItem(
  item: Omit<GalleryItem, 'id' | 'createdAt'> & { id?: string; createdAt?: string; _file?: File }
): Promise<GalleryItem> {
  if (item._file) {
    return uploadGalleryFile(item._file, {
      title: item.title,
      category: item.category,
      description: item.description,
      dimensions: item.dimensions,
      isVideo: item.isVideo,
      videoUrl: item.videoUrl,
    });
  }

  // Fallback: just insert a URL-based row (no storage upload)
  const { data, error } = await supabase
    .from('gallery')
    .insert({
      title: item.title,
      category: item.category || 'NATURE',
      image_url: item.imageUrl,
      description: item.description ?? item.title,
      dimensions: item.dimensions ?? 'Original Full Resolution',
      file_size: item.fileSize ?? null,
      is_video: item.isVideo ?? false,
      video_url: item.videoUrl ?? null,
    })
    .select()
    .single();

  if (error) { console.error('[saveGalleryItem]', error); throw error; }
  const saved = mapRow(data);
  saved.category = item.category;

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('treker-gallery-updated', { detail: saved }));
  }
  return saved;
}

export async function resetGalleryToDefault(): Promise<GalleryItem[]> {
  // Remove all custom (DB) rows but leave static defaults
  await supabase.from('gallery').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('treker-gallery-updated'));
  }
  return defaultGalleryItems;
}

// --- React Hook ---------------------------------------------------------------

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>(defaultGalleryItems);
  const [loading, setLoading] = useState(true);

  const refreshItems = useCallback(async () => {
    try {
      const all = await fetchAllGalleryItems();
      setItems(all);
    } catch (err) {
      console.warn('[useGallery] failed to load, keeping default items:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshItems();
    const handler = () => { refreshItems(); };
    window.addEventListener('treker-gallery-updated', handler);
    return () => { window.removeEventListener('treker-gallery-updated', handler); };
  }, [refreshItems]);

  const addItem = async (
    item: Omit<GalleryItem, 'id' | 'createdAt'> & { id?: string; createdAt?: string; _file?: File }
  ) => {
    const saved = await saveGalleryItem(item);
    await refreshItems();
    return saved;
  };

  const deleteItem = async (id: string) => {
    await removeGalleryItem(id);
    await refreshItems();
  };

  const resetAll = async () => {
    const def = await resetGalleryToDefault();
    setItems(def);
  };

  return { items, loading, addItem, deleteItem, resetAll, refresh: refreshItems };
}
