'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { User, Menu, X, ArrowRight } from 'lucide-react';
import AdventurePlannerModal from './AdventurePlannerModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adventureOpen, setAdventureOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when navigating to a new route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Hide public header on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Treks', href: '/trekking' },
    { name: 'Jeep Safari', href: '/jeep-safari' },
    { name: 'Tours Packages', href: '/tours-packages' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 flex flex-col items-center">
        <header className="bg-zinc-900/95 backdrop-blur-md rounded-full shadow-2xl border border-white/10 w-full max-w-7xl relative z-50">
          <div className="px-6 md:px-8 h-20 flex items-center justify-between">
            <Link 
              href="/" 
              className="relative block h-12 w-36 md:h-14 md:w-44 group hover:scale-105 hover:-translate-y-1 transition-all duration-500 ease-out"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image 
                src="/images/logo-new.png" 
                alt="Munnar Hiking Tours Logo" 
                fill
                style={{ filter: 'invert(1) contrast(1.2)', mixBlendMode: 'screen' }}
                className="object-contain object-left opacity-90 group-hover:opacity-100 transition-opacity"
                priority
              />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-medium text-sm">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 xl:px-4 py-2 transition-all rounded-full ${
                      isActive
                        ? 'bg-green-800 text-white shadow-inner font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setAdventureOpen(true)}
                className="hidden sm:inline-flex bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] cursor-pointer"
              >
                Plan Your Adventure
              </button>
              <Link 
                href="/admin" 
                className="hidden sm:inline-flex bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-4 py-2 rounded-full font-medium text-sm transition-colors items-center gap-2"
              >
                <User size={16} /> Admin
              </Link>
              
              {/* Mobile Menu Hamburger Button */}
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="lg:hidden text-gray-200 hover:text-white p-2.5 rounded-full hover:bg-white/10 active:scale-95 transition-all focus:outline-none"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X size={26} className="text-white transition-transform rotate-90 duration-200" />
                ) : (
                  <Menu size={26} className="transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu Dropdown Card */}
        {mobileMenuOpen && (
          <div className="w-full max-w-7xl mt-2 bg-zinc-950/98 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-5 lg:hidden z-50 max-h-[calc(100vh-105px)] flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-3 duration-200">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-green-800 text-white shadow-md'
                        : 'text-gray-200 hover:text-white hover:bg-white/10 active:bg-white/15'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight 
                      size={18} 
                      className={`transition-transform ${isActive ? 'translate-x-1 text-white' : 'text-gray-500'}`} 
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 mt-4 border-t border-white/10 flex flex-col gap-3">
              <button 
                onClick={() => { setMobileMenuOpen(false); setAdventureOpen(true); }}
                className="w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3.5 px-6 rounded-2xl font-bold text-base shadow-[0_0_20px_rgba(249,115,22,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Plan Your Adventure
                <ArrowRight size={18} />
              </button>
              
              <Link 
                href="/admin" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 text-white py-2.5 px-4 rounded-2xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <User size={16} /> Admin Login
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Adventure Planner Modal */}
      <AdventurePlannerModal isOpen={adventureOpen} onClose={() => setAdventureOpen(false)} />
    </>
  );
}
