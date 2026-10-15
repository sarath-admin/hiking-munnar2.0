'use client';

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminStore } from '@/lib/adminData';
import { Download, TrendingUp, DollarSign, Calendar, Compass, ArrowUpRight } from 'lucide-react';

export default function ReportsPage() {
  const { stats, bookings, enquiries } = useAdminStore();

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Code,Customer,Destination,Amount,Status\n" +
      bookings.map(b => `${b.bookingCode},"${b.customerName}","${b.destination}",${b.amount},${b.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `treker_bookings_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout title="Reports & Financial Analytics">
      <div className="space-y-6">
        {/* Top Header with Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <div>
            <h3 className="text-base font-extrabold text-stone-900">FY 2026-2027 Performance</h3>
            <p className="text-xs text-stone-500 mt-0.5">Automated accounting, enquiry conversion, and revenue tracking</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Download size={15} /> Export Bookings CSV
          </button>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-stone-150 shadow-sm">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">Average Booking Value</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-stone-900">₹8,750</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center"><ArrowUpRight size={14} /> +14.2%</span>
            </div>
            <p className="text-xs text-stone-400 mt-2">Consistent rise in 4x4 sunrise group packages</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-150 shadow-sm">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">Enquiry to Booking Rate</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-stone-900">66.7%</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center"><ArrowUpRight size={14} /> +8.5%</span>
            </div>
            <p className="text-xs text-stone-400 mt-2">28 confirmed out of 42 high-intent leads</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-150 shadow-sm">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">Gross Booking Volume</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-stone-900">₹2,45,000</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center"><ArrowUpRight size={14} /> +27%</span>
            </div>
            <p className="text-xs text-stone-400 mt-2">September peak season projection</p>
          </div>
        </div>

        {/* Revenue by Tour Category */}
        <div className="bg-white rounded-3xl p-6 border border-stone-150 shadow-sm">
          <h4 className="text-base font-extrabold text-stone-900 mb-4">Top Revenue Generating Adventures</h4>
          <div className="space-y-4">
            {[
              { name: 'Kolukkumalai Sunrise Trekking Adventure', share: 45, revenue: '₹1,10,250', color: 'bg-orange-500' },
              { name: 'Meesapulimala High Altitude Trek', share: 25, revenue: '₹61,250', color: 'bg-amber-500' },
              { name: 'Private Shola Camping & Resort Stays', share: 20, revenue: '₹49,000', color: 'bg-blue-500' },
              { name: 'Cardamom Field & Tea Walks', share: 10, revenue: '₹24,500', color: 'bg-emerald-500' },
            ].map((tour) => (
              <div key={tour.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-stone-800">
                  <span>{tour.name}</span>
                  <span>{tour.revenue} ({tour.share}%)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
                  <div className={`h-full rounded-full ${tour.color}`} style={{ width: `${tour.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
