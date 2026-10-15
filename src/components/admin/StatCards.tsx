'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, Users, IndianRupee, TrendingUp } from 'lucide-react';
import { useAdminStore } from '@/lib/adminData';

interface StatItem {
  id: string;
  title: string;
  value: string | number;
  numericTarget: number;
  prefix?: string;
  suffix?: string;
  growth: string;
  icon: React.ElementType;
  iconBg: string;
  cardBg: string;
  borderColor: string;
  textColor: string;
}

export default function StatCards() {
  const { stats, enquiries, bookings, customers } = useAdminStore();

  // Dynamic values based on store or reference defaults
  const dynamicNewEnquiries = Math.max(stats.newEnquiries, enquiries.filter(e => e.status === 'new').length);
  const dynamicBookings = Math.max(stats.totalBookings, bookings.length);
  const dynamicCustomers = Math.max(stats.totalCustomers, customers.length);
  const calculatedRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const dynamicRevenue = Math.max(stats.totalRevenue, calculatedRevenue);

  const cardItems: StatItem[] = [
    {
      id: 'enquiries',
      title: 'New Enquiries',
      value: dynamicNewEnquiries,
      numericTarget: dynamicNewEnquiries,
      growth: stats.enquiriesGrowth,
      icon: MessageSquare,
      iconBg: 'bg-[#FF5A1F]',
      cardBg: 'bg-[#FFF5EE]',
      borderColor: 'border-[#FFE3D1]',
      textColor: 'text-stone-900',
    },
    {
      id: 'bookings',
      title: 'Total Bookings',
      value: dynamicBookings,
      numericTarget: dynamicBookings,
      growth: stats.bookingsGrowth,
      icon: Calendar,
      iconBg: 'bg-[#007AFF]',
      cardBg: 'bg-[#F0F7FF]',
      borderColor: 'border-[#D6E8FF]',
      textColor: 'text-stone-900',
    },
    {
      id: 'customers',
      title: 'Total Customers',
      value: dynamicCustomers,
      numericTarget: dynamicCustomers,
      growth: stats.customersGrowth,
      icon: Users,
      iconBg: 'bg-[#00BA65]',
      cardBg: 'bg-[#F0FFF6]',
      borderColor: 'border-[#D2F7E1]',
      textColor: 'text-stone-900',
    },
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: `₹${dynamicRevenue.toLocaleString('en-IN')}`,
      numericTarget: dynamicRevenue,
      prefix: '₹',
      growth: stats.revenueGrowth,
      icon: IndianRupee,
      iconBg: 'bg-[#FF2D55]',
      cardBg: 'bg-[#FFF0F4]',
      borderColor: 'border-[#FFDCE5]',
      textColor: 'text-stone-900',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {cardItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`${item.cardBg} ${item.borderColor} border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
          >
            {/* Top row: Icon */}
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${item.iconBg} text-white flex items-center justify-center shadow-md shadow-black/5`}>
                <Icon size={20} />
              </div>
            </div>

            {/* Middle row: Number and Label */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {item.value}
              </h3>
              <p className="text-xs font-semibold text-stone-500 mt-0.5">
                {item.title}
              </p>
            </div>

            {/* Bottom row: Growth Badge */}
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <TrendingUp size={14} className="stroke-[2.5]" />
              <span>{item.growth}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
