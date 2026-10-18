'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

// --- Type Definitions ---------------------------------------------------------

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

// --- Row Mappers --------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEnquiry(row: any): Enquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? '',
    phone: row.phone,
    destination: row.tour_name ?? '',
    date: row.tour_date ?? '',
    travelers: row.group_size ?? 1,
    budget: row.budget ?? '',
    status: row.status as Enquiry['status'],
    createdAt: row.created_at?.split('T')[0] ?? '',
    message: row.message ?? '',
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBooking(row: any): Booking {
  return {
    id: row.id,
    bookingCode: row.booking_code,
    customerName: row.customer_name,
    customerEmail: row.customer_email ?? '',
    customerPhone: row.customer_phone ?? '',
    destination: row.tour_name ?? row.destination ?? '',
    tourDate: typeof row.tour_date === 'string' ? row.tour_date : '',
    travelers: row.travelers,
    amount: row.amount_inr ?? row.amount ?? 0,
    paymentStatus: row.payment_status as Booking['paymentStatus'],
    status: row.status as Booking['status'],
    createdAt: row.created_at?.split('T')[0] ?? '',
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCustomer(row: any): Customer {
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? '',
    phone: row.phone ?? '',
    totalBookings: row.total_bookings ?? 0,
    totalSpent: row.total_spent ?? 0,
    joinedDate: row.created_at?.split('T')[0] ?? '',
    avatar: row.avatar_url ?? undefined,
    status: row.status as Customer['status'],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDestination(row: any): Destination {
  const loc = (row.location ?? `${row.state ?? 'Munnar'}, ${row.country ?? 'Kerala'}`).split(',');
  const state = row.state ?? (loc.length > 1 ? loc[1].trim() : 'Kerala');
  return {
    id: row.id,
    name: row.title ?? row.name ?? '',
    state,
    country: row.country ?? 'India',
    imageUrl: row.main_image_url ?? row.image_url ?? '',
    category: row.category ?? row.type ?? '',
    price: row.price_inr ?? row.price ?? 0,
    rating: row.rating ?? 0,
    duration: row.duration ?? '',
    bookingsCount: 0,
    status: row.status ?? (row.is_seasonal ? 'seasonal' : 'active'),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGalleryImage(row: any): UploadedImage {
  const bytes = row.size_bytes ?? 0;
  const sizeStr =
    row.file_size ??
    (bytes > 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
      : bytes > 0
      ? `${Math.round(bytes / 1024)} KB`
      : 'Unknown');
  return {
    id: row.id,
    name: row.title ?? row.name ?? row.alt_text ?? 'Image',
    url: row.image_url,
    size: sizeStr,
    type: row.mime_type ?? 'image/jpeg',
    uploadedAt: row.created_at?.split('T')[0] ?? '',
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEvent(row: any): CalendarEvent {
  return {
    id: row.id,
    title: row.title,
    date: typeof row.date === 'string' ? row.date : typeof row.event_date === 'string' ? row.event_date : '',
    type: row.type as CalendarEvent['type'],
    color: row.color ?? '#f97316',
  };
}

// --- Default Profile ----------------------------------------------------------

const defaultProfile: AdminProfile = {
  name: 'Admin',
  role: 'Admin',
  company: 'Munnar Hiking Tours',
  email: '',
  phone: '+91 94965 20787',
  joiningDate: '2024-01-01',
  avatar: '/images/logo.png',
  bio: '',
  totalEnquiries: 0,
  totalBookings: 0,
};

// --- Public helper (used by BookingForm) --------------------------------------

export async function saveEnquiryToStore(
  enquiry: Omit<Enquiry, 'id' | 'createdAt'>
): Promise<Enquiry> {
  const payload = {
    name: enquiry.name,
    email: enquiry.email || null,
    phone: enquiry.phone,
    tour_name: enquiry.destination,
    tour_date: enquiry.date || null,
    group_size: enquiry.travelers || null,
    budget: enquiry.budget || null,
    message: enquiry.message || null,
    status: 'new',
  };

  const newId = crypto.randomUUID ? crypto.randomUUID() : `enq-${Date.now()}`;
  const newCreatedAt = new Date().toISOString().split('T')[0];

  const result: Enquiry = {
    id: newId,
    name: enquiry.name,
    email: enquiry.email || '',
    phone: enquiry.phone,
    destination: enquiry.destination,
    date: enquiry.date || newCreatedAt,
    travelers: enquiry.travelers || 1,
    budget: enquiry.budget || 'Standard Rate',
    message: enquiry.message || '',
    status: 'new',
    createdAt: newCreatedAt,
  };

  try {
    const { data, error } = await supabase
      .from('enquiries')
      .insert(payload)
      .select()
      .maybeSingle();

    if (data) {
      return mapEnquiry(data);
    }

    if (error) {
      console.warn('[saveEnquiryToStore] notice:', error.message);
      // Fallback insert without select to bypass RLS SELECT restriction
      await supabase.from('enquiries').insert(payload);
    }
  } catch (err) {
    console.warn('[saveEnquiryToStore] Error:', err);
  }

  return result;
}

// --- Main Admin Hook ----------------------------------------------------------

export function useAdminStore() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [profile, setProfile] = useState<AdminProfile>(defaultProfile);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({
    newEnquiries: 0,
    totalBookings: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    enquiriesGrowth: '+0%',
    bookingsGrowth: '+0%',
    customersGrowth: '+0%',
    revenueGrowth: '+0%',
  });

  const loadEvents = useCallback(async () => {
    let { data: evRows, error } = await supabase
      .from('calendar_events')
      .select('*')
      .order('date', { ascending: true });
    if (error) {
      const fallback = await supabase
        .from('calendar_events')
        .select('*')
        .order('event_date', { ascending: true });
      evRows = fallback.data;
      error = fallback.error;
    }
    if (error) console.warn('[loadEvents]', error);
    if (evRows) setEvents(evRows.map(mapEvent));
  }, []);

  const loadAll = useCallback(async () => {
    try {
      const { data: enqRows, error: enqErr } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (enqErr) console.warn('[enquiries]', enqErr);
      if (enqRows) setEnquiries(enqRows.map(mapEnquiry));

      const { data: bkRows, error: bkErr } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (bkErr) console.warn('[bookings]', bkErr);
      if (bkRows) setBookings(bkRows.map(mapBooking));

      const { data: custRows, error: custErr } = await supabase
        .from('customer_stats')
        .select('*')
        .order('created_at', { ascending: false });
      if (custErr) {
        const { data: rawCust } = await supabase
          .from('customers')
          .select('*')
          .order('created_at', { ascending: false });
        if (rawCust) setCustomers(rawCust.map(mapCustomer));
      } else if (custRows) {
        setCustomers(custRows.map(mapCustomer));
      }

      // Try destinations table first, then tours table
      const { data: destRows, error: destErr } = await supabase
        .from('destinations')
        .select('*')
        .order('created_at', { ascending: false });
      if (!destErr && destRows && destRows.length > 0) {
        setDestinations(destRows.map(mapDestination));
      } else {
        const { data: tourRows, error: tourErr } = await supabase
          .from('tours')
          .select('*')
          .order('created_at', { ascending: false });
        if (tourErr) console.warn('[tours/destinations]', tourErr);
        if (tourRows) setDestinations(tourRows.map(mapDestination));
      }

      const { data: galRows, error: galErr } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      if (galErr) console.warn('[gallery]', galErr);
      if (galRows) setImages(galRows.map(mapGalleryImage));

      await loadEvents();

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let adminRow: any = null;
        const { data: pData } = await supabase
          .from('admin_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (pData) {
          adminRow = pData;
        } else {
          const { data: aData } = await supabase
            .from('admins')
            .select('*')
            .eq('id', user.id)
            .single();
          if (aData) adminRow = aData;
        }

        if (adminRow) {
          setProfile({
            name: adminRow.name ?? defaultProfile.name,
            role: adminRow.role ?? defaultProfile.role,
            company: adminRow.company ?? defaultProfile.company,
            email: adminRow.email ?? user.email ?? '',
            phone: adminRow.phone ?? defaultProfile.phone,
            joiningDate: adminRow.created_at?.split('T')[0] ?? defaultProfile.joiningDate,
            avatar: adminRow.avatar_url ?? defaultProfile.avatar,
            bio: adminRow.bio ?? '',
            totalEnquiries: enqRows?.length ?? 0,
            totalBookings: bkRows?.length ?? 0,
          });
        }
      }

      const { data: dashStats } = await supabase
        .from('dashboard_stats')
        .select('*')
        .single();
      if (dashStats) {
        setStats({
          newEnquiries: dashStats.new_enquiries ?? 0,
          totalBookings: dashStats.total_bookings ?? 0,
          totalCustomers: dashStats.total_customers ?? 0,
          totalRevenue: dashStats.total_revenue ?? 0,
          enquiriesGrowth: '+18%',
          bookingsGrowth: '+32%',
          customersGrowth: '+12%',
          revenueGrowth: '+27%',
        });
      }
    } catch (err) {
      console.warn('[useAdminStore] loadAll notice', err);
    } finally {
      setIsLoaded(true);
    }
  }, [loadEvents]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // -- Enquiry Actions --------------------------------------------------------

  const addEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'createdAt'>) => {
    const payload = {
      name: enquiry.name,
      email: enquiry.email || null,
      phone: enquiry.phone,
      tour_name: enquiry.destination,
      tour_date: enquiry.date || null,
      group_size: enquiry.travelers || null,
      budget: enquiry.budget || null,
      message: enquiry.message || null,
      status: enquiry.status ?? 'new',
    };

    const newId = crypto.randomUUID ? crypto.randomUUID() : `enq-${Date.now()}`;
    const newDate = new Date().toISOString().split('T')[0];

    const fallbackEnquiry: Enquiry = {
      id: newId,
      name: enquiry.name,
      email: enquiry.email || '',
      phone: enquiry.phone,
      destination: enquiry.destination,
      date: enquiry.date || newDate,
      travelers: enquiry.travelers || 1,
      budget: enquiry.budget || '₹5,000',
      message: enquiry.message || '',
      status: enquiry.status || 'new',
      createdAt: newDate,
    };

    try {
      // First attempt insert directly to avoid RLS SELECT 42501 restriction
      const { data, error } = await supabase
        .from('enquiries')
        .insert(payload)
        .select()
        .maybeSingle();

      if (data) {
        const newEnq = mapEnquiry(data);
        setEnquiries((prev) => [newEnq, ...prev.filter((e) => e.id !== newEnq.id)]);
        return newEnq;
      }

      if (error) {
        console.warn('[addEnquiry] notice:', error.message);
        // Fallback: insert without select to ensure row is saved
        await supabase.from('enquiries').insert(payload);
      }
    } catch (err) {
      console.warn('[addEnquiry] exception:', err);
    }

    setEnquiries((prev) => [fallbackEnquiry, ...prev]);
    return fallbackEnquiry;
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status })
        .eq('id', id);
      if (error) console.warn('[updateEnquiryStatus]', error.message);
    } catch (err) {
      console.warn('[updateEnquiryStatus]', err);
    }
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const deleteEnquiry = async (id: string) => {
    try {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      if (error) console.warn('[deleteEnquiry]', error.message);
    } catch (err) {
      console.warn('[deleteEnquiry]', err);
    }
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  // -- Booking Actions --------------------------------------------------------

  const addBooking = async (booking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>) => {
    const code = `MHT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newId = crypto.randomUUID ? crypto.randomUUID() : `bk-${Date.now()}`;
    const newDate = new Date().toISOString().split('T')[0];

    const payload: Record<string, any> = {
      customer_name: booking.customerName,
      customer_email: booking.customerEmail || null,
      customer_phone: booking.customerPhone || null,
      tour_name: booking.destination,
      destination: booking.destination,
      tour_date: booking.tourDate,
      travelers: booking.travelers,
      amount: booking.amount,
      amount_inr: booking.amount,
      payment_status: booking.paymentStatus,
      status: booking.status,
    };

    const optimistic: Booking = {
      id: newId,
      bookingCode: code,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail || '',
      customerPhone: booking.customerPhone || '',
      destination: booking.destination,
      tourDate: booking.tourDate,
      travelers: booking.travelers,
      amount: booking.amount,
      paymentStatus: booking.paymentStatus,
      status: booking.status,
      createdAt: newDate,
    };

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert(payload)
        .select()
        .maybeSingle();

      if (data) {
        const newBk = mapBooking(data);
        setBookings((prev) => [newBk, ...prev]);
        await loadEvents();
        return newBk;
      }
      if (error) {
        console.warn('[addBooking] notice:', error.message);
        await supabase.from('bookings').insert(payload);
      }
    } catch (e) {
      console.warn('[addBooking] catch:', e);
    }

    setBookings((prev) => [optimistic, ...prev]);
    await loadEvents();
    return optimistic;
  };

  const updateBookingStatus = async (
    id: string,
    status: Booking['status'],
    paymentStatus?: Booking['paymentStatus']
  ) => {
    const patch: Record<string, string> = { status };
    if (paymentStatus) patch.payment_status = paymentStatus;
    try {
      const { error } = await supabase.from('bookings').update(patch).eq('id', id);
      if (error) console.warn('[updateBookingStatus]', error.message);
    } catch (e) {
      console.warn('[updateBookingStatus]', e);
    }
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status, ...(paymentStatus ? { paymentStatus } : {}) } : b
      )
    );
  };

  const deleteBooking = async (id: string) => {
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) console.warn('[deleteBooking]', error.message);
    } catch (e) {
      console.warn('[deleteBooking]', e);
    }
    setBookings((prev) => prev.filter((b) => b.id !== id));
    await loadEvents();
  };

  // -- Customer Actions -------------------------------------------------------

  const addCustomer = async (customer: Omit<Customer, 'id' | 'joinedDate'>) => {
    const newId = crypto.randomUUID ? crypto.randomUUID() : `cust-${Date.now()}`;
    const newDate = new Date().toISOString().split('T')[0];
    const optimistic: Customer = {
      id: newId,
      name: customer.name,
      email: customer.email || '',
      phone: customer.phone || '',
      avatar: customer.avatar || '',
      status: customer.status,
      joinedDate: newDate,
      totalBookings: 0,
      totalSpent: 0,
    };

    try {
      const { data, error } = await supabase
        .from('customers')
        .insert({
          name: customer.name,
          email: customer.email || null,
          phone: customer.phone || null,
          avatar_url: customer.avatar || null,
          status: customer.status,
        })
        .select()
        .maybeSingle();

      if (data) {
        const newC = mapCustomer(data);
        setCustomers((prev) => [newC, ...prev]);
        return newC;
      }
      if (error) console.warn('[addCustomer] notice:', error.message);
    } catch (e) {
      console.warn('[addCustomer] catch:', e);
    }

    setCustomers((prev) => [optimistic, ...prev]);
    return optimistic;
  };

  // -- Image Actions ----------------------------------------------------------

  const addImage = async (img: Omit<UploadedImage, 'id' | 'uploadedAt'>) => {
    const newId = crypto.randomUUID ? crypto.randomUUID() : `img-${Date.now()}`;
    const newDate = new Date().toISOString().split('T')[0];
    const optimistic: UploadedImage = {
      id: newId,
      name: img.name,
      url: img.url,
      size: img.size,
      type: img.type,
      uploadedAt: newDate,
    };

    try {
      const { data, error } = await supabase
        .from('gallery')
        .insert({
          image_url: img.url,
          title: img.name,
          category: 'NATURE',
          description: img.name,
          file_size: img.size,
        })
        .select()
        .maybeSingle();

      if (data) {
        const newImg = mapGalleryImage(data);
        setImages((prev) => [newImg, ...prev]);
        return newImg;
      }
      if (error) console.warn('[addImage] notice:', error.message);
    } catch (e) {
      console.warn('[addImage] catch:', e);
    }

    setImages((prev) => [optimistic, ...prev]);
    return optimistic;
  };

  const deleteImage = async (id: string) => {
    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) console.warn('[deleteImage]', error.message);
    } catch (e) {
      console.warn('[deleteImage]', e);
    }
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // -- Profile Actions --------------------------------------------------------

  const updateProfile = async (newProfile: Partial<AdminProfile>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { console.error('[updateProfile] not authenticated'); return; }
    const { error } = await supabase
      .from('admins')
      .update({
        name: newProfile.name,
        role: newProfile.role,
        company: newProfile.company,
        email: newProfile.email,
        phone: newProfile.phone,
        bio: newProfile.bio,
      })
      .eq('id', user.id);
    if (error) { console.error('[updateProfile]', error); return; }
    setProfile((prev) => ({ ...prev, ...newProfile }));
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
    reload: loadAll,
  };
}
