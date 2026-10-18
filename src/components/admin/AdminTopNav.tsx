'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Mail, Bell, ChevronDown, Menu, CheckCircle, Clock, LogOut } from 'lucide-react';
import { useAdminStore } from '@/lib/adminData';
import { supabase } from '@/lib/supabase';

interface AdminTopNavProps {
  title?: string;
  onOpenMobile?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export default function AdminTopNav({
  title = "Dashboard",
  onOpenMobile,
  searchQuery = "",
  onSearchChange,
}: AdminTopNavProps) {
  const router = useRouter();
  const { profile, enquiries } = useAdminStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    await supabase.auth.signOut().catch(() => {});
    window.location.href = '/admin/login';
  };

  const newEnquiriesCount = enquiries.filter(e => e.status === 'new').length;

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
      {/* Title & Mobile Hamburger */}
      <div className="flex items-center gap-3">
        {onOpenMobile && (
          <button
            onClick={onOpenMobile}
            className="md:hidden p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
        )}
        <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
          {title}
        </h1>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-md mx-0 sm:mx-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search enquiries, bookings, customers..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full bg-stone-100/90 hover:bg-stone-100 focus:bg-white border border-transparent focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-full pl-11 pr-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-all outline-none"
          />
        </div>
      </div>

      {/* Right Action Icons & Admin Profile */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Messages / Mail Icon */}
        <Link
          href="/admin/enquiries"
          className="relative p-2.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-700 transition-colors"
          title="Enquiries & Messages"
        >
          <Mail size={18} />
          {newEnquiriesCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          )}
        </Link>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-700 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-orange-500 ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200/80 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="font-bold text-stone-900 text-sm">Notifications</span>
                <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  {newEnquiriesCount} New
                </span>
              </div>
              <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto mt-2">
                {enquiries.slice(0, 3).map((enq) => (
                  <Link
                    key={enq.id}
                    href="/admin/enquiries"
                    onClick={() => setShowNotifications(false)}
                    className="block py-2.5 hover:bg-stone-50 px-2 rounded-xl transition-colors"
                  >
                    <p className="text-xs font-bold text-stone-900">{enq.name}</p>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{enq.destination}</p>
                    <div className="flex items-center gap-1 text-[10px] text-stone-400 mt-1">
                      <Clock size={10} /> {enq.createdAt}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-stone-100/90 hover:bg-stone-200/80 transition-all text-left cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white ring-2 ring-white shadow-sm">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-extrabold text-stone-900 leading-tight">
                {profile.name}
              </p>
              <p className="text-[11px] font-medium text-stone-500">
                {profile.role}
              </p>
            </div>
            <ChevronDown size={14} className="text-stone-500" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-stone-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-stone-100">
                <p className="text-xs font-bold text-stone-900">{profile.name}</p>
                <p className="text-[11px] text-stone-500 truncate">{profile.email}</p>
              </div>
              <div className="py-1">
                <Link
                  href="/admin/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="block px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
                >
                  Profile & Settings
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="block px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
                >
                  View Public Website
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border-t border-stone-100 mt-1"
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Log Out Action Button */}
        <button
          onClick={handleLogout}
          className="p-2.5 rounded-full bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-600 transition-colors cursor-pointer"
          title="Log Out & Lock Admin Panel"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}

