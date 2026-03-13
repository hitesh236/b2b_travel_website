import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Heart, 
  Share2, 
  Plane,
  Hotel,
  Car,
  Utensils,
  Camera,
  Check,
  Calendar,
  Users,
  Sparkles,
  Sun,
  Umbrella,
  Compass,
  Ticket,
  Wine,
  Music,
  Palmtree
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { packages } from '@/data/dummyData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

interface PackageDetailProps {
  packageId: string;
  onBack: () => void;
}

export default function PackageDetail({ packageId, onBack }: PackageDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [travelers, setTravelers] = useState(2);
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState('itinerary');

  const pkg = packages.find(p => p.id === packageId) || packages[0];

  const itinerary = [
    {
      day: 1,
      title: 'Arrival & Check-in',
      description: 'Arrive at your destination and check into your premium hotel. Enjoy a welcome dinner and relax after your journey.',
      activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner'],
      icon: Plane
    },
    {
      day: 2,
      title: 'City Exploration',
      description: 'Discover the city\'s highlights with a guided tour. Visit famous landmarks and experience local culture.',
      activities: ['Guided city tour', 'Landmark visits', 'Local cuisine tasting'],
      icon: Compass
    },
    {
      day: 3,
      title: 'Adventure Day',
      description: 'Experience thrilling activities and adventures. Perfect for creating unforgettable memories.',
      activities: ['Adventure activities', 'Scenic views', 'Photo opportunities'],
      icon: Camera
    },
    {
      day: 4,
      title: 'Relaxation & Leisure',
      description: 'Take a break and enjoy the hotel amenities. Spa treatment and leisure time by the pool.',
      activities: ['Spa treatment', 'Pool time', 'Shopping'],
      icon: Umbrella
    },
    {
      day: 5,
      title: 'Cultural Experience',
      description: 'Immerse yourself in local traditions. Visit cultural sites and enjoy authentic performances.',
      activities: ['Cultural show', 'Museum visit', 'Traditional dinner'],
      icon: Music
    },
  ];

  const inclusions = [
    { icon: Plane, label: 'Round-trip Flights', desc: 'Economy class airfare' },
    { icon: Hotel, label: 'Accommodation', desc: pkg.duration.includes('5') ? '4 nights stay' : '2 nights stay' },
    { icon: Car, label: 'Airport Transfers', desc: 'Private transfers included' },
    { icon: Utensils, label: 'Meals', desc: 'Daily breakfast included' },
    { icon: Camera, label: 'Sightseeing', desc: 'Guided tours included' },
    { icon: Ticket, label: 'Activities', desc: 'Entrance fees covered' },
  ];

  const highlights = [
    { icon: Sun, label: 'Best Weather', desc: 'Perfect time to visit' },
    { icon: Wine, label: 'Fine Dining', desc: 'Premium restaurants' },
    { icon: Palmtree, label: 'Scenic Beauty', desc: 'Breathtaking views' },
    { icon: Sparkles, label: 'AI Curated', desc: 'Personalized for you' },
  ];

  const totalPrice = pkg.price * travelers;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-travel-bg pt-20 pb-12"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="relative h-[500px] overflow-hidden">
        <motion.img 
          src={pkg.image} 
          alt={pkg.name}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors bg-black/30 backdrop-blur px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Packages</span>
            </motion.button>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full backdrop-blur transition-colors ${isLiked ? 'bg-red-500' : 'bg-black/30 hover:bg-black/50'}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur transition-colors"
              >
                <Share2 className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {pkg.badge && (
                <span className="inline-flex items-center gap-1 px-4 py-2 bg-travel-orange text-white rounded-full text-sm font-semibold mb-4">
                  <Sparkles className="w-4 h-4" />
                  {pkg.badge}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{pkg.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {pkg.destination}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {pkg.duration}
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  {pkg.rating} ({Math.floor(Math.random() * 500 + 100)} reviews)
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Highlights */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-card p-6">
              <h2 className="text-xl font-bold text-travel-text mb-6">Package Highlights</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ y: -5 }}
                    className="text-center p-4 bg-gray-50 rounded-2xl"
                  >
                    <div className="w-12 h-12 rounded-xl bg-travel-blue/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-travel-blue" />
                    </div>
                    <p className="font-semibold text-travel-text text-sm">{item.label}</p>
                    <p className="text-xs text-travel-text-secondary">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-card overflow-hidden">
              <div className="flex border-b border-gray-100">
                {['itinerary', 'inclusions', 'details'].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ y: -2 }}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 font-medium capitalize transition-colors relative ${
                      activeTab === tab ? 'text-travel-blue' : 'text-travel-text-secondary hover:text-travel-text'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="packageTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-travel-blue"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'itinerary' && (
                    <motion.div
                      key="itinerary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-travel-text mb-4">Day-by-Day Itinerary</h3>
                      <div className="space-y-4">
                        {itinerary.map((day, index) => (
                          <motion.div
                            key={day.day}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ scale: 1.01 }}
                            onClick={() => setActiveDay(day.day - 1)}
                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                              activeDay === day.day - 1
                                ? 'border-travel-blue bg-travel-blue/5'
                                : 'border-gray-100 hover:border-gray-200'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-travel-blue to-travel-green flex items-center justify-center flex-shrink-0">
                                <day.icon className="w-7 h-7 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-semibold text-travel-text">Day {day.day}: {day.title}</h4>
                                </div>
                                <p className="text-sm text-travel-text-secondary mb-3">{day.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {day.activities.map((activity, i) => (
                                    <span key={i} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-travel-text-secondary flex items-center gap-1">
                                      <Check className="w-3 h-3" />
                                      {activity}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'inclusions' && (
                    <motion.div
                      key="inclusions"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid sm:grid-cols-2 gap-4"
                    >
                      {inclusions.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * index }}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="w-12 h-12 rounded-xl bg-travel-blue/10 flex items-center justify-center">
                            <item.icon className="w-6 h-6 text-travel-blue" />
                          </div>
                          <div>
                            <p className="font-semibold text-travel-text">{item.label}</p>
                            <p className="text-sm text-travel-text-secondary">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="font-semibold text-travel-text mb-3">About This Package</h4>
                        <p className="text-travel-text-secondary leading-relaxed">
                          Experience the best of {pkg.destination} with our carefully curated {pkg.duration.toLowerCase()} package. 
                          This all-inclusive journey combines comfort, adventure, and cultural immersion for an unforgettable vacation. 
                          From premium accommodations to guided tours and authentic dining experiences, every detail has been 
                          thoughtfully planned to ensure a seamless travel experience.
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-xl">
                          <h5 className="font-semibold text-green-800 mb-2">What's Included</h5>
                          <ul className="space-y-2 text-sm text-green-700">
                            {pkg.includes.map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="w-4 h-4" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-xl">
                          <h5 className="font-semibold text-yellow-800 mb-2">Important Notes</h5>
                          <ul className="space-y-2 text-sm text-yellow-700">
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4" />
                              Valid passport required
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4" />
                              Travel insurance recommended
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4" />
                              Itinerary subject to change
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Card */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-card-hover p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-travel-text">Book This Package</h2>
                  <div className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Save 15%</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-center mb-6 p-6 bg-gradient-to-br from-travel-blue/5 to-travel-green/5 rounded-2xl">
                  <p className="text-sm text-travel-text-secondary mb-1">Starting from</p>
                  <p className="text-4xl font-bold text-travel-text">${pkg.price}</p>
                  <p className="text-sm text-travel-text-secondary">per person</p>
                </div>

                {/* Travelers */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-travel-text mb-2">Number of Travelers</label>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-xl"
                    >
                      -
                    </motion.button>
                    <div className="flex items-center gap-2">
                      <Users className="w-6 h-6 text-travel-text-secondary" />
                      <span className="text-2xl font-semibold">{travelers}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-xl"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-travel-text mb-2">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="date" 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-travel-blue focus:ring-2 focus:ring-travel-blue/20 outline-none"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between text-travel-text-secondary">
                    <span>Package Price</span>
                    <span>${pkg.price} x {travelers}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Package Discount
                    </span>
                    <span>-${Math.floor(pkg.price * 0.15 * travelers)}</span>
                  </div>
                  <div className="flex justify-between text-travel-text-secondary">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-travel-text">Total</span>
                  <motion.span 
                    key={totalPrice}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-travel-text"
                  >
                    ${Math.floor(totalPrice * 0.85)}
                  </motion.span>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full gradient-blue text-white py-6 rounded-xl font-semibold text-lg hover:shadow-glow transition-all flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Book This Package
                  </Button>
                </motion.div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-travel-text-secondary">
                    Free cancellation within 48 hours
                  </p>
                </div>
              </motion.div>

              {/* Contact Card */}
              <motion.div 
                variants={itemVariants}
                className="mt-6 bg-white rounded-3xl shadow-card p-6"
              >
                <h3 className="font-semibold text-travel-text mb-4">Need Help?</h3>
                <p className="text-sm text-travel-text-secondary mb-4">
                  Our travel experts are available 24/7 to assist you with your booking.
                </p>
                <Button variant="outline" className="w-full rounded-xl">
                  Contact Support
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
