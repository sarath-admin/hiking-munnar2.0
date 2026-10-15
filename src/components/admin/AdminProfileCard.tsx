'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MessageSquare, MoreHorizontal, Edit3, X, Check } from 'lucide-react';
import { useAdminStore } from '@/lib/adminData';

export default function AdminProfileCard() {
  const { profile, updateProfile } = useAdminStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    role: profile.role,
    company: profile.company,
    phone: profile.phone,
    email: profile.email,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-150 shadow-sm relative flex flex-col justify-between">
      {/* Top Header: Avatar + Name + Options */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3.5">
            {/* Avatar with Green Online Dot */}
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-stone-100 shadow-md ring-2 ring-stone-100 shrink-0">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-black text-stone-900 leading-tight">
                {profile.name}
              </h4>
              <p className="text-xs font-semibold text-stone-500">
                {profile.role}
              </p>
            </div>
          </div>

          {/* Three dots options */}
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            title="Edit Profile"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Quick Contact Action Icons */}
        <div className="flex items-center gap-3 my-5">
          <a
            href={`tel:${profile.phone}`}
            title={`Call ${profile.phone}`}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-orange-50 hover:text-orange-600 text-stone-700 flex items-center justify-center transition-colors shadow-xs"
          >
            <Phone size={17} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            title={`Email ${profile.email}`}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-orange-50 hover:text-orange-600 text-stone-700 flex items-center justify-center transition-colors shadow-xs"
          >
            <Mail size={17} />
          </a>
          <button
            onClick={() => alert(`Starting chat with ${profile.name}...`)}
            title="Open Chat"
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-orange-50 hover:text-orange-600 text-stone-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
          >
            <MessageSquare size={17} />
          </button>
        </div>

        {/* Details Table */}
        <div className="space-y-2.5 pt-2 border-t border-stone-100 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-500">Company</span>
            <span className="font-bold text-stone-800">{profile.company}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-500">Joining Date</span>
            <span className="font-bold text-stone-800">{profile.joiningDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-500">Total Enquiries</span>
            <span className="font-bold text-stone-800">{profile.totalEnquiries}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-500">Total Bookings</span>
            <span className="font-bold text-stone-800">{profile.totalBookings}</span>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="font-extrabold text-stone-900 text-base">Edit Admin Profile</h3>
              <button onClick={() => setIsEditing(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 shadow-md shadow-orange-600/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
