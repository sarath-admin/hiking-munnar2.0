import React from 'react';
import BookingForm from '@/components/BookingForm';
import GoogleReviewsSlider from '@/components/GoogleReviewsSlider';
import { MapPin, Phone, Mail, Clock, Star, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Munnar Hiking Tours',
  description: 'Get in touch with Munnar Hiking Tours to book your next mountain adventure. Find our official Google profile, verified reviews, and office location in Munnar.',
};

function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function GoogleMapsIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      />
      <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

export default function ContactPage() {
  const contactNumber = process.env.NEXT_PUBLIC_CONTACT_NUMBER || '+919496520787';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919496520787';
  const googleProfileUrl =
    'https://www.google.com/search?client=ms-android-oneplus-terr1-rso2&hs=AGBW&sca_esv=81ee190d3896ba19&sxsrf=APpeQnvy-VaMQ5f9lcszywa3MRwvjHixsg:1792478722265&kgmid=/g/11tk33_snl&q=Munnar+Hiking+Trails&shem=dlvs1,epsd1,ltae,rimspwouoe&shndl=30&source=sh/x/loc/uni/m1/2&kgs=a097737dee9eb764&utm_source=dlvs1,epsd1,ltae,rimspwouoe,sh/x/loc/uni/m1/2';

  return (
    <div className="bg-[#fcfbf7] min-h-screen">
      {/* 1. TOP HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#12161a] pt-24 sm:pt-28 md:pt-32 pb-2 sm:pb-4 border-b border-white/10">
        <div className="w-full">
          <img
            src="/images/contact_hero_banner_hq.png"
            alt="Contact Us - Munnar Hiking Tours"
            className="w-full h-[180px] sm:h-[260px] md:h-[340px] lg:h-auto max-h-[520px] object-cover object-left sm:object-center select-none"
          />
        </div>
        <h1 className="sr-only">Contact Us - Munnar Hiking Tours</h1>
      </section>

      {/* 2. CONTACT DETAILS & BOOKING ENQUIRY FORM */}
      <section className="py-16 md:py-24 bg-[#fcfbf7] border-b border-[#eae4d7]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-[#163524] font-bold tracking-wider uppercase text-xs sm:text-sm">
              Direct Communication
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#163524] font-bold mt-2">
              Speak with Our Trail Specialists
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mt-2 text-sm sm:text-base">
              Have questions about altitude, fitness levels, or family routes? We typically respond within minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Details Card */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
                <h3 className="text-2xl font-bold mb-6 text-[#163524]">Contact Information</h3>

                <div className="space-y-6">
                  {/* Phone / WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-stone-900 mb-0.5">Phone / WhatsApp</h4>
                      <p className="text-gray-500 text-xs mb-2">Available 24/7 for trek coordination</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={`tel:${contactNumber}`}
                          className="text-[#163524] font-bold text-base hover:underline"
                        >
                          {contactNumber}
                        </a>
                        <a
                          href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(
                            'Hi! I would like to enquire about Munnar hiking tours.'
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm transition-colors"
                        >
                          Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                      <Mail size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-stone-900 mb-0.5">Email Us</h4>
                      <p className="text-gray-500 text-xs mb-1">For corporate or private customized group expeditions</p>
                      <a
                        href="mailto:hello@munnarhikingtours.com"
                        className="text-[#163524] font-bold text-base hover:underline"
                      >
                        hello@munnarhikingtours.com
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-stone-900 mb-0.5">Base Camp / Office</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Munnar Hiking Tours Building,<br />
                        Near KSRTC Bus Stand,<br />
                        Munnar, Kerala 685612
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-[#163524] text-white p-8 rounded-3xl shadow-md border border-emerald-950">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={24} className="text-emerald-400" />
                  <h3 className="text-xl font-bold">Office Hours</h3>
                </div>
                <p className="text-emerald-200 text-sm mb-1">Monday - Sunday</p>
                <p className="text-2xl font-bold text-white">6:00 AM – 10:00 PM</p>
                <p className="text-xs mt-3 text-emerald-300 italic">
                  *Early sunrise trek pickups and emergency rescue operations operate 24/7.
                </p>
              </div>
            </div>

            {/* Booking / Enquiry Form */}
            <div>
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200">
                <h3 className="text-2xl font-bold mb-2 text-[#163524]">Send an Enquiry</h3>
                <p className="text-gray-500 mb-6 text-sm">
                  Fill out the form below and we will connect you directly with a trek lead on WhatsApp!
                </p>
                <BookingForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. GOOGLE PROFILE & MAP SECTION (Positioned Below Contact Section) */}
      <section className="py-12 md:py-16 bg-[#0e1215] border-b border-white/10 text-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Official Google Business Actions */}
            <div className="lg:col-span-5 bg-[#161b20] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1">
                    <GoogleIcon className="w-full h-full" />
                  </div>
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                    Google Business Profile
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Munnar Hiking Trails
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                  Official verified Google Maps listing for guided sunrise trekking, jeep safaris, and cloud bed peak expeditions in Munnar.
                </p>

                {/* 5.0 Star Rating Badge */}
                <div className="inline-flex items-center gap-3 bg-black/40 px-4 py-2.5 rounded-2xl border border-white/10 shadow-sm">
                  <span className="text-xl font-extrabold text-white">5.0/5.0</span>
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-300 font-medium pl-1 border-l border-white/20">
                    500+ Google Reviews
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {/* Find Us on Google Maps Button */}
                <a
                  href={googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#ff7a00] hover:bg-[#e86f00] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-full flex items-center justify-between shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.01] active:scale-95 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1 shrink-0">
                      <GoogleMapsIcon className="w-full h-full" />
                    </div>
                    <span>Find Us on Google Maps</span>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Read Our Google Reviews Button */}
                <a
                  href={googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-full border border-white/20 flex items-center justify-between shadow-md transition-all hover:scale-[1.01] active:scale-95 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1 shrink-0">
                      <GoogleIcon className="w-full h-full" />
                    </div>
                    <span>Read Our Google Reviews</span>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Native High-Range Trek Guides</span>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded Google Map of Munnar Hiking Trails */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 min-h-[340px] h-full relative group">
              <iframe
                title="Munnar Hiking Trails Location Map"
                src="https://maps.google.com/maps?q=Munnar+Hiking+Trails&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[350px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-stone-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-stone-200 inline-flex items-center gap-1.5 transition-all opacity-90 group-hover:opacity-100"
              >
                <span>View on Google Search / Maps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. GOOGLE REVIEWS SECTION (One-by-One Slider with 5-Star Ratings) */}
      <GoogleReviewsSlider googleProfileUrl={googleProfileUrl} />
    </div>
  );
}
