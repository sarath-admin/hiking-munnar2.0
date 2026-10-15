'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminStore } from '@/lib/adminData';
import { Plus, Star, MapPin, Clock, Users, X } from 'lucide-react';

export default function DestinationsPage() {
  const { destinations } = useAdminStore();
  const [search, setSearch] = useState('');

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Destinations Management" searchQuery={search} onSearchChange={setSearch}>
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-stone-200/80">
          <p className="text-xs font-bold text-stone-500">
            {destinations.length} Active High-Range Trek & Safari Trails
          </p>
          <button
            onClick={() => alert('New destination creation modal')}
            className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <Plus size={16} /> Add Destination
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(dest => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-150 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={dest.imageUrl}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-orange-600 shadow-xs">
                    {dest.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" /> {dest.rating}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-extrabold text-stone-900 text-base leading-snug">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {dest.state}, {dest.country}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-stone-600 mt-4 pt-3 border-t border-stone-100">
                    <span className="flex items-center gap-1"><Clock size={13} /> {dest.duration}</span>
                    <span className="flex items-center gap-1"><Users size={13} /> {dest.bookingsCount} booked</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase">Starting From</span>
                  <p className="text-lg font-black text-orange-600 leading-tight">₹{dest.price.toLocaleString('en-IN')}</p>
                </div>
                <button
                  onClick={() => alert(`Managing packages for ${dest.name}`)}
                  className="px-3.5 py-1.5 rounded-xl border border-stone-200 hover:border-orange-500 text-stone-700 hover:text-orange-600 text-xs font-bold transition-colors"
                >
                  Manage Tour
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
