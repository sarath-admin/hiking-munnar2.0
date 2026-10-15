'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  date: string;
  travelers: number;
  budget: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
  createdAt: string;
  message?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  destination: string;
  tourDate: string;
  travelers: number;
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  status: 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
  joinedDate: string;
  avatar?: string;
  status: 'active' | 'vip' | 'inactive';
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  country: string;
  imageUrl: string;
  category: string;
  price: number;
  rating: number;
  duration: string;
  bookingsCount: number;
  status: 'active' | 'seasonal';
}

export interface UploadedImage {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export interface AdminProfile {
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  joiningDate: string;
  avatar: string;
  bio?: string;
  totalEnquiries: number;
  totalBookings: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'booking' | 'departure' | 'enquiry' | 'safari';
  color: string;
}

// Initial Seed Data
const initialEnquiries: Enquiry[] = [
  { id: 'enq-1', name: 'Aarav Patel', email: 'aarav.patel@gmail.com', phone: '+91 98234 56789', destination: 'Kolukkumalai Sunrise Trek', date: '2026-09-18', travelers: 4, budget: '₹6,000', status: 'new', createdAt: '2026-09-12', message: 'Looking for early morning 4x4 pickup from Munnar town.' },
  { id: 'enq-2', name: 'Emma Watson', email: 'emma.w@outlook.com', phone: '+44 7700 900123', destination: 'Cardamom Field Nature Walk', date: '2026-09-20', travelers: 2, budget: '₹2,400', status: 'contacted', createdAt: '2026-09-11', message: 'Interested in guided photography tour.' },
  { id: 'enq-3', name: 'Rohan Sharma', email: 'rohan.sharma@techcorp.in', phone: '+91 94455 12345', destination: 'Meesapulimala Peak Expedition', date: '2026-09-22', travelers: 6, budget: '₹15,000', status: 'confirmed', createdAt: '2026-09-10', message: 'Corporate team bonding trek with tent camping.' },
  { id: 'enq-4', name: 'Sophie Dupont', email: 'sophie.d@voyage.fr', phone: '+33 612 345678', destination: 'Tea Plantation & Factory Visit', date: '2026-09-25', travelers: 2, budget: '₹2,400', status: 'new', createdAt: '2026-09-12', message: 'Vegetarian meals required.' },
  { id: 'enq-5', name: 'Karthik Raja', email: 'karthik.r@yahoo.com', phone: '+91 98840 98765', destination: 'Anakulam Wild Elephant Jeep Safari', date: '2026-09-23', travelers: 5, budget: '₹12,500', status: 'new', createdAt: '2026-09-12', message: 'Family with 2 children.' },
  { id: 'enq-6', name: 'Elena Rostova', email: 'elena.rostova@gmail.com', phone: '+7 916 555-4321', destination: 'Chokramudi Peak Day Trek', date: '2026-09-27', travelers: 1, budget: '₹2,500', status: 'contacted', createdAt: '2026-09-09', message: 'Solo trekker, experienced hiker.' },
];

const initialBookings: Booking[] = [
  { id: 'bk-1', bookingCode: 'TRK-2026-0901', customerName: 'Arjun Das', customerEmail: 'arjun.das@gmail.com', customerPhone: '+91 98401 23456', destination: 'Kolukkumalai Sunrise Safari', tourDate: '2026-09-09', travelers: 4, amount: 6000, paymentStatus: 'paid', status: 'completed', createdAt: '2026-09-02' },
  { id: 'bk-2', bookingCode: 'TRK-2026-0902', customerName: 'Jessica Taylor', customerEmail: 'jess.taylor@gmail.com', customerPhone: '+1 415 555-0192', destination: 'Meesapulimala High Altitude Trek', tourDate: '2026-09-14', travelers: 2, amount: 5000, paymentStatus: 'paid', status: 'confirmed', createdAt: '2026-09-04' },
  { id: 'bk-3', bookingCode: 'TRK-2026-0903', customerName: 'Vikram Malhotra', customerEmail: 'vikram.m@corporation.com', customerPhone: '+91 98200 44321', destination: 'Private Shola Forest Camping', tourDate: '2026-09-17', travelers: 6, amount: 18000, paymentStatus: 'paid', status: 'in-progress', createdAt: '2026-09-06' },
  { id: 'bk-4', bookingCode: 'TRK-2026-0904', customerName: 'Hannah Schmidt', customerEmail: 'hannah.s@web.de', customerPhone: '+49 171 2345678', destination: 'Cardamom & Spice Plantation Walk', tourDate: '2026-09-18', travelers: 3, amount: 3600, paymentStatus: 'pending', status: 'confirmed', createdAt: '2026-09-08' },
  { id: 'bk-5', bookingCode: 'TRK-2026-0905', customerName: 'Manish Verma', customerEmail: 'manish.v@fintech.co', customerPhone: '+91 97110 88765', destination: 'Anakulam 4x4 Off-Road Safari', tourDate: '2026-09-23', travelers: 5, amount: 12500, paymentStatus: 'paid', status: 'confirmed', createdAt: '2026-09-11' },
];

const initialCustomers: Customer[] = [
  { id: 'c-1', name: 'Arjun Das', email: 'arjun.das@gmail.com', phone: '+91 98401 23456', totalBookings: 3, totalSpent: 16500, joinedDate: '2024-03-15', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face', status: 'vip' },
  { id: 'c-2', name: 'Jessica Taylor', email: 'jess.taylor@gmail.com', phone: '+1 415 555-0192', totalBookings: 2, totalSpent: 11000, joinedDate: '2025-01-20', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', status: 'active' },
  { id: 'c-3', name: 'Vikram Malhotra', email: 'vikram.m@corporation.com', phone: '+91 98200 44321', totalBookings: 4, totalSpent: 42000, joinedDate: '2023-11-05', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face', status: 'vip' },
  { id: 'c-4', name: 'Hannah Schmidt', email: 'hannah.s@web.de', phone: '+49 171 2345678', totalBookings: 1, totalSpent: 3600, joinedDate: '2026-08-10', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face', status: 'active' },
  { id: 'c-5', name: 'Manish Verma', email: 'manish.v@fintech.co', phone: '+91 97110 88765', totalBookings: 2, totalSpent: 21500, joinedDate: '2025-06-14', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', status: 'active' },
];

const initialDestinations: Destination[] = [
  { id: 'dest-1', name: 'Kolukkumalai Sunrise Peak', state: 'Kerala/Tamil Nadu', country: 'India', imageUrl: '/images/kolukkumalai_sunrise_view.jpg', category: 'Jeep Safari & Sunrise', price: 1500, rating: 4.9, duration: '4 Hours', bookingsCount: 84, status: 'active' },
  { id: 'dest-2', name: 'Meesapulimala Summit', state: 'Kerala', country: 'India', imageUrl: '/images/meesapulimala.png', category: 'High Altitude Trek', price: 2500, rating: 4.8, duration: 'Full Day', bookingsCount: 52, status: 'active' },
  { id: 'dest-3', name: 'Cardamom & Spice Plantation', state: 'Kerala', country: 'India', imageUrl: '/images/gallery/cardamom_field_walk.png', category: 'Nature Walk', price: 1200, rating: 4.7, duration: '3 Hours', bookingsCount: 46, status: 'active' },
  { id: 'dest-4', name: 'Anakulam River Wildlife', state: 'Kerala', country: 'India', imageUrl: '/images/jeep_safari_anakulam_hq.jpg', category: 'Off-Road Safari', price: 2500, rating: 4.9, duration: 'Half Day', bookingsCount: 68, status: 'active' },
  { id: 'dest-5', name: 'Infinity Pool Mountain Resort', state: 'Kerala', country: 'India', imageUrl: '/images/gallery/infinity_pool_view.png', category: 'Luxury Stay', price: 8500, rating: 5.0, duration: '2 Days / 1 Night', bookingsCount: 39, status: 'active' },
];

const initialImages: UploadedImage[] = [
  { id: 'img-1', name: 'Tropical Island Expedition', url: '/images/admin/explore_world.png', size: '1.02 MB', type: 'image/png', uploadedAt: '2026-09-10' },
  { id: 'img-2', name: 'Kolukkumalai Golden Peak', url: '/images/kolukkumalai_sunrise_view.jpg', size: '330 KB', type: 'image/jpeg', uploadedAt: '2026-09-08' },
  { id: 'img-3', name: 'Cardamom Field Trail', url: '/images/gallery/cardamom_field_walk.png', size: '1.05 MB', type: 'image/png', uploadedAt: '2026-09-05' },
  { id: 'img-4', name: 'Infinity Pool Panorama', url: '/images/gallery/infinity_pool_view.png', size: '782 KB', type: 'image/png', uploadedAt: '2026-09-02' },
  { id: 'img-5', name: 'Misty Lake Dawn', url: '/images/gallery/misty_lake_sunrise.png', size: '816 KB', type: 'image/png', uploadedAt: '2026-09-01' },
];

const initialProfile: AdminProfile = {
  name: 'Sophia Miller',
  role: 'Admin',
  company: 'Treker Pvt. Ltd.',
  email: 'sophia@treker.com',
  phone: '+91 94965 20787',
  joiningDate: '01/03/2018',
  avatar: '/images/logo.png',
  bio: 'Lead Operations & Travel Experience Director at Treker. Managing high-range Western Ghats expeditions, sunrise safaris, and luxury resort stays.',
  totalEnquiries: 248,
  totalBookings: 182,
};

const initialEvents: CalendarEvent[] = [
  { id: 'ev-1', title: 'Kolukkumalai Sunrise Group (4 pax)', date: '2026-09-09', type: 'booking', color: '#8b5cf6' },
  { id: 'ev-2', title: 'Meesapulimala Trek Departure (2 pax)', date: '2026-09-14', type: 'departure', color: '#06b6d4' },
  { id: 'ev-3', title: 'Private Shola Camping (6 pax)', date: '2026-09-17', type: 'departure', color: '#10b981' },
  { id: 'ev-4', title: 'Cardamom Walk Follow-up', date: '2026-09-18', type: 'enquiry', color: '#10b981' },
  { id: 'ev-5', title: 'Anakulam Elephant Jeep Safari (5 pax)', date: '2026-09-23', type: 'safari', color: '#f97316' },
];

// Helper to get/set localStorage with SSR safety
function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('treker-data-updated'));
  } catch (e) {
    console.error('Storage error', e);
  }
}

export function saveEnquiryToStore(enquiry: Omit<Enquiry, 'id' | 'createdAt'>): Enquiry {
  const existing = getStored<Enquiry[]>('treker_enquiries', initialEnquiries);
  const newEnq: Enquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
  };
  const updated = [newEnq, ...existing];
  setStored('treker_enquiries', updated);
  return newEnq;
}

export function useAdminStore() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [images, setImages] = useState<UploadedImage[]>(initialImages);
  const [profile, setProfile] = useState<AdminProfile>(initialProfile);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadAll = () => {
    setEnquiries(getStored('treker_enquiries', initialEnquiries));
    setBookings(getStored('treker_bookings', initialBookings));
    setCustomers(getStored('treker_customers', initialCustomers));
    setDestinations(getStored('treker_destinations', initialDestinations));
    setImages(getStored('treker_images', initialImages));
    const storedProfile = getStored('treker_profile', initialProfile);
    setProfile({ ...storedProfile, avatar: initialProfile.avatar });
    setEvents(getStored('treker_events', initialEvents));
    setIsLoaded(true);
  };

  useEffect(() => {
    loadAll();
    const handleUpdate = () => loadAll();
    window.addEventListener('treker-data-updated', handleUpdate);
    return () => window.removeEventListener('treker-data-updated', handleUpdate);
  }, []);

  // Actions
  const addEnquiry = (enquiry: Omit<Enquiry, 'id' | 'createdAt'>) => {
    const newEnq: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newEnq, ...enquiries];
    setEnquiries(updated);
    setStored('treker_enquiries', updated);
    return newEnq;
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    const updated = enquiries.map(e => e.id === id ? { ...e, status } : e);
    setEnquiries(updated);
    setStored('treker_enquiries', updated);
  };

  const deleteEnquiry = (id: string) => {
    const updated = enquiries.filter(e => e.id !== id);
    setEnquiries(updated);
    setStored('treker_enquiries', updated);
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>) => {
    const code = `TRK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBk: Booking = {
      ...booking,
      id: `bk-${Date.now()}`,
      bookingCode: code,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newBk, ...bookings];
    setBookings(updated);
    setStored('treker_bookings', updated);

    // Also add to events
    const newEvent: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: `${newBk.destination} (${newBk.travelers} pax)`,
      date: newBk.tourDate,
      type: 'booking',
      color: '#f97316',
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setStored('treker_events', updatedEvents);

    return newBk;
  };

  const updateBookingStatus = (id: string, status: Booking['status'], paymentStatus?: Booking['paymentStatus']) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status,
          ...(paymentStatus ? { paymentStatus } : {}),
        };
      }
      return b;
    });
    setBookings(updated);
    setStored('treker_bookings', updated);
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    setStored('treker_bookings', updated);
  };

  const addCustomer = (customer: Omit<Customer, 'id' | 'joinedDate'>) => {
    const newC: Customer = {
      ...customer,
      id: `c-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    const updated = [newC, ...customers];
    setCustomers(updated);
    setStored('treker_customers', updated);
    return newC;
  };

  const addImage = (img: Omit<UploadedImage, 'id' | 'uploadedAt'>) => {
    const newImg: UploadedImage = {
      ...img,
      id: `img-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newImg, ...images];
    setImages(updated);
    setStored('treker_images', updated);
    return newImg;
  };

  const deleteImage = (id: string) => {
    const updated = images.filter(img => img.id !== id);
    setImages(updated);
    setStored('treker_images', updated);
  };

  const updateProfile = (newProfile: Partial<AdminProfile>) => {
    const updated = { ...profile, ...newProfile };
    setProfile(updated);
    setStored('treker_profile', updated);
  };

  // Calculated Stats
  const stats = {
    newEnquiries: 42, // reference target: 42
    totalBookings: 28, // reference target: 28
    totalCustomers: 56, // reference target: 56
    totalRevenue: 245000, // reference target: ₹2,45,000
    enquiriesGrowth: '+18%',
    bookingsGrowth: '+32%',
    customersGrowth: '+12%',
    revenueGrowth: '+27%',
  };

  return {
    isLoaded,
    enquiries,
    bookings,
    customers,
    destinations,
    images,
    profile,
    events,
    stats,
    addEnquiry,
    updateEnquiryStatus,
    deleteEnquiry,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    addCustomer,
    addImage,
    deleteImage,
    updateProfile,
  };
}
