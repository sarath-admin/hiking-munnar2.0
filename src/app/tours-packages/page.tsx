import React from 'react';
import PackagesShowcase from '@/components/PackagesShowcase';
import Link from 'next/link';
import { ShieldCheck, Compass, HeartHandshake, Award, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Tour Packages – Munnar | Munnar Hiking Tours',
  description: 'Explore our complete range of tour packages including Soft Hiking, Half Day Trekking, Full Day Trekking, and Sunrise Trekking in Munnar with verified local guides.',
};

export default function ToursPackagesPage() {
  return (
    <div className="min-h-screen bg-[#14171A]">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#14171A] z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1920&auto=format&fit=crop" 
            alt="Munnar Tours and Packages" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
          <span className="text-[#FFA94D] font-bold tracking-widest uppercase text-xs md:text-sm mb-3 inline-block bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
            OFFICIAL ADVENTURE ITINERARIES
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-xl tracking-tight">
            Tour Packages – Munnar
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
            Walk gently. Explore deeply. Feel Munnar. Browse our official high-quality package flyers below, complete with transparent schedules, altitudes, and inclusions.
          </p>
        </div>
      </section>

      {/* MAIN 2-COLUMN SHOWCASE (Right Side & Left Side) */}
      <section className="py-16 md:py-24 bg-[#14171A]">
        <div className="container mx-auto px-4 max-w-6xl">
          <PackagesShowcase showTitle={false} />
        </div>
      </section>

      {/* LINK TO MEDIA GALLERY */}
      <section className="py-12 bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-emerald-950/40 border-t border-b border-white/10 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-gray-400 text-sm mb-2">Want to see real photos and videos from these trails?</p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-sm tracking-wide transition-colors group"
          >
            Explore the 3D Visual Gallery <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>


      {/* WHY BOOK DIRECTLY WITH MUNNAR HIKING TOURS */}
      <section className="py-16 bg-[#1a1e22] border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Why Trekkers Choose Our Packages
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
              Direct booking with certified local Munnar mountaineers. No third-party middlemen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-gray-300">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 text-center md:text-left">
              <Compass className="w-10 h-10 text-emerald-400 mb-4 mx-auto md:mx-0" />
              <h3 className="text-white font-bold text-base mb-2">Native Certified Guides</h3>
              <p className="text-sm text-gray-400">Born and raised in Munnar with deep knowledge of flora, fauna, and hidden forest paths.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 text-center md:text-left">
              <ShieldCheck className="w-10 h-10 text-emerald-400 mb-4 mx-auto md:mx-0" />
              <h3 className="text-white font-bold text-base mb-2">Permits & Safety First</h3>
              <p className="text-sm text-gray-400">All required Kerala Forest Department passes and emergency support are arranged in advance.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 text-center md:text-left">
              <HeartHandshake className="w-10 h-10 text-emerald-400 mb-4 mx-auto md:mx-0" />
              <h3 className="text-white font-bold text-base mb-2">Homemade Meals</h3>
              <p className="text-sm text-gray-400">Enjoy fresh authentic Kerala mountain breakfast and piping hot tea at summit viewpoints.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 text-center md:text-left">
              <Award className="w-10 h-10 text-emerald-400 mb-4 mx-auto md:mx-0" />
              <h3 className="text-white font-bold text-base mb-2">Instant Confirmation</h3>
              <p className="text-sm text-gray-400">Book seamlessly directly via WhatsApp with zero hassle and flexible date rescheduling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ASSISTANCE BANNER */}
      <section className="py-14 bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-emerald-950/60 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need a Custom Itinerary or Private Group Tour?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-sm md:text-base">
            We organize tailored sunrise treks, camping, multi-day expeditions, and family-friendly plantation walks. Talk to our trail lead now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/919496520787?text=Hi!%20I%20am%20looking%20for%20a%20custom%20tour%20package%20in%20Munnar."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1faa53] text-white font-bold py-3.5 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-0.5 text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp (+91 94965 20787)
            </a>
            <a
              href="tel:+919496520787"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3.5 px-8 rounded-full border border-white/20 transition-all text-base"
            >
              Direct Call: +91 94965 20787
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
