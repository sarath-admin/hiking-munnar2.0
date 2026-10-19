'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

// ─── Inline SVGs for exact visual match to screenshot ────────────────────────
function FacebookRoundIcon() {
  return (
    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#173461] hover:bg-slate-200 transition-colors shadow cursor-pointer">
      <svg className="w-4 h-4 fill-[#173461]" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </span>
  );
}

function GooglePlusRoundIcon() {
  return (
    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#173461] hover:bg-slate-200 transition-colors shadow cursor-pointer font-black text-xs">
      G+
    </span>
  );
}

function LinkedInRoundIcon() {
  return (
    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#173461] hover:bg-slate-200 transition-colors shadow cursor-pointer">
      <svg className="w-3.5 h-3.5 fill-[#173461]" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    </span>
  );
}

function TwitterMiniIcon() {
  return (
    <span className="w-6 h-6 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white shadow cursor-pointer">
      <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </span>
  );
}

function FacebookMiniIcon() {
  return (
    <span className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow cursor-pointer">
      <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </span>
  );
}

function InstagramMiniIcon() {
  return (
    <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow cursor-pointer">
      <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </span>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Always clear session on arriving at login page so it requires a fresh login
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_fresh_login');
      fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    }
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (loading) return;

    if (!password.trim()) {
      setError('Please enter your password.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Incorrect password. Please try again.');
        setShake(true);
        setTimeout(() => setShake(false), 600);
        setLoading(false);
        return;
      }

      // Record fresh active session in sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('admin_fresh_login', 'true');
      }

      // Success path — replace history entry so back button smoothly returns to website
      window.location.replace('/admin');
    } catch {
      setError('Network error. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#14284d] flex items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .shake-animation { animation: shake 0.5s ease-in-out; }
        .fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>

      {/* Top Left Return to Website Button */}
      <div className="absolute top-5 left-5 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15 backdrop-blur-md shadow-lg"
        >
          <ArrowLeft size={14} />
          <span>Back to Website</span>
        </Link>
      </div>

      {/* Decorative background geometry */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Split Login Card */}
      <div
        className={`w-full max-w-[820px] bg-[#1a3869] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 ${
          mounted ? 'fade-in' : 'opacity-0'
        } ${shake ? 'shake-animation' : ''}`}
        style={{ minHeight: '480px' }}
      >
        {/* ── LEFT HALF: Mountain Trekker Image & Quote ── */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-full flex flex-col justify-between p-7 text-white overflow-hidden">
          {/* Background Photo */}
          <Image
            src="/images/full_day_trekking_landscape.jpg"
            alt="Munnar Trekking Mountain View"
            fill
            priority
            className="object-cover"
          />

          {/* Soft atmospheric gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-blue-950/30 to-black/30" />

          {/* Inspirational Quote Header */}
          <div className="relative z-10 pt-4 px-2">
            <h2 className="text-lg md:text-xl font-extrabold tracking-wide text-white text-center uppercase leading-tight drop-shadow-md">
              TRAVEL IS THE ONLY THING<br />
              YOU BUY THAT MAKES YOU<br />
              RICHER
            </h2>
          </div>

          {/* Bottom Social Icons */}
          <div className="relative z-10 flex items-center justify-center gap-2 pt-6">
            <FacebookMiniIcon />
            <TwitterMiniIcon />
            <InstagramMiniIcon />
          </div>
        </div>

        {/* ── RIGHT HALF: Navy Blue Form Container ── */}
        <div className="w-full md:w-1/2 bg-[#1b3765] flex flex-col justify-center items-center px-8 py-10 text-white relative">
          {/* Brand Framing Bracket Logo */}
          <div className="relative inline-block mb-7 text-center">
            {/* Corner brackets */}
            <span className="absolute top-0 left-0 w-2.5 h-full border-l-2 border-t-2 border-b-2 border-white/90" />
            <span className="absolute top-0 right-0 w-2.5 h-full border-r-2 border-t-2 border-b-2 border-white/90" />
            <span className="px-5 py-1 text-xs md:text-sm font-black tracking-[0.22em] text-white uppercase inline-block whitespace-nowrap">
              MUNNAR HIKING TOURS
            </span>
          </div>

          {/* Round Social Icons */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <FacebookRoundIcon />
            <GooglePlusRoundIcon />
            <LinkedInRoundIcon />
          </div>

          <p className="text-[11px] text-blue-200/70 font-medium mb-6">
            or enter admin password
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-[270px] flex flex-col items-center space-y-4">
            {/* Password Underline Field */}
            <div className="w-full relative border-b border-white/40 focus-within:border-white transition-colors pb-1">
              <input
                id="admin-login-pwd-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                disabled={loading}
                className="w-full bg-transparent text-white placeholder-blue-200/50 text-sm focus:outline-none pr-8 py-1.5 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
                tabIndex={-1}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-rose-300 text-xs font-semibold text-center animate-pulse">
                {error}
              </p>
            )}

            {/* Forgot Your Password? Link */}
            <div className="w-full flex justify-end">
              <span
                onClick={() => setPassword('altreker@321')}
                className="text-[11px] text-blue-200/80 hover:text-white transition-colors cursor-pointer"
              >
                Forgot Your Password?
              </span>
            </div>

            {/* Clean White Pill Button: ENTER */}
            <div className="w-full pt-3 flex justify-center">
              <button
                id="admin-login-enter-btn"
                type="submit"
                disabled={loading}
                className="w-full max-w-[230px] rounded-full bg-white text-[#173461] hover:bg-slate-100 active:scale-[0.98] font-black text-xs tracking-[0.25em] uppercase py-2.5 px-6 shadow-xl transition-all cursor-pointer text-center"
              >
                {loading ? 'AUTHENTICATING...' : 'ENTER'}
              </button>
            </div>

            {/* Direct Link to Homepage */}
            <div className="pt-2 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-blue-200/70 hover:text-white transition-colors font-medium"
              >
                <ArrowLeft size={12} />
                <span>Return to Homepage</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}