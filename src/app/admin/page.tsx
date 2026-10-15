'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import WelcomeHero from '@/components/admin/WelcomeHero';
import StatCards from '@/components/admin/StatCards';
import BookingsChart from '@/components/admin/BookingsChart';
import ImageUploadCard from '@/components/admin/ImageUploadCard';
import InteractiveCalendar from '@/components/admin/InteractiveCalendar';
import AdminProfileCard from '@/components/admin/AdminProfileCard';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('mht_admin_auth') !== '1') {
      router.replace('/admin/login');
    } else {
      setAuthed(true);
    }
  }, [router]);

  if (!authed) return null; // render nothing while redirecting

  return (
    <AdminLayout
      title="Dashboard"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Center Column (Left 8 cols on large screens) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* 1. Welcome Hero Banner */}
          <WelcomeHero />

          {/* 2. Four Dynamic Animated Stat Cards */}
          <StatCards />

          {/* 3. Bottom Row: Monthly Bookings Chart & Image Upload Management */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <BookingsChart />
            </div>
            <div className="md:col-span-5">
              <ImageUploadCard />
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (Right 4 cols on large screens) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* 4. Interactive September 2026 Calendar */}
          <InteractiveCalendar />

          {/* 5. Admin Profile Card (Sophia Miller) */}
          <AdminProfileCard />
        </div>
      </div>
    </AdminLayout>
  );
}
