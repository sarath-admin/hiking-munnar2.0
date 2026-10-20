'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Quote, ChevronDown, Route, MapPin, Mountain, Play, X } from 'lucide-react';
import TrekCard from '@/components/TrekCard';
import BookingForm from '@/components/BookingForm';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All Tours');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const heroSlides = [
    {
      id: '01',
      tag: '01 — SUNRISE ESCAPES',
      titleLine1: 'Sunrise',
      titleHighlight: 'Escapes.',
      subtitle: 'Wake up above the clouds.',
      description: 'Witness golden sunrises, rolling mist, and panoramic mountain views from Munnar’s scenic viewpoints.',
      src: '/images/hero_sunrise_escapes.jpg',
      ctaText: 'Explore Sunrise Points',
      ctaHref: '#treks'
    },
    {
      id: '02',
      tag: '02 — WILDLIFE & JEEP SAFARI',
      titleLine1: 'Wildlife &',
      titleHighlight: 'Jeep Safari.',
      subtitle: 'Adventure beyond the ordinary.',
      description: 'Ride through rugged trails, explore lush landscapes, and discover the wild beauty of the Western Ghats. Wildlife sightings are not guaranteed.',
      src: '/images/hero_jeep_safari.jpg',
      ctaText: 'Explore Jeep Safaris',
      ctaHref: '/jeep-safari'
    },
    {
      id: '03',
      tag: '03 — MOUNTAIN TREKKING',
      titleLine1: 'Mountain',
      titleHighlight: 'Trekking.',
      subtitle: 'Find your path into the wild.',
      description: 'Follow scenic mountain trails, breathe in the fresh air, and discover breathtaking valleys and cloud-kissed peaks.',
      src: '/images/hero_mountain_trekking.jpg',
      ctaText: 'Explore Trekking Trails',
      ctaHref: '/trekking'
    },
    {
      id: '04',
      tag: '04 — SUNRISE TREKKING',
      titleLine1: 'Sunrise',
      titleHighlight: 'Trekking.',
      subtitle: '“Chase the Sunrise, Conquer the Clouds.”',
      description: 'Follow scenic mountain trails, breathe in the fresh morning air, and conquer cloud-kissed peaks as the golden sun rises over Munnar.',
      src: '/images/hero_sunrise_trekking.jpg',
      ctaText: 'Explore Sunrise Treks',
      ctaHref: '/trekking'
    },
    {
      id: '05',
      tag: '05 — TEA PLANTATION SUNRISE',
      titleLine1: 'Tea Plantation',
      titleHighlight: 'Sunrise.',
      subtitle: '“Golden Rays, Endless Green.”',
      description: 'Witness golden sunrises, rolling morning mist, and panoramic viewpoints over Munnar’s endless emerald tea slopes.',
      src: '/images/hero_tea_plantation_sunrise.jpg',
      ctaText: 'Explore Tea Experiences',
      ctaHref: '/tours-packages'
    }
  ];

  const currentSlide = heroSlides[currentImageIndex] || heroSlides[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!videoModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideoModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [videoModalOpen]);

  const categories = [
    'All Tours', 'Jeep Safaris', 'Trekking Adventure', 
    'Tea Experiences', 'Wildlife Sanctuaries', 'Sunrise Points', 'Heritage & TukTuk'
  ];

  const allTours = [
    // Top 3 from Design Reference
    { 
      title: 'Anakulam Wild Elephant & Forest Jeep Safari', 
      slug: 'anakulam-jeep-safari', 
      duration: 'Full Day (6–8 Hours)', 
      difficulty: 'Moderate', 
      imageUrl: '/images/anakulam_jeep_safari_landscape.jpg', 
      category: 'JEEP SAFARIS', 
      description: 'Explore nature with off-road 4x4 adventure, hidden waterfalls, Mankulam town, and wild elephant spotting zones at the famous Anakulam riverbank...',
      isPopular: true 
    },
    { 
      title: 'Full Day Mountain Hiking in Munnar', 
      slug: 'full-day-mountain-hiking', 
      duration: '5-8 Hours', 
      difficulty: 'Challenging', 
      imageUrl: '/images/meesapulimala.png', 
      category: 'TREKKING', 
      description: 'Summit high-altitude grassy knolls, cross native shola forest corridors, and spot...',
      isPopular: true 
    },
    { 
      title: 'Tea Factory Visit', 
      slug: 'tea-factory-visit', 
      duration: '2 Hours (10:00 AM – 12:00 PM)', 
      difficulty: 'Easy', 
      imageUrl: '/images/tea_factory_landscape.jpg', 
      category: 'TEA EXPERIENCES', 
      description: 'From fresh leaves to your cup: explore authentic tea processing, withering, rolling, oxidation, grading & guided tea tasting.',
      isPopular: true 
    },
    
    // Other Jeep
    { 
      title: 'Kolukkumalai Sunrise Trekking Adventure', 
      slug: 'kolukkumalai-sunrise-jeep-safari', 
      duration: '3-6 Hours', 
      difficulty: 'Moderate', 
      imageUrl: '/images/slide4.jpg', 
      category: 'Jeep Safaris',
      description: 'Ride rugged 4x4 trails to witness the golden sunrise at the world\'s highest organic tea plantation...'
    },
    { title: 'Off-Road Waterfall Safari', slug: 'waterfall-safari', duration: 'Half Day', difficulty: 'Easy', imageUrl: '/images/safari_waterfall_v2.jpg', category: 'Jeep Safaris' },
    { title: 'Kannan Devan Hills Safari', slug: 'kannan-devan-hills-jeep-safari', duration: 'Full Day', difficulty: 'Easy', imageUrl: '/images/kannan_devan_safari_landscape.jpg', category: 'Jeep Safaris' },
    { title: 'Night Safari Adventure', slug: 'night-safari', duration: '3 Hours', difficulty: 'Easy', imageUrl: '/images/safari_night.jpg', category: 'Jeep Safaris' },
    // Other Trekking
    { title: 'Letcmi Hills Trek', slug: 'letchmi-trek', duration: 'Half Day', difficulty: 'Moderate', imageUrl: '/images/letchmi_trek.jpg', category: 'Trekking Adventure' },
    { title: 'Anaimudi View Trek', slug: 'anaimudi-view', duration: 'Half Day', difficulty: 'Moderate', imageUrl: '/images/anaimudi_view.jpg', category: 'Trekking Adventure' },
    // Other Tea
    { title: 'Factory Visit & Tasting', slug: 'tea-factory', duration: '2 Hours', difficulty: 'Easy', imageUrl: '/images/tea_factory_tasting.jpg', category: 'Tea Experiences' },
    { title: 'Plantation Picnic', slug: 'plantation-picnic', duration: 'Half Day', difficulty: 'Easy', imageUrl: '/images/plantation_picnic.jpg', category: 'Tea Experiences' },
    // Wildlife
    { title: 'Eravikulam National Park', slug: 'eravikulam', duration: 'Half Day', difficulty: 'Easy', imageUrl: '/images/eravikulam_national_park.jpg', category: 'Wildlife Sanctuaries' },
    { title: 'Chinnar Wildlife Safari', slug: 'chinnar-safari', duration: 'Full Day', difficulty: 'Moderate', imageUrl: '/images/safari_wildlife.jpg', category: 'Wildlife Sanctuaries' },
    { title: 'Bird Watching Tour', slug: 'bird-watching', duration: 'Early Morning', difficulty: 'Easy', imageUrl: '/images/bird_watching_tour.jpg', category: 'Wildlife Sanctuaries' },
    // Sunrise Points
    { title: 'Kolukkumalai Sunrise Point', slug: 'kolukkumalai-sunrise-point', duration: '3-5 Hours', difficulty: 'Easy-Mod', imageUrl: '/images/kolukkumalai_sunrise_view.jpg', category: 'Sunrise Points' },
    { title: 'Top Station Cloud Bed Sunrise', slug: 'top-station-sunrise', duration: '4 Hours', difficulty: 'Easy', imageUrl: '/images/top_station_sunrise.jpg', category: 'Sunrise Points' },
    // Heritage
    { title: 'Old Munnar TukTuk Tour', slug: 'tuktuk-tour', duration: '3 Hours', difficulty: 'Easy', imageUrl: '/images/old_munnar_tuktuk.jpg', category: 'Heritage & TukTuk' },
    { title: 'Colonial Heritage Walk', slug: 'heritage-walk', duration: '2 Hours', difficulty: 'Easy', imageUrl: '/images/colonial_heritage_walk.jpg', category: 'Heritage & TukTuk' },
    { title: 'Spice Garden Visit', slug: 'spice-garden', duration: 'Half Day', difficulty: 'Easy', imageUrl: '/images/spice_garden_visit.jpg', category: 'Heritage & TukTuk' },
  ];

  const filteredTours = activeCategory === 'All Tours' 
    ? allTours.filter(t => t.isPopular) // show popular if 'All' is selected
    : allTours.filter(t => {
        const cat = t.category.toLowerCase();
        const active = activeCategory.toLowerCase();
        if (active === 'trekking adventure') {
          return cat === 'trekking adventure' || cat === 'trekking';
        }
        if (active === 'jeep safaris') {
          return cat === 'jeep safaris';
        }
        if (active === 'tea experiences') {
          return cat === 'tea experiences';
        }
        return cat === active;
      }).slice(0, 3);

  const faqs = [
    {
      q: "Is advance booking required for sunrise treks?",
      a: "Yes, we recommend booking at least 2 days in advance as sunrise slots are limited and require forest department permissions. Early booking also ensures we secure your jeep safari transport."
    },
    {
      q: "What is the best time of year for trekking in Munnar?",
      a: "September to March is ideal. The weather is cool and pleasant. Post-monsoon (Sep-Nov) offers lush green landscapes, while winter (Dec-Feb) provides crisp, clear views. Monsoon trekking is possible but trails can be slippery."
    },
    {
      q: "Are forest department permits included in the package?",
      a: "Yes, all our packages are all-inclusive. Forest permits, guide fees, breakfast/snacks, and water are covered in the price."
    },
    {
      q: "What shoes and clothing should I carry?",
      a: "Sturdy trekking shoes with good grip are essential. Wear comfortable, breathable layers. Carry a light jacket or fleece for the early morning cold, especially for Kolukkumalai."
    },
    {
      q: "How long is the ride to the Kolukkumalai trail?",
      a: "The off-road jeep safari from Suryanelli to Kolukkumalai takes about 1.5 to 2 hours through rugged, bumpy terrain before the actual hike begins."
    }
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-28 pb-20 md:py-0">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={`Munnar Tea Hills ${index + 1}`}
            fill
            priority={index === 0}
            quality={100}
            unoptimized
            className={`object-cover object-center absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Ambient Gradient Overlays for High Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />

        {/* Navigation Dots */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-20 left-0 right-0 z-20 flex justify-center gap-2.5">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'w-8 bg-[#FF7A00]' 
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content Container - Positioned a little lower down */}
        <div className="container relative z-20 mx-auto px-4 sm:px-6 md:px-8 text-center md:text-left text-white max-w-7xl pt-8 sm:pt-12 md:pt-16 mt-4 sm:mt-8 md:mt-10 min-h-[380px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 sm:mb-6 rounded-full bg-black/50 backdrop-blur-md border border-[#FFA000]/60 shadow-lg">
                <MapPin size={15} className="text-[#FFA000] fill-[#FFA000]/20" />
                <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FFE0B2] uppercase">
                  {currentSlide.tag}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.05] tracking-tight mb-5 drop-shadow-2xl">
                <span className="block">{currentSlide.titleLine1}</span>
                <span className="relative inline-block">
                  <span className="text-[#FF8A00]">{currentSlide.titleHighlight}</span>
                  {/* Orange brush underline */}
                  <svg
                    className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#FF7A00] pointer-events-none"
                    viewBox="0 0 240 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M4 11C45 4 150 2 237 9.5C185 14 120 12.5 4 11Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subheading & Paragraph */}
              <div className="max-w-2xl mb-8 space-y-2">
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-white drop-shadow-md">
                  {currentSlide.subtitle}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-200/90 leading-relaxed drop-shadow">
                  {currentSlide.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
            {/* Explore Adventures Button */}
            <a 
              href={currentSlide.ctaHref} 
              className="inline-flex items-center gap-3 bg-[#FF7A00] hover:bg-[#FF6500] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-[0_10px_30px_rgba(255,122,0,0.45)] hover:shadow-[0_14px_38px_rgba(255,122,0,0.65)] hover:-translate-y-0.5 group"
            >
              <Mountain size={20} className="text-white fill-white/20 shrink-0" />
              <span>{currentSlide.ctaText}</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>

            {/* Watch Video Button */}
            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              className="inline-flex items-center gap-3 bg-black/40 hover:bg-black/60 border border-white/25 hover:border-white/40 text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center pl-0.5 shadow-sm group-hover:scale-110 transition-transform shrink-0">
                <Play size={12} className="fill-black text-black" />
              </div>
              <span>Watch Video</span>
            </button>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-md border-t border-white/10 py-4 hidden md:block z-20">
          <div className="container mx-auto px-6 flex justify-between text-gray-300 text-sm font-medium">
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--color-accent)]" /> 5000+ Happy Trekkers</div>
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--color-accent)]" /> Certified Local Guides</div>
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--color-accent)]" /> Small Group Focus</div>
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--color-accent)]" /> 24x7 Support</div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setVideoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl aspect-video flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2.5 rounded-full bg-black/60 hover:bg-black/90 transition-colors z-50 border border-white/10"
              aria-label="Close video"
            >
              <X size={22} />
            </button>
            <video
              className="w-full h-full object-contain bg-black"
              controls
              autoPlay
              playsInline
              preload="auto"
              src="/videos/welcome-munnar-hiking-tours.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* FEATURED TREKS SECTION */}
      <section id="treks" className="py-20 bg-[#14171A]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div className="flex flex-col text-left">
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide">Adventure Starts Here</h2>
              <p className="text-gray-400 mt-4 max-w-2xl leading-relaxed">
                Explore pristine cloudscapes, world-heritage rainforests, colonial tea routes, or wildlife sanctuary boundaries.
              </p>
            </div>
            
            <a 
              href="https://wa.me/919496520787?text=Hi!%20I%20am%20looking%20for%20a%20custom%20request%20for%20Munnar%20tours." 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#2A4136] hover:bg-[#1E3027] text-[#A3D0B6] border border-[#3E5C4E] px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              Custom Request on Whatsapp
            </a>
          </div>
          
          {/* CATEGORY FILTER BAR */}
          <div className="flex gap-2 bg-[#1C1F22] p-2 rounded-full overflow-x-auto hide-scrollbar mb-10 mx-auto w-fit max-w-full">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#2A4136] text-white shadow-md' 
                    : 'bg-transparent hover:bg-[#2A2E33] text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((trek, idx) => (
              <TrekCard key={`${trek.slug}-${idx}`} {...trek} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/tours" className="inline-flex items-center gap-2 text-[var(--color-primary-light)] font-bold border-b-2 border-[var(--color-primary-light)] pb-1 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all">
              View All Tours <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>


      {/* WHY CHOOSE US */}
      <section className="py-20 bg-[var(--color-misty)]">
        <div className="container mx-auto px-4 text-center">
          <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase text-sm">The MHT Difference</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-dark)] mb-12 mt-2">Why Munnar's Trekkers Trust Munnar Hiking Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow text-left border border-gray-100">
              <div className="w-12 h-12 bg-green-50 text-[var(--color-primary)] rounded-lg flex items-center justify-center mb-6">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--color-dark)]">Local Safety Guides</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Our guides are certified locals who know every trail, ensuring your safety and providing rich insights about the flora and fauna.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow text-left border border-gray-100">
              <div className="w-12 h-12 bg-green-50 text-[var(--color-primary)] rounded-lg flex items-center justify-center mb-6">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--color-dark)]">Zero Hassle & Legal Permits</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Forest and wildlife permissions are all handled up front by us, so you don't face sudden stoppages or extra fees on the trail.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow text-left border border-gray-100">
              <div className="w-12 h-12 bg-green-50 text-[var(--color-primary)] rounded-lg flex items-center justify-center mb-6">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--color-dark)]">Hot Tea & Fresh Breakfast</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Nothing beats hot tea on a misty peak. We provide delicious, locally sourced packed breakfast and ample drinking water.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow text-left border border-gray-100">
              <div className="w-12 h-12 bg-green-50 text-[var(--color-primary)] rounded-lg flex items-center justify-center mb-6">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--color-dark)]">Flexible 24h Free Cancel</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Plans change, we understand. Cancel up to a day before your scheduled trek and face zero penalties with our easy refund policy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase text-sm">Real Stories, Real Treks</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-dark)] mt-2">Verified Summit Experiences</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
              <span className="font-bold text-xl">5.0/5.0</span>
              <div className="flex text-[var(--color-accent)]">
                <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
              </div>
              <span className="text-sm text-gray-500">Based on 500+ Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Ananya Bhardwaj", route: "Kolukkumalai Sunrise", text: "The off-road jeep safari up to Kolukkumalai was wild, but the sunrise made every bump worth it. Our guide Ramesh knew exactly where to stand to get the best photos and avoid the crowds. A life-changing experience!" },
              { name: "Mayank Karmakar", route: "Chokramudi Peak", text: "Challenging but incredibly rewarding. The transitions from tea plantations to shola forests to the rocky peak were stunning. The breakfast provided at the summit tasted like a feast after that climb." },
              { name: "Priya Menon", route: "Tea Plantation Walk", text: "We opted for the soft hiking through the tea estates. It was peaceful, green, and our guide explained the entire tea-making process. Perfect for families with kids or seniors looking to enjoy Munnar." }
            ].map((review, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[var(--color-accent)]">
                    <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
                  </div>
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">VERIFIED BOOKING</span>
                </div>
                <Quote className="text-gray-300 w-10 h-10 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] text-white flex items-center justify-center font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--color-dark)]">{review.name}</h4>
                    <p className="text-xs text-gray-500">Trekking Route: {review.route}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-[var(--color-misty)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase text-sm">Knowledge Base</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-dark)] mt-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-4">Everything you need to know before you lace up your boots.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-lg text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors list-none">
                  {faq.q}
                  <ChevronDown className="text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-6 pt-0 text-gray-600 leading-relaxed bg-gray-50 border-t border-gray-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="booking" className="py-20 bg-[var(--color-dark)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1627918545804-d4b96b4b455b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span className="text-[var(--color-accent)] font-bold tracking-wider uppercase text-sm mb-4 inline-block">Secure Your Spot</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Ready to Stand Above the Clouds in Munnar?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Limited spots available daily due to forest permissions & jeep constraints. Book now to secure your adventure without upfront payment.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-[var(--color-accent)] mb-1">24/7</div>
                  <div className="text-sm text-gray-400">Local Support</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-[var(--color-accent)] mb-1">10m</div>
                  <div className="text-sm text-gray-400">Avg. WhatsApp Response</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full max-w-lg mx-auto">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
