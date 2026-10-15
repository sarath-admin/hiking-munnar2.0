'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Mail, Phone } from 'lucide-react';

// Brand SVG icons
function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const contactNumber = process.env.NEXT_PUBLIC_CONTACT_NUMBER || '+919496520787';

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[var(--color-dark)] text-gray-300 pt-16 pb-8 border-t-4 border-[var(--color-accent)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="mb-6 relative h-16 w-48">
              <Image
                src="/images/logo-new.png"
                alt="Munnar Hiking Tours Logo"
                fill
                style={{ filter: 'invert(1) contrast(1.2)' }}
                className="object-contain object-left opacity-90"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Experience the breathtaking beauty of Munnar with our expert local guides. From sunrise treks to jeep safaris, we ensure unforgettable adventures above the clouds.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] transition-colors duration-200"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/teafeel_hiking_alvin?igsh=MXRyMWUweW9uN3hidA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#E1306C] transition-colors duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF0000] transition-colors duration-200"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/trekking" className="hover:text-white transition-colors">All Treks</Link></li>
              <li><Link href="/tours-packages" className="hover:text-white transition-colors">Tour Packages</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Popular Treks */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Popular Treks</h3>
            <ul className="space-y-3">
              <li><Link href="/trekking/kolukkumalai-sunrise-trek" className="hover:text-white transition-colors">Kolukkumalai Sunrise</Link></li>
              <li><Link href="/trekking/chokramudi-trek" className="hover:text-white transition-colors">Chokramudi Trek</Link></li>
              <li><Link href="/trekking/meesapulimala-trek" className="hover:text-white transition-colors">Meesapulimala Trek</Link></li>
              <li><Link href="/trekking/tea-plantation-walk" className="hover:text-white transition-colors">Tea Plantation Walk</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[var(--color-accent)] shrink-0 mt-1" size={20} />
                <span className="text-sm leading-relaxed">
                  Old Munnar, Football Ground,<br />
                  Opposite Munnar,<br />
                  Kerala 685612
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[var(--color-accent)] shrink-0" size={20} />
                <a href={`tel:${contactNumber}`} className="hover:text-white transition-colors text-sm">
                  {contactNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[var(--color-accent)] shrink-0" size={20} />
                <a href="mailto:info@munnarhikingtours.com" className="hover:text-white transition-colors text-sm break-all">
                  info@munnarhikingtours.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col gap-6 text-xs text-gray-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>&copy; 2026 Munnar Hiking Tours. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
              <Link href="/cancellation" className="hover:text-gray-300">Cancellation Policy</Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 pt-6 border-t border-gray-800/50 mt-2 pb-4">
            <p className="tracking-[0.2em] font-bold text-gray-400 text-[10px] uppercase">Developed For Excellence</p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
              <div className="relative w-9 h-8">
                <Image
                  src="/images/skinfotech-transparent.png"
                  alt="skInfoTech Logo"
                  fill
                  sizes="72px"
                  className="object-contain"
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-gray-300 font-medium text-sm">&copy; 2026 skInfoTech Solutions.</p>
                <p className="text-gray-500 text-xs mt-0.5">Sarathkumar.k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
