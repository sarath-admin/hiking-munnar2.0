export interface TourItineraryItem {
  time: string;
  activity: string;
}

export interface TourSummaryInfo {
  duration: string;
  distance: string;
  difficulty: string;
  minGroup: string;
  guide: string;
  pickupLocation: string;
}

export interface TourRouteOption {
  id: string;
  name: string;
  duration: string;
  badge?: string;
  subtitle?: string;
  description?: string;
  columnType?: 'time' | 'sequence';
  itinerary: TourItineraryItem[];
  note?: string;
}

export interface TourPackageComparisonRow {
  feature: string;
  fullDay: string;
  halfDay: string;
}

export interface TourPackageComparison {
  title: string;
  subtitle?: string;
  columns: [string, string, string];
  rows: TourPackageComparisonRow[];
}

export interface TourItem {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  subtitle?: string;
  category: string;
  categorySlug: string;
  price?: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Easy-Mod';
  isPopular?: boolean;
  badge?: string;
  imageUrl: string;
  galleryImages?: string[];
  shortDescription: string;
  overview: string;
  highlights: string[];
  summaryInfo: TourSummaryInfo;
  itinerary: TourItineraryItem[];
  routeOptions?: TourRouteOption[];
  comparisonTable?: TourPackageComparison;
  inclusions: string[];
  exclusions: string[];
  whatToBring: string[];
  safetyInfo: string[];
  meetingPoint: string;
  startingPoint?: string;
  endingPoint?: string;
  transport?: string;
  tourType?: string;
  mainHighlights?: string;
  durationDetails?: string;
  itineraryTitle?: string;
  note?: string;
  bestTimeToVisit: string;
  faqs: { q: string; a: string }[];
}

export const TOURS_DATA: TourItem[] = [
  // Day Trekking
  {
    id: 'day-trekking',
    slug: 'day-trekking',
    aliases: ['day-trek', 'munnar-day-trekking'],
    title: 'Day Trekking',
    subtitle: 'Walk. Explore. Experience Nature.',
    category: 'TREKKING',
    categorySlug: 'trekking-adventure',
    price: '',
    duration: '7 Hours (07:00 AM – 02:00 PM)',
    difficulty: 'Moderate',
    isPopular: true,
    badge: 'MOST POPULAR',
    imageUrl: '/images/day_trekking_hero.png',
    galleryImages: [
      '/images/day_trekking_hero.png',
      '/images/day_trekking_treks.jpg',
      '/images/meesapulimala.png',
      '/images/chokramudi.png'
    ],
    shortDescription: 'Ascend from 1550m to a 2000m mountain summit through tea plantations, grasslands, rocks, and cardamom estates with homemade breakfast & snacks.',
    overview: 'Day Trekking with Munnar Hiking Tours is a premier scenic mountain trek covering 14 K.M.S. Starting at 07:00 AM from 1550 meters elevation, the trail ascends through vibrant tea plantations, rugged grasslands, and rocky ridges to reach the 2000m mountain summit by 09:30 AM where a fresh homemade breakfast is served. The journey continues through high grasslands, coffee, and cardamom estates before stopping for homemade snacks at 1700m and returning to Munnar.',
    highlights: [
      '14 K.M.S guided mountain walk through pristine Western Ghats trails',
      'Ascent from 1550m to 2000m mountain top summit',
      'Fresh homemade breakfast & snacks served at scenic viewpoints',
      'Covering tea plantations, high grasslands, rocks, coffee & cardamom estates',
      'Complete tour with food, water, guide, and transportation included'
    ],
    summaryInfo: {
      duration: '7 Hours · 07:00 AM – 02:00 PM',
      distance: '14 K.M.S',
      difficulty: 'Moderate',
      minGroup: '2 Nos',
      guide: 'Certified Local Mountain Guide Included',
      pickupLocation: 'Munnar Town / Hotel Pickup'
    },
    itinerary: [
      { time: '07:00 AM', activity: 'Start by walk – 1550 Mtrs (Tea plantation, Grassland and Rocks)' },
      { time: '09:30 AM', activity: 'Top of the mountain – 2000 Mtrs. Breakfast (Home made food)' },
      { time: '10:30 AM', activity: 'Start by walk – (Grassland, Coffee and Cardamom plantations and Tea plantation)' },
      { time: '01:00 PM', activity: 'Snacks break (1700 Mtrs) homemade' },
      { time: '01:20 PM', activity: 'Start walk' },
      { time: '02:00 PM', activity: 'Back to Munnar' }
    ],
    inclusions: [
      'Food (Homemade breakfast & snacks)',
      'Fresh drinking water',
      'Certified local mountain guide',
      'Transportation to and from Munnar'
    ],
    exclusions: ['Personal trekking gear', 'Gratuities'],
    whatToBring: [
      'A small backpack with sunscreen',
      'Sun hat and sunglasses',
      'Comfortable trekking shoes with grip',
      'Light rain jacket or poncho'
    ],
    safetyInfo: [
      'Follow your guide at all times along rocky ridges and plantation paths.',
      'Minimum 2 persons required for booking.'
    ],
    meetingPoint: 'Munnar Town Center / Hotel Pickup',
    bestTimeToVisit: 'September to May for clear mountain views and comfortable walking weather.',
    faqs: [
      { q: 'Is breakfast included?', a: 'Yes! Fresh homemade breakfast is served at the 2000m mountain summit, followed by homemade snacks at 1700m.' },
      { q: 'What is the total walking distance?', a: 'The total walking distance covered is 14 K.M.S.' },
      { q: 'What is the minimum group size?', a: 'Minimum 2 persons are required.' }
    ]
  },

  // Half Trekking (Top Valley Trek)
  {
    id: 'half-day-trekking',
    slug: 'half-day-trekking',
    aliases: ['half-trekking', 'top-valley-trekking', 'top-valley-trek'],
    title: 'Half Trekking (Top Valley)',
    subtitle: 'Explore Wild Trails. Discover Endless Views.',
    category: 'TREKKING',
    categorySlug: 'trekking-adventure',
    price: '',
    duration: '3–4 Hours (09:00 AM Start)',
    difficulty: 'Moderate',
    isPopular: true,
    badge: 'BEST SELLER',
    imageUrl: '/images/half_day_trekking_landscape.jpg',
    galleryImages: [
      '/images/half_day_trekking_landscape.jpg',
      '/images/half_trekking_treks.jpg',
      '/images/slide3.jpg'
    ],
    shortDescription: 'A 3-4 hour trek from Yellapatty tea village through evergreen Shola forest and grasslands, en route to Mattupetty Dam, Echo Point and Kundale Dam.',
    overview: 'This journey starts at Yellapatty tea estate village and leads through evergreen Shola forest, grasslands and ridges of the Western Ghats. Enjoy extraordinary views of valleys with tea plantations and floating white clouds. En-route sightseeing at Mattupetty Dam, Echo-Point and Kundale Dam.',
    highlights: [
      'Scenic 5-6 km trail through Yellapatty tea estate village & Shola forests',
      'Extraordinary views of Western Ghats valleys and floating white clouds',
      'En-route drive through Mattupetty Dam, View of Echo Point, and Kundale Dam',
      'Packed lunch, water, refreshments, and guide fee included'
    ],
    summaryInfo: {
      duration: '3–4 Hours · Starts at 09:00 AM',
      distance: '5–6 Kms (Commuting distance 26 Km each way)',
      difficulty: 'Moderate',
      minGroup: '2 Persons',
      guide: 'Certified Local Guide Included',
      pickupLocation: 'Munnar Town / Yellapatty Estate'
    },
    itinerary: [
      { time: '09:00 AM', activity: 'Commute from Munnar towards Yellapatty Estate (26 Km) with drive through Mattupetty Dam' },
      { time: '10:00 AM', activity: 'Begin trek through Yellapatty tea village, evergreen Shola forest & grassland ridges' },
      { time: '11:30 AM', activity: 'Enjoy valley viewpoint overlooking Echo Point, tea slopes, and floating clouds' },
      { time: '01:00 PM', activity: 'Packed lunch and refreshments amidst Western Ghats ridges' },
      { time: '01:30 PM', activity: 'Sightseeing stop at Kundale Dam and return drive to Munnar' }
    ],
    inclusions: [
      'All entrance fees',
      'Packed lunch, water & refreshments',
      'Guide fee',
      'Sightseeing at Mattupetty Dam, Echo Point & Kundale Dam'
    ],
    exclusions: ['Personal expenses', 'Gratuities'],
    whatToBring: [
      'Trekking shoes and comfortable trekking suit',
      'Hat, sunscreen, and sunglasses',
      'Trekking pole and small shoulder bag'
    ],
    safetyInfo: [
      'Moderate physical fitness required. Not wheelchair accessible.'
    ],
    meetingPoint: 'Munnar Town Center / Hotel Pickup',
    bestTimeToVisit: 'Year-round, with October to April providing crystal-clear valley views.',
    faqs: [
      { q: 'Is lunch included?', a: 'Yes, packed lunch, water, and refreshments are all included.' },
      { q: 'Are sightseeing spots covered?', a: 'Yes! Mattupetty Dam, Echo Point, and Kundale Dam are covered en-route.' }
    ]
  },

  // Soft Trekking (Tea Plantation Walk)
  {
    id: 'soft-hiking',
    slug: 'soft-hiking',
    aliases: ['soft-trekking', 'tea-plantation-walking-tour'],
    title: 'Soft Trekking (Tea Plantation Walk)',
    subtitle: 'Walk. Breathe. Taste Nature.',
    category: 'TREKKING',
    categorySlug: 'trekking-adventure',
    price: '',
    duration: '2:30 Hours Walking Tour',
    difficulty: 'Easy',
    isPopular: true,
    badge: 'EASY & SCENIC',
    imageUrl: '/images/soft_trekking_landscape.jpg',
    galleryImages: [
      '/images/soft_trekking_landscape.jpg',
      '/images/soft_trekking_treks.jpg',
      '/images/tea_walk.png'
    ],
    shortDescription: 'Gentle 2:30 hours walking tour through rolling tea plantation trails, scenic views, and Shola forest edges with optional tea tasting.',
    overview: 'Experience the real Munnar with our 2:30 Hours Soft Trekking Walking Tour in Tea Plantation. Meander along private tea trails winding through rolling emerald hills, panoramic scenic viewpoints, and the edge of native Shola forests. Learn about the art of tea cultivation and plucking from native guides, and conclude with an optional authentic tea tasting session.',
    highlights: [
      'Gentle 5–6 km walking tour through historic tea plantation trails',
      'Breathtaking rolling landscape views and photo opportunities',
      'Learn about tea plucking, sorting, and estate history from local guides',
      'Optional authentic tea tasting experience'
    ],
    summaryInfo: {
      duration: '2:30 Hours (Walking Tour)',
      distance: 'Approx. 5–6 K.M.',
      difficulty: 'Easy',
      minGroup: '2 Nos',
      guide: 'Local Tea Expert & Trek Guide Included',
      pickupLocation: 'Munnar Town / Tea Estate Gate'
    },
    itinerary: [
      { time: '09:00 AM', activity: 'Meet guide at designated tea plantation entry trail' },
      { time: '09:15 AM', activity: 'Guided walk through rolling tea bushes, learning artisan plucking techniques' },
      { time: '10:15 AM', activity: 'Scenic panoramic viewpoint break on the Shola forest edge for photos' },
      { time: '11:00 AM', activity: 'Optional tea tasting session and interaction with local tea experts' },
      { time: '11:30 AM', activity: 'Conclude walking tour with memorable photos' }
    ],
    inclusions: [
      'Certified local guide support',
      'Drinking water',
      'Tea tasting (optional)',
      'Local insights into tea history'
    ],
    exclusions: ['Personal transport', 'Gratuities'],
    whatToBring: [
      'Comfortable walking shoes',
      'Hat, sunglasses, and sunscreen',
      'Personal water bottle and camera'
    ],
    safetyInfo: [
      'Easy terrain suitable for families, beginners, and photography enthusiasts.'
    ],
    meetingPoint: 'Munnar Base Office / Designated Tea Estate Trailhead',
    bestTimeToVisit: 'Pleasant year-round, especially morning hours.',
    faqs: [
      { q: 'Is this tour suitable for beginners and families?', a: 'Yes! It is an easy, gentle walk designed for all age groups.' },
      { q: 'Is tea tasting included?', a: 'Yes, an optional tea tasting session is included.' }
    ]
  },

  // Sun Rise Trekking
  {
    id: 'sunrise-trekking',
    slug: 'sunrise-trekking',
    aliases: ['sun-rise-trekking', 'sunrise-trek', 'munnar-sunrise-trekking'],
    title: 'Sun Rise Trekking',
    subtitle: 'Chase the Sun. Feel the Magic.',
    category: 'TREKKING',
    categorySlug: 'trekking-adventure',
    price: '',
    duration: '6 Hours (05:30 AM – 11:30 AM)',
    difficulty: 'Moderate',
    isPopular: true,
    badge: 'MOST POPULAR',
    imageUrl: '/images/sunrise_trekking_landscape.jpg',
    galleryImages: [
      '/images/sunrise_trekking_landscape.jpg',
      '/images/sunrise_trekking_treks.jpg',
      '/images/kolukkumalai_sunrise_view.jpg',
      '/images/hero_scenic_sunrise.jpg'
    ],
    shortDescription: 'Chase the sun above the clouds. Trek 10 Kms across tea plantations, high grasslands and rocky peaks to 2400m with homemade mountain breakfast.',
    overview: 'Chase the sun and feel the magic of a Munnar dawn on our guided Sun Rise Trekking adventure. Starting at 05:30 AM from 1550 meters by drive to the 1750m base point, witness a golden sunrise at 06:15 AM before ascending through scenic grasslands, tea plantations, and rocky ridges to reach the 2400-meter mountain summit by 08:30 AM. Enjoy a fresh homemade breakfast above the clouds before descending along the scenic ridge trail back to your hotel by 11:30 AM.',
    highlights: [
      'Spectacular golden sunrise view at 06:15 AM from high-altitude ridges',
      '10 Kms guided mountain trek reaching a 2400m mountain summit',
      'Covering scenic tea plantations, high-altitude grasslands, and rocky trails',
      'Fresh homemade breakfast served at the 2400m summit viewpoint',
      'Complete package including food, water, certified guide, and transportation'
    ],
    summaryInfo: {
      duration: '6 Hours · 05:30 AM – 11:30 AM',
      distance: '10 Kms (Tea plantation, Grassland and Rocks)',
      difficulty: 'Moderate',
      minGroup: '2 Persons (2 Nos)',
      guide: 'Certified Local Mountain Guide Included',
      pickupLocation: 'Munnar Town / Hotel Pickup & Drop Included'
    },
    itinerary: [
      { time: '05:30 AM', activity: 'Start by drive – 1550 Mtrs.' },
      { time: '06:00 AM', activity: 'Get the basement (1750 Mtrs)' },
      { time: '06:15 AM', activity: 'Sunrise. Then start walk (Grass lands and rocks)' },
      { time: '08:30 AM', activity: 'Top of the mountain (2400 Mtrs) – Break fast (Homemade food)' },
      { time: '09:30 AM', activity: 'Start walk same way down' },
      { time: '11:00 AM', activity: 'Get the basement (1750 Mtrs)' },
      { time: '11:10 AM', activity: 'Back to drive' },
      { time: '11:30 AM', activity: 'Get the hotel' }
    ],
    inclusions: [
      'Food (Homemade mountain breakfast)',
      'Fresh drinking water',
      'Certified local mountain guide',
      'Transportation (Drive to/from base point & hotel drop)'
    ],
    exclusions: ['Personal trekking gear', 'Gratuities'],
    whatToBring: [
      'A small back pack with some sun cream is essential',
      'You may also wish to bring a sun hat',
      'Comfortable trekking shoes with good grip',
      'Warm jacket or fleece for the early morning start'
    ],
    safetyInfo: [
      'Follow your mountain guide along high-altitude grassland and rock trails.',
      'Minimum 2 persons (2 Nos) required for booking.'
    ],
    meetingPoint: 'Munnar Town Center / Direct Hotel Pickup at 05:30 AM',
    bestTimeToVisit: 'September to May for crisp dawn skies and golden cloud-bed sunrises.',
    faqs: [
      { q: 'What is the total walking distance?', a: 'The total distance covered by walk is 10 Kms across tea plantations, grasslands, and rocks.' },
      { q: 'What is included in the Sun Rise Trekking trip?', a: 'The trip includes homemade breakfast food, drinking water, a certified guide, and transportation.' },
      { q: 'What is the minimum number of persons required?', a: 'Minimum 2 persons (2 Nos) are required.' }
    ]
  },

  // Grass Land Hiking Tours
  {
    id: 'grassland-hiking',
    slug: 'grassland-hiking',
    aliases: ['grass-land-hiking-tours', 'grassland-hike'],
    title: 'Grass Land Hiking Tours',
    subtitle: 'Walk Through Nature’s Purest Beauty',
    category: 'TREKKING',
    categorySlug: 'trekking-adventure',
    price: '',
    duration: '7 Hours',
    difficulty: 'Moderate',
    isPopular: true,
    badge: 'NATURE TRAIL',
    imageUrl: '/images/letchmi_trek.jpg',
    galleryImages: [
      '/images/letchmi_trek.jpg',
      '/images/grassland_hiking_treks.jpg',
      '/images/anaimudi_view.jpg'
    ],
    shortDescription: 'Walk through nature\'s purest beauty across Neelakurinji ridges and valleys reaching a panoramic 2250m peak.',
    overview: 'The Grass Land Hiking Tour takes you across Munnar\'s most breathtaking montane ridges and Neelakurinji flower valleys. Scaling up to a 2250m panoramic peak, this 7-hour guided trek traverses wind-swept grassland ridges, native shola clusters, and offers 360-degree vistas across the Western Ghats.',
    highlights: [
      'Neelakurinji ridge walk with spectacular mountain panoramas',
      'Summit a scenic 2250m peak viewpoint',
      'Refreshing juice and snack stops on the trail',
      'Homemade breakfast, fresh water, and expert mountain guide'
    ],
    summaryInfo: {
      duration: '7 Hours',
      distance: '10–12 Kms',
      difficulty: 'Moderate',
      minGroup: '2 Nos',
      guide: 'Native Mountain Guide Included',
      pickupLocation: 'Munnar Town Center'
    },
    itinerary: [
      { time: '07:30 AM', activity: 'Pickup and briefing at Munnar trailhead' },
      { time: '08:00 AM', activity: 'Ascent through montane grasslands and valley ridges' },
      { time: '10:00 AM', activity: 'Summit 2250m peak; enjoy homemade breakfast and 360° views' },
      { time: '11:30 AM', activity: 'Ridge walk through Neelakurinji habitat and shola forest margins' },
      { time: '01:00 PM', activity: 'Juice, snacks, and rest at high viewpoint' },
      { time: '02:30 PM', activity: 'Descent and return to Munnar' }
    ],
    inclusions: [
      'Certified local mountain guide',
      'Homemade mountain breakfast & trail snacks',
      'Juice and drinking water',
      'Forest department trail passes'
    ],
    exclusions: ['Personal gear', 'Gratuities'],
    whatToBring: [
      'Trekking shoes with good traction',
      'Sun hat, sunscreen, and light jacket',
      'Small daypack and camera'
    ],
    safetyInfo: [
      'Moderate fitness required. Ridge trails have some exposed windswept sections.'
    ],
    meetingPoint: 'Munnar Town Base Office',
    bestTimeToVisit: 'September to April for crystal-clear skies and pleasant temperatures.',
    faqs: [
      { q: 'What is the peak altitude reached?', a: 'The trek reaches an elevation of approximately 2250 meters.' },
      { q: 'Is food provided?', a: 'Yes, homemade breakfast, snacks, and fresh juice are provided.' }
    ]
  },
  // 1. Anakulam Wild Elephant & Forest Jeep Safari
  {
    id: 'anakulam-jeep-safari',
    slug: 'anakulam-jeep-safari',
    aliases: ['anakulam-jeep', 'anakulam-wild-elephant-safari'],
    title: 'Anakulam Wild Elephant & Forest Jeep Safari',
    subtitle: 'Off-Road Journey to the Famous Natural Elephant River Crossing',
    category: 'JEEP SAFARIS',
    categorySlug: 'jeep-safaris',
    price: '',
    duration: 'Full Day (6–8 Hours)',
    difficulty: 'Moderate',
    isPopular: true,
    badge: 'MOST POPULAR',
    imageUrl: '/images/anakulam_jeep_safari_landscape.jpg',
    galleryImages: [
      '/images/jeep_safari_anakulam_hq.jpg',
      '/images/safari_waterfall.jpg',
      '/images/safari_kannan_devan.jpg'
    ],
    shortDescription: 'Explore nature with off-road 4x4 adventure, hidden waterfalls, Mankulam town, and wild elephant spotting zones at the famous Anakulam riverbank.',
    overview: 'Anakulam is a miraculous natural phenomenon where wild elephant herds emerge from dense reserve forests to drink and play in the mineral-rich waters of the Idacholayar river. Our full-day 4x4 expedition covers scenic tea viewpoints, Viripara Waterfalls, 33 Falls, Perambankuthu, tribal settlements, and the magical elephant watering banks of Anakulam.',
    highlights: [
      'High chances of spotting wild elephant herds in their natural habitat',
      'Visit Viripara and 33 scenic waterfalls along off-road forest trails',
      'Explore Mankulam town and taste local hill-produce delicacies',
      'Authentic tribal settlement cultural stop with friendly local guide'
    ],
    summaryInfo: {
      duration: 'Full Day · Approx. 8:30 AM – 5:00 PM',
      distance: '65 km total round trip in 4x4 Jeep',
      difficulty: 'Moderate off-road adventure',
      minGroup: '2 Jeep (up to 6 guests)',
      guide: 'Certified Local 4x4 Driver-Guide',
      pickupLocation: 'Munnar Hotel Pickup'
    },
    itinerary: [
      { time: '08:30 AM', activity: 'Pickup from Munnar and head towards scenic tea viewpoints.' },
      { time: '09:45 AM', activity: 'Stop at Viripara Waterfalls for photography and morning mist.' },
      { time: '11:00 AM', activity: 'Explore 33 Waterfalls and Perambankuthu cascades.' },
      { time: '12:30 PM', activity: 'Mankulam Town lunch break with traditional Kerala dishes.' },
      { time: '02:00 PM', activity: 'Visit tribal village and understand traditional spice agriculture.' },
      { time: '03:30 PM', activity: 'Arrive at Anakulam river bank for wild elephant observation.' },
      { time: '05:30 PM', activity: 'Return drive back to Munnar hotel.' }
    ],
    inclusions: ['Private 4x4 Jeep for the full day', 'Experienced driver-guide', 'All vehicle permits and tolls'],
    exclusions: ['Lunch and personal snacks', 'Gratuities'],
    whatToBring: ['Camera with zoom lens', 'Comfortable clothes and sun protection'],
    safetyInfo: ['Wild elephants must be respected from the designated safe riverbank viewing deck.'],
    meetingPoint: 'Direct hotel pickup across Munnar',
    bestTimeToVisit: 'September to May for optimal elephant sightings.',
    faqs: [
      { q: 'Is Anakulam safe for families?', a: 'Yes! The viewing point is situated safely across the natural river border.' }
    ]
  },

  // 2. Kolukkumalai Sunrise Jeep Safari
  {
    id: 'kolukkumalai-sunrise-jeep-safari',
    slug: 'kolukkumalai-sunrise-jeep-safari',
    aliases: [
      'kolukkumalai-sunrise',
      'kolukkumalai-jeep',
      'sunrise-safari-combo'
    ],
    title: 'Kolukkumalai Sunrise Jeep Safari',
    subtitle: 'Off-Road Sunrise Adventure at the World’s Highest Tea Estate',
    category: 'JEEP SAFARIS',
    categorySlug: 'jeep-safaris',
    price: '',
    duration: 'Approx. 4–5 Hours',
    difficulty: 'Moderate',
    isPopular: true,
    badge: 'MOST POPULAR',
    imageUrl: '/images/slide4.jpg',
    galleryImages: [
      '/images/kolukkumalai_sunrise_view.jpg',
      '/images/kolukkumalai.png',
      '/images/safari_kolukkumalai.jpg',
      '/images/hero_scenic_sunrise.jpg'
    ],
    shortDescription: 'Ride rugged 4x4 mountain tracks from Suryanelli to witness the golden sunrise over a bed of clouds at the world’s highest organic tea plantation (2,160m).',
    overview: 'Experience the crown jewel of Munnar adventures. Beginning in the crisp pre-dawn stillness of Suryanelli, our heavy-duty 4x4 Mahindra jeeps tackle an exhilarating 15-kilometer boulder-strewn estate trail. As dawn approaches, you stand atop the dramatic mountain ridge overlooking the Tamil Nadu plains on one side and mist-carpeted Kerala tea slopes on the other. Enjoy freshly brewed orthodox cardamom tea and a hot traditional breakfast at the summit before exploring the century-old colonial plantation.',
    highlights: [
      'Exhilarating 4x4 off-road jeep trail through rugged mountain terrain',
      'Spectacular 360° golden sunrise above a blanket of moving clouds',
      'Explore the world’s highest organic tea plantation established in the 1900s',
      'Piping hot local cardamom tea served fresh on the summit ridge',
      'Iconic photography viewpoints including Tiger Rock and the border cliff edge'
    ],
    summaryInfo: {
      duration: 'Approx. 4–5 hours · Early morning departure',
      distance: '15 km off-road jeep trail + 2 km scenic ridge walk',
      difficulty: 'Moderate · Bumpy off-road terrain',
      minGroup: '2 Jeep (up to 6 guests)',
      guide: 'Experienced local off-road driver & mountain guide',
      pickupLocation: 'Suryanelli Jeep Stand / Munnar hotel transfer available'
    },
    itinerary: [
      {
        time: '04:00 AM',
        activity: 'Report at Suryanelli pickup point or arrange hotel pickup in Munnar.'
      },
      {
        time: '04:15 AM',
        activity: 'Start the off-road jeep journey through rugged mountain tracks.'
      },
      {
        time: 'Sunrise',
        activity: 'Reach the viewpoint and enjoy the breathtaking sunrise above the clouds.'
      },
      {
        time: 'Morning',
        activity: 'Explore permitted viewpoints, tea estate scenery, and enjoy hot tea and breakfast.'
      },
      {
        time: '08:00–09:00 AM',
        activity: 'Return to Suryanelli, depending on the operator’s schedule and road conditions.'
      }
    ],
    inclusions: [
      'Heavy-duty 4x4 Jeep with professional mountain driver',
      'Forest department entry permits and estate toll charges',
      'Fresh hot cardamom tea and breakfast snack',
      'Certified local guide assistance throughout the trip',
      'First aid kit and safety backup'
    ],
    exclusions: [
      'Hotel pickup outside Munnar/Suryanelli central radius (available on surcharge)',
      'Tea factory machinery tour ticket (optional, paid at counter)',
      'Personal snacks and tips for guide/driver'
    ],
    whatToBring: [
      'Warm jacket, fleece, or shawl (mornings can drop below 10°C)',
      'Sturdy closed-toe shoes with good traction',
      'Camera or smartphone with full battery & extra storage',
      'Original Govt Photo ID proof for forest permit checkpoint',
      'Personal water bottle and motion sickness medication if prone to bumpy rides'
    ],
    safetyInfo: [
      'Off-road journey involves very bumpy and rocky terrain; not recommended for pregnant women or individuals with severe spine issues.',
      'Weather conditions at 2,100m can change quickly; follow the guide’s trail instructions strictly.',
      'Stay behind designated safety railings at cliff edges.'
    ],
    meetingPoint: 'Suryanelli Jeep Stand, Munnar, Kerala 685618 (Hotel pickups available upon prior booking)',
    bestTimeToVisit: 'September to May for clear cloud-sea sunrises. Winter months (Dec–Feb) offer the most crisp visibility.',
    faqs: [
      {
        q: 'What time does the Kolukkumalai sunrise tour start?',
        a: 'The reporting time at Suryanelli is typically between 4:00 AM and 4:30 AM depending on seasonal sunrise times. If booking from Munnar town, pickup takes place at approximately 3:15 AM.'
      },
      {
        q: 'Can private cars drive directly to Kolukkumalai?',
        a: 'No. The road from Suryanelli to Kolukkumalai is strictly an off-road private estate path accessible only by authorized 4x4 Jeeps with experienced local drivers.'
      },
      {
        q: 'Is this tour family and children friendly?',
        a: 'Yes, children above 5 years love the adventure. Senior citizens who can handle a bumpy 45-minute jeep ride will thoroughly enjoy the views.'
      },
      {
        q: 'Are permits included in the package?',
        a: 'Yes, all our bookings include the required estate entry passes and forest department toll fees.'
      }
    ]
  },

  // 2. Full Day Mountain Trekking in Munnar (Full Day Trekking Package)
  {
    id: 'full-day-mountain-hiking',
    slug: 'full-day-mountain-hiking',
    aliases: [
      'full-day-mountain-trekking-in-munnar',
      'full-day-trekking-package',
      'full-day-trek'
    ],
    title: 'Full Day Mountain Trekking in Munnar',
    subtitle: 'Comprehensive 17km High-Altitude Ridge & Forest Expedition',
    category: 'TREKKING',
    categorySlug: 'trekking-adventure',
    price: '',
    duration: 'Full Day · Approx. 7:00 AM – 4:30 PM',
    difficulty: 'Challenging',
    isPopular: true,
    badge: 'MOST POPULAR',
    imageUrl: '/images/meesapulimala.png',
    galleryImages: [
      '/images/packages/full_day_trekking_hq.jpg',
      '/images/chokramudi.png',
      '/images/letchmi_trek.jpg',
      '/images/slide1.jpg'
    ],
    shortDescription: 'Summit high-altitude grassy knolls, cross native shola forest corridors, explore spice plantations, and take in endless panoramic vistas across the Western Ghats.',
    overview: 'The definitive full-day trekking experience for adventure lovers in Munnar. Covering approximately 17 kilometers of varied mountain terrain, you will ascend through private tea plantations into untamed high-altitude montane grasslands, navigating rocky outcrops, native shola rainforest corridors, and spice gardens. Led by certified native mountaineers, you will experience untouched wilderness far away from tourist crowds with homemade Kerala breakfast and lunch on scenic viewpoints.',
    highlights: [
      'Traverse high-altitude grasslands with 360-degree views reaching up to 2,100 meters',
      'Cross pristine Shola cloud forests home to endemic birds, butterflies, and Nilgiri langurs',
      'Authentic homemade Kerala packed breakfast & lunch served at a scenic mountain viewpoint',
      'Explore private spice plantation trails featuring cardamom, pepper, cloves, and wild coffee',
      'Includes vehicle return transfer from the trek endpoint back to Munnar'
    ],
    summaryInfo: {
      duration: 'Full day · Approximately 7:00 AM – 4:30 PM',
      distance: '17 km — based on your supplied itinerary',
      difficulty: 'Moderate to Challenging · Guide recommended',
      minGroup: '2 Persons',
      guide: 'Certified native mountain guide included',
      pickupLocation: 'Munnar Town / Hotel pickup included'
    },
    itinerary: [
      {
        time: '07:00 AM',
        activity: 'Start trekking through tea plantations, grasslands and rocky trails.'
      },
      {
        time: '09:30 AM',
        activity: 'Reach the mountain viewpoint, enjoy breakfast and scenic views.'
      },
      {
        time: '10:30 AM',
        activity: 'Continue trekking through grasslands, coffee, cardamom and tea plantations.'
      },
      {
        time: '01:00 PM',
        activity: 'Lunch break and rest amidst high-altitude natural surroundings.'
      },
      {
        time: '02:00 PM',
        activity: 'Explore permitted spice plantations and surrounding nature trails.'
      },
      {
        time: '03:00 PM',
        activity: 'Complete the trekking route and return towards the pickup point.'
      },
      {
        time: '04:30 PM',
        activity: 'Return to Munnar by vehicle.'
      }
    ],
    inclusions: [
      'Certified English and Malayalam/Tamil speaking local mountain guide',
      'Forest department trekking permits and conservation fees',
      'Packed homemade Kerala breakfast, hot tea, and lunch',
      'Energy snacks, fresh fruits, and 2L drinking water per person',
      'Return vehicle transfer from trek termination point back to Munnar'
    ],
    exclusions: [
      'Personal trekking gear (hiking poles, boots, personal backpacks)',
      'Tips or gratuities for the trekking team',
      'Personal travel insurance'
    ],
    whatToBring: [
      'Broken-in hiking boots or trail running shoes with rugged tread',
      'Comfortable lightweight backpack (15–25L capacity)',
      'Moisture-wicking athletic clothing (long pants advised for trail grass)',
      'Light rain jacket or poncho (even outside monsoon)',
      'Sun hat, sunglasses, and high-SPF sunscreen',
      'Personal refillable water bottle and any personal medications'
    ],
    safetyInfo: [
      'Requires a moderate to good level of physical fitness due to 17km distance and elevation changes.',
      'Leech protection socks are provided complimentary during wet or damp months.',
      'Stay on marked trails behind the guide; wildlife corridors are strictly monitored.'
    ],
    meetingPoint: 'Munnar Town Center / Direct pickup from any hotel in Old or New Munnar',
    bestTimeToVisit: 'October to March offers ideal trekking weather with crisp mornings and clear panoramic vistas.',
    faqs: [
      {
        q: 'How difficult is the 17 km Full Day Trek?',
        a: 'It is rated Moderate to Challenging. Anyone with reasonable fitness who exercises regularly can complete it comfortably. There are planned rests for breakfast, viewpoints, and lunch.'
      },
      {
        q: 'What kind of food is provided during the hike?',
        a: 'We provide freshly prepared Kerala delicacies such as idli/dosa/poori with chutney for breakfast, along with hot tea, and an authentic packed lunch with boiled eggs/veg dishes and fruits.'
      },
      {
        q: 'What happens if it rains during the trek?',
        a: 'Light mountain rain and mist enhance the beauty of Munnar trails. We carry rain ponchos. In case of severe weather alerts from the forest department, tours are rescheduled with zero cancellation fee.'
      }
    ]
  },

  // 3. Tea Plantation Walk with Sunset View
  {
    id: 'tea-plantation-walk-sunset-view',
    slug: 'tea-plantation-walk-sunset-view',
    aliases: [
      'tea-plantation-walk',
      'tea-walk',
      'tea-plantation-walk-with-sunset-view'
    ],
    title: 'Tea Plantation Walk with Sunset View',
    subtitle: 'Relaxing Afternoon Heritage Walk & Sunset Over Misty Western Ghats',
    category: 'TEA EXPERIENCES',
    categorySlug: 'tea-experiences',
    price: '',
    duration: '2–4 Hours · Sunset Experience',
    difficulty: 'Easy',
    isPopular: true,
    badge: 'MOST POPULAR',
    imageUrl: '/images/tea_walk.png',
    galleryImages: [
      '/images/packages/tea_experience_hq.jpg',
      '/images/tea_factory_tasting.jpg',
      '/images/plantation_picnic.jpg',
      '/images/slide3.jpg'
    ],
    shortDescription: 'Meander through private colonial trails, learn artisan plucking traditions, explore tea bushes and scenic viewpoints, and enjoy the sunset over the hills.',
    overview: 'Enjoy a relaxing guided walk through lush green tea plantations, scenic hillside paths and beautiful mountain viewpoints. Finish the experience by watching the sunset over the misty Western Ghats. Accompanied by a passionate local tea naturalist, you will learn the history of Munnar’s British-era estates, understand the art of plucking two leaves and a bud, and photograph rolling emerald hills bathed in golden twilight.',
    highlights: [
      'Gentle walk along private hillside tea garden trails with zero commercial rush',
      'Learn the secrets of artisan tea plucking from experienced local estate workers',
      'Capture postcard-worthy golden hour photographs from secluded panoramic viewpoints',
      'Watch the sun dip below the rolling ridges of the Western Ghats with misty valleys',
      'Sample freshly brewed single-estate orthodox tea with local bakery snacks'
    ],
    summaryInfo: {
      duration: '2–4 Hours · Afternoon sunset schedule',
      distance: '4–5 km gentle walking paths',
      difficulty: 'Easy · Suitable for families, couples, and seniors',
      minGroup: '2 persons (private bookings welcomed)',
      guide: 'Passionate local tea naturalist guide',
      pickupLocation: 'Pothamedu / Lockhart Estate meeting point or Munnar hotel'
    },
    itinerary: [
      {
        time: '3:00 PM',
        activity: 'Arrive at the meeting point and meet your local guide'
      },
      {
        time: '3:15 PM',
        activity: 'Introduction to tea plantations and walking instructions'
      },
      {
        time: '3:30 PM',
        activity: 'Begin walking along permitted tea plantation trails'
      },
      {
        time: '4:00 PM',
        activity: 'Learn about tea bushes, leaf plucking and plantation traditions'
      },
      {
        time: '4:30 PM',
        activity: 'Stop at scenic viewpoints for photographs'
      },
      {
        time: '5:00 PM',
        activity: 'Continue towards the designated sunset viewpoint'
      },
      {
        time: '5:30 PM',
        activity: 'Relax and enjoy the sunset and mountain scenery'
      },
      {
        time: '6:00 PM',
        activity: 'Walk back towards the plantation entrance'
      },
      {
        time: '6:00–7:00 PM',
        activity: 'Finish the walk and return to the starting point'
      }
    ],
    inclusions: [
      'Experienced English & Malayalam speaking estate naturalist',
      'Private tea estate walking permits and entry fees',
      'Freshly brewed Munnar cardamom/black tea and local snacks',
      'Mineral drinking water',
      'Hands-on tea plucking demonstration'
    ],
    exclusions: [
      'Tea factory processing entry (available on morning factory combo)',
      'Private vehicle transfer to meeting point (can be arranged on request)',
      'Souvenir tea packet purchases'
    ],
    whatToBring: [
      'Comfortable walking shoes or sneakers',
      'Light jacket or cardigan for the cooler dusk breeze',
      'Camera or smartphone for sunset photography',
      'Sun hat and sunglasses for the afternoon start'
    ],
    safetyInfo: [
      'Paths are well-maintained estate walking trails with gentle gradient.',
      'Stay on designated paths to avoid disturbing root systems and tea bushes.',
      'Suitable for travelers of all ages and fitness levels.'
    ],
    meetingPoint: 'Start: Designated meeting point near a tea plantation in Munnar. End: Return to the same meeting point after the sunset experience.',
    bestTimeToVisit: 'Year-round. Late afternoons always provide dramatic light and cool breezes in the high ranges.',
    faqs: [
      {
        q: 'Is this walk suitable for young kids or elderly travelers?',
        a: 'Absolutely. The pace is relaxed and unhurried with plenty of rest stops and photo opportunities.'
      },
      {
        q: 'Can we pluck tea leaves ourselves during the tour?',
        a: 'Yes! Your guide will show you how to identify and gently pluck "two leaves and a bud" just like traditional artisan harvesters.'
      },
      {
        q: 'What if it is overcast or cloudy during sunset?',
        a: 'Cloudy evenings in Munnar create dramatic misty landscapes that are equally breathtaking for photography.'
      }
    ]
  },

  // 4. Full Day Trekking Package (Explicit duplicate/alias entry for exact matching)
  {
    id: 'full-day-trekking-package',
    slug: 'full-day-trekking-package',
    aliases: ['full-day-trek-package', '17km-trek-package'],
    title: 'Full Day Trekking Package',
    subtitle: 'Official 17km Mountain & Plantation Expedition',
    category: 'TREKKING',
    categorySlug: 'trekking-adventure',
    price: '',
    duration: 'Full Day · Approximately 7:00 AM – 4:30 PM',
    difficulty: 'Moderate',
    isPopular: true,
    badge: 'MOST POPULAR',
    imageUrl: '/images/full_day_trekking_landscape.jpg',
    galleryImages: [
      '/images/meesapulimala.png',
      '/images/chokramudi.png',
      '/images/letchmi_trek.jpg'
    ],
    shortDescription: 'Complete 17 km high-range trekking package through tea plantations, grasslands, rocky trails, and permitted spice estates with breakfast and lunch included.',
    overview: 'Our premier trekking package designed for genuine trail seekers. You start at 7:00 AM amidst dew-soaked tea gardens, ascending gradually towards 2,000+ meter viewpoints. Take in sweeping views of Anamudi peak and the Western Ghats mountain spine while relishing fresh local breakfast and lunch prepared on the trail.',
    highlights: [
      'Full 17 km comprehensive mountain trek with verified local guides',
      'Breakfast and scenic rest stop at high-altitude mountain viewpoint',
      'Exploration of cardamom, coffee, and pepper plantation nature trails',
      'Shola forest margins with endemic highland biodiversity',
      'Return vehicle transfer back to Munnar town included'
    ],
    summaryInfo: {
      duration: 'Full day · Approximately 7:00 AM – 4:30 PM',
      distance: '17 km — based on your supplied itinerary',
      difficulty: 'Moderate · Guide recommended',
      minGroup: '2 Persons',
      guide: 'Certified native guide with emergency backup',
      pickupLocation: 'Munnar Town central pickup point'
    },
    itinerary: [
      {
        time: '07:00 AM',
        activity: 'Start trekking through tea plantations, grasslands and rocky trails.'
      },
      {
        time: '09:30 AM',
        activity: 'Reach the mountain viewpoint, enjoy breakfast and scenic views.'
      },
      {
        time: '10:30 AM',
        activity: 'Continue trekking through grasslands, coffee, cardamom and tea plantations.'
      },
      {
        time: '01:00 PM',
        activity: 'Lunch break and rest.'
      },
      {
        time: '02:00 PM',
        activity: 'Explore spice plantations and surrounding nature trails.'
      },
      {
        time: '03:00 PM',
        activity: 'Complete the trekking route and return towards the pickup point.'
      },
      {
        time: '04:30 PM',
        activity: 'Return to Munnar by vehicle.'
      }
    ],
    inclusions: [
      'Certified local guide fees and forest department passes',
      'Packed breakfast, hot tea, and wholesome packed lunch',
      'Mineral drinking water & trail snacks',
      'Vehicle pickup and drop from end point to Munnar'
    ],
    exclusions: [
      'Personal trekking poles and footwear',
      'Hotel pickup outside central Munnar'
    ],
    whatToBring: [
      'Sturdy trekking shoes with ankle support',
      'Small backpack, rain gear, and water bottle',
      'Cap, sunglasses, and camera'
    ],
    safetyInfo: [
      'Moderate fitness required. Route has gradual elevation climbs and rocky trails.'
    ],
    meetingPoint: 'Munnar Hiking Tours Base Office / Central Munnar',
    bestTimeToVisit: 'September through April for pleasant trekking temperatures.',
    faqs: [
      {
        q: 'Can the 17km distance be shortened if someone feels tired?',
        a: 'Yes, our guides know safe trail intersections where a support vehicle can rendezvous if required.'
      }
    ]
  },

  // 5. Eravikulam National Park
  {
    id: 'eravikulam',
    slug: 'eravikulam',
    aliases: [
      'eravikulam-national-park',
      'eravikulam-wildlife',
      'eravikulam-park',
      'eravikulam-safari'
    ],
    title: 'Eravikulam National Park',
    subtitle: 'Home of the Endangered Nilgiri Tahr & High-Altitude Shola Grasslands',
    category: 'WILDLIFE SANCTUARIES',
    categorySlug: 'wildlife-sanctuaries',
    price: '',
    duration: 'Half Day',
    difficulty: 'Easy',
    isPopular: false,
    badge: 'WILDLIFE SANCTUARIES',
    imageUrl: '/images/eravikulam_national_park.jpg',
    galleryImages: [
      '/images/eravikulam_national_park.jpg',
      '/images/safari_wildlife.jpg',
      '/images/bird_watching_tour.jpg',
      '/images/packages/grassland_hiking_hq.jpg'
    ],
    startingPoint: 'Eravikulam National Park entrance / ticket counter.',
    endingPoint: 'Return to the park entrance after the visit.',
    durationDetails: 'Approximately 3–4 hours, depending on entry arrangements.',
    itineraryTitle: 'Complete itinerary',
    shortDescription: 'Experience an unforgettable adventure with our certified guides on this Eravikulam National Park tour. Witness mountain landscapes, grasslands, and native wildlife with opportunities to observe the Nilgiri tahr.',
    overview: 'Discover the breathtaking high-altitude ecosystem of Eravikulam National Park, home to the largest surviving population of the endangered Nilgiri Tahr. Located at the base of Anamudi peak, this protected park features rolling montane shola-grasslands, cascading hill streams, and panoramic vistas across the Western Ghats. Accompanied by authorized park guides, visitors enjoy a gentle walk along permitted paved routes surrounded by wildflowers and misty peaks.',
    highlights: [
      'Mountain landscapes, grasslands, native wildlife and opportunities to observe Nilgiri tahr.',
      'Scenic views overlooking rolling Western Ghats ridges and valleys',
      'Walk along the permitted eco-tourism trail inside the protected national park',
      'Observe native flora including Neelakurinji shrubs and montane orchids',
      'Comfortable half-day visit returning to the park entrance'
    ],
    summaryInfo: {
      duration: 'Approximately 3–4 hours, depending on entry arrangements.',
      distance: 'Approx. 2–3 km permitted walking trail',
      difficulty: 'Easy · Paved walking pathway',
      minGroup: '1–2 persons (Family & senior friendly)',
      guide: 'Authorized Forest Department Guide & Naturalist',
      pickupLocation: 'Eravikulam National Park entrance / ticket counter.'
    },
    itinerary: [
      {
        time: '8:00 AM',
        activity: 'Arrive at the park entrance and complete ticketing'
      },
      {
        time: '8:30 AM',
        activity: 'Board the park-authorized transport, if required'
      },
      {
        time: '9:00 AM',
        activity: 'Explore the permitted walking trail and mountain scenery'
      },
      {
        time: '9:45 AM',
        activity: 'Observe the natural habitat and look for Nilgiri tahr'
      },
      {
        time: '10:30 AM',
        activity: 'Enjoy photography stops and scenic viewpoints'
      },
      {
        time: '11:00 AM',
        activity: 'Begin the return journey through the designated visitor route'
      },
      {
        time: '11:30 AM–12:00 PM',
        activity: 'Finish the visit and return to the entrance'
      }
    ],
    note: 'Visitor routes, entry times and access arrangements depend on park regulations.',
    inclusions: [
      'Guidance and assistance with park entry arrangements',
      'Forest department authorized eco-tourism bus transit within the park',
      'Certified naturalist interpretation along permitted walking trails',
      'Drinking water assistance'
    ],
    exclusions: [
      'Official park entrance tickets and camera fees (payable at forest counter or online)',
      'Hotel pickup and drop (available upon prior request)',
      'Personal snacks and tips'
    ],
    whatToBring: [
      'Government-issued Photo ID (mandatory for park entry verification)',
      'Comfortable walking shoes or sneakers',
      'Light jacket or windcheater (mornings can be chilly and breezy)',
      'Cap, sunglasses, and personal water bottle',
      'Camera or smartphone (telephoto lens recommended for wildlife photography)'
    ],
    safetyInfo: [
      'Remain on the designated visitor trail at all times; off-trail walking is strictly prohibited by park regulations.',
      'Maintain safe distance and silence when observing Nilgiri Tahr; feeding or approaching animals is strictly illegal.',
      'Single-use plastic bottles and plastic bags are strictly prohibited inside the national park.',
      '*Visitor routes, entry times and access arrangements depend on park regulations.'
    ],
    meetingPoint: 'Start: Eravikulam National Park entrance / ticket counter. End: Return to the park entrance after the visit.',
    bestTimeToVisit: 'September to February for clear mountain vistas and active tahr sightings. Please note the park is usually closed for 6–8 weeks during calving season (typically February–March).',
    faqs: [
      {
        q: 'What are the opening hours of Eravikulam National Park?',
        a: 'The park is generally open to visitors from 7:30 AM to 4:00 PM. Morning slots (8:00 AM – 11:00 AM) offer the best weather and wildlife observation.'
      },
      {
        q: 'Are we guaranteed to see the Nilgiri Tahr?',
        a: 'While wild animals roam freely, Nilgiri Tahr are habituated to the visitor walking zone along Rajamala, and sightings are exceptionally common throughout the morning.'
      },
      {
        q: 'Is the trail suitable for seniors or small children?',
        a: 'Yes! The visitor trail is a gentle, paved pathway suitable for visitors of all age groups, including seniors and families with children.'
      }
    ]
  },

  // 6. Chinnar Wildlife Safari
  {
    id: 'chinnar-safari',
    slug: 'chinnar-safari',
    aliases: [
      'chinnar-wildlife-safari',
      'chinnar-wildlife',
      'chinnar-tour',
      'wildlife-sanctuary-tour'
    ],
    title: 'Chinnar Wildlife Safari',
    subtitle: 'Guided 4x4 Safari & Nature Exploration in Chinnar Wildlife Sanctuary',
    category: 'WILDLIFE SANCTUARIES',
    categorySlug: 'wildlife-sanctuaries',
    price: '',
    duration: 'Full Day',
    difficulty: 'Moderate',
    isPopular: false,
    badge: 'WILDLIFE SANCTUARIES',
    imageUrl: '/images/safari_wildlife.jpg',
    galleryImages: [
      '/images/safari_wildlife.jpg',
      '/images/eravikulam_national_park.jpg',
      '/images/bird_watching_tour.jpg',
      '/images/slide2.jpg'
    ],
    startingPoint: 'Designated Chinnar Wildlife Sanctuary entry or approved safari meeting point.',
    endingPoint: 'Return to the original meeting point.',
    durationDetails: 'Full day, according to the selected operator\'s schedule.',
    itineraryTitle: 'Complete itinerary',
    shortDescription: 'Experience an unforgettable adventure with our certified guides on this Chinnar Wildlife Safari. Witness wildlife observation in a protected natural habitat, dry forest scenery, and guided nature exploration.',
    overview: 'Explore the unique rain-shadow ecosystem of Chinnar Wildlife Sanctuary, situated along the Kerala-Tamil Nadu border. Famous for its dry deciduous scrub forests, rugged rocky ridges, and riverine woods, Chinnar is home to the vulnerable Grizzled Giant Squirrel, Indian star tortoise, wild elephants, gaurs, spotted deer, and over 225 bird species. Accompanied by experienced local tribal trackers and certified guides, this full-day safari takes you through permitted wildlife routes, prehistoric dolmens, and scenic watchtowers.',
    highlights: [
      'Wildlife observation in a protected natural habitat.',
      'Dry forest and rocky landscape scenery.',
      'Guided nature exploration.',
      'Photography and bird observation opportunities.',
      'Local flora and fauna interpretation.'
    ],
    summaryInfo: {
      duration: 'Full day, according to the selected operator\'s schedule.',
      distance: 'Approx. 15–20 km safari route + guided walking trails',
      difficulty: 'Moderate · Safari vehicle & nature walks',
      minGroup: '2 Jeep (up to 6 guests)',
      guide: 'Forest Department Guide & Native Tribal Tracker',
      pickupLocation: 'Designated Chinnar Wildlife Sanctuary entry or approved safari meeting point.'
    },
    itinerary: [
      {
        time: '7:30 AM',
        activity: 'Arrive at the designated meeting point'
      },
      {
        time: '8:00 AM',
        activity: 'Complete registration and meet the local guide'
      },
      {
        time: '8:30 AM',
        activity: 'Begin the permitted wildlife exploration route'
      },
      {
        time: '9:30 AM',
        activity: 'Explore the dry deciduous forest and natural landscapes'
      },
      {
        time: '10:30 AM',
        activity: 'Wildlife observation and photography stops'
      },
      {
        time: '11:30 AM',
        activity: 'Explore designated viewpoints and forest surroundings'
      },
      {
        time: '12:30 PM',
        activity: 'Lunch and rest break'
      },
      {
        time: '1:30 PM',
        activity: 'Continue the approved nature or wildlife activity'
      },
      {
        time: '2:30 PM',
        activity: 'Explore additional permitted areas, subject to the package'
      },
      {
        time: '3:30 PM',
        activity: 'Begin the return journey'
      },
      {
        time: '4:00–4:30 PM',
        activity: 'Finish the tour and return to the meeting point'
      }
    ],
    note: 'Routes, entry permissions and wildlife activities are managed according to Forest Department guidelines and seasonal weather.',
    inclusions: [
      'Safari vehicle transportation along approved sanctuary route',
      'Authorized forest department entry passes and conservation fees',
      'Certified native tribal guide and naturalist service',
      'Traditional packed lunch and mineral water',
      'First aid support and safety assistance'
    ],
    exclusions: [
      'Camera permit fees if applicable at forest checkpost',
      'Transfers outside the designated meeting radius (available on request)',
      'Personal expenses and tips'
    ],
    whatToBring: [
      'Earthy or khaki-colored clothing suitable for dry forest terrain',
      'Comfortable closed walking shoes or trekking boots',
      'Binoculars and camera with zoom lens',
      'Sun protection: wide-brim hat, sunglasses, and sunscreen',
      'Valid Government ID proof for sanctuary registration'
    ],
    safetyInfo: [
      'Always stay with your forest guide and adhere strictly to sanctuary safety guidelines.',
      'Keep noise to a minimum to avoid disturbing wildlife and improve sighting opportunities.',
      'Single-use plastics are strictly prohibited in the sanctuary.',
      '*Routes, timings and activities depend on Forest Department regulations and permissions.'
    ],
    meetingPoint: 'Start: Designated Chinnar Wildlife Sanctuary entry or approved safari meeting point. End: Return to the original meeting point.',
    bestTimeToVisit: 'October to May. The dry months (January to April) offer excellent visibility near waterholes and riverbanks.',
    faqs: [
      {
        q: 'What wildlife can we spot in Chinnar?',
        a: 'Chinnar is famous for Grizzled Giant Squirrels, spotted deer, wild gaurs, langurs, peacocks, elephants, and rare dry-zone birds and butterflies.'
      },
      {
        q: 'Is lunch provided on the full-day safari?',
        a: 'Yes, an authentic packed Kerala meal and drinking water are included for the midday rest break.'
      },
      {
        q: 'Where is the meeting point located?',
        a: 'The safari starts at the designated Chinnar Wildlife Sanctuary entry point or approved meeting point along the Munnar-Udumalpet road. Detailed driving directions and GPS coordinates are provided upon booking.'
      }
    ]
  },

  // 7. Bird Watching Tour
  {
    id: 'bird-watching',
    slug: 'bird-watching',
    aliases: [
      'bird-watching-tour',
      'munnar-birding',
      'birding-tour',
      'bird-watching-munnar'
    ],
    title: 'Bird Watching Tour',
    subtitle: 'Early Morning Guided Birding Expedition in Munnar\'s Forest Edges & Canopies',
    category: 'WILDLIFE SANCTUARIES',
    categorySlug: 'wildlife-sanctuaries',
    price: '',
    duration: 'Early Morning',
    difficulty: 'Easy',
    isPopular: false,
    badge: 'WILDLIFE SANCTUARIES',
    imageUrl: '/images/bird_watching_tour.jpg',
    galleryImages: [
      '/images/bird_watching_tour.jpg',
      '/images/eravikulam_national_park.jpg',
      '/images/safari_wildlife.jpg'
    ],
    startingPoint: 'Designated forest-edge meeting point, lodge or approved birding trail.',
    endingPoint: 'Return to the original meeting point.',
    durationDetails: 'Approximately 2–4 hours.',
    itineraryTitle: 'Complete itinerary',
    shortDescription: 'Experience an unforgettable adventure with our certified guides on this Bird Watching Tour. Witness guided bird watching in natural habitats, forest trails, and learning about local bird habitats.',
    overview: 'Munnar and the surrounding Western Ghats form one of the world\'s premier biodiversity hotspots, sheltering numerous rare and endemic avian species. On this early-morning walking tour, an expert local ornithologist guide leads you along quiet forest-edge trails, shola fringes, and tea plantation boundaries. Spot Western Ghats endemics including the Nilgiri Flycatcher, Malabar Whistling Thrush, Kerala Laughingthrush, White-bellied Blue Robin, and Crimson-backed Sunbird in their pristine natural habitats.',
    highlights: [
      'Guided bird watching in natural habitats.',
      'Bird identification and observation.',
      'Forest trails and nature photography.',
      'Learning about local bird habitats and biodiversity.',
      'A peaceful early-morning nature experience.'
    ],
    summaryInfo: {
      duration: 'Approximately 2–4 hours.',
      distance: 'Approx. 3–5 km gentle nature walk',
      difficulty: 'Easy · Gentle forest-edge trails',
      minGroup: '1–2 persons (Small quiet groups recommended)',
      guide: 'Certified Local Ornithology Guide & Naturalist',
      pickupLocation: 'Designated forest-edge meeting point, lodge or approved birding trail.'
    },
    itinerary: [
      {
        time: '6:00 AM',
        activity: 'Meet the birding guide at the designated starting point'
      },
      {
        time: '6:15 AM',
        activity: 'Introduction to bird watching and trail guidelines'
      },
      {
        time: '6:30 AM',
        activity: 'Begin a quiet guided walk along the approved trail'
      },
      {
        time: '7:00 AM',
        activity: 'Observe birds in forest edges and tree canopies'
      },
      {
        time: '7:30 AM',
        activity: 'Stop for bird identification and photography'
      },
      {
        time: '8:00 AM',
        activity: 'Explore another suitable birding location'
      },
      {
        time: '8:30 AM',
        activity: 'Continue observation and learn about local bird habitats'
      },
      {
        time: '9:00 AM',
        activity: 'Begin walking back'
      },
      {
        time: '9:15–9:30 AM',
        activity: 'Finish the tour at the starting point'
      }
    ],
    note: 'Bird sightings vary with season, weather and location. Binoculars and a bird identification guide can enhance the experience.',
    inclusions: [
      'Expert local birding guide with spotting scope / field guide',
      'Guided walk through approved forest-edge birding corridors',
      'Bird checklist and identification guidance',
      'Fresh morning tea and light trail refreshments'
    ],
    exclusions: [
      'Personal binoculars (rental available on prior request)',
      'Transport to starting point (hotel pickup can be arranged on request)',
      'Heavy meals'
    ],
    whatToBring: [
      'Binoculars (8x42 or 10x42 recommended for forest birding)',
      'Camera with zoom/telephoto lens (300mm+ recommended)',
      'Dull, earthy or dark green/brown clothing (avoid bright colors or white)',
      'Comfortable, silent walking shoes',
      'Light jacket for the cool morning mist'
    ],
    safetyInfo: [
      'Walk quietly and avoid sudden gestures to minimize disturbing birds.',
      'Stay on designated trails with your guide.',
      'Follow ethical birding guidelines; bird calls playback is not permitted.',
      '*Bird sightings vary with season, weather and location. Binoculars and a bird identification guide can enhance the experience.'
    ],
    meetingPoint: 'Start: Designated forest-edge meeting point, lodge or approved birding trail. End: Return to the original meeting point.',
    bestTimeToVisit: 'October to March is peak birding season in Munnar, with migrant species joining resident Western Ghats endemics.',
    faqs: [
      {
        q: 'What time does the bird watching tour begin?',
        a: 'The tour begins at 6:00 AM when birds are most active and vocal in the canopy.'
      },
      {
        q: 'Can beginners join this tour?',
        a: 'Yes! Our guides welcome beginners and provide helpful tips on bird spotting, song identification, and binocular usage.'
      },
      {
        q: 'What endemic species can we expect to see?',
        a: 'Commonly recorded endemics include the Malabar Whistling Thrush, Nilgiri Flycatcher, Palani Laughingthrush, Indian Blackbird, and Crimson-backed Sunbird.'
      }
    ]
  },

  // 8. Old Munnar TukTuk Tour
  {
    id: 'tuktuk-tour',
    slug: 'tuktuk-tour',
    aliases: [
      'old-munnar-tuktuk',
      'old-munnar-tuktuk-tour',
      'munnar-tuktuk-tour',
      'heritage-and-local-village-tour',
      'estate-heritage-walk'
    ],
    title: 'Old Munnar TukTuk Tour',
    subtitle: 'Traditional Local TukTuk Ride Through Historic Streets & Tea Viewpoints',
    category: 'HERITAGE & TUKTUK',
    categorySlug: 'heritage-tuktuk',
    price: '',
    duration: '3 Hours',
    difficulty: 'Easy',
    isPopular: false,
    badge: 'HERITAGE & TUKTUK',
    imageUrl: '/images/old_munnar_tuktuk.jpg',
    galleryImages: [
      '/images/old_munnar_tuktuk.jpg',
      '/images/tuktuk_munnar_tour.png',
      '/images/colonial_heritage_walk.jpg',
      '/images/spice_garden_visit.jpg'
    ],
    startingPoint: 'Old Munnar town / confirmed TukTuk pickup point.',
    endingPoint: 'Return to the same pickup point.',
    transport: 'Local TukTuk / auto rickshaw.',
    durationDetails: 'Approximately 3 Hours',
    itineraryTitle: 'Complete itinerary',
    shortDescription: 'Discover the charm of Old Munnar on a traditional local TukTuk ride. Explore historic streets, scenic tea plantation viewpoints, local markets and cultural landmarks while experiencing the everyday life of this beautiful hill town.',
    overview: 'Discover the charm of Old Munnar on a traditional local TukTuk ride. Explore historic streets, scenic tea plantation viewpoints, local markets and cultural landmarks while experiencing the everyday life of this beautiful hill town.',
    highlights: [
      'Old town sightseeing, tea plantation views, heritage landmarks, local shopping and photography stops.',
      'Authentic open-air TukTuk ride through scenic hillside backroads and bazaars',
      'Visit historic CSI Christ Church or accessible colonial heritage points',
      'Explore bustling Old Munnar spice, vegetable, and souvenir markets',
      'Stop at panoramic tea plantation and waterfall viewpoints'
    ],
    summaryInfo: {
      duration: 'Approximately 3 Hours',
      distance: 'Approx. 15 km TukTuk route + short walking stops',
      difficulty: 'Easy',
      minGroup: '1–3 persons per TukTuk',
      guide: 'Friendly Local TukTuk Chauffeur & Guide',
      pickupLocation: 'Old Munnar town / confirmed TukTuk pickup point.'
    },
    itinerary: [
      {
        time: '9:00 AM',
        activity: 'Meet the TukTuk driver in Old Munnar'
      },
      {
        time: '9:15 AM',
        activity: 'Explore Old Munnar town and local streets'
      },
      {
        time: '9:35 AM',
        activity: 'Visit a scenic tea plantation viewpoint'
      },
      {
        time: '10:00 AM',
        activity: 'Stop at a permitted photo point'
      },
      {
        time: '10:20 AM',
        activity: 'Visit CSI Christ Church or another accessible heritage site'
      },
      {
        time: '10:45 AM',
        activity: 'Explore a local market and shopping area'
      },
      {
        time: '11:15 AM',
        activity: 'Visit a nearby waterfall viewpoint, if included and accessible'
      },
      {
        time: '11:45 AM',
        activity: 'Enjoy the final scenic stop'
      },
      {
        time: '12:00 PM',
        activity: 'Return to the pickup point'
      }
    ],
    note: 'The order and timing of stops depend on local traffic, site opening hours and your operator\'s route.',
    inclusions: [
      'Private TukTuk transport with fuel and dedicated driver-guide',
      'Stops at scenic tea viewpoints, heritage sites, and local markets',
      'Sightseeing guidance and photo assistance',
      'Flexible pace for shopping and photography'
    ],
    exclusions: [
      'Monument entry tickets (if applicable)',
      'Personal purchases, shopping, and snacks',
      'Tips or gratuities'
    ],
    whatToBring: [
      'Comfortable casual clothing',
      'Walking shoes or sneakers for short stops',
      'Camera or smartphone for photography',
      'Small cash for local bazaar purchases and snacks'
    ],
    safetyInfo: [
      'TukTuks are safely operated by vetted local drivers who know every turn of Munnar roads.',
      'Hold onto safety handles when driving along hillside curves.',
      '*The order and timing of stops depend on local traffic, site opening hours and your operator\'s route.'
    ],
    meetingPoint: 'Start: Old Munnar town / confirmed TukTuk pickup point. End: Return to the same pickup point.',
    bestTimeToVisit: 'Year-round. Mornings between 9:00 AM and 12:00 PM offer pleasant weather and vibrant market atmosphere.',
    faqs: [
      {
        q: 'How many people can sit in one TukTuk?',
        a: 'A standard Munnar TukTuk comfortably seats up to 3 adult passengers. For larger families or groups, multiple TukTuks travel together in convoy.'
      },
      {
        q: 'Can we customize the stops during the tour?',
        a: 'Yes! The driver is happy to adapt the route to your interests, such as spending more time at viewpoints or shopping for authentic Munnar spices.'
      },
      {
        q: 'Where do we meet the driver?',
        a: 'The tour begins at your confirmed Old Munnar town pickup point or hotel lobby within central Munnar.'
      }
    ]
  },

  // 9. Colonial Heritage Walk
  {
    id: 'heritage-walk',
    slug: 'heritage-walk',
    aliases: [
      'colonial-heritage-walk',
      'colonial-walk',
      'munnar-heritage-walk'
    ],
    title: 'Colonial Heritage Walk',
    subtitle: 'A Walk Through History, Nature & Colonial Charms of Munnar',
    category: 'HERITAGE & TUKTUK',
    categorySlug: 'heritage-tuktuk',
    price: '',
    duration: '2 Hours',
    difficulty: 'Easy',
    isPopular: false,
    badge: 'HERITAGE & TUKTUK',
    imageUrl: '/images/colonial_heritage_walk.jpg',
    galleryImages: [
      '/images/colonial_heritage_walk.jpg',
      '/images/old_munnar_tuktuk.jpg',
      '/images/spice_garden_visit.jpg',
      '/images/slide3.jpg'
    ],
    startingPoint: 'Designated meeting point in Old Munnar.',
    endingPoint: 'Return to the original meeting point or finish at the final heritage stop, depending on your route.',
    tourType: 'Guided walking tour.',
    durationDetails: 'Approximately 2 Hours',
    itineraryTitle: 'Complete itinerary',
    shortDescription: 'Step back in time and discover Munnar\'s colonial heritage on a guided walking tour. Explore historic streets, admire period architecture and learn about the development of the hill station and its tea plantations.',
    overview: 'Step back in time and discover Munnar\'s colonial heritage on a guided walking tour. Explore historic streets, admire period architecture and learn about the development of the hill station and its tea plantations.',
    highlights: [
      'Colonial era architecture, historic landmarks, local stories, tea plantation history and photography opportunities.',
      'Visit historic CSI Christ Church (built 1910) with its Scottish stained glass',
      'Stroll past British-era stone cottages and administrative bungalows',
      'Hear fascinating stories of Munnar\'s pioneering planters and vintage railway',
      'Relaxed walking pace with ample photo stops and shady tree-lined avenues'
    ],
    summaryInfo: {
      duration: 'Approximately 2 Hours',
      distance: 'Approx. 2.5–3 km gentle town & heritage walk',
      difficulty: 'Easy',
      minGroup: '1–2 persons',
      guide: 'Certified Local Heritage Historian & Guide',
      pickupLocation: 'Designated meeting point in Old Munnar'
    },
    itinerary: [
      {
        time: '9:00 AM',
        activity: 'Meet the heritage guide in Old Munnar'
      },
      {
        time: '9:10 AM',
        activity: 'Introduction to Munnar\'s colonial history'
      },
      {
        time: '9:20 AM',
        activity: 'Begin the heritage walk through historic streets'
      },
      {
        time: '9:35 AM',
        activity: 'Visit CSI Christ Church, subject to access'
      },
      {
        time: '9:55 AM',
        activity: 'Explore heritage-era buildings and local architecture'
      },
      {
        time: '10:15 AM',
        activity: 'Learn about the history of tea plantations'
      },
      {
        time: '10:30 AM',
        activity: 'Stop for photographs and local stories'
      },
      {
        time: '10:45 AM',
        activity: 'Walk back through the heritage area'
      },
      {
        time: '11:00 AM',
        activity: 'Finish the tour at the designated endpoint'
      }
    ],
    inclusions: [
      'Experienced local heritage guide with deep knowledge of Munnar\'s history',
      'Guided walking tour covering key colonial landmarks and historic streets',
      'Church visit and historic cemetery interpretation (subject to access)',
      'Historical storytelling and local lore'
    ],
    exclusions: [
      'Vehicle transport (this is a walking tour; transfers available on request)',
      'Church donation / camera ticket if applicable',
      'Personal beverages and snacks'
    ],
    whatToBring: [
      'Comfortable walking shoes',
      'Sun cap and sunglasses',
      'Personal water bottle',
      'Camera or smartphone for architectural photos'
    ],
    safetyInfo: [
      'Paved streets and gentle walkways suitable for all fitness levels.',
      'Respect church protocols and local cemetery regulations.',
      'Follow the guide when crossing town streets.'
    ],
    meetingPoint: 'Start: Designated meeting point in Old Munnar. End: Return to the original meeting point or finish at the final heritage stop, depending on your route.',
    bestTimeToVisit: 'Year-round. Mornings at 9:00 AM are ideal with crisp air and quiet historic streets before daily traffic.',
    faqs: [
      {
        q: 'Is the walk physically demanding?',
        a: 'No, it is a relaxed 2-hour walking tour covering approximately 2.5 km with frequent stops for storytelling and photography.'
      },
      {
        q: 'Is CSI Christ Church open to visitors?',
        a: 'Yes, visitors are typically welcome outside worship hours. Entry is subject to parish permissions on Sundays and holidays.'
      },
      {
        q: 'Can children participate?',
        a: 'Yes! Families and history enthusiasts of all ages thoroughly enjoy the colorful stories and colonial architecture.'
      }
    ]
  },

  // 10. Spice Garden Visit
  {
    id: 'spice-garden',
    slug: 'spice-garden',
    aliases: [
      'spice-garden-visit',
      'spice-plantation-tour',
      'spice-garden-munnar'
    ],
    title: 'Spice Garden Visit',
    subtitle: 'Explore, Learn & Taste Authentic Kerala Spices in a Lush Highland Plantation',
    category: 'HERITAGE & TUKTUK',
    categorySlug: 'heritage-tuktuk',
    price: '',
    duration: 'Half Day',
    difficulty: 'Easy',
    isPopular: false,
    badge: 'HERITAGE & TUKTUK',
    imageUrl: '/images/spice_garden_visit.jpg',
    galleryImages: [
      '/images/spice_garden_visit.jpg',
      '/images/colonial_heritage_walk.jpg',
      '/images/old_munnar_tuktuk.jpg',
      '/images/packages/tea_experience_hq.jpg'
    ],
    startingPoint: 'Approved spice garden entrance near Munnar.',
    endingPoint: 'Return to the garden entrance.',
    tourType: 'Guided plantation walk.',
    durationDetails: 'Half Day',
    itineraryTitle: 'Complete itinerary',
    shortDescription: 'Discover the aromatic world of Kerala\'s spices on a guided walk through a local spice garden near Munnar. Learn how cardamom, black pepper, cinnamon, cloves, nutmeg and other spices are cultivated, harvested and processed.',
    overview: 'Discover the aromatic world of Kerala\'s spices on a guided walk through a local spice garden near Munnar. Learn how cardamom, black pepper, cinnamon, cloves, nutmeg and other spices are cultivated, harvested and processed.',
    highlights: [
      'Guided plantation walk, spice cultivation, harvesting demonstrations, aromatic plants, tasting opportunities and local spice shopping.',
      'See authentic cardamom, black pepper, cinnamon, cloves, nutmeg, and vanilla plants',
      'Learn how spices are harvested, dried, graded, and processed traditionally',
      'Touch, smell, and taste fresh organic highland spices on the plant',
      'Opportunity to buy fresh estate spices directly from verified garden outlets'
    ],
    summaryInfo: {
      duration: 'Half Day',
      distance: 'Approx. 1.5–2 km gentle garden walk',
      difficulty: 'Easy',
      minGroup: '1–2 persons',
      guide: 'Certified Plantation Botanist & Spice Naturalist',
      pickupLocation: 'Approved spice garden entrance near Munnar'
    },
    itinerary: [
      {
        time: '9:00 AM',
        activity: 'Arrive at the spice garden entrance'
      },
      {
        time: '9:15 AM',
        activity: 'Meet the guide and receive an introduction'
      },
      {
        time: '9:30 AM',
        activity: 'Begin walking through the spice plantation'
      },
      {
        time: '10:00 AM',
        activity: 'Learn about cardamom cultivation'
      },
      {
        time: '10:30 AM',
        activity: 'Explore pepper vines, cinnamon and clove plants'
      },
      {
        time: '11:00 AM',
        activity: 'Discover nutmeg, vanilla and other spices, where available'
      },
      {
        time: '11:30 AM',
        activity: 'Learn about harvesting, drying and storage'
      },
      {
        time: '12:00 PM',
        activity: 'Enjoy a tasting or product demonstration, if offered'
      },
      {
        time: '12:30 PM',
        activity: 'Visit the local spice shop, if available'
      },
      {
        time: '1:00 PM',
        activity: 'Finish the visit and return to the entrance'
      }
    ],
    note: 'This is a suggested half day itinerary. Actual timings depend on the garden\'s opening hours and the activities offered.',
    inclusions: [
      'Spice garden entry pass and visitor registration',
      'Expert guided tour by certified spice naturalist',
      'Live sensory demonstration of cardamom, pepper, and cinnamon',
      'Spice tasting and product demonstration (where offered)'
    ],
    exclusions: [
      'Personal purchases at the spice shop',
      'Vehicle transfers to/from the spice garden (available on request)',
      'Personal snacks and tips'
    ],
    whatToBring: [
      'Comfortable flat walking shoes',
      'Camera or smartphone for close-up plant photos',
      'Light jacket or umbrella during damp days',
      'Cash or card for authentic local spice purchases'
    ],
    safetyInfo: [
      'Stay on marked plantation paths behind your naturalist.',
      'Do not pluck or damage experimental plants without guide permission.',
      '*This is a suggested half day itinerary. Actual timings depend on the garden\'s opening hours and the activities offered.'
    ],
    meetingPoint: 'Start: Approved spice garden entrance near Munnar. End: Return to the garden entrance.',
    bestTimeToVisit: 'Year-round. The post-monsoon and winter months (September to February) feature lush green spice vines in full fruit.',
    faqs: [
      {
        q: 'Can we buy authentic spices directly during the tour?',
        a: 'Yes! The garden includes a verified farm outlet offering pure cardamom, black tellicherry pepper, organic cloves, cinnamon quills, and essential oils.'
      },
      {
        q: 'Is the garden walk suitable for elderly visitors?',
        a: 'Yes, the paths are gentle, well-shaded, and mostly flat with benches placed throughout the garden.'
      },
      {
        q: 'How far is the spice garden from Munnar town?',
        a: 'Approved spice gardens are located within a pleasant 15–25 minute drive from central Munnar.'
      }
    ]
  },

  // 7. Off-Road Waterfall Safari
  {
    id: 'waterfall-safari',
    slug: 'waterfall-safari',
    aliases: ['waterfall-safari-jeep'],
    title: 'Off-Road Waterfall Safari',
    subtitle: 'Thrill Through Hidden Forest Streams & Cascading Falls',
    category: 'JEEP SAFARIS',
    categorySlug: 'jeep-safaris',
    price: '',
    duration: 'Half Day (4–5 Hours)',
    difficulty: 'Easy-Mod',
    isPopular: false,
    badge: 'SCENIC',
    imageUrl: '/images/safari_waterfall_v2.jpg',
    galleryImages: [
      '/images/safari_waterfall.jpg',
      '/images/slide2.jpg',
      '/images/jeep_safari_anakulam_hq.jpg'
    ],
    shortDescription: 'Navigate deep forest tracks and splashing streams to reach hidden, pristine waterfalls accessible only by our rugged 4x4 jeeps.',
    overview: 'Dive deep into Munnar’s lesser-known forest valleys where secluded waterfalls cascade through lush rainforest canopies. Unlike crowded roadside tourist falls, our off-road route takes you to private cascades where you can safely dip your feet in mountain streams and enjoy the sounds of untouched nature.',
    highlights: [
      'Rugged 4x4 off-road adventure through deep jungle tracks',
      'Visit 3 secluded natural waterfalls hidden from general traffic',
      'Safe stream dipping and swimming spots under natural mountain falls',
      'Fresh cardamom plantation stroll and local picnic snack'
    ],
    summaryInfo: {
      duration: '4–5 Hours · Morning or Afternoon departure',
      distance: '25 km off-road route',
      difficulty: 'Easy to Moderate',
      minGroup: '2 Jeep (up to 6 guests)',
      guide: 'Local 4x4 Chauffeur & Guide',
      pickupLocation: 'Munnar Town Hotel Pickup'
    },
    itinerary: [
      { time: '08:30 AM', activity: 'Jeep pickup from hotel in Munnar.' },
      { time: '09:15 AM', activity: 'Enter rugged forest trail and cross riverbeds.' },
      { time: '10:00 AM', activity: 'Arrive at first hidden cascade; photography and relaxation.' },
      { time: '11:15 AM', activity: 'Proceed to Viripara / 33 waterfalls zone for stream dipping.' },
      { time: '12:30 PM', activity: 'Traditional tea and Kerala snack break.' },
      { time: '01:30 PM', activity: 'Return drive to Munnar hotel.' }
    ],
    inclusions: ['4x4 Jeep with driver', 'Forest passes', 'Snacks and drinking water'],
    exclusions: ['Towels and change of clothes', 'Meals'],
    whatToBring: ['Change of clothes if planning to get wet', 'Water shoes or sandals with grip'],
    safetyInfo: ['Do not jump into unverified deep pools; strictly follow driver safety advice.'],
    meetingPoint: 'Hotel Pickup across Munnar',
    bestTimeToVisit: 'August to January when waterfalls are in full cascade.',
    faqs: [
      { q: 'Is swimming safe?', a: 'Only at designated shallow stream zones recommended by our experienced driver.' }
    ]
  },

  // 8. Kannan Devan Hills Jeep Safari
  {
    id: 'kannan-devan-hills-jeep-safari',
    slug: 'kannan-devan-hills-jeep-safari',
    aliases: [
      'hills-safari',
      'kannan-devan-hills-safari',
      'kannan-devan-jeep-safari',
      'kannan-devan-safari',
      'kannan-devan'
    ],
    title: 'Kannan Devan Hills Jeep Safari',
    subtitle: '4×4 Off-Road Adventure Through Tea Plantations, Waterfalls & Forest Trails',
    category: 'JEEP SAFARIS',
    categorySlug: 'jeep-safaris',
    price: '',
    duration: 'Full Day (8–10 Hours) or Half Day (3–5 Hours)',
    difficulty: 'Easy',
    isPopular: true,
    badge: 'MOST POPULAR',
    imageUrl: '/images/kannan_devan_safari_landscape.jpg',
    galleryImages: [
      '/images/safari_kannan_devan.jpg',
      '/images/safari_waterfall_v2.jpg',
      '/images/packages/anakulam_jeep_safari_hq.jpg',
      '/images/slide2.jpg'
    ],
    shortDescription: 'Experience the scenic beauty of Munnar on an exciting 4×4 jeep adventure through green tea plantations, misty mountain viewpoints, waterfalls and rugged forest trails.',
    overview: 'Experience the scenic beauty of Munnar on an exciting 4×4 jeep adventure through green tea plantations, misty mountain viewpoints, waterfalls and rugged forest trails. Choose our Half Day or Full Day Jeep Safari to discover the natural beauty of the Western Ghats with a local driver-guide.',
    highlights: [
      'Scenic tea plantation landscapes',
      'Panoramic mountain viewpoints',
      'Forest waterfalls and streams',
      'Rugged 4×4 off-road adventure',
      'Hanging bridge and natural rock formations',
      'Anakulam village and river scenery',
      'Photography and nature stops'
    ],
    summaryInfo: {
      duration: 'Approx. 8–10 hours (Full Day) or 3–5 hours (Half Day)',
      distance: '45–60 km rugged 4×4 mountain circuit',
      difficulty: 'Easy sightseeing & moderate forest off-road tracks',
      minGroup: '2 Jeep (up to 6 guests)',
      guide: 'Local driver-guide, confirm at booking',
      pickupLocation: 'Designated Munnar pickup point / hotel transfer'
    },
    itinerary: [
      {
        time: 'Stop 1 · 09:00–09:30 AM',
        activity: 'Shooting Point (20–30 mins): Start with beautiful views of tea covered hills and valleys. Take photographs and enjoy the cool mountain air.'
      },
      {
        time: 'Stop 2 · 09:30–10:00 AM',
        activity: 'Idly Hills: Explore rounded hill formations and scenic landscapes, with photo opportunities overlooking the surrounding plantations.'
      },
      {
        time: 'Stop 3 · 10:00–10:30 AM',
        activity: 'Tea Valley View: Enjoy wide views of green tea estates, forest covered mountains and winding countryside roads.'
      },
      {
        time: 'Stop 4 · 10:30–11:15 AM',
        activity: 'Viriparai Waterfalls: Visit the forest waterfall, enjoy the natural surroundings and take photographs. Swimming is only appropriate where officially permitted and safe.'
      },
      {
        time: 'Stop 5 · 11:15 AM–12:00 PM',
        activity: 'Off-Road Jeep Trail: Experience bumpy forest tracks, uneven terrain and adventurous 4×4 driving with a qualified local driver.'
      },
      {
        time: 'Stop 6 · 12:00–12:30 PM',
        activity: 'Tiger Cave: Explore the rocky cave formation and surrounding natural terrain. Follow the guide and avoid entering unsafe sections.'
      },
      {
        time: 'Stop 7 · 12:30–01:00 PM',
        activity: 'Top Viewpoint: Capture panoramic mountain views and relax at a scenic viewpoint.'
      },
      {
        time: 'Stop 8 · 01:00–01:30 PM',
        activity: 'Hanging Bridge: Visit a local hanging bridge, enjoy the river scenery and take photographs where access is permitted.'
      },
      {
        time: 'Stop 9 · 01:30–02:00 PM',
        activity: 'Forest Waterfalls: Discover another waterfall or stream along the approved route. Allow time for a rest and lunch according to the operator\'s schedule.'
      },
      {
        time: 'Stop 10 · Afternoon',
        activity: 'Forest Off-Road: Continue through permitted forest side tracks and enjoy the surrounding greenery and natural landscapes.'
      },
      {
        time: 'Stop 11 · When Permitted',
        activity: 'River Crossing: Cross gentle forest riverbeds with 4×4 capability when water levels and permissions allow.'
      },
      {
        time: 'Stop 12 · Late Afternoon',
        activity: 'Anakulam: Famous spot where wild elephant herds come down to drink natural bubbly mineral water. Return to original pickup point.'
      }
    ],
    routeOptions: [
      {
        id: 'full-day',
        name: 'Full Day Off-Road Safari',
        duration: 'Approx. 8–10 hours',
        badge: 'COMPLETE ROUTE · 12 STOPS',
        subtitle: 'Complete 12-Stop Route Through Forests, Waterfalls & Anakulam',
        description: 'The following route follows the 12 stops shown in your reference image and the published Munnar off road programme.',
        columnType: 'time',
        itinerary: [
          {
            time: '09:00–09:30 AM',
            activity: 'Stop 1 — Shooting Point: Start with beautiful views of tea covered hills and valleys. Take photographs and enjoy the cool mountain air (20–30 minutes).'
          },
          {
            time: '09:30–10:00 AM',
            activity: 'Stop 2 — Idly Hills: Explore rounded hill formations and scenic landscapes, with photo opportunities overlooking the surrounding plantations.'
          },
          {
            time: '10:00–10:30 AM',
            activity: 'Stop 3 — Tea Valley View: Enjoy wide views of green tea estates, forest covered mountains and winding countryside roads.'
          },
          {
            time: '10:30–11:15 AM',
            activity: 'Stop 4 — Viriparai Waterfalls: Visit the forest waterfall, enjoy the natural surroundings and take photographs. Swimming is only appropriate where officially permitted and safe.'
          },
          {
            time: '11:15 AM–12:00 PM',
            activity: 'Stop 5 — Off-Road Jeep Trail: Experience bumpy forest tracks, uneven terrain and adventurous 4×4 driving with a qualified local driver.'
          },
          {
            time: '12:00–12:30 PM',
            activity: 'Stop 6 — Tiger Cave: Explore the rocky cave formation and surrounding natural terrain. Follow the guide and avoid entering unsafe sections.'
          },
          {
            time: '12:30–01:00 PM',
            activity: 'Stop 7 — Top Viewpoint: Capture panoramic mountain views and relax at a scenic viewpoint.'
          },
          {
            time: '01:00–01:30 PM',
            activity: 'Stop 8 — Hanging Bridge: Visit a local hanging bridge, enjoy the river scenery and take photographs where access is permitted.'
          },
          {
            time: '01:30–02:00 PM',
            activity: 'Stop 9 — Forest Waterfalls: Discover another waterfall or stream along the approved route. Allow time for a rest and lunch according to the operator\'s schedule.'
          },
          {
            time: 'Afternoon',
            activity: 'Stop 10 — Forest Off-Road: Continue through permitted forest side tracks and enjoy the surrounding greenery and natural landscapes.'
          },
          {
            time: 'When Permitted',
            activity: 'Stop 11 — River Crossing: Cross gentle forest riverbeds with 4×4 capability when water levels and permissions allow.'
          },
          {
            time: 'Late Afternoon',
            activity: 'Stop 12 — Anakulam: Famous spot where wild elephant herds come down to drink natural bubbly mineral water. Return to original pickup point.'
          }
        ],
        note: 'Routes, timings, waterfall access and river crossings are subject to weather, safety conditions and local permissions. Wildlife sightings are not guaranteed.'
      },
      {
        id: 'half-day',
        name: 'Half Day Off-Road Safari',
        duration: 'Approx. 3–5 hours',
        badge: 'SHORTER ADVENTURE · 7 STOPS',
        subtitle: 'Tea Plantations, Scenic Viewpoints, Waterfalls & Off-Road Trail',
        description: 'A shorter jeep adventure featuring tea plantations, scenic viewpoints, waterfalls and a selected off road trail. Suggested departure: 8:00 AM or 1:00 PM, subject to operator availability.',
        columnType: 'sequence',
        itinerary: [
          {
            time: '1',
            activity: 'Start at the designated Munnar pickup point.'
          },
          {
            time: '2',
            activity: 'Shooting Point and tea plantation views.'
          },
          {
            time: '3',
            activity: 'Idly Hills / Tea Valley viewpoint.'
          },
          {
            time: '4',
            activity: 'Viriparai Waterfalls, if accessible.'
          },
          {
            time: '5',
            activity: 'Selected off-road trail.'
          },
          {
            time: '6',
            activity: 'Viewpoint or spice garden visit, if included.'
          },
          {
            time: '7',
            activity: 'Return to the original pickup point.'
          }
        ],
        note: 'The half day route should use only the stops your operator can cover within the booked duration. Don\'t advertise all 12 full day stops as included in a half day trip.'
      }
    ],
    comparisonTable: {
      title: '3. Package details for your website',
      subtitle: 'Comparison between Full Day and Half Day Off-Road Jeep Safari options',
      columns: ['Detail', 'Full Day', 'Half Day'],
      rows: [
        {
          feature: 'Duration',
          fullDay: 'Approximately 8–10 hours or operator-confirmed duration',
          halfDay: 'Approximately 3–5 hours'
        },
        {
          feature: 'Transport',
          fullDay: '4×4 Jeep',
          halfDay: '4×4 Jeep'
        },
        {
          feature: 'Main highlights',
          fullDay: 'Viewpoints, waterfalls, forest trails, Anakulam',
          halfDay: 'Tea valley, viewpoints, selected waterfall and off-road stops'
        },
        {
          feature: 'Guide',
          fullDay: 'Local driver-guide, confirm at booking',
          halfDay: 'Local driver-guide, confirm at booking'
        },
        {
          feature: 'Meals',
          fullDay: 'Confirm with operator',
          halfDay: 'Usually confirm separately'
        },
        {
          feature: 'Package Rate',
          fullDay: 'Contact us to confirm package rate & availability',
          halfDay: 'Contact us to confirm package rate & availability'
        }
      ]
    },
    inclusions: [
      'Jeep transportation along the agreed route',
      'Local driver guide, if included in the booking',
      'Stops at the listed, accessible sightseeing locations',
      'Photography breaks at permitted viewpoints'
    ],
    exclusions: [
      'Lunch, snacks and beverages',
      'Entry tickets or plantation charges',
      'Personal expenses',
      'Additional pickup and drop charges',
      'Activities outside the booked route'
    ],
    whatToBring: [
      'Wear comfortable clothing and footwear',
      'Carry drinking water',
      'Sunscreen and sunglasses',
      'Rain jacket or poncho',
      'Camera or smartphone for photography'
    ],
    safetyInfo: [
      'Follow your driver\'s instructions on rough tracks and near waterfalls',
      'Never approach wild elephants or enter restricted forest areas',
      'Swimming is only appropriate where officially permitted and safe',
      '*Routes, timings, waterfall access and river crossings are subject to weather, safety conditions and local permissions. Wildlife sightings are not guaranteed.'
    ],
    meetingPoint: 'Designated pickup point in Munnar town (e.g., KSRTC stand, hotel lobby). Return to the original pickup point at the end of the safari.',
    bestTimeToVisit: 'September to May for clear mountain vistas and active elephant sightings at Anakulam. Monsoons (June–August) provide cascading waterfalls, though some river crossings may be restricted.',
    faqs: [
      {
        q: 'What is the difference between Full Day and Half Day Safari?',
        a: 'Full Day is an 8–10 hour comprehensive adventure covering all 12 stops including Tiger Cave, Hanging Bridge, Forest waterfalls, river crossing and Anakulam. Half Day is a 3–5 hour shorter adventure focusing on Shooting Point, Idly Hills, Tea Valley view, selected waterfalls and forest tracks.'
      },
      {
        q: 'What are the departure times?',
        a: 'Full Day departs around 8:30 AM – 9:00 AM from Munnar. Half Day offers morning (approx. 8:00 AM) or afternoon (approx. 1:00 PM) departures, subject to operator availability.'
      },
      {
        q: 'Are elephant sightings guaranteed at Anakulam?',
        a: 'Wildlife sightings are not guaranteed, but Anakulam is widely known as a natural river spot where wild elephant herds regularly gather to drink mineral-rich bubbling water, especially in late afternoon.'
      },
      {
        q: 'What should we wear and bring?',
        a: 'Wear comfortable clothing and footwear. Carry drinking water, sunscreen, a rain jacket, and your camera. Follow your driver\'s instructions at all times.'
      }
    ]
  },


  // 10. Night Safari Adventure
  {
    id: 'night-safari',
    slug: 'night-safari',
    aliases: [
      'night-safari-adventure',
      'munnar-night-safari',
      'night-jeep-safari',
      'night-safari-tour'
    ],
    title: 'Night Safari Adventure',
    subtitle: 'Nocturnal Wildlife Tracking & Starry Mountain Ridge 4×4 Expedition',
    category: 'JEEP SAFARIS',
    categorySlug: 'jeep-safaris',
    price: '',
    duration: '3 Hours (07:00 PM – 10:00 PM)',
    difficulty: 'Easy',
    isPopular: true,
    badge: 'NIGHT ADVENTURE',
    imageUrl: '/images/safari_night.jpg',
    galleryImages: [
      '/images/safari_night.jpg',
      '/images/anakulam_jeep_safari_landscape.jpg',
      '/images/kannan_devan_safari_landscape.jpg',
      '/images/safari_wildlife.jpg'
    ],
    shortDescription: 'Experience the thrill of the jungle at night. Spot nocturnal wildlife, enjoy the crisp mountain night air, and witness Munnar illuminated under the stars in open-top 4×4 jeeps.',
    overview: 'Experience the thrilling mystery of Munnar after dark on our 3-hour open-top 4×4 Night Safari Adventure. As dusk settles over the Western Ghats, the nocturnal wilderness comes alive. Led by expert local driver-guides equipped with high-powered wildlife spotters, venture through quiet tea plantation roads, forest margins, and rugged mountain tracks to observe nocturnal wildlife in their natural habitat while enjoying the sparkling views of Munnar town from high clifftops under starry skies.',
    highlights: [
      '3-Hour open-top 4×4 jeep off-road night safari through mountain trails',
      'Spot nocturnal wildlife such as Indian gaur, wild elephants, civets, and flying squirrels',
      'High-powered searchlights operated by experienced local trackers',
      'Stunning night viewpoints of Munnar town lit up in the misty valley below',
      'Fresh, crisp mountain night air and stargazing under pollution-free skies',
      'Hot cardamom tea served at a scenic mountain viewpoint',
      'Completely safe, family-friendly adventure with certified local drivers'
    ],
    summaryInfo: {
      duration: '3 Hours · 07:00 PM to 10:00 PM',
      distance: '25–35 km forest & plantation night circuit',
      difficulty: 'Easy · Suitable for families, couples and all ages',
      minGroup: '2 Jeep (up to 6 guests)',
      guide: 'Certified Local 4×4 Driver-Guide & Spotter',
      pickupLocation: 'Hotel Pickup across Munnar Town or designated central meeting point'
    },
    itinerary: [
      {
        time: '07:00 PM',
        activity: 'Hotel pickup in Munnar town or meet at central meeting point. Briefing on night safari guidelines and route.'
      },
      {
        time: '07:20 PM',
        activity: 'Board the open-top 4×4 jeep and enter winding mountain trails and tea plantation fringes.'
      },
      {
        time: '08:00 PM',
        activity: 'Night wildlife tracking: Searchlight scanning along forest margins to spot wild elephants, Indian gaur, sambar deer, and nocturnal birds.'
      },
      {
        time: '08:45 PM',
        activity: 'Climb towards high mountain viewpoints overlooking the illuminated valley of Munnar; stop for photographs.'
      },
      {
        time: '09:15 PM',
        activity: 'Enjoy hot Munnar cardamom tea amidst cool mountain breezes and starry night skies.'
      },
      {
        time: '09:40 PM',
        activity: 'Begin scenic return drive through peaceful night trails.'
      },
      {
        time: '10:00 PM',
        activity: 'Arrive back at your hotel or drop-off point in Munnar town.'
      }
    ],
    inclusions: [
      'Full 3-hour 4×4 open-top jeep safari',
      'Certified local driver-guide & wildlife spotter',
      'High-powered wildlife searchlights',
      'Hot cardamom tea or coffee at high-altitude viewpoint',
      'Hotel pickup and drop-off within Munnar town limits'
    ],
    exclusions: [
      'Personal expenses, snacks, or soft drinks',
      'Forest department permits (if special sanctuary zones accessed)',
      'Gratuities / tips for driver & guide (optional)'
    ],
    whatToBring: [
      'Warm jacket, fleece or windcheater (temperatures drop significantly at night)',
      'Camera or smartphone with low-light/night photography mode',
      'Comfortable closed walking shoes',
      'Valid photo ID card (Aadhaar / Passport / Driving License)'
    ],
    safetyInfo: [
      'Keep arms and hands inside the vehicle at all times while moving',
      'Please remain quiet when approaching wildlife to avoid startling animals',
      'Do not use camera flash directly in the eyes of animals',
      'Follow all instructions from your driver-guide at all times'
    ],
    meetingPoint: 'Munnar Town Center or complimentary hotel pickup within Munnar area',
    bestTimeToVisit: 'Year-round, with October to May offering the clearest starry skies and cool breezes.',
    faqs: [
      {
        q: 'Is the Night Safari Adventure safe for children and families?',
        a: 'Yes, absolutely. The entire tour takes place inside a sturdy, professionally maintained 4×4 jeep with veteran local mountain drivers.'
      },
      {
        q: 'What animals are commonly spotted on the Night Safari?',
        a: 'Common sightings include Indian gaur (wild bison), wild elephants, barking deer, sambar deer, civet cats, nightjars, owls, and flying squirrels.'
      },
      {
        q: 'Will it be very cold during the safari?',
        a: 'Munnar night temperatures can drop to 10°C–16°C, and the open-top jeep brings crisp mountain breezes. We strongly advise bringing warm jackets or sweaters.'
      },
      {
        q: 'Where does the pickup happen?',
        a: 'We provide complimentary pickup and drop-off directly from your hotel or resort located within Munnar town and surrounding areas.'
      }
    ]
  },

  // 10. Letcmi Hills Trek
  {
    id: 'letchmi-trek',
    slug: 'letchmi-trek',
    aliases: ['letcmi-hills-trek', 'letchmi-hills-trek', 'letcmi-trek', 'lakshmi-hills-trek', 'letchmi-hills', 'letchmi'],
    title: 'Letcmi Hills Trek',
    subtitle: 'Scenic Half-Day Mountain Ridge Hike Through Grassy Slopes & Tea Valleys',
    category: 'TREKKING ADVENTURE',
    categorySlug: 'trekking-adventure',
    price: '',
    duration: 'Half Day (Approx. 8:00 AM – 12:00 PM)',
    difficulty: 'Moderate',
    isPopular: false,
    badge: 'POPULAR RIDGE',
    imageUrl: '/images/letchmi_trek.jpg',
    galleryImages: [
      '/images/letchmi_trek.jpg',
      '/images/packages/half_day_trekking_hq.jpg',
      '/images/chokramudi.png',
      '/images/slide1.jpg'
    ],
    shortDescription: 'Experience an unforgettable adventure with our certified guides on this Letcmi Hills Trek. Witness scenic grassy mountain slopes, designated ridge trails, and panoramic Munnar hill views.',
    overview: 'The Letcmi Hills Trek (also known as Lakshmi Hills) is one of Munnar’s most celebrated half-day ridge hikes. Beginning at the designated Lakshmi Hills meeting point, the trail ascends through lush tea gardens onto windswept grassland ridges reaching nearly 1,950 meters. Hikers enjoy sweeping 360-degree panoramas of the surrounding tea estates, native shola valleys, and distant mountain peaks with our certified local guides.',
    highlights: [
      'Hike through rolling grasslands and picturesque mountain slopes',
      'Spectacular 360° panoramic views overlooking Munnar tea valleys',
      'Certified local mountain guide leading permitted scenic trails',
      'Rest and photography break atop designated ridge viewpoints',
      'Comfortable half-day schedule returning by midday'
    ],
    summaryInfo: {
      duration: 'Half Day · Approx. 8:00 AM – 12:00 PM (4 Hours)',
      distance: 'Approx. 7–9 km mountain trail',
      difficulty: 'Moderate · Grassy mountain slopes & ridge tracks',
      minGroup: '1–2 persons (Private or small group departures)',
      guide: 'Certified Local Trekking Guide',
      pickupLocation: 'Designated Lakshmi Hills trekking meeting point'
    },
    itinerary: [
      { time: '08:00 AM', activity: 'Meet your local trekking guide' },
      { time: '08:15 AM', activity: 'Travel to the permitted trail starting point' },
      { time: '08:30 AM', activity: 'Start trekking through grassy mountain slopes' },
      { time: '09:15 AM', activity: 'Explore scenic hill trails and viewpoints' },
      { time: '10:00 AM', activity: 'Photography and short rest break' },
      { time: '10:30 AM', activity: 'Continue along the designated ridge trail' },
      { time: '11:15 AM', activity: 'Begin the return hike' },
      { time: '12:00 PM', activity: 'Finish trekking and return to the starting point' }
    ],
    inclusions: [
      'Certified local mountain trekking guide',
      'Access transit to permitted trail starting point',
      'Safety briefing and guided trail supervision',
      'Drinking water refills and light energy snacks'
    ],
    exclusions: [
      'Lunch and heavy meals',
      'Hotel pickup and drop (available upon request)',
      'Personal trekking gear and tips'
    ],
    whatToBring: [
      'Comfortable trekking shoes with good grip',
      'Light backpack with water bottle',
      'Sun cap, sunglasses, and sunscreen',
      'Light jacket or windcheater',
      'Camera or smartphone for ridge photos'
    ],
    safetyInfo: [
      'Stay on the designated ridge trail with your guide',
      'Initial grassy incline requires standard walking fitness',
      'Avoid walking close to steep grassy edges during windy conditions',
      'Trek routes and schedules are subject to weather and local forest guidelines'
    ],
    meetingPoint: 'Start: Designated Lakshmi Hills trekking meeting point. End: Return to the original meeting point.',
    bestTimeToVisit: 'September to May for crisp mornings, green slopes, and clear panoramic views.',
    faqs: [
      {
        q: 'Where do we meet for the Letcmi Hills Trek?',
        a: 'The trek begins at the designated Lakshmi Hills trekking meeting point. Exact GPS location and driving instructions are shared immediately upon booking.'
      },
      {
        q: 'Is the trek suitable for beginners?',
        a: 'Yes, it is a moderate half-day hike suitable for anyone with basic walking fitness. The pace is steady with ample rest and photography breaks.'
      },
      {
        q: 'What time does the trek finish?',
        a: 'The trek finishes around 12:00 PM, returning to the original meeting point in time for lunch.'
      }
    ]
  },

  // 11. Anaimudi View Trek
  {
    id: 'anaimudi-view',
    slug: 'anaimudi-view',
    aliases: [
      'anaimudi-view-trek',
      'anamudi-view',
      'anamudi-view-trek',
      'anaimudi-trek',
      'anamudi-trek'
    ],
    title: 'Anaimudi View Trek',
    subtitle: 'Half-Day Mountain Trail with Views of South India\'s Highest Peak',
    category: 'TREKKING ADVENTURE',
    categorySlug: 'trekking-adventure',
    price: '',
    duration: 'Half Day (Approx. 7:30 AM – 12:00 PM)',
    difficulty: 'Moderate',
    isPopular: false,
    badge: 'PANORAMIC VIEWS',
    imageUrl: '/images/anaimudi_view.jpg',
    galleryImages: [
      '/images/anaimudi_view.jpg',
      '/images/packages/full_day_trekking_hq.jpg',
      '/images/meesapulimala.png',
      '/images/chokramudi.png'
    ],
    shortDescription: 'Experience an unforgettable adventure with our certified guides on this Anaimudi View Trek. Witness scenic grasslands, mountain landscapes, and breathtaking vantage points facing South India\'s highest peak.',
    overview: 'The Anaimudi View Trek takes you along permitted mountain pathways to vantage points facing the majestic Anamudi peak — the highest summit in South India and the Western Ghats (2,695m). Moving through cool high-altitude grasslands and scenic hillside corridors, this half-day trek provides photography stops, fresh mountain air, and rich montane flora under the guidance of our certified local trek leaders.',
    highlights: [
      'Vantage views of Anamudi (2,695m) — South India\'s highest mountain peak',
      'Traverse permitted high-altitude grasslands and mountain trails',
      'Guided photography and sightseeing stops overlooking deep shola valleys',
      'Early morning start (7:30 AM) capturing soft dawn mountain mist',
      'Certified local mountain guide ensuring safety and eco-friendly trekking'
    ],
    summaryInfo: {
      duration: 'Half Day · Approx. 7:30 AM – 12:00 PM (4.5 Hours)',
      distance: 'Approx. 8–10 km round trip',
      difficulty: 'Moderate · Grassy slopes and mountain tracks',
      minGroup: '1–2 persons (Private or small group departures)',
      guide: 'Certified Local Mountain Trekker',
      pickupLocation: 'Designated trekking meeting point near Anamudi viewpoint trail'
    },
    itinerary: [
      { time: '07:30 AM', activity: 'Arrive at the designated meeting point' },
      { time: '07:45 AM', activity: 'Guide briefing and trail preparation' },
      { time: '08:00 AM', activity: 'Start walking along the permitted mountain trail' },
      { time: '08:45 AM', activity: 'Explore scenic grasslands and mountain landscapes' },
      { time: '09:30 AM', activity: 'Reach the designated Anamudi viewing area, if accessible' },
      { time: '10:00 AM', activity: 'Photography and sightseeing break' },
      { time: '10:30 AM', activity: 'Begin the return walk' },
      { time: '11:30 AM–12:00 PM', activity: 'Finish the trek and return to the meeting point' }
    ],
    inclusions: [
      'Certified local mountain guide',
      'Trail briefing and route navigation',
      'Stops at approved viewpoints and grasslands',
      'Drinking water refills and light energy snacks'
    ],
    exclusions: [
      'Lunch and heavy meals',
      'National park core zone entry (Anamudi peak summit is restricted; trek follows permitted view ridges)',
      'Hotel transfer (available on request)'
    ],
    whatToBring: [
      'Sturdy trekking or running shoes',
      'Water bottle (at least 1 liter)',
      'Sun protection: cap, sunscreen, and sunglasses',
      'Light jacket for the cool morning breeze',
      'Camera with telephoto lens or smartphone'
    ],
    safetyInfo: [
      'Anamudi peak core area is an ecologically protected sanctuary; our trek strictly follows approved external vantage trails',
      'Follow guide instructions along ridge pathways and stay on marked trails',
      'Do not litter or leave plastic behind in sensitive mountain ecosystems',
      'Trail access is subject to forest department weather and safety permissions'
    ],
    meetingPoint: 'Start: Designated trekking meeting point near the approved Anamudi viewpoint trail. End: Return to the original meeting point.',
    bestTimeToVisit: 'September to May for clear weather, visible peak horizons, and pleasant temperatures.',
    faqs: [
      {
        q: 'Can we summit Anamudi peak?',
        a: 'The direct summit of Anamudi peak (2,695m) inside Eravikulam National Park is strictly restricted by the Kerala Forest Department to protect endangered Nilgiri Tahr habitat. This trek follows permitted high-altitude trails that offer the closest and most spectacular vantage views of the mountain.'
      },
      {
        q: 'What time does the trek start?',
        a: 'The trek begins at 7:30 AM to take advantage of the cool morning weather and clear skies before midday clouds gather.'
      },
      {
        q: 'Where is the meeting point?',
        a: 'The meeting point is near the approved Anamudi viewpoint trail head. Precise GPS location and arrival details are shared upon booking.'
      },
      {
        q: 'Is this trek suitable for children?',
        a: 'Children aged 8 and above with reasonable stamina can comfortably enjoy this trek accompanied by adults.'
      }
    ]
  },

  // 10. Kolukkumalai Sunrise Point
  {
    id: 'kolukkumalai-sunrise-point',
    slug: 'kolukkumalai-sunrise-point',
    aliases: [
      'kolukkumalai-sunrise-view',
      'kolukkumalai-point',
      'sunrise-point-kolukkumalai'
    ],
    title: 'Kolukkumalai Sunrise Point',
    subtitle: 'Spectacular Sunrise Over the Mist-Covered Western Ghats & Tea Estates',
    category: 'SUNRISE POINTS',
    categorySlug: 'sunrise-points',
    price: '',
    duration: '3–5 Hours',
    difficulty: 'Easy-Mod',
    isPopular: false,
    badge: 'SUNRISE POINTS',
    imageUrl: '/images/kolukkumalai_sunrise_view.jpg',
    galleryImages: [
      '/images/kolukkumalai_sunrise_view.jpg',
      '/images/kolukkumalai.png',
      '/images/slide4.jpg',
      '/images/safari_kolukkumalai.jpg'
    ],
    startingPoint: 'Suryanelli Jeep Safari Pickup Point',
    endingPoint: 'Return to Suryanelli Pickup Point',
    transport: '4×4 Jeep',
    mainHighlights: 'Off road ride, tea plantations, sunrise viewpoint and mountain scenery.',
    durationDetails: '3–5 Hours',
    itineraryTitle: 'Complete itinerary',
    shortDescription: 'Experience a spectacular sunrise over the mist-covered Western Ghats on an adventurous 4×4 jeep safari to Kolukkumalai. Travel through rugged mountain tracks, explore scenic tea plantation landscapes and capture unforgettable sunrise photographs.',
    overview: 'Experience a spectacular sunrise over the mist-covered Western Ghats on an adventurous 4×4 jeep safari to Kolukkumalai. Travel through rugged mountain tracks, explore scenic tea plantation landscapes and capture unforgettable sunrise photographs.',
    highlights: [
      'Sunrise viewpoint, off-road jeep ride, tea estates and panoramic mountain views.',
      'Off road ride, tea plantations, sunrise viewpoint and mountain scenery.',
      'Spectacular sunrise above a moving cloud bed at over 2,160 meters',
      'Travel through rugged mountain tracks and tea estates on a 4×4 Jeep',
      'Capture unforgettable sunrise photographs over the Western Ghats'
    ],
    summaryInfo: {
      duration: '3–5 Hours',
      distance: 'Approx. 15 km 4×4 mountain track',
      difficulty: 'Easy to Moderate',
      minGroup: '2 Jeep (up to 6 guests)',
      guide: 'Experienced Local 4×4 Jeep Driver & Guide',
      pickupLocation: 'Suryanelli Jeep Safari Pickup Point'
    },
    itinerary: [
      {
        time: '4:00 AM',
        activity: 'Arrive at Suryanelli pickup point'
      },
      {
        time: '4:15 AM',
        activity: 'Meet the driver and start the jeep safari'
      },
      {
        time: '4:45 AM',
        activity: 'Travel through rugged mountain roads and tea estates'
      },
      {
        time: '5:30 AM',
        activity: 'Reach the designated sunrise viewpoint area'
      },
      {
        time: '5:45 AM',
        activity: 'Enjoy sunrise views and take photographs'
      },
      {
        time: '6:15 AM',
        activity: 'Explore permitted viewpoints and tea plantation scenery'
      },
      {
        time: '7:00 AM',
        activity: 'Begin the return jeep journey'
      },
      {
        time: '8:00–9:00 AM',
        activity: 'Return to Suryanelli and finish the tour'
      }
    ],
    note: 'Timings vary with sunrise time, road conditions, weather and local access rules.',
    inclusions: [
      '4×4 Jeep safari transport from Suryanelli pickup point',
      'Experienced local mountain driver and safari guide',
      'Permitted viewpoint entry access',
      'Photography breaks at designated scenic viewpoints'
    ],
    exclusions: [
      'Hotel transfers to Suryanelli pickup point (available upon prior request)',
      'Personal breakfast and snacks',
      'Personal expenses and tips'
    ],
    whatToBring: [
      'Warm clothing, fleece jacket or shawl (mornings at 2,100m are cold)',
      'Comfortable shoes with good grip',
      'Drinking water bottle',
      'Camera or smartphone for sunrise photography'
    ],
    safetyInfo: [
      'Departure time and viewpoint access depend on weather and local operating conditions.',
      '4×4 ride involves bumpy off-road tracks; hold onto safety handles securely.',
      'Stay within permitted viewing zones and away from cliff edges.'
    ],
    meetingPoint: 'Start: Suryanelli Jeep Safari Pickup Point. End: Return to Suryanelli Pickup Point.',
    bestTimeToVisit: 'September to May for crisp skies, sea of clouds, and golden sunrises.',
    faqs: [
      {
        q: 'What time should we reach Suryanelli pickup point?',
        a: 'Please arrive at the Suryanelli Jeep Safari pickup point by 4:00 AM to ensure departure by 4:15 AM before dawn.'
      },
      {
        q: 'Can private vehicles drive up to Kolukkumalai?',
        a: 'No, the mountain road to Kolukkumalai is strictly an off-road terrain accessible only by authorized 4×4 Jeeps.'
      },
      {
        q: 'Is sunrise guaranteed?',
        a: 'Departure time and viewpoint access depend on weather and local operating conditions. Cloud formations and sunrise visibility cannot be guaranteed, but even misty mornings provide an unforgettable mountain atmosphere.'
      }
    ]
  },

  // 11. Top Station Cloud Bed Sunrise
  {
    id: 'top-station-sunrise',
    slug: 'top-station-sunrise',
    aliases: [
      'top-station-sunrise-point',
      'top-station',
      'top-station-cloud-bed-sunrise'
    ],
    title: 'Top Station Cloud Bed Sunrise',
    subtitle: 'Early Morning Cloud Bed & Mountain Horizon Over the Western Ghats',
    category: 'SUNRISE POINTS',
    categorySlug: 'sunrise-points',
    price: '',
    duration: '4 Hours',
    difficulty: 'Easy',
    isPopular: false,
    badge: 'SUNRISE POINTS',
    imageUrl: '/images/top_station_sunrise.jpg',
    galleryImages: [
      '/images/top_station_sunrise.jpg',
      '/images/kolukkumalai_sunrise_view.jpg',
      '/images/slide5.jpg'
    ],
    startingPoint: 'Designated Munnar / Top Station tour pickup point.',
    endingPoint: 'Return to the original pickup point.',
    mainHighlights: 'Sunrise, cloud covered valleys, mountain viewpoints and photography.',
    durationDetails: 'Approximately 4 Hours',
    itineraryTitle: 'Complete itinerary',
    shortDescription: 'Discover the breathtaking beauty of Top Station during the early morning hours. Watch the first rays of sunlight illuminate the mountain peaks while clouds drift across the valleys of the Western Ghats.',
    overview: 'Discover the breathtaking beauty of Top Station during the early morning hours. Watch the first rays of sunlight illuminate the mountain peaks while clouds drift across the valleys of the Western Ghats.',
    highlights: [
      'Sunrise views, misty valleys, mountain scenery and photography stops.',
      'Sunrise, cloud covered valleys, mountain viewpoints and photography.',
      'Watch the first rays of sunlight illuminate the mountain peaks',
      'Walk to the designated viewing location at 2,200 meters',
      'Breathtaking view of clouds drifting across the valleys of the Western Ghats'
    ],
    summaryInfo: {
      duration: 'Approximately 4 Hours',
      distance: 'Approx. 35 km scenic drive + 1 km walk',
      difficulty: 'Easy',
      minGroup: '1–2 persons',
      guide: 'Local Chauffeur & Viewpoint Guide',
      pickupLocation: 'Confirmed Munnar or Top Station tour pickup point'
    },
    itinerary: [
      {
        time: '4:00 AM',
        activity: 'Pickup from the confirmed meeting point'
      },
      {
        time: '4:15 AM',
        activity: 'Begin the journey towards Top Station'
      },
      {
        time: '5:00 AM',
        activity: 'Arrive at the permitted viewpoint area'
      },
      {
        time: '5:15 AM',
        activity: 'Walk to the designated viewing location'
      },
      {
        time: 'Sunrise',
        activity: 'Enjoy the sunrise and cloud-covered mountain scenery'
      },
      {
        time: '6:30 AM',
        activity: 'Photography and sightseeing'
      },
      {
        time: '7:00 AM',
        activity: 'Begin the return journey'
      },
      {
        time: '8:00 AM',
        activity: 'Return to the starting point and finish the tour'
      }
    ],
    note: 'Actual travel time depends on the pickup location. Sunrise and cloud cover are weather dependent.',
    inclusions: [
      'Vehicle transportation to/from Top Station',
      'Permitted viewpoint entry access',
      'Sightseeing and sunrise photography stops',
      'Experienced local driver'
    ],
    exclusions: [
      'Personal breakfast and beverages at local stalls',
      'Camera fees if applicable',
      'Personal expenses and tips'
    ],
    whatToBring: [
      'Warm clothing, comfortable shoes, drinking water and a camera.',
      'Light jacket or windcheater for pre-dawn mountain breeze',
      'Sun protection for post-sunrise morning'
    ],
    safetyInfo: [
      'Pickup arrangements, road access and viewpoint timings must be confirmed before booking. Cloud formations and sunrise visibility cannot be guaranteed.',
      'Stay within fenced viewing areas on cliff edges.'
    ],
    meetingPoint: 'Start: Designated Munnar / Top Station tour pickup point. End: Return to the original pickup point.',
    bestTimeToVisit: 'September to May. Winter months (November to February) typically have the clearest and most dramatic cloud beds.',
    faqs: [
      {
        q: 'Is walking difficult at Top Station?',
        a: 'No, it is an easy paved walking path with mild steps leading to the viewpoint platform.'
      },
      {
        q: 'What is the best time to see the cloud bed?',
        a: 'Early morning hours between 5:30 AM and 7:00 AM offer the highest probability of viewing the cloud bed drifting across the valleys.'
      },
      {
        q: 'Where is the pickup point?',
        a: 'Pickup is arranged from your confirmed Munnar hotel or designated meeting point at 4:00 AM.'
      }
    ]
  },

  // 13. Factory Visit & Tasting
  {
    id: 'tea-factory',
    slug: 'tea-factory',
    aliases: [
      'factory-visit-and-tea-tasting',
      'factory-visit-tea-tasting',
      'factory-visit-tasting',
      'tea-factory-visit',
      'tea-tasting'
    ],
    title: 'Factory Visit & Tasting',
    subtitle: 'From Tea Leaf to Your Cup — Guided Factory Tour & Artisan Tea Tasting',
    category: 'TEA EXPERIENCES',
    categorySlug: 'tea-experiences',
    price: '',
    duration: '2 Hours',
    difficulty: 'Easy',
    isPopular: false,
    badge: 'HERITAGE EXPERIENCE',
    imageUrl: '/images/tea_factory_tasting.jpg',
    galleryImages: [
      '/images/tea_factory_tasting.jpg',
      '/images/packages/tea_experience_hq.jpg',
      '/images/packages/tea_and_hiking_combo_hq.jpg',
      '/images/tea_walk.png'
    ],
    shortDescription: 'Experience an unforgettable adventure with our certified guides on this Factory Visit & Tasting. Witness the complete tea making process from fresh leaf to finished cup.',
    overview: 'Step inside a historic Munnar tea manufacturing factory to witness firsthand the intricate journey of tea leaves from estate gardens to finished aromatic brews. Under the guidance of factory experts, you will see industrial withering troughs, rolling machines, fermentation chambers, and high-heat drying dryers. Complete your experience with an educational, palate-awakening tea tasting session of different tea grades and varieties.',
    highlights: [
      'Learn how tea leaves become finished tea.',
      'See tea-processing machinery and production stages.',
      'Discover the differences between tea varieties.',
      'Enjoy a guided tea tasting.',
      'Purchase local tea products, subject to availability.'
    ],
    summaryInfo: {
      duration: '2 Hours · Morning or afternoon departures',
      distance: 'Factory indoor walking tour',
      difficulty: 'Easy · Suitable for all age groups',
      minGroup: '1–2 persons',
      guide: 'Certified Factory Tea Expert & Guide',
      pickupLocation: 'Tea factory entrance or designated visitor reception in Munnar'
    },
    itinerary: [
      { time: '10:00 AM', activity: 'Arrive at the tea factory and complete visitor registration' },
      { time: '10:10 AM', activity: 'Meet the guide and receive an introduction to tea production' },
      { time: '10:20 AM', activity: 'Learn about fresh tea leaves and the withering process' },
      { time: '10:35 AM', activity: 'Observe rolling and leaf processing' },
      { time: '10:50 AM', activity: 'Learn about oxidation and drying' },
      { time: '11:10 AM', activity: 'Explore tea grading, sorting and packaging, where available' },
      { time: '11:25 AM', activity: 'Participate in a guided tea tasting session' },
      { time: '11:45 AM', activity: 'Visit the factory shop, if available' },
      { time: '12:00 PM', activity: 'Finish the experience and return to the starting point' }
    ],
    inclusions: [
      'Factory entrance pass and visitor permits',
      'Guided walkthrough by certified factory tea master',
      'Complete production machinery inspection',
      'Guided tea tasting session of green, orthodox, and CTC grades',
      'Factory outlet access for certified estate tea purchase'
    ],
    exclusions: [
      'Personal retail purchases at the factory shop',
      'Transportation to/from factory (available upon request)',
      'Meals'
    ],
    whatToBring: [
      'Comfortable flat walking shoes',
      'Camera (follow guide instructions regarding indoor photography rules)',
      'Light jacket as factory processing areas can be cool'
    ],
    safetyInfo: [
      'Keep safe distance from operating machinery and conveyors',
      'Children must be supervised by adults inside production floors',
      'Follow guide safety directions at all times'
    ],
    meetingPoint: 'Start: Tea factory entrance or designated visitor reception in Munnar. End: Return to the factory reception after the tea tasting session.',
    bestTimeToVisit: 'Year-round; morning visits between 10:00 AM and 12:00 PM are best to observe live processing.',
    faqs: [
      {
        q: 'Is photography permitted inside the factory?',
        a: 'Photography is permitted in visitor observation corridors and tasting galleries. Some proprietary machinery sections may have restrictions per factory regulations.'
      },
      {
        q: 'Can we buy factory-fresh tea directly?',
        a: 'Yes, the factory shop at the end of the tour offers fresh single-estate white tea, orthodox black tea, green tea, and Munnar spices.'
      },
      {
        q: 'Is the factory accessible for senior citizens?',
        a: 'Yes, walkways are paved with gentle steps and handrails throughout.'
      }
    ]
  },

  // 14. Plantation Picnic
  {
    id: 'plantation-picnic',
    slug: 'plantation-picnic',
    aliases: [
      'tea-plantation-picnic',
      'picnic-in-tea-plantation',
      'plantation-picnic-munnar',
      'tea-picnic'
    ],
    title: 'Plantation Picnic',
    subtitle: 'Scenic Outdoor Picnic Amongst Rolling Green Tea Slopes & Mountain Views',
    category: 'TEA EXPERIENCES',
    categorySlug: 'tea-experiences',
    price: '',
    duration: 'Half Day (Approx. 10:00 AM – 2:00 PM)',
    difficulty: 'Easy',
    isPopular: false,
    badge: 'RELAXING ESCAPE',
    imageUrl: '/images/plantation_picnic.jpg',
    galleryImages: [
      '/images/plantation_picnic.jpg',
      '/images/tea_walk.png',
      '/images/packages/tea_experience_hq.jpg',
      '/images/slide3.jpg'
    ],
    shortDescription: 'Experience an unforgettable adventure with our certified guides on this Plantation Picnic. Witness peaceful tea plantation surroundings, scenic mountain views, and an outdoor picnic.',
    overview: 'Unwind with a charming outdoor picnic set amongst the peaceful emerald slopes of Munnar’s private tea gardens. Enjoy scenic walks, panoramic mountain and lake views, fresh artisan tea, and delicious local refreshments on a checkered blanket in nature with family, friends, or couples.',
    highlights: [
      'Peaceful tea plantation surroundings.',
      'Scenic mountain and valley views.',
      'Outdoor picnic with tea and refreshments.',
      'Photography opportunities.',
      'Relaxing nature experience with family, friends or couples.'
    ],
    summaryInfo: {
      duration: 'Half Day · Approx. 10:00 AM – 2:00 PM (4 Hours)',
      distance: '1–2 km gentle garden stroll',
      difficulty: 'Easy · Suitable for families, couples, and seniors',
      minGroup: '2 persons',
      guide: 'Friendly Local Host & Naturalist',
      pickupLocation: 'Designated meeting point near an approved tea plantation'
    },
    itinerary: [
      { time: '10:00 AM', activity: 'Arrive at the meeting point and meet the host' },
      { time: '10:15 AM', activity: 'Walk to the designated picnic location' },
      { time: '10:30 AM', activity: 'Explore the tea garden and enjoy the mountain views' },
      { time: '11:00 AM', activity: 'Set up the picnic area in an approved location' },
      { time: '11:15 AM', activity: 'Enjoy tea, snacks and refreshments' },
      { time: '12:00 PM', activity: 'Relax, take photographs and enjoy the surroundings' },
      { time: '12:30 PM', activity: 'Enjoy the planned picnic meal' },
      { time: '1:15 PM', activity: 'Clean the picnic area and prepare to leave' },
      { time: '1:30 PM', activity: 'Walk back to the meeting point' },
      { time: '2:00 PM', activity: 'Finish the experience' }
    ],
    inclusions: [
      'Private tea plantation access permits',
      'Dedicated picnic host and setup (blanket, cushions, wicker basket)',
      'Freshly brewed Munnar cardamom tea & refreshing beverages',
      'Freshly prepared local snacks, fruits, and picnic meal',
      'Full eco-friendly clean-up and waste removal'
    ],
    exclusions: [
      'Hotel pickup and drop (available upon request)',
      'Alcoholic beverages'
    ],
    whatToBring: [
      'Comfortable casual outdoor clothing',
      'Sun hat, sunglasses, and sunscreen',
      'Camera or smartphone for portraits',
      'A light sweater or shawl'
    ],
    safetyInfo: [
      'Picnics are conducted strictly in approved, safe scenic plantation clearings',
      'Do not damage tea bushes or leave litter behind (leave-no-trace policy)',
      '*This is a suggested half-day schedule. Confirm the meal arrangement and picnic location with the operator.'
    ],
    meetingPoint: 'Start: Designated meeting point near an approved tea plantation. End: Return to the same meeting point after the picnic.',
    bestTimeToVisit: 'September to May for pleasant sunshine and blooming hillside flowers.',
    faqs: [
      {
        q: 'What food is included in the picnic meal?',
        a: 'We provide delicious freshly packed Kerala and continental picnic delicacies, seasonal Munnar fruits, bakery treats, homemade chocolates, and freshly brewed estate tea. Vegetarian and custom preferences can be accommodated upon advance notice.'
      },
      {
        q: 'Is this suitable for a romantic surprise or family outing?',
        a: 'Absolutely! Our hosts set up a secluded, scenic picnic spot with comfortable rugs, wicker baskets, and cushions overlooking mountain views.'
      },
      {
        q: 'What happens in case of unexpected rain?',
        a: 'We monitor mountain forecasts closely. In case of rain, picnics can be shifted to a covered open-air plantation gazebo or rescheduled without fee.'
      }
    ]
  }
];

// Helper functions
export function getAllTours(): TourItem[] {
  return TOURS_DATA;
}

export function getAllTourSlugs(): string[] {
  const slugs = new Set<string>();
  TOURS_DATA.forEach((t) => {
    slugs.add(t.slug);
    t.aliases?.forEach((a) => slugs.add(a));
  });
  return Array.from(slugs);
}

export function getTourBySlug(slug: string): TourItem | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();

  // 1. Direct slug match
  const exact = TOURS_DATA.find((t) => t.slug.toLowerCase() === clean);
  if (exact) return exact;

  // 2. Check aliases
  const aliasMatch = TOURS_DATA.find((t) =>
    t.aliases?.some((a) => a.toLowerCase() === clean)
  );
  if (aliasMatch) return aliasMatch;

  // 3. Normalized fuzzy match (removing hyphens/spaces)
  const normalizedClean = clean.replace(/[^a-z0-9]/g, '');
  const fuzzyMatch = TOURS_DATA.find((t) => {
    const normSlug = t.slug.replace(/[^a-z0-9]/g, '');
    if (normSlug === normalizedClean) return true;
    return t.aliases?.some((a) => a.replace(/[^a-z0-9]/g, '') === normalizedClean);
  });
  if (fuzzyMatch) return fuzzyMatch;

  // 4. Fallback search by title keywords
  const titleMatch = TOURS_DATA.find((t) => {
    const normTitle = t.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    return normTitle.includes(normalizedClean) || normalizedClean.includes(normTitle);
  });

  return titleMatch;
}

export function getRelatedTours(currentSlug: string, count = 3): TourItem[] {
  const current = getTourBySlug(currentSlug);
  if (!current) return TOURS_DATA.slice(0, count);

  const others = TOURS_DATA.filter((t) => t.slug !== current.slug && t.id !== current.id);
  const sameCategory = others.filter((t) => t.category === current.category);

  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }

  const remaining = others.filter((t) => t.category !== current.category);
  return [...sameCategory, ...remaining].slice(0, count);
}
