import React from 'react';

// ── Thumbnail image mapping per location ─────────────────────────
const thumbs: Record<string, string> = {
  'Tea museum / Eravikulam National Park': '/images/eravikulam_national_park.jpg',
  'Lakkam Waterfalls': '/images/safari_waterfall_v2.jpg',
  'Thalaiyar Tea Plantation': '/images/tea_walk.png',
  'Sandalwood Forest': '/images/slide3.jpg',
  'Sugarcane factory visit': '/images/tea_factory_tasting.jpg',
  'Plusnagar View Point': '/images/meesapulimala.png',
  'Marayure Dolmans': '/images/slide1.jpg',
  'Kanthalure Fruits garden and tree house visit': '/images/spice_garden_visit.jpg',
  'Chinnar Wild life Santuary': '/images/safari_wildlife.jpg',
  'Blossom Park': '/images/plantation_picnic.jpg',
  'Attukad Waterfalls': '/images/safari_waterfall.jpg',
  'Pothamedu View Point': '/images/anaimudi_view.jpg',
  '2nd Mile view point': '/images/hero_scenic_sunrise.jpg',
  'Karadipara 360': '/images/chokramudi.png',
  'Spice Garden': '/images/spice_garden_visit.jpg',
  'Chenkulam Dam Boating': '/images/slide5.jpg',
  'Wondervalley': '/images/slide2.jpg',
  'Dream Land': '/images/letchmi_trek.jpg',
  'Sunset Point': '/images/hero_scenic_sunrise.jpg',
  '4 Hours Jeep Safari': '/images/jeep_safari_anakulam_hq.jpg',
  'Rosegarden': '/images/plantation_picnic.jpg',
  'Photo point': '/images/top_station_sunrise.jpg',
  'Botanical garden': '/images/tea_walk.png',
  'Elephant park': '/images/safari_wildlife.jpg',
  'Mattupatty dam': '/images/slide4.jpg',
  'Shooting point': '/images/kolukkumalai_sunrise_view.jpg',
  'Echo point': '/images/hero_scenic_sunrise.jpg',
  'Kundale dam': '/images/safari_kannan_devan.jpg',
  'Top station view point': '/images/top_station_sunrise.jpg',
  'Lockhart Tea factory visit': '/images/tea_factory_tasting.jpg',
  'Lockhart Tea plantation': '/images/tea_walk.png',
  'Bisonvalley view point': '/images/meesapulimala.png',
  'Anayirangal Dam': '/images/slide5.jpg',
  'Kolukkumlai Tea factory': '/images/kolukkumalai.png',
  'Kolukkumalai sunrise point': '/images/kolukkumalai_sunrise_view.jpg',
  'Suryanelli dam boating': '/images/safari_waterfall_v2.jpg',
  'Anayirangal Dam view': '/images/anaimudi_view.jpg',
};

const fallback = '/images/slide1.jpg';

// ── Data ────────────────────────────────────────────────────────
const coimbatoreList = [
  'Tea museum / Eravikulam National Park', 'Lakkam Waterfalls',
  'Thalaiyar Tea Plantation', 'Sandalwood Forest', 'Sugarcane factory visit',
  'Plusnagar View Point', 'Marayure Dolmans',
  'Kanthalure Fruits garden and tree house visit', 'Chinnar Wild life Santuary',
];
const cochinList = [
  'Blossom Park', 'Attukad Waterfalls', 'Pothamedu View Point',
  '2nd Mile view point', 'Karadipara 360', 'Spice Garden',
  'Chenkulam Dam Boating', 'Wondervalley', 'Dream Land',
  'Sunset Point', '4 Hours Jeep Safari',
];
const topStationList = [
  'Rosegarden', 'Photo point', 'Botanical garden', 'Elephant park',
  'Mattupatty dam', 'Shooting point', 'Echo point', 'Kundale dam',
  'Top station view point',
];
const thekkadyList = [
  'Lockhart Tea factory visit', 'Lockhart Tea plantation',
  'Bisonvalley view point', 'Anayirangal Dam', 'Kolukkumlai Tea factory',
  'Kolukkumalai sunrise point', 'Suryanelli dam boating', 'Anayirangal Dam view',
];

const distances = [
  ['Cochin', '130 km'], ['Madurai', '135 km'], ['Aluva', '110 km'],
  ['Alleppey', '180 km'], ['Kumarakom', '140 km'], ['Thekkady', '106 km'],
  ['Pollachi', '120 km'], ['Coimbatore', '160 km'], ['Tirunelveli', '255 km'],
];

// ── Sub-component: one direction panel ──────────────────────────
function Panel({
  title, items, bg, accent,
}: { title: string; items: string[]; bg: string; accent: string }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: bg }}>
        <span className="text-white font-extrabold text-[13px] tracking-wide">{title}</span>
      </div>
      {/* Rows */}
      <div className="bg-white divide-y divide-gray-100">
        {items.map((name, i) => (
          <div key={name} className="flex items-center gap-2 px-2.5 py-1.5">
            {/* Number badge */}
            <span
              className="shrink-0 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
              style={{ background: accent }}
            >
              {i + 1}
            </span>
            {/* Name */}
            <span className="text-gray-800 text-[12.5px] leading-snug flex-1">{name}</span>
            {/* Thumbnail */}
            <img
              src={thumbs[name] ?? fallback}
              alt={name}
              className="w-10 h-8 object-cover rounded-md shrink-0 border border-gray-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main export ─────────────────────────────────────────────────
export default function MunnarRouteMap() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 font-sans">

      {/* ── Header ── */}
      <div
        className="relative flex items-start justify-between px-6 pt-5 pb-4"
        style={{
          background: 'linear-gradient(135deg,#d4edda 0%,#b8dfc4 40%,#9ecfaf 70%,#87c19a 100%)',
        }}
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-green-900 leading-none tracking-tight">MUNNAR</h2>
          <p className="text-green-900 font-bold text-sm mt-0.5 tracking-wide">TOURIST GUIDE &amp; ROUTE MAP</p>
          <p className="text-green-800 text-xs mt-2 max-w-xs leading-relaxed">
            Let us now explore some of the options in and around Munnar that would provide
            travellers ample opportunities to enjoy the captivating hill station of Munnar.
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-green-800 italic font-bold text-xl leading-tight">Explore</p>
          <p className="text-green-800 italic font-extrabold text-3xl leading-tight">Munnar</p>
          <span className="text-2xl">🌿</span>
        </div>
      </div>

      {/* ── 2-column layout: Left panels | Right panels ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-4 bg-[#f8faf8]">

        {/* Left panels */}
        <div className="flex flex-col gap-4">
          <Panel title="🚗  Munnar to Coimbatore Direction" items={coimbatoreList} bg="#1565C0" accent="#1565C0" />
          <Panel title="🚗  Munnar to Cochin Direction"     items={cochinList}      bg="#2E7D32" accent="#2E7D32" />
        </div>

        {/* Right panels */}
        <div className="flex flex-col gap-4">
          <Panel title="🚗  Munnar to Top Station Direction" items={topStationList} bg="#E65100" accent="#E65100" />
          <Panel title="🚗  Munnar to Thekkadi Direction"   items={thekkadyList}   bg="#6A1B9A" accent="#6A1B9A" />
        </div>
      </div>

      {/* ── Bottom Info Strip ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-gray-100">
        {/* How to Reach */}
        <div className="bg-blue-50 p-4 border-r border-gray-200">
          <h3 className="font-black text-blue-900 text-sm mb-3">📍 How to Reach Munnar?</h3>
          <p className="font-bold text-blue-800 text-xs mb-1">✈ Nearest Airport</p>
          <ul className="text-gray-700 text-xs pl-3 list-disc space-y-0.5 mb-3">
            <li>Cochin International Airport</li>
            <li>Madurai International Airport</li>
          </ul>
          <p className="font-bold text-blue-800 text-xs mb-1">🚂 Nearest Railway Station</p>
          <ul className="text-gray-700 text-xs pl-3 list-disc space-y-0.5">
            <li>Aluva</li><li>Ernakulam</li><li>Kottayam</li><li>Madurai</li>
          </ul>
        </div>

        {/* Distances */}
        <div className="bg-green-50 p-4 border-r border-gray-200">
          <h3 className="font-black text-green-900 text-sm mb-3">🛣 Distances from Munnar</h3>
          <div className="space-y-1">
            {distances.map(([city, dist]) => (
              <div key={city} className="flex justify-between text-xs text-gray-700">
                <span className="flex items-center gap-1"><span className="text-green-600">•</span>{city}</span>
                <span className="font-semibold text-green-800">{dist}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Things + Hospitals + Emergency */}
        <div className="bg-orange-50 p-4">
          <div className="mb-3">
            <h3 className="font-black text-orange-900 text-sm mb-1.5">📷 Things to Do</h3>
            <div className="flex flex-wrap gap-1">
              {['Trekking','Jeep Safari','Tea Walk','Wildlife','Waterfalls','Sunrise'].map(t => (
                <span key={t} className="bg-white text-gray-700 text-[11px] px-2 py-0.5 rounded border border-orange-200">{t}</span>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <h3 className="font-black text-red-800 text-sm mb-1">🏥 Hospitals</h3>
            <ul className="text-gray-700 text-xs pl-3 list-disc space-y-0.5">
              <li>Tata General Hospital</li>
              <li>Matha Hospital</li>
              <li>Arun Hospital</li>
            </ul>
          </div>
          <div>
            <h3 className="font-black text-red-700 text-sm mb-1">🚨 Emergency Numbers</h3>
            <div className="text-xs space-y-0.5">
              {[['Police control room','100'],['Fire station','101'],['Ambulance','103']].map(([label,num]) => (
                <div key={label} className="flex justify-between text-gray-700">
                  <span>{label}</span>
                  <span className="font-black text-red-700">{num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
