import React from 'react';
import Image from 'next/image';
import HowToReachMunnar from '@/components/HowToReachMunnar';
import InsuranceVerificationSection from '@/components/InsuranceVerificationSection';

export const metadata = {
  title: 'About Us | Munnar Hiking Tours',
  description: 'Learn about our expert local guides, our history, and why we are the top-rated trekking agency in Munnar, Kerala.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#0b0e0c] min-h-screen text-gray-300 font-sans">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="max-w-xl">
            <h3 className="text-[#6A8B74] uppercase tracking-widest text-sm font-semibold mb-6">
              About Munnar Hiking Tours
            </h3>
            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif text-[#F4F4F1] mb-8 leading-[1.1]">
              Your Local Guide to Munnar's Wild Heart
            </h1>
            
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              Munnar Hiking Tours was born from a profound love for the Western Ghats sanctuary. We are naturalists, hill trackers, and storytellers devoted to revealing Munnar's pristine soul beyond ordinary tourist routes.
            </p>
            
            <p className="text-gray-400 mb-12 text-lg leading-relaxed">
              Every route we operate follows strict Leave-No-Trace wilderness ethics, supports indigenous tea communities, and ensures travelers return with renewed kinship with untouched wilderness.
            </p>

            {/* Stats */}
            <div className="flex gap-12">
              <div>
                <div className="text-3xl font-bold text-[#E6B074] mb-2 font-serif">8+ Years</div>
                <div className="text-sm text-gray-400">Guiding High Range trails</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#8DB499] mb-2 font-serif">4,500+</div>
                <div className="text-sm text-gray-400">Adventurers led safely</div>
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-5 gap-4 h-[600px]">
            <div className="col-span-3 relative h-full w-full rounded-3xl overflow-hidden">
              <Image 
                src="/images/hero.png"
                alt="Local Guide" 
                fill
                className="object-cover"
              />
            </div>
            <div className="col-span-2 grid grid-rows-2 gap-4 h-full">
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image 
                  src="/images/slide2.jpg" 
                  alt="Tea Plantations" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image 
                  src="/images/meesapulimala.png" 
                  alt="Mountain View" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Existing Content styled to match the dark theme */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        {/* Section 1: Experience */}
        <div className="bg-[#121814] p-8 md:p-12 rounded-[2rem] border border-[#212b24] mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-[#F4F4F1] mb-6">Experience our Adventure & Trekking!</h2>
          <p className="text-gray-400 mb-4 leading-relaxed text-[16px]">
            Welcome to Munnar Trekking Trials. We are the leading adventure tour operators in munnar. We believe in creating close ties with our customers to best understand their travel needs and preferences. We provide a local guide for all our trekking tours. The benefits of the local guide is the guest can know more information about munnar, tea plants and local wildlife of munnar because they know very well about those things. All our clients are extremely happy and appreciated with our handling of their tour arrangements. We always take utmost care while planning and executing all the tour arrangements in munnar.
          </p>
          <p className="text-gray-400 mb-4 leading-relaxed text-[16px]">
            Also we have best deals with top tourist homestay, cottages and resorts in munnar with special rates. We are arranging taxi service to our guests at a reasonable price. Our team guarantees you full satisfaction and makes their munnar trip more happy and memorable.
          </p>
          <p className="text-gray-300 mb-8 leading-relaxed text-[16px] bg-[#17231c]/60 p-4 rounded-xl border border-emerald-900/40 text-left">
            <strong className="text-emerald-300 block mb-1 font-semibold">100% Client Safety & Insurance Coverage:</strong>
            We claim comprehensive insurance protection for our clients. Every trekking trail, mountain hike, sunrise point trip, and off-road jeep safari guest is officially covered under our registered Public Liability Insurance policy for complete safety and peace of mind.
          </p>
          
          <h3 className="text-lg font-bold text-[#6A8B74] tracking-widest mb-8 uppercase">Munnar Hiking Trials</h3>
          
          {/* Mock Badges */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 opacity-80">
            <div className="flex flex-col items-center">
              <div className="flex text-[#8DB499] mb-1">
                {'★★★★★'.split('').map((star, i) => <span key={i} className="text-2xl">{star}</span>)}
              </div>
              <span className="font-bold text-gray-300 text-lg">TripAdvisor</span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold mb-1">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </span>
              <span className="font-bold text-gray-400">Reviews <span className="text-yellow-400">★★★★★</span></span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 border-b border-gray-700 pb-1">Certificate of Excellence</span>
              <div className="w-12 h-12 rounded-full border-2 border-[#8DB499] flex items-center justify-center mt-2">
                <span className="font-bold text-[#8DB499] text-xs">TA</span>
              </div>
            </div>
          </div>

          {/* Insurance Verification Section with QR Code & Company Details */}
          <InsuranceVerificationSection />
        </div>

        {/* Section 2: About Munnar */}
        <div className="bg-[#121814] p-8 md:p-12 rounded-[2rem] border border-[#212b24] mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-[#E6B074] mb-6">About Munnar</h2>
          <p className="text-gray-400 leading-relaxed text-[16px]">
            Munnar is 1,600 m (5,400 ft) above sea level. It is pronounced "Moon-aar" short for "moonu aar" meaning 3 rivers. Three rivers – Madupetti, Nallathanni and Periavaru which flow through this town, but join some distance away from Munnar.Munnar is famous for its tea plantations, many of them started by the British. The "Kannan Devan" brand of Tea from the Tata is cultivated and processed here.The strobilanthus ("neelakurinji" in Malayalam, the local language), a blue flower which blooms only every 12 years, is found in this region. It bloomed last in December 2006. Munnar also has the highest peak in South India, Anamudi, at 2,695 m.Eravikulam national park is one of the main tourist attraction, where you can find the endagered species of Nilgiri Tahr (mountain goat called "varayadu" in Malayalam). A treck to Rajamala ("King of hills" in Malayalam), in the morning is sure to spot a few friendly mountain goats. You can also fond Gaur, Langur, Lion-tailed macaque, and Elephants depending on the season and time of travel.
          </p>
        </div>

      </div>

      {/* How to Reach Munnar & Travel Essentials */}
      <div className="w-full px-4 md:px-8 pb-20 flex justify-center">
        <div className="w-full max-w-6xl">
          <HowToReachMunnar />
        </div>
      </div>
    </div>
  );
}
