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
  TrendingDown,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { flights } from '@/data/dummyData';
import PaymentGateway from '../components/PaymentGateway';

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
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

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
      className="min-h-screen bg-travel-bg pt-28 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Flight Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Card - Compact */}
             <motion.div variants={slideInLeft} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
              <div className="relative h-40">
                <img src={flight.image} alt={flight.airline} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Integrated Back Button */}
                <div className="absolute top-4 left-4 z-10">
                  <motion.button
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBack}
                    className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold border border-white/20 transition-all shadow-lg"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Flights
                  </motion.button>
                </div>

                {/* Integrated Action Buttons */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-8 h-8 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/20 transition-all ${isLiked ? 'bg-red-500 text-white shadow-glow-red' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 text-white transition-all shadow-lg"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-bold text-white mb-1"
                      >
                        {flight.airline}
                      </motion.h1>
                      <div className="flex items-center gap-2 text-white/90 text-[11px]">
                        <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-lg backdrop-blur-md border border-white/10 font-bold">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          {flight.rating}
                        </span>
                        <span className="font-bold tracking-widest uppercase opacity-80">{flight.airlineCode}</span>
                      </div>
                    </div>
                    {flight.badge && (
                      <span className="px-2.5 py-1.5 bg-green-500/90 backdrop-blur-sm text-white rounded-xl text-[10px] font-bold flex items-center gap-1.5 shadow-lg border border-white/10">
                        <TrendingDown className="w-3.5 h-3.5" />
                        {flight.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Route Timeline - Compact */}
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="text-center w-24">
                    <p className="text-3xl font-bold text-travel-text leading-tight">{flight.departure}</p>
                    <p className="text-xs font-bold text-travel-text-secondary uppercase tracking-wider">{flight.fromCode}</p>
                    <p className="text-[11px] text-gray-400 truncate">{flight.from}</p>
                  </div>

                  <div className="flex-1 px-4">
                    <div className="relative flex items-center justify-center">
                      <div className="w-full h-[1px] bg-gray-200 border-t border-dashed border-gray-400" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 flex flex-col items-center">
                        <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">{flight.duration}</span>
                        <Plane className="w-4 h-4 text-travel-blue rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center w-24">
                    <p className="text-3xl font-bold text-travel-text leading-tight">{flight.arrival}</p>
                    <p className="text-xs font-bold text-travel-text-secondary uppercase tracking-wider">{flight.toCode}</p>
                    <p className="text-[11px] text-gray-400 truncate">{flight.to}</p>
                  </div>
                </div>

                {/* Tabs - Compact */}
                <div className="flex gap-2 mb-5 border-b border-gray-50 bg-gray-50/30 px-2">
                  {['overview', 'amenities', 'policy'].map((tab) => (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-[12px] font-bold capitalize transition-all relative ${
                        activeTab === tab ? 'text-travel-blue' : 'text-gray-400 hover:text-travel-text'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-travel-blue"
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
                      {/* High-Fidelity Horizontal Flex Timeline - Final Polish */}
                      <div className="relative bg-gray-50/50 rounded-2xl p-5 border border-gray-100 overflow-hidden group">
                        {/* Abstract Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-travel-blue/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-travel-blue/10 transition-all duration-700" />
                        
                        <div className="flex items-center justify-between relative z-10">
                          {/* Departure Block - Smaller Font */}
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-left w-24"
                          >
                            <p className="text-2xl font-bold text-travel-text tracking-tighter leading-none mb-1.5">{timeline[0].time}</p>
                            <h4 className="text-[10px] font-bold text-travel-blue uppercase tracking-widest mb-1">{timeline[0].action}</h4>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-bold text-travel-text-secondary">{timeline[0].airport}</span>
                              <div className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                              <span className="text-[9px] font-medium text-gray-500 truncate">{timeline[0].city}</span>
                            </div>
                          </motion.div>

                          {/* Flight Path Visualizer */}
                          <div className="flex-1 px-6">
                            <div className="relative flex flex-col items-center">
                              {/* Duration Label - More Compact */}
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-1 px-2.5 py-0.5 bg-white rounded-full border border-gray-100 shadow-sm mb-3"
                              >
                                <Clock className="w-2.5 h-2.5 text-travel-blue" />
                                <span className="text-[9px] font-bold text-travel-text-secondary uppercase tracking-tight">{timeline[1].duration}</span>
                              </motion.div>

                              {/* Dashed Line & Plane - Straight Direction */}
                              <div className="w-full relative flex items-center justify-center">
                                <div className="w-full h-[1.5px] bg-gray-100 border-t border-dashed border-gray-400 opacity-40" />
                                <motion.div 
                                  initial={{ left: "0%" }}
                                  animate={{ left: "100%" }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                  className="absolute top-1/2 -translate-y-1/2 -ml-2"
                                >
                                  {/* rotate-45 is typically 'straight' for the Plane icon in many icon sets, or 0 if it starts horizontal */}
                                  <Plane className="w-4 h-4 text-travel-blue rotate-45 drop-shadow-sm" />
                                </motion.div>
                              </div>

                              {/* Stop Type - Ultra Small Label */}
                              <p className="mt-3 text-[8px] font-bold text-gray-400 uppercase tracking-[0.25em]">DIRECT FLIGHT</p>
                            </div>
                          </div>

                          {/* Arrival Block - Smaller Font */}
                          <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-right w-24"
                          >
                            <p className="text-2xl font-bold text-travel-text tracking-tighter leading-none mb-1.5">{timeline[2].time}</p>
                            <h4 className="text-[10px] font-bold text-travel-green uppercase tracking-widest mb-1">{timeline[2].action}</h4>
                            <div className="flex items-center justify-end gap-1.5">
                              <span className="text-[9px] font-medium text-gray-500 truncate">{timeline[2].city}</span>
                              <div className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                              <span className="text-[11px] font-bold text-travel-text-secondary">{timeline[2].airport}</span>
                            </div>
                          </motion.div>
                        </div>

                        {/* Animated Ground Highlight */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-travel-blue/10 via-gray-100 to-travel-green/10" />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'amenities' && (
                    <motion.div
                      key="amenities"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid sm:grid-cols-2 gap-3"
                    >
                      {amenities.map((amenity, index) => (
                        <motion.div
                          key={amenity.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * index }}
                          className="flex items-start gap-3 p-3 rounded-xl border border-gray-50 bg-gray-50/20 transition-all hover:bg-gray-50/50"
                        >
                          <div className="w-10 h-10 rounded-lg bg-travel-blue/10 flex items-center justify-center flex-shrink-0">
                            <amenity.icon className="w-5 h-5 text-travel-blue" />
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-travel-text">{amenity.label}</p>
                            <p className="text-[11px] text-gray-400 font-medium leading-tight">{amenity.description}</p>
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

            {/* Class Selection - Compact */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-sm font-bold text-travel-text uppercase tracking-widest mb-4 opacity-70">Select Cabin Class</h2>
              <div className="space-y-3">
                {classOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setSelectedClass(option.id)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedClass === option.id
                        ? 'border-travel-blue bg-travel-blue/5 shadow-sm'
                        : 'border-gray-50 hover:border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedClass === option.id ? 'border-travel-blue' : 'border-gray-300'
                        }`}>
                          {selectedClass === option.id && (
                            <motion.div
                              layoutId={`radio-${option.id}`}
                              className="w-2 h-2 rounded-full bg-travel-blue"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-travel-text leading-none mb-1.5">{option.name}</p>
                          <div className="flex gap-2">
                            {option.features.map((feature, i) => (
                              <span key={i} className="text-[9px] text-gray-400 font-bold uppercase flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5 text-green-500" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-travel-text leading-tight">${option.price}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Per Person</p>
                      </div>
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
                <h2 className="text-sm font-bold text-travel-text uppercase tracking-widest mb-5 opacity-70">Booking Summary</h2>

                {/* Travelers - Compact */}
                <div className="mb-4">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-1.5">Passengers</label>
                  <div className="flex items-center justify-between bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 px-2">
                      <Users className="w-3.5 h-3.5 text-travel-blue" />
                      <span className="text-sm font-bold text-travel-text">{travelers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center font-bold text-gray-500 shadow-sm"
                      >
                        -
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setTravelers(travelers + 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center font-bold text-gray-500 shadow-sm"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown - Compact */}
                <div className="space-y-2 mb-4 pb-4 border-b border-gray-50 pt-2">
                  <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                    <span>{selectedOption.name} Base × {travelers}</span>
                    <span className="text-travel-text">${selectedOption.price * travelers}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-green-600 uppercase tracking-tighter">
                    <span className="flex items-center gap-1">AI Member Discount</span>
                    <span>-$20</span>
                  </div>
                </div>

                {/* Total - Compact */}
                <div className="flex justify-between items-center mb-5 pt-1">
                  <span className="text-xs font-bold text-travel-text uppercase tracking-widest opacity-60">Total</span>
                  <div className="text-right">
                    <motion.p 
                      key={totalPrice}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold text-travel-text leading-tight"
                    >
                      ${totalPrice - 20}
                    </motion.p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Tax Inclusive</p>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={() => setIsPaymentOpen(true)}
                    className="w-full h-11 gradient-blue text-white rounded-xl font-bold text-sm shadow-glow-blue transition-all flex items-center justify-center gap-2 group"
                  >
                    Complete Booking
                  </Button>
                </motion.div>

                <div className="mt-4 text-center">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest opacity-60">Secure Checkout • 24/7 Support</p>
                </div>
              </motion.div>

              {/* Trust Badges - Mini */}
              <motion.div 
                variants={scaleIn}
                className="mt-4 bg-gray-50/50 rounded-xl p-3 border border-gray-100"
              >
                <div className="flex items-center justify-around">
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-5 h-5 text-green-500/70" />
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Secure</p>
                  </div>
                  <div className="w-px h-6 bg-gray-200" />
                  <div className="flex flex-col items-center gap-1">
                    <Check className="w-5 h-5 text-travel-blue/70" />
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Verified</p>
                  </div>
                  <div className="w-px h-6 bg-gray-200" />
                  <div className="flex flex-col items-center gap-1">
                    <Sparkles className="w-5 h-5 text-travel-orange/70" />
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">AI Pick</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <PaymentGateway 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={totalPrice - 20}
        onSuccess={() => {
          setIsPaymentOpen(false);
          // Potential success notification
        }}
      />
    </motion.div>
  );
}
