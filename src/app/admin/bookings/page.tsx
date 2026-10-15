'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminStore, Booking } from '@/lib/adminData';
import { 
  Plus, 
  Eye, 
  Trash2, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  X, 
  AlertTriangle,
  Receipt
} from 'lucide-react';

export default function BookingsPage() {
  const { bookings, addBooking, updateBookingStatus, deleteBooking } = useAdminStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Booking['status']>('all');
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Booking Form
  const [newForm, setNewForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    destination: 'Kolukkumalai Sunrise Safari',
    tourDate: '2026-09-18',
    travelers: 2,
    amount: 5000,
    paymentStatus: 'paid' as Booking['paymentStatus'],
  });

  useEffect(() => {
    // Safely update default date on client mount
    const today = new Date().toISOString().split('T')[0];
    setNewForm(prev => ({ ...prev, tourDate: today }));
  }, []);

  const filtered = bookings.filter(bk => {
    const matchesSearch =
      bk.customerName.toLowerCase().includes(search.toLowerCase()) ||
      bk.bookingCode.toLowerCase().includes(search.toLowerCase()) ||
      bk.destination.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bk.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking({
      ...newForm,
      status: 'confirmed',
    });
    setShowAddModal(false);
  };

  return (
    <AdminLayout title="Bookings Management" searchQuery={search} onSearchChange={setSearch}>
      <div className="space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['all', 'confirmed', 'in-progress', 'completed', 'cancelled'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-orange-600/20 transition-all cursor-pointer"
          >
            <Plus size={16} /> Create Booking
          </button>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/80 text-[11px] font-extrabold uppercase tracking-wider text-stone-500 border-b border-stone-200">
                  <th className="py-4 px-6">Booking Code & Customer</th>
                  <th className="py-4 px-6">Destination & Date</th>
                  <th className="py-4 px-6">Amount & Payment</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {filtered.map(bk => (
                  <tr key={bk.id} className="hover:bg-orange-50/20 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md text-[11px]">
                        {bk.bookingCode}
                      </span>
                      <p className="font-bold text-stone-900 text-sm mt-1">{bk.customerName}</p>
                      <p className="text-stone-500 text-[11px]">{bk.customerEmail}</p>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-bold text-stone-800">{bk.destination}</p>
                      <span className="inline-flex items-center gap-1 text-stone-500 text-[11px] mt-0.5">
                        <Calendar size={11} /> {bk.tourDate} ({bk.travelers} Pax)
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-black text-stone-900 text-sm">
                        ₹{bk.amount.toLocaleString('en-IN')}
                      </p>
                      <span className={`inline-block mt-0.5 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        bk.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {bk.paymentStatus}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <select
                        value={bk.status}
                        onChange={(e) => updateBookingStatus(bk.id, e.target.value as Booking['status'])}
                        className="text-[11px] font-bold px-3 py-1 rounded-full border border-stone-200 bg-white text-stone-800 outline-none cursor-pointer"
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => setViewingBooking(bk)}
                        className="p-2 rounded-lg text-stone-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => setDeletingId(bk.id)}
                        className="p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Booking"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Booking Modal with Invoice Summary */}
      {viewingBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Receipt className="text-orange-600" size={20} />
                <h3 className="font-extrabold text-stone-900 text-base">Booking Voucher</h3>
              </div>
              <button onClick={() => setViewingBooking(null)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 my-5 text-xs">
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 flex justify-between items-center">
                <div>
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Booking Reference</span>
                  <p className="text-base font-black text-orange-600">{viewingBooking.bookingCode}</p>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 font-bold uppercase text-[10px]">Total Paid</span>
                  <p className="text-base font-black text-stone-900">₹{viewingBooking.amount.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div>
                <span className="text-stone-400 font-bold uppercase text-[10px]">Customer Details</span>
                <p className="text-sm font-bold text-stone-900">{viewingBooking.customerName}</p>
                <p className="text-stone-600">{viewingBooking.customerEmail} • {viewingBooking.customerPhone}</p>
              </div>

              <div>
                <span className="text-stone-400 font-bold uppercase text-[10px]">Tour Experience</span>
                <p className="text-sm font-bold text-stone-900">{viewingBooking.destination}</p>
                <p className="text-stone-600">Travel Date: {viewingBooking.tourDate} ({viewingBooking.travelers} Guests)</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
              <button
                onClick={() => {
                  alert('Voucher sent to customer email & WhatsApp!');
                  setViewingBooking(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20"
              >
                Send Customer Confirmation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-base font-extrabold text-stone-900">Cancel / Delete Booking?</h3>
            <p className="text-xs text-stone-500 mt-1 mb-5">
              This will remove the booking record and clear calendar slot.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setDeletingId(null)} className="flex-1 py-2.5 rounded-xl border border-stone-200 font-bold text-xs text-stone-700">
                Back
              </button>
              <button
                onClick={() => {
                  deleteBooking(deletingId);
                  setDeletingId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-extrabold text-stone-900 text-base">New Tour Booking</h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={newForm.customerName}
                  onChange={e => setNewForm({ ...newForm, customerName: e.target.value })}
                  placeholder="e.g. Maya Iyer"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newForm.customerEmail}
                    onChange={e => setNewForm({ ...newForm, customerEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={newForm.customerPhone}
                    onChange={e => setNewForm({ ...newForm, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Destination Tour</label>
                <select
                  value={newForm.destination}
                  onChange={e => setNewForm({ ...newForm, destination: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-orange-500"
                >
                  <option value="Kolukkumalai Sunrise Safari">Kolukkumalai Sunrise Safari</option>
                  <option value="Meesapulimala High Altitude Trek">Meesapulimala High Altitude Trek</option>
                  <option value="Private Shola Forest Camping">Private Shola Forest Camping</option>
                  <option value="Cardamom & Spice Plantation Walk">Cardamom & Spice Plantation Walk</option>
                  <option value="Anakulam 4x4 Off-Road Safari">Anakulam 4x4 Off-Road Safari</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newForm.tourDate}
                    onChange={e => setNewForm({ ...newForm, tourDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Travelers</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newForm.travelers}
                    onChange={e => setNewForm({ ...newForm, travelers: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={newForm.amount}
                    onChange={e => setNewForm({ ...newForm, amount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 outline-none focus:border-orange-500"
                  />
                </div>
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
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-600/20"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
