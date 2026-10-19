import React from 'react';
import TrekCard from '@/components/TrekCard';

export const metadata = {
  title: 'Jeep Safari | Munnar Hiking Tours',
  description: 'Experience thrilling off-road jeep safaris through the rugged terrains and highest tea plantations of Munnar.',
};

export default function JeepSafariPage() {
  const safaris = [
    { 
      title: 'Anakulam Wild Elephant & Forest Jeep Safari', 
      slug: 'anakulam-jeep-safari', 
      duration: 'Full Day (6–8 Hours)', 
      difficulty: 'Moderate', 
      imageUrl: '/images/anakulam_jeep_safari_landscape.jpg', 
      category: 'JEEP SAFARIS', 
      description: 'Explore nature with off-road 4x4 adventure, hidden waterfalls, Mankulam town, and wild elephant spotting zones at the famous Anakulam riverbank.',
      isPopular: true 
    },
    { 
      title: 'Kolukkumalai Sunrise Trekking Adventure', 
      slug: 'kolukkumalai-sunrise-jeep-safari', 
      duration: '3-6 Hours', 
      difficulty: 'Moderate', 
      imageUrl: '/images/slide4.jpg', 
      category: 'JEEP SAFARIS', 
      description: 'Ride rugged 4x4 trails to witness the golden sunrise at the world\'s highest organic tea plantation. A truly unforgettable off-road experience.',
      isPopular: true 
    },
    { 
      title: 'Off-Road Waterfall Safari', 
      slug: 'waterfall-safari', 
      duration: 'Half Day', 
      difficulty: 'Easy', 
      imageUrl: '/images/safari_waterfall_v2.jpg', 
      category: 'JEEP SAFARIS',
      description: 'Navigate through deep forest trails and splashing streams to reach hidden, pristine waterfalls accessible only by our 4x4 jeeps.',
      isPopular: true 
    },
    { 
      title: 'Kannan Devan Hills Safari', 
      slug: 'kannan-devan-hills-jeep-safari', 
      duration: 'Full Day', 
      difficulty: 'Easy', 
      imageUrl: '/images/kannan_devan_safari_landscape.jpg', 
      category: 'JEEP SAFARIS',
      description: 'Experience the scenic beauty of Munnar on an exciting 4x4 jeep adventure through green tea plantations, misty mountain viewpoints, waterfalls and rugged forest trails.',
      isPopular: true
    },
    { 
      title: 'Night Safari Adventure', 
      slug: 'night-safari', 
      duration: '3 Hours', 
      difficulty: 'Easy', 
      imageUrl: '/images/safari_night.jpg', 
      category: 'JEEP SAFARIS',
      description: 'Experience the thrill of the jungle at night. Spot nocturnal wildlife and enjoy the crisp mountain night air in our open-top jeeps.'
    },
    { 
      title: 'Chinnar Wildlife Jeep Safari', 
      slug: 'chinnar-safari', 
      duration: 'Full Day', 
      difficulty: 'Moderate', 
      imageUrl: '/images/safari_wildlife.jpg', 
      category: 'JEEP SAFARIS',
      description: 'Drive deep into the Chinnar Wildlife Sanctuary. Perfect for wildlife photography and spotting elephants, gaurs, and exotic birds.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#14171A] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img 
            src="/images/slide4.jpg" 
            alt="Jeep Safari in Munnar" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-center">
          <span className="text-[#FFA94D] font-bold tracking-wider uppercase text-sm mb-4 block">Off-Road Adventures</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-lg">
            Munnar Jeep Safari
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Conquer rugged terrains and reach heights where normal vehicles can't go. Experience the raw, untamed beauty of Munnar from the back of a 4x4.
          </p>
        </div>
      </section>

      {/* Safari Grid Section */}
      <section className="py-20 bg-[#14171A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safaris.map(safari => (
              <TrekCard key={safari.slug} {...safari} />
            ))}
          </div>

          {/* Anakulam Jeep Safari HTML Section */}
          <div className="mt-24 bg-[#F4F4F1] rounded-[2rem] overflow-hidden shadow-2xl border border-[#d5d5d0]">
            
            {/* Header */}
            <div className="bg-[#121814] py-12 px-6 text-center border-b-[6px] border-[#6A8B74]">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
                HIDDEN TRAILS OF MUNNAR – JEEP SAFARI
              </h2>
              <p className="text-[#8DB499] mt-4 text-lg font-medium tracking-wide">
                Breathtaking Scenic Views • Explore Hidden Places • Perfect for Nature Lovers
              </p>
            </div>

            {/* Content Grid */}
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                
                {[
                  { title: 'Tea Plantation Viewpoint', img: 'tea_plantation_viewpoint.png', step: '01' },
                  { title: 'Viripara Waterfalls', img: 'viripara_waterfalls.png', step: '02' },
                  { title: 'Mankulam Town (Break for Lunch or Tea)', img: 'mankulam_town.png', step: '03' },
                  { title: 'Perambankuthu Waterfalls', img: 'perambankuthu_waterfalls.png', step: '04' },
                  { title: '33 Water Falls', img: '33_waterfalls.png', step: '05' },
                  { title: 'Tribes Village Visit', img: 'tribes_village.png', step: '06' },
                  { title: 'Anakulam (Lucky to See Elephant)', img: 'anakulam_elephants.png', step: '07' },
                ].map((dest, idx) => (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col transition-transform hover:-translate-y-1">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={`/images/anakulam/${dest.img}`}
                        alt={dest.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-[#121814] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                        {dest.step}
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex items-center">
                      <h3 className="text-xl font-bold text-[#121814] leading-tight">
                        {dest.title}
                      </h3>
                    </div>
                  </div>
                ))}

              </div>



            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
