'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  MessageSquare, 
  CalendarCheck, 
  Images,
  BarChart3, 
  Settings, 
  ChevronRight,
  Plane,
  ExternalLink,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import TrekerLogo from './TrekerLogo';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutGrid },
  { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  { name: 'Gallery', href: '/admin/gallery', icon: Images },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#121417] text-white rounded-[2rem] p-5 flex flex-col justify-between shadow-2xl border border-white/5 h-full shrink-0 select-none">
      <div>
        {/* Treker Brand Logo */}
        <div className="px-2 pt-2 pb-8 flex items-center justify-between">
          <Link href="/admin" onClick={onCloseMobile} className="hover:opacity-90 transition-opacity">
            <TrekerLogo />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          {/* Back to Public Website link */}
          <Link
            href="/"
            onClick={async () => {
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('admin_fresh_login');
              }
              await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
              onCloseMobile?.();
            }}
            className="group flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 transition-all duration-200 mb-2 shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <ArrowLeft
                size={18}
                className="text-emerald-400 group-hover:-translate-x-1 transition-transform"
              />
              <span>Back to Website</span>
            </div>
          </Link>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    size={20}
                    className={`transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-stone-400 group-hover:text-amber-400'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {isActive && (
                  <ChevronRight size={16} className="text-white/80" />
                )}
              </Link>
            );
          })}

          {/* Log Out Button */}
          <button
            onClick={async () => {
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('admin_fresh_login');
              }
              await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
              window.location.replace('/admin/login');
            }}
            className="group flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-stone-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer w-full text-left mt-1"
          >
            <LogOut size={20} className="text-stone-400 group-hover:text-red-400 transition-colors" />
            <span>Log Out</span>
          </button>
        </nav>
      </div>

      {/* Bottom Promo Card: "Explore the World" */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg border border-white/10">
          <Image
            src="/images/admin/explore_world.png"
            alt="Explore the World"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-between">
            <div className="flex justify-end">
              <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Plane size={14} className="rotate-45" />
              </span>
            </div>
            <div>
              <p className="text-white font-extrabold text-base leading-tight drop-shadow-sm">
                Explore <br />
                <span className="text-amber-400">the World</span>
              </p>
              <Link
                href="/"
                onClick={async () => {
                  if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('admin_fresh_login');
                  }
                  await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
                  onCloseMobile?.();
                }}
                className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-white/90 hover:text-amber-300 transition-colors uppercase tracking-wider"
              >
                Go to Website <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
