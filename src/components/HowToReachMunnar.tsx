import React from 'react';
import { Plane, Train, MapPin, Compass, Hospital, PhoneCall } from 'lucide-react';

const distances = [
  { city: 'Cochin', dist: '130 km' },
  { city: 'Madurai', dist: '135 km' },
  { city: 'Aluva', dist: '110 km' },
  { city: 'Alleppey', dist: '180 km' },
  { city: 'Kumarakom', dist: '140 km' },
  { city: 'Thekkady', dist: '106 km' },
  { city: 'Pollachi', dist: '120 km' },
  { city: 'Coimbatore', dist: '160 km' },
  { city: 'Tirunelveli', dist: '255 km' },
];

const thingsToDo = [
  'Trekking',
  'Jeep Safari',
  'Tea Walk',
  'Wildlife',
  'Waterfalls',
  'Sunrise',
];

const hospitals = [
  'Tata General Hospital',
  'Matha Hospital',
  'Arun Hospital',
];

const emergencyNumbers = [
  { label: 'Police control room', num: '100' },
  { label: 'Fire station', num: '101' },
  { label: 'Ambulance', num: '103' },
];

export default function HowToReachMunnar() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-[#6A8B74] uppercase tracking-widest text-xs md:text-sm font-semibold">
          Travel Essentials & Guide
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#F4F4F1] mt-2 mb-3">
          How to Reach Munnar
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          Essential transport connections, major city distances, and key emergency contacts for your journey to Munnar.
        </p>
      </div>

      {/* 3-Column Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: How to Reach Munnar? */}
        <div className="bg-[#121814] rounded-3xl p-6 md:p-8 border border-[#212b24] shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/5">
              <span className="w-9 h-9 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <MapPin size={18} />
              </span>
              <h3 className="font-extrabold text-white text-lg tracking-wide">
                How to Reach Munnar?
              </h3>
            </div>

            {/* Nearest Airport */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-2.5">
                <Plane size={16} />
                <span>Nearest Airport</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 pl-6 list-disc marker:text-blue-400">
                <li className="leading-relaxed">
                  <span className="font-semibold text-white">Cochin International Airport</span>
                  <span className="text-xs text-gray-400 block">~130 km from Munnar</span>
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold text-white">Madurai International Airport</span>
                  <span className="text-xs text-gray-400 block">~135 km from Munnar</span>
                </li>
              </ul>
            </div>

            {/* Nearest Railway Station */}
            <div>
              <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-2.5">
                <Train size={16} />
                <span>Nearest Railway Station</span>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-300 pl-6 list-disc marker:text-blue-400">
                <li>Aluva <span className="text-xs text-gray-400">(~110 km)</span></li>
                <li>Ernakulam <span className="text-xs text-gray-400">(~130 km)</span></li>
                <li>Kottayam <span className="text-xs text-gray-400">(~140 km)</span></li>
                <li>Madurai <span className="text-xs text-gray-400">(~135 km)</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-gray-500 italic">
            Direct taxi, cab, and KSRTC bus services are regularly available from all transit hubs.
          </div>
        </div>

        {/* Column 2: Distances from Munnar */}
        <div className="bg-[#121814] rounded-3xl p-6 md:p-8 border border-[#212b24] shadow-xl hover:border-emerald-500/40 transition-all">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/5">
            <span className="w-9 h-9 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Compass size={18} />
            </span>
            <h3 className="font-extrabold text-white text-lg tracking-wide">
              Distances from Munnar
            </h3>
          </div>

          <div className="divide-y divide-white/5 space-y-2">
            {distances.map(({ city, dist }) => (
              <div key={city} className="flex items-center justify-between pt-2 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-medium">{city}</span>
                </div>
                <span className="font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full text-xs border border-emerald-500/20">
                  {dist}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Things to Do, Hospitals & Emergency Numbers */}
        <div className="bg-[#121814] rounded-3xl p-6 md:p-8 border border-[#212b24] shadow-xl hover:border-orange-500/40 transition-all flex flex-col justify-between">
          <div>
            {/* Things to Do */}
            <div className="mb-6 pb-5 border-b border-white/5">
              <h3 className="font-extrabold text-white text-base tracking-wide mb-3 flex items-center gap-2">
                <span>📷</span> Things to Do
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {thingsToDo.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/5 hover:bg-orange-500/10 text-gray-200 hover:text-orange-300 text-xs px-2.5 py-1 rounded-xl border border-white/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Hospitals */}
            <div className="mb-6 pb-5 border-b border-white/5">
              <div className="flex items-center gap-2 text-rose-400 text-sm font-bold mb-2.5">
                <Hospital size={16} />
                <span>Hospitals in Munnar</span>
              </div>
              <ul className="space-y-1 text-sm text-gray-300 pl-6 list-disc marker:text-rose-400">
                {hospitals.map((hosp) => (
                  <li key={hosp} className="font-medium">
                    {hosp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency Numbers */}
            <div>
              <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-2.5">
                <PhoneCall size={16} />
                <span>Emergency Numbers</span>
              </div>
              <div className="space-y-1.5">
                {emergencyNumbers.map(({ label, num }) => (
                  <div key={label} className="flex items-center justify-between text-xs bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                    <span className="text-gray-300">{label}</span>
                    <span className="font-black text-rose-400 text-sm tracking-wide">{num}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
