'use client';

import { useState, useEffect } from 'react';

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
}

export const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'default-1',
    title: 'Deluxe Room Bedding',
    category: 'ROOMS',
    imageUrl: '/images/gallery/deluxe_room_bedding.png',
    description: 'Serene luxury bedrooms with plush king-size bedding, warm artisanal lighting, and private mountain view balconies in Munnar.',
    dimensions: '1920 × 1200 px',
    fileSize: '1.4 MB',
    createdAt: '2026-09-01',
  },
  {
    id: 'default-2',
    title: 'Infinity Pool View',
    category: 'RESORT',
    imageUrl: '/images/gallery/infinity_pool_view.png',
    description: 'Breathtaking infinity cliffside pool overlooking the sea of clouds and golden sunrise above Munnar’s tallest peaks.',
    dimensions: '2048 × 1365 px',
    fileSize: '1.8 MB',
    createdAt: '2026-09-02',
  },
  {
    id: 'default-3',
    title: 'Cardamom Field Walk',
    category: 'NATURE',
    imageUrl: '/images/gallery/cardamom_field_walk.png',
    description: 'Sun-drenched guided pathways winding through century-old cardamom groves and fragrant spice valleys.',
    dimensions: '1920 × 1280 px',
    fileSize: '1.6 MB',
    createdAt: '2026-09-03',
  },
  {
    id: 'default-4',
    title: 'Misty Mountain Lake Dawn',
    category: 'VIDEO',
    imageUrl: '/images/gallery/misty_lake_sunrise.png',
    isVideo: true,
    description: 'Cinematic dawn timelapses capturing silent misty lakes surrounded by blooming wild cherry blossoms and peaks.',
    dimensions: '1920 × 1080 px',
    fileSize: '2.1 MB',
    createdAt: '2026-09-04',
  },
  {
    id: 'default-5',
    title: 'Resort Infinity Sunset Deck',
    category: 'RESORT',
    imageUrl: '/images/gallery/resort_infinity_sunset.png',
    description: 'Unwind at dusk with hot Nilgiri tea while evening glow casts amber shadows over rolling Kerala valleys.',
    dimensions: '2048 × 1365 px',
    fileSize: '1.7 MB',
    createdAt: '2026-09-05',
  },
  {
    id: 'default-6',
    title: 'Mountain View Luxury Suite',
    category: 'ROOMS',
    imageUrl: '/images/gallery/mountain_view_suite.png',
    description: 'Expansive glass walls offering 180-degree unobstructed vistas of emerald tea carpet hills directly from your bed.',
    dimensions: '1920 × 1280 px',
    fileSize: '1.5 MB',
    createdAt: '2026-09-06',
  },
  {
    id: 'default-7',
    title: 'Tea Plantation Valley Trek',
    category: 'NATURE',
    imageUrl: '/images/tea_walk.png',
    description: 'Morning walks through lush high-altitude tea plantations with local guides explaining artisanal tea plucking.',
    dimensions: '1920 × 1080 px',
    fileSize: '1.2 MB',
    createdAt: '2026-09-07',
  },
  {
    id: 'default-8',
    title: 'Kolukkumalai Sunrise Ridge',
    category: 'NATURE',
    imageUrl: '/images/kolukkumalai_sunrise_view.jpg',
    description: 'Witness the highest organic tea estate sunrise in the world, rising 7,900 feet above sea level.',
    dimensions: '2400 × 1600 px',
    fileSize: '850 KB',
    createdAt: '2026-09-08',
  },
  {
    id: 'default-9',
    title: 'Jeep Safari Expedition Video',
    category: 'VIDEO',
    imageUrl: '/images/slide4.jpg',
    isVideo: true,
    description: 'Rugged 4x4 off-road trails through waterfalls, cloud forests, and untouched tribal villages.',
    dimensions: '1920 × 1080 px',
    fileSize: '1.1 MB',
    createdAt: '2026-09-09',
  },
];

const DB_NAME = 'TrekerGalleryDB';
const DB_VERSION = 1;
const STORE_NAME = 'gallery_items';
const EVENT_NAME = 'treker-gallery-updated';
const LOCAL_STORAGE_KEY = 'treker_gallery_items_cache';

// IndexedDB Helper with zero compression to preserve original resolution
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function fetchAllGalleryItems(): Promise<GalleryItem[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => {
        const stored = (request.result as GalleryItem[]) || [];
        if (stored.length === 0) {
          // Initialize with default items
          seedDefaultItems().then((items) => resolve(items));
        } else {
          resolve(stored);
        }
      };
      request.onerror = () => {
        resolve(loadFallbackItems());
      };
    });
  } catch {
    return loadFallbackItems();
  }
}

async function seedDefaultItems(): Promise<GalleryItem[]> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    for (const item of defaultGalleryItems) {
      store.put(item);
    }
    await new Promise<void>((resolve) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
    return defaultGalleryItems;
  } catch {
    return defaultGalleryItems;
  }
}

function loadFallbackItems(): GalleryItem[] {
  if (typeof window === 'undefined') return defaultGalleryItems;
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    return cached ? JSON.parse(cached) : defaultGalleryItems;
  } catch {
    return defaultGalleryItems;
  }
}

export async function saveGalleryItem(
  item: Omit<GalleryItem, 'id' | 'createdAt'> & { id?: string; createdAt?: string }
): Promise<GalleryItem> {
  const newItem: GalleryItem = {
    ...item,
    id: item.id || `gal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: item.createdAt || new Date().toISOString().split('T')[0],
    isCustomUpload: true,
  };

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(newItem);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed, falling back to localStorage cache', err);
    try {
      const current = loadFallbackItems();
      const updated = [newItem, ...current.filter((i) => i.id !== newItem.id)];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated.slice(0, 15)));
    } catch (e) {
      console.error('LocalStorage save error', e);
    }
  }

  // Notify all listening components across tabs / windows
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: newItem }));
  }

  return newItem;
}

export async function removeGalleryItem(id: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('IndexedDB delete failed', err);
    try {
      const current = loadFallbackItems();
      const updated = current.filter((i) => i.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
}

export async function resetGalleryToDefault(): Promise<GalleryItem[]> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
    for (const item of defaultGalleryItems) {
      store.put(item);
    }
    await new Promise<void>((resolve) => {
      tx.oncomplete = () => resolve();
    });
  } catch {}

  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {}
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }

  return defaultGalleryItems;
}

// React Hook for dynamic, reactive gallery updates
export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>(defaultGalleryItems);
  const [loading, setLoading] = useState(true);

  const refreshItems = async () => {
    try {
      const all = await fetchAllGalleryItems();
      setItems(all);
    } catch (err) {
      console.error('Failed to load gallery items', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshItems();

    const handleUpdate = () => {
      refreshItems();
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
    };
  }, []);

  const addItem = async (
    item: Omit<GalleryItem, 'id' | 'createdAt'> & { id?: string; createdAt?: string }
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

  return {
    items,
    loading,
    addItem,
    deleteItem,
    resetAll,
    refresh: refreshItems,
  };
}
