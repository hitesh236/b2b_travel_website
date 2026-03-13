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
import PaymentGateway from '../components/PaymentGateway';

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
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

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
    <>
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-travel-bg pt-20 pb-12"
    >
      {/* Hero Section - More compact */}
      <motion.div variants={itemVariants} className="relative h-[380px] overflow-hidden">
        <motion.img 
          src={pkg.image} 
          alt={pkg.name}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Integrated Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold border border-white/10 transition-all shadow-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Packages
          </motion.button>
        </div>

        {/* Integrated Action Buttons */}
        <div className="absolute top-6 right-6 z-20 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`w-9 h-9 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/10 transition-all ${isLiked ? 'bg-red-500 text-white shadow-glow-red' : 'bg-black/20 text-white hover:bg-black/30'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl bg-black/20 hover:bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10 text-white transition-all shadow-lg"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Hero Content - Streamlined */}
        <div className="absolute bottom-6 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {pkg.badge && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-travel-orange text-white rounded-full text-[10px] font-bold mb-3 shadow-glow-orange uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  {pkg.badge}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">{pkg.name}</h1>
              <div className="flex flex-wrap items-center gap-5 text-white/90 text-[13px] font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-travel-orange" />
                  {pkg.destination}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-travel-blue" />
                  {pkg.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {pkg.rating} <span className="opacity-60 font-normal">({Math.floor(Math.random() * 500 + 100)} reviews)</span>
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
            {/* Highlights - Compact Grid */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-sm font-bold text-travel-text uppercase tracking-widest mb-4 opacity-70">Package Highlights</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ y: -3 }}
                    className="text-center p-3 bg-gray-50/50 rounded-xl border border-gray-100 transition-colors hover:bg-white hover:shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-travel-blue/10 flex items-center justify-center mx-auto mb-2">
                      <item.icon className="w-5 h-5 text-travel-blue" />
                    </div>
                    <p className="font-bold text-travel-text text-xs">{item.label}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tabs - Compact */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-50 bg-gray-50/30">
                {['itinerary', 'inclusions', 'details'].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-3 text-[13px] font-bold capitalize transition-all relative ${
                      activeTab === tab ? 'text-travel-blue' : 'text-gray-400 hover:text-travel-text'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="packageTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-travel-blue"
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
                      <div className="space-y-3">
                        {itinerary.map((day, index) => (
                          <motion.div
                            key={day.day}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            onClick={() => setActiveDay(day.day - 1)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              activeDay === day.day - 1
                                ? 'border-travel-blue bg-travel-blue/5 shadow-sm'
                                : 'border-gray-50 hover:border-gray-100'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-travel-blue to-travel-green flex items-center justify-center flex-shrink-0 shadow-sm">
                                <day.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-travel-text text-sm mb-1 leading-tight">Day {day.day}: {day.title}</h4>
                                <p className="text-[12px] text-gray-500 leading-relaxed mb-2 line-clamp-2">{day.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {day.activities.map((activity, i) => (
                                    <span key={i} className="text-[10px] font-bold px-2 py-0.5 bg-white border border-gray-100 rounded-lg text-travel-text-secondary flex items-center gap-1 shadow-sm">
                                      <Check className="w-2.5 h-2.5 text-travel-success" />
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
                      className="grid sm:grid-cols-2 gap-3"
                    >
                      {inclusions.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * index }}
                          className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-travel-blue/5 flex items-center justify-center group-hover:bg-travel-blue group-hover:scale-110 transition-all duration-500">
                            <item.icon className="w-5 h-5 text-travel-blue group-hover:text-white transition-colors" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[13px] text-travel-text leading-tight mb-0.5">{item.label}</p>
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tight">{item.desc}</p>
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
                      <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-1 rounded-full bg-travel-blue" />
                          <h4 className="font-bold text-sm text-travel-text uppercase tracking-widest leading-none">About This Package</h4>
                        </div>
                        <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                          Experience the best of {pkg.destination} with our carefully curated {pkg.duration.toLowerCase()} package. 
                          This all-inclusive journey combines comfort, adventure, and cultural immersion. From premium accommodations 
                          to guided tours, every detail is planned for a seamless experience.
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-5 bg-green-50/40 rounded-2xl border border-green-100 shadow-sm">
                          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-green-100/50">
                            <Sparkles className="w-4 h-4 text-green-600" />
                            <h5 className="font-bold text-[11px] text-green-800 uppercase tracking-widest">What's Included</h5>
                          </div>
                          <ul className="space-y-2.5">
                            {pkg.includes.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-[11px] font-bold text-green-700/80">
                                <Check className="w-3.5 h-3.5 text-green-500 mt-[-1px]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-5 bg-travel-orange/5 rounded-2xl border border-travel-orange/10 shadow-sm">
                          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-travel-orange/10">
                            <Calendar className="w-4 h-4 text-travel-orange" />
                            <h5 className="font-bold text-[11px] text-travel-orange uppercase tracking-widest">Important Notes</h5>
                          </div>
                          <ul className="space-y-2.5">
                            <li className="flex items-start gap-2 text-[11px] font-bold text-travel-orange/80">
                              <Check className="w-3.5 h-3.5 mt-[-1px]" />
                              Valid passport required
                            </li>
                            <li className="flex items-start gap-2 text-[11px] font-bold text-travel-orange/80">
                              <Check className="w-3.5 h-3.5 mt-[-1px]" />
                              Travel insurance recommended
                            </li>
                            <li className="flex items-start gap-2 text-[11px] font-bold text-travel-orange/80">
                              <Check className="w-3.5 h-3.5 mt-[-1px]" />
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
            <div className="sticky top-28">
              <motion.div 
                className="bg-white rounded-2xl shadow-premium p-5 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-travel-text tracking-tight">Book This Package</h2>
                  <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded-lg border border-green-100/50">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Save 15%</span>
                  </div>
                </div>

                {/* Price Display - High Density */}
                <div className="text-center mb-5 p-4 bg-gray-50/80 rounded-2xl border border-gray-100 border-dashed">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 opacity-70">Starting from</p>
                  <div className="flex flex-col items-center">
                    <p className="text-3xl font-bold text-travel-text tracking-tighter leading-tight">${pkg.price}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">per person</p>
                  </div>
                </div>

                {/* Travelers - Compact */}
                <div className="mb-4">
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 opacity-80">Traveler Selection</label>
                  <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-travel-blue/10 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-travel-blue" />
                      </div>
                      <span className="text-base font-bold text-travel-text">{travelers} <span className="text-[10px] text-gray-400 font-medium">Adults</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-sm text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setTravelers(travelers + 1)}
                        className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-sm text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Date Selection - Compact */}
                <div className="mb-5">
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 opacity-80">Departure Date</label>
                  <div className="relative group">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-travel-blue transition-colors" />
                    <input 
                      type="date" 
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-100 bg-white text-xs font-bold focus:border-travel-blue focus:ring-4 focus:ring-travel-blue/5 outline-none transition-all cursor-pointer"
                    />
                  </div>
                </div>

                {/* Price Breakdown - Professional */}
                <div className="space-y-2.5 mb-5 pb-5 border-b border-gray-50">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                    <span className="text-gray-400">Base Fare ({travelers}x)</span>
                    <span className="text-travel-text">${pkg.price * travelers}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                    <span className="text-green-600 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Executive Discount
                    </span>
                    <span className="text-green-600">-${Math.floor(pkg.price * 0.15 * travelers)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                    <span className="text-gray-400">Taxes & Services</span>
                    <span className="text-travel-blue">Included</span>
                  </div>
                </div>

                {/* Total - Premium */}
                <div className="flex justify-between items-center mb-6 px-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Price</span>
                    <span className="text-[8px] text-gray-300 font-bold uppercase">All Inclusive</span>
                  </div>
                  <motion.span 
                    key={totalPrice}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-bold text-travel-text tracking-tighter"
                  >
                    ${Math.floor(totalPrice * 0.85)}
                  </motion.span>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button 
                    onClick={() => setIsPaymentOpen(true)}
                    className="w-full gradient-blue text-white h-11 rounded-xl font-bold text-sm shadow-glow-blue transition-all flex items-center justify-center gap-2 group"
                  >
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Book This Package
                  </Button>
                </motion.div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-travel-text-secondary">
                    Free cancellation within 48 hours
                  </p>
                </div>
              </motion.div>

              {/* Contact Card - Compact */}
              <motion.div 
                variants={itemVariants}
                className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                <h3 className="font-bold text-travel-text text-sm mb-2">Need Expert Help?</h3>
                <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                  Our travel specialists are available 24/7 to assist with your custom booking.
                </p>
                <Button variant="outline" className="w-full h-10 rounded-xl text-xs font-bold border-gray-200 hover:bg-gray-50">
                  Contact Support
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>

    <PaymentGateway 
      isOpen={isPaymentOpen}
      onClose={() => setIsPaymentOpen(false)}
      amount={Math.floor(totalPrice * 0.85)}
      onSuccess={() => {
        setIsPaymentOpen(false);
      }}
    />
    </>
  );
}
