'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User, LogIn } from 'lucide-react';

// ─── Hardcoded credentials (client-side only – replace with server auth later) ───
const ADMIN_USERNAME = 'Munnar Hiking Tours';
const ADMIN_PASSWORD = 'altraker$321';

// ─── Spinning ring tick marks ────────────────────────────────────────────────
function SpinnerRing() {
  const ticks = 40;
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: ticks }).map((_, i) => {
        const angle = (i / ticks) * 360;
        const isGold = i < Math.round(ticks * 0.4); // first 40% are gold
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `rotate(${angle}deg) translateY(-148px)`,
              transformOrigin: '0 0',
            }}
          >
            <div
              style={{
                width: 4,
                height: isGold ? 20 : 13,
                borderRadius: 3,
                background: isGold
                  ? `rgba(251,191,36,${0.4 + (i / (ticks * 0.4)) * 0.6})`
                  : `rgba(148,163,184,${0.15 + (i / ticks) * 0.35})`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Rotating outer glow ring ────────────────────────────────────────────────
function GlowRing() {
  return (
    <>
      <div
        className="absolute inset-0 rounded-full border-4 border-transparent pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(251,191,36,0.7) 0%, rgba(245,158,11,0.5) 25%, transparent 50%, transparent 100%) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
          animation: 'spin 3s linear infinite',
        }}
      />
    </>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('Munnar Hiking Tours');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If already logged in, redirect straight to dashboard
    if (typeof window !== 'undefined' && sessionStorage.getItem('mht_admin_auth') === '1') {
      router.replace('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200)); // simulate auth delay

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('mht_admin_auth', '1');
      router.push('/admin');
    } else {
      setLoading(false);
      setError('Invalid username or password.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a2035] flex items-center justify-center relative overflow-hidden">
      {/* ── CSS keyframes injected inline ── */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes floatUp { 0%,100% { transform:translateY(0);} 50%{transform:translateY(-14px);} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 24px 6px rgba(251,191,36,0.35);} 50%{box-shadow:0 0 44px 16px rgba(251,191,36,0.6);} }
        @keyframes shake {
          0%,100%{transform:translateX(0);}
          20%{transform:translateX(-8px);}
          40%{transform:translateX(8px);}
          60%{transform:translateX(-6px);}
          80%{transform:translateX(6px);}
        }
        @keyframes fadeSlideIn {
          from{opacity:0;transform:translateY(24px);}
          to{opacity:1;transform:translateY(0);}
        }
        @keyframes ringPulse { 0%,100%{opacity:0.85;} 50%{opacity:1;} }

        .float-anim { animation: floatUp 3s ease-in-out infinite; }
        .shake-anim { animation: shake 0.5s ease-in-out; }
        .fade-slide-in { animation: fadeSlideIn 0.7s ease both; }
        .ring-pulse { animation: ringPulse 2s ease-in-out infinite; }
        .spin-slow { animation: spin 8s linear infinite; }
        .spin-reverse { animation: spinReverse 12s linear infinite; }
        .btn-glow:not(:disabled):hover { animation: pulse-glow 1.5s ease-in-out infinite; }
      `}</style>

      {/* Background particles / ambient blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-[-100px] w-56 h-56 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      {/* ── Main Card ── */}
      <div
        className={`relative flex flex-col items-center ${mounted ? 'fade-slide-in' : 'opacity-0'} ${shake ? 'shake-anim' : ''}`}
        style={{ width: 360 }}
      >
        {/* Spinner ring container */}
        <div className="relative flex items-center justify-center" style={{ width: 340, height: 340 }}>

          {/* Outer rotating tick ring */}
          <div className="absolute inset-0 spin-slow ring-pulse">
            <SpinnerRing />
          </div>

          {/* Reverse rotating thin glow ring */}
          <div
            className="absolute rounded-full spin-reverse pointer-events-none"
            style={{
              inset: 24,
              border: '2px solid rgba(251,191,36,0.2)',
            }}
          />

          {/* Inner dark card */}
          <div
            className="relative z-10 flex flex-col items-center rounded-full bg-[#1e2b45] shadow-2xl"
            style={{ width: 260, height: 260, justifyContent: 'center' }}
          >
            {/* Logo */}
            <div className="relative w-20 h-14 mb-1 float-anim" style={{ filter: 'invert(1) brightness(1.8)' }}>
              <Image
                src="/images/logo-new.png"
                alt="Munnar Hiking Tours"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-amber-400 font-extrabold text-sm tracking-widest uppercase text-center leading-tight mb-3">
              Admin Portal
            </p>

            {/* Login label */}
            <span className="text-amber-400 font-bold text-xl tracking-wider">Login</span>
          </div>
        </div>

        {/* ── Form Card below ring ── */}
        <div
          className="w-full bg-[#1e2b45]/90 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl px-8 py-7 mt-[-40px] pt-14 flex flex-col gap-4"
          style={{ zIndex: 1 }}
        >
          {/* Username field */}
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#131c2e] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Password field */}
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full pl-9 pr-10 py-3 rounded-xl bg-[#131c2e] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-400 text-xs text-center -mt-1">{error}</p>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-glow w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:bg-amber-400/50 text-[#131c2e] font-extrabold py-3 rounded-xl transition-all text-sm tracking-widest uppercase shadow-lg"
            style={{ boxShadow: '0 0 24px 6px rgba(251,191,36,0.35)' }}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Authenticating…
              </>
            ) : (
              <>
                <LogIn size={16} />
                LOGIN
              </>
            )}
          </button>

          <p className="text-center text-gray-500 text-xs mt-1">
            Munnar Hiking Tours · Secure Admin Access
          </p>
        </div>
      </div>
    </div>
  );
}
