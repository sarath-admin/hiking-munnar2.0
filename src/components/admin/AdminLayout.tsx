'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import AdminTopNav from './AdminTopNav';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export default function AdminLayout({
  children,
  title = "Dashboard",
  searchQuery,
  onSearchChange,
}: AdminLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6ED] via-[#FFEBDC] to-[#FEDBC7] p-2 sm:p-4 md:p-7 flex items-center justify-center relative overflow-x-hidden selection:bg-orange-500 selection:text-white">
      {/* Decorative 3D Ambient Spheres (Matching Reference Background) */}
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 left-12 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 shadow-2xl opacity-75 pointer-events-none hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -left-8 w-28 h-28 rounded-full bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 shadow-2xl opacity-60 pointer-events-none hidden md:block"
      />
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-16 -right-6 w-32 h-32 rounded-full bg-gradient-to-bl from-orange-400 via-amber-300 to-yellow-200 shadow-2xl opacity-70 pointer-events-none hidden md:block"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-14 right-1/4 w-36 h-36 rounded-full bg-gradient-to-b from-yellow-200 to-orange-400 blur-xl opacity-30 pointer-events-none"
      />

      {/* Main Glassmorphic Dashboard Window */}
      <div className="w-full max-w-[1580px] bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_90px_rgba(255,100,0,0.12)] border border-white/90 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 relative z-10 min-h-[92vh]">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <AdminSidebar />
        </div>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-10 p-3 h-full">
              <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminTopNav
            title={title}
            onOpenMobile={() => setMobileSidebarOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />

          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
