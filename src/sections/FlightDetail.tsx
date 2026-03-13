import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  ArrowLeft, 
  Star, 
  Check, 
  Heart, 
  Share2, 
  Shield, 
  Wifi, 
  Briefcase, 
  Monitor, 
  Utensils,
  Luggage,
  Armchair,
  Info,
  Users,
  Sparkles,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { flights } from '@/data/dummyData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
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

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
  }
};

interface FlightDetailProps {
  flightId: string;
  onBack: () => void;
}

export default function FlightDetail({ flightId, onBack }: FlightDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedClass, setSelectedClass] = useState('economy');
  const [travelers, setTravelers] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');

  const flight = flights.find(f => f.id === flightId) || flights[0];

  const classOptions = [
    { id: 'economy', name: 'Economy', price: flight.price, features: ['Standard seat', 'Carry-on bag', 'Complimentary snack'] },
    { id: 'premium', name: 'Premium Economy', price: flight.price + 80, features: ['Extra legroom', 'Priority boarding', 'Premium meal'] },
    { id: 'business', name: 'Business', price: flight.price + 250, features: ['Lie-flat seat', 'Lounge access', 'Priority everything'] },
  ];

  const selectedOption = classOptions.find(c => c.id === selectedClass) || classOptions[0];
  const totalPrice = selectedOption.price * travelers;

  const amenities = [
    { icon: Wifi, label: 'Free WiFi', description: 'Stay connected throughout your flight' },
    { icon: Monitor, label: 'Entertainment', description: '300+ movies and TV shows' },
    { icon: Utensils, label: 'Meals', description: 'Complimentary meals and beverages' },
    { icon: Briefcase, label: 'Carry-on', description: '7kg carry-on baggage included' },
    { icon: Luggage, label: 'Checked Bag', description: '23kg checked baggage included' },
    { icon: Armchair, label: 'Comfort', description: 'Ergonomic seats with adjustable headrest' },
  ];

  const timeline = [
    { time: flight.departure, airport: flight.fromCode, city: flight.from, action: 'Departure', duration: '' },
    { time: '', airport: '', city: '', action: 'In Flight', duration: flight.duration },
    { time: flight.arrival, airport: flight.toCode, city: flight.to, action: 'Arrival', duration: '' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-travel-bg pt-20 pb-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center gap-2 text-travel-text hover:text-travel-blue transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Flights</span>
            </motion.button>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full transition-colors ${isLiked ? 'bg-red-50' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Flight Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Card */}
            <motion.div variants={slideInLeft} className="bg-white rounded-3xl shadow-card overflow-hidden">
              <div className="relative h-48">
                <img src={flight.image} alt={flight.airline} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold text-white mb-2"
                      >
                        {flight.airline}
                      </motion.h1>
                      <div className="flex items-center gap-4 text-white/80">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          {flight.rating} ({Math.floor(Math.random() * 2000 + 500)} reviews)
                        </span>
                        <span>{flight.airlineCode}</span>
                      </div>
                    </div>
                    {flight.badge && (
                      <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold flex items-center gap-1">
                        <TrendingDown className="w-4 h-4" />
                        {flight.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Route Timeline */}
                <div className="flex items-center justify-between mb-8">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-travel-text">{flight.departure}</p>
                    <p className="text-lg text-travel-text-secondary">{flight.fromCode}</p>
                    <p className="text-sm text-travel-text-secondary">{flight.from}</p>
                  </div>

                  <div className="flex-1 px-8">
                    <div className="relative">
                      <div className="border-t-2 border-dashed border-gray-300" />
                      <motion.div 
                        animate={{ x: [0, 100, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-0 -translate-y-1/2"
                      >
                        <div className="w-10 h-10 rounded-full bg-travel-blue flex items-center justify-center shadow-lg">
                          <Plane className="w-5 h-5 text-white rotate-90" />
                        </div>
                      </motion.div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 rounded-full border border-gray-200">
                        <span className="text-sm font-medium text-travel-text">{flight.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-4xl font-bold text-travel-text">{flight.arrival}</p>
                    <p className="text-lg text-travel-text-secondary">{flight.toCode}</p>
                    <p className="text-sm text-travel-text-secondary">{flight.to}</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-gray-100">
                  {['overview', 'amenities', 'policy'].map((tab) => (
                    <motion.button
                      key={tab}
                      whileHover={{ y: -2 }}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 font-medium capitalize transition-colors relative ${
                        activeTab === tab ? 'text-travel-blue' : 'text-travel-text-secondary hover:text-travel-text'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-travel-blue"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Timeline */}
                      <div className="space-y-4">
                        {timeline.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-center gap-4"
                          >
                            <div className="w-16 text-right">
                              <p className="font-semibold text-travel-text">{item.time}</p>
                            </div>
                            <div className="relative">
                              <div className="w-4 h-4 rounded-full bg-travel-blue" />
                              {index < timeline.length - 1 && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-200" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-travel-text">{item.action}</p>
                              {item.airport && (
                                <p className="text-sm text-travel-text-secondary">{item.airport} - {item.city}</p>
                              )}
                              {item.duration && (
                                <p className="text-sm text-travel-text-secondary">Duration: {item.duration}</p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'amenities' && (
                    <motion.div
                      key="amenities"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid sm:grid-cols-2 gap-4"
                    >
                      {amenities.map((amenity, index) => (
                        <motion.div
                          key={amenity.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * index }}
                          whileHover={{ scale: 1.02, backgroundColor: '#f8f9fa' }}
                          className="flex items-start gap-4 p-4 rounded-xl transition-colors"
                        >
                          <div className="w-12 h-12 rounded-xl bg-travel-blue/10 flex items-center justify-center flex-shrink-0">
                            <amenity.icon className="w-6 h-6 text-travel-blue" />
                          </div>
                          <div>
                            <p className="font-semibold text-travel-text">{amenity.label}</p>
                            <p className="text-sm text-travel-text-secondary">{amenity.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'policy' && (
                    <motion.div
                      key="policy"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-yellow-50 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-yellow-800">Cancellation Policy</p>
                            <p className="text-sm text-yellow-700">Free cancellation within 24 hours of booking. After that, cancellation fees may apply.</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-blue-800">Travel Protection</p>
                            <p className="text-sm text-blue-700">Add travel insurance for $25 per person to protect against unexpected changes.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Class Selection */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-card p-6">
              <h2 className="text-xl font-bold text-travel-text mb-6">Select Class</h2>
              <div className="space-y-4">
                {classOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedClass(option.id)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedClass === option.id
                        ? 'border-travel-blue bg-travel-blue/5'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedClass === option.id ? 'border-travel-blue' : 'border-gray-300'
                        }`}>
                          {selectedClass === option.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 rounded-full bg-travel-blue"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-travel-text">{option.name}</p>
                          <div className="flex gap-2 mt-1">
                            {option.features.map((feature, i) => (
                              <span key={i} className="text-xs text-travel-text-secondary flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-travel-text">${option.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Card */}
          <motion.div variants={slideInRight} className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-card-hover p-6"
              >
                <h2 className="text-xl font-bold text-travel-text mb-6">Booking Summary</h2>

                {/* Travelers */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-travel-text mb-2">Travelers</label>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-travel-text"
                    >
                      -
                    </motion.button>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-travel-text-secondary" />
                      <span className="text-xl font-semibold text-travel-text">{travelers}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-travel-text"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between text-travel-text-secondary">
                    <span>Flight ({selectedOption.name})</span>
                    <span>${selectedOption.price} x {travelers}</span>
                  </div>
                  <div className="flex justify-between text-travel-text-secondary">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      AI Discount
                    </span>
                    <span>-$20</span>
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
                    ${totalPrice - 20}
                  </motion.span>
                </div>

                {/* CTA */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full gradient-blue text-white py-6 rounded-xl font-semibold text-lg hover:shadow-glow transition-all">
                    Book Now
                  </Button>
                </motion.div>

                <p className="text-center text-sm text-travel-text-secondary mt-4">
                  No hidden fees. Free cancellation within 24h.
                </p>
              </motion.div>

              {/* Trust Badges */}
              <motion.div 
                variants={scaleIn}
                className="mt-6 bg-white rounded-2xl shadow-card p-4"
              >
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-green-500 mx-auto mb-1" />
                    <p className="text-xs text-travel-text-secondary">Secure</p>
                  </div>
                  <div className="text-center">
                    <Check className="w-8 h-8 text-travel-blue mx-auto mb-1" />
                    <p className="text-xs text-travel-text-secondary">Verified</p>
                  </div>
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-travel-orange mx-auto mb-1" />
                    <p className="text-xs text-travel-text-secondary">AI Pick</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
