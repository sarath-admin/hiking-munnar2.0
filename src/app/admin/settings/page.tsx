'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminStore } from '@/lib/adminData';
import { Save, Database, Bell, Shield, CheckCircle2, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const { profile, updateProfile } = useAdminStore();
  const [formData, setFormData] = useState({
    name: profile.name,
    role: profile.role,
    company: profile.company,
    email: profile.email,
    phone: profile.phone,
    bio: profile.bio || '',
  });
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <AdminLayout title="Settings & Preferences">
      <div className="max-w-4xl space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-150 shadow-sm">
          <div className="flex items-center gap-4 pb-6 border-b border-stone-100">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white ring-4 ring-orange-50 shadow-md">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <h3 className="text-lg font-black text-stone-900">{profile.name}</h3>
              <p className="text-xs text-stone-500">{profile.role} • {profile.company}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 outline-none focus:border-orange-500 font-semibold text-stone-800"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Role / Designation</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 outline-none focus:border-orange-500 font-semibold text-stone-800"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 outline-none focus:border-orange-500 font-semibold text-stone-800"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 outline-none focus:border-orange-500 font-semibold text-stone-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 outline-none focus:border-orange-500 font-semibold text-stone-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Bio / Profile Description</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 outline-none focus:border-orange-500 font-medium text-stone-800"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              {savedMessage ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1.5 text-xs">
                  <CheckCircle2 size={16} /> Profile updated successfully!
                </span>
              ) : <div />}

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-orange-600/25 transition-all cursor-pointer"
              >
                <Save size={15} /> Save Settings
              </button>
            </div>
          </form>
        </div>

        {/* Database & Storage Status */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-150 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Database className="text-orange-600" size={20} />
            <h4 className="text-base font-extrabold text-stone-900">Database & Cloud Storage</h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl">
              <div>
                <p className="font-bold text-stone-900">Supabase Connection</p>
                <p className="text-stone-500">Configured with environment variables in .env.local</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full">
                Active / Ready
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl">
              <div>
                <p className="font-bold text-stone-900">Client-Side High Performance Storage</p>
                <p className="text-stone-500">Local persistent caching for ultra fast responses & offline mode</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full">
                Persistent Sync
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
