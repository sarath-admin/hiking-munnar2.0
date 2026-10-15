'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminStore, Customer } from '@/lib/adminData';
import { Search, Plus, Mail, Phone, Calendar, Award, Star, X } from 'lucide-react';

export default function CustomersPage() {
  const { customers, addCustomer } = useAdminStore();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    totalBookings: 1,
    totalSpent: 4500,
    status: 'active' as Customer['status'],
  });

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomer({
      ...newCustomer,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    });
    setShowAddModal(false);
  };

  return (
    <AdminLayout title="Customers Directory" searchQuery={search} onSearchChange={setSearch}>
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-stone-200/80">
          <p className="text-xs font-bold text-stone-500">
            Total {customers.length} registered travelers & guests
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <Plus size={16} /> Add Customer
          </button>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(cust => (
            <div
              key={cust.id}
              className="bg-white rounded-3xl p-6 border border-stone-150 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-stone-100 ring-2 ring-orange-100">
                      <Image
                        src={cust.avatar || '/images/admin/sophia_avatar.png'}
                        alt={cust.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-stone-900 text-sm">{cust.name}</h4>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                        cust.status === 'vip' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {cust.status === 'vip' ? '★ VIP Traveler' : 'Active Guest'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <p className="flex items-center gap-2"><Mail size={13} className="text-stone-400" /> {cust.email}</p>
                  <p className="flex items-center gap-2"><Phone size={13} className="text-stone-400" /> {cust.phone}</p>
                  <p className="flex items-center gap-2"><Calendar size={13} className="text-stone-400" /> Member since: {cust.joinedDate}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs bg-orange-50/50 p-2.5 rounded-xl">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Trips</span>
                  <span className="font-black text-stone-900">{cust.totalBookings} Completed</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Lifetime Spend</span>
                  <span className="font-black text-orange-600">₹{cust.totalSpent.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-extrabold text-stone-900 text-base">Add New Customer</h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={newCustomer.name}
                  onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="e.g. Pooja Hegde"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newCustomer.email}
                  onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={newCustomer.phone}
                  onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Status Tier</label>
                <select
                  value={newCustomer.status}
                  onChange={e => setNewCustomer({ ...newCustomer, status: e.target.value as Customer['status'] })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-orange-500"
                >
                  <option value="active">Active Guest</option>
                  <option value="vip">VIP Traveler</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 font-bold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
