'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminStore, Enquiry } from '@/lib/adminData';
import { 
  Search, 
  Plus, 
  Eye, 
  Trash2, 
  Filter, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  CheckCircle, 
  X, 
  AlertTriangle 
} from 'lucide-react';

export default function EnquiriesPage() {
  const { enquiries, addEnquiry, updateEnquiryStatus, deleteEnquiry } = useAdminStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Enquiry['status']>('all');
  const [viewingEnquiry, setViewingEnquiry] = useState<Enquiry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Enquiry Form
  const [newForm, setNewForm] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Kolukkumalai Sunrise Trek',
    date: '2026-09-18',
    travelers: 2,
    budget: '₹5,000',
    message: '',
  });

  React.useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setNewForm(prev => ({ ...prev, date: today }));
  }, []);

  const filtered = enquiries.filter(enq => {
    const matchesSearch = 
      enq.name.toLowerCase().includes(search.toLowerCase()) ||
      enq.email.toLowerCase().includes(search.toLowerCase()) ||
      enq.phone.includes(search) ||
      enq.destination.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEnquiry({
        ...newForm,
        status: 'new',
      });
      setShowAddModal(false);
      setNewForm({
        name: '',
        email: '',
        phone: '',
        destination: 'Kolukkumalai Sunrise Trek',
        date: new Date().toISOString().split('T')[0],
        travelers: 2,
        budget: '₹5,000',
        message: '',
      });
    } catch (err) {
      console.warn('Enquiry creation handled gracefully:', err);
      setShowAddModal(false);
    }
  };

  const getStatusBadge = (status: Enquiry['status']) => {
    switch (status) {
      case 'new':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'contacted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled':
        return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  return (
    <AdminLayout title="Enquiries Management" searchQuery={search} onSearchChange={setSearch}>
      <div className="space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['all', 'new', 'contacted', 'confirmed', 'cancelled'] as const).map(tab => (
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

          {/* Add Enquiry Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-orange-600/20 transition-all cursor-pointer"
          >
            <Plus size={16} /> Add New Enquiry
          </button>
        </div>

        {/* Enquiries Data Table */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/80 text-[11px] font-extrabold uppercase tracking-wider text-stone-500 border-b border-stone-200">
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Destination & Date</th>
                  <th className="py-4 px-6">Travelers / Budget</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs" suppressHydrationWarning>
                {filtered.map(enq => (
                  <tr key={enq.id} className="hover:bg-orange-50/20 transition-colors">
                    {/* Customer */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-stone-900 text-sm" suppressHydrationWarning>{enq.name}</p>
                      <div className="text-stone-500 flex flex-col gap-0.5 mt-0.5">
                        <span className="flex items-center gap-1.5"><Mail size={11} /> {enq.email}</span>
                        <span className="flex items-center gap-1.5"><Phone size={11} /> {enq.phone}</span>
                      </div>
                    </td>

                    {/* Destination & Date */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-stone-800">{enq.destination}</p>
                      <span className="inline-flex items-center gap-1 text-stone-500 text-[11px] mt-0.5">
                        <Calendar size={11} /> {enq.date}
                      </span>
                    </td>

                    {/* Travelers & Budget */}
                    <td className="py-4 px-6">
                      <span className="font-bold text-stone-800">{enq.travelers} Guests</span>
                      <p className="text-stone-500 text-[11px] font-semibold">{enq.budget}</p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-6">
                      <select
                        value={enq.status}
                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as Enquiry['status'])}
                        className={`text-[11px] font-extrabold px-3 py-1 rounded-full border outline-none cursor-pointer ${getStatusBadge(enq.status)}`}
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="confirmed">CONFIRMED</option>
                        <option value="cancelled">CANCELLED</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => setViewingEnquiry(enq)}
                        className="p-2 rounded-lg text-stone-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => setDeletingId(enq.id)}
                        className="p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Enquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-stone-400">
                      No enquiries matching your search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Enquiry Modal */}
      {viewingEnquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-extrabold text-stone-900 text-base">Enquiry Details</h3>
              <button onClick={() => setViewingEnquiry(null)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 my-4 text-xs">
              <div>
                <span className="text-stone-400 font-bold uppercase text-[10px]">Customer</span>
                <p className="text-sm font-bold text-stone-900">{viewingEnquiry.name}</p>
                <p className="text-stone-600">{viewingEnquiry.email} • {viewingEnquiry.phone}</p>
              </div>

              <div>
                <span className="text-stone-400 font-bold uppercase text-[10px]">Destination</span>
                <p className="text-sm font-bold text-stone-900">{viewingEnquiry.destination}</p>
                <p className="text-stone-600">Travel Date: {viewingEnquiry.date} ({viewingEnquiry.travelers} Guests)</p>
              </div>

              {viewingEnquiry.message && (
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-stone-400 font-bold uppercase text-[10px] block mb-1">Customer Message</span>
                  <p className="text-stone-700 italic">"{viewingEnquiry.message}"</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
              <a
                href={`tel:${viewingEnquiry.phone}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs"
              >
                <Phone size={13} /> Call
              </a>
              <a
                href={`mailto:${viewingEnquiry.email}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs"
              >
                <Mail size={13} /> Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-base font-extrabold text-stone-900">Delete Enquiry?</h3>
            <p className="text-xs text-stone-500 mt-1 mb-5">
              This action cannot be undone. Are you sure you want to remove this enquiry?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 font-bold text-xs text-stone-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteEnquiry(deletingId);
                  setDeletingId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Enquiry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-extrabold text-stone-900 text-base">Create New Enquiry</h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateEnquiry} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={newForm.name}
                  onChange={e => setNewForm({ ...newForm, name: e.target.value })}
                  placeholder="e.g. Rahul Nair"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newForm.email}
                    onChange={e => setNewForm({ ...newForm, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={newForm.phone}
                    onChange={e => setNewForm({ ...newForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Destination</label>
                <select
                  value={newForm.destination}
                  onChange={e => setNewForm({ ...newForm, destination: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                >
                  <option value="Kolukkumalai Sunrise Trek">Kolukkumalai Sunrise Trek</option>
                  <option value="Meesapulimala Peak Expedition">Meesapulimala Peak Expedition</option>
                  <option value="Cardamom Field Nature Walk">Cardamom Field Nature Walk</option>
                  <option value="Anakulam Wild Elephant Jeep Safari">Anakulam Wild Elephant Jeep Safari</option>
                  <option value="Infinity Pool Mountain Resort Stay">Infinity Pool Mountain Resort Stay</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newForm.date}
                    onChange={e => setNewForm({ ...newForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Notes / Message</label>
                <textarea
                  rows={2}
                  value={newForm.message}
                  onChange={e => setNewForm({ ...newForm, message: e.target.value })}
                  placeholder="Special requests or requirements..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                />
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
                  Save Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
