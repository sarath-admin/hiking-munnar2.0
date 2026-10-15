'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function WelcomeHero() {
  return (
    <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#FF9500] via-[#FF6D00] to-[#FF4500] p-7 md:p-9 text-white shadow-xl shadow-orange-500/20">
      {/* Decorative background glow circles */}
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-yellow-300/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Content */}
        <div className="md:col-span-7 lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-yellow-200 uppercase tracking-wider">
            <Sparkles size={13} className="text-yellow-300" /> Treker Admin Portal
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            HELLO <span className="text-yellow-300 drop-shadow-sm">TREKER</span>
            <br />
            <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold flex items-center gap-2 mt-1">
              Welcome to new world ✨
            </span>
          </h2>

          <p className="text-white/90 text-sm md:text-base max-w-lg font-medium leading-relaxed">
            Get new travel enquiries, manage bookings, and create unforgettable journeys.
          </p>

          <div className="pt-2">
            <Link
              href="/admin/enquiries"
              className="group inline-flex items-center gap-2.5 bg-white text-orange-600 font-extrabold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-50 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Explore Enquiries</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Right 3D Illustration with floating animation */}
        <div className="md:col-span-5 lg:col-span-4 relative flex justify-center items-center">
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 drop-shadow-2xl"
          >
            <Image
              src="/images/admin/hero_traveler.png"
              alt="Treker 3D Traveler Illustration"
              fill
              priority
              className="object-contain object-center select-none pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
