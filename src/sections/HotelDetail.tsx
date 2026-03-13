import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Heart, 
  Share2, 
  Wifi, 
  Coffee, 
  Waves, 
  Dumbbell,
  Car,
  Utensils,
  Wind,
  Snowflake,
  Tv,
  Phone,
  Calendar,
  Users,
  Sparkles,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Bed
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hotels } from '@/data/dummyData';
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export default function HotelDetail() {
  const { id: hotelId } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('standard');
  const [guests, setGuests] = useState(2);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('amenities');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const hotel = hotels.find(h => h.id === hotelId) || hotels[0];

  // Generate gallery images
  const galleryImages = [
    hotel.image,
    '/images/hotel1.jpg',
    '/images/hotel2.jpg',
    '/images/hotel3.jpg',
    '/images/hotel-mumbai.jpg',
  ];

  const roomTypes = [
    { 
      id: 'standard', 
      name: 'Standard Room', 
      price: hotel.price, 
      size: '25 m²',
      bed: '1 Queen Bed',
      image: '/images/hotel1.jpg',
      features: ['City View', 'Free WiFi', 'Air Conditioning', 'Flat-screen TV']
    },
    { 
      id: 'deluxe', 
      name: 'Deluxe Room', 
      price: hotel.price + 50, 
      size: '35 m²',
      bed: '1 King Bed',
      image: '/images/hotel2.jpg',
      features: ['Pool View', 'Free WiFi', 'Mini Bar', 'Bathtub', 'Room Service']
    },
    { 
      id: 'suite', 
      name: 'Executive Suite', 
      price: hotel.price + 150, 
      size: '55 m²',
      bed: '1 King Bed + Sofa',
      image: '/images/hotel3.jpg',
      features: ['Panoramic View', 'Living Room', 'Kitchenette', 'Premium Amenities', 'Lounge Access']
    },
  ];

  const selectedRoomType = roomTypes.find(r => r.id === selectedRoom) || roomTypes[0];
  const nights = 2; // Simplified calculation
  const totalPrice = selectedRoomType.price * nights;

  const amenities = [
    { icon: Wifi, label: 'Free WiFi', available: hotel.amenities.includes('Free WiFi') },
    { icon: Coffee, label: 'Breakfast', available: hotel.amenities.includes('Breakfast') },
    { icon: Waves, label: 'Swimming Pool', available: hotel.amenities.includes('Pool') },
    { icon: Dumbbell, label: 'Fitness Center', available: hotel.amenities.includes('Gym') },
    { icon: Car, label: 'Free Parking', available: hotel.amenities.includes('Parking') },
    { icon: Utensils, label: 'Restaurant', available: hotel.amenities.includes('Restaurant') },
    { icon: Wind, label: 'Spa', available: hotel.amenities.includes('Spa') },
    { icon: Snowflake, label: 'Air Conditioning', available: true },
    { icon: Tv, label: 'Flat-screen TV', available: true },
    { icon: Phone, label: '24/7 Room Service', available: true },
  ];

  const reviews = [
    { name: 'Sarah Johnson', rating: 5, date: '2 weeks ago', comment: 'Amazing stay! The staff was incredibly helpful and the room was spotless.', avatar: '/images/avatar1.jpg' },
    { name: 'Michael Chen', rating: 4, date: '1 month ago', comment: 'Great location and comfortable rooms. Would definitely recommend.', avatar: '/images/avatar2.jpg' },
    { name: 'Emily Rodriguez', rating: 5, date: '2 months ago', comment: 'Perfect for business travel. Excellent WiFi and workspace.', avatar: '/images/avatar3.jpg' },
  ];

  const nextImage = () => setActiveImage((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <>
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-travel-bg pt-28 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery - More compact */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[420px]">
            {/* Main Large Image */}
            <motion.div 
              className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group border border-gray-100"
              whileHover={{ scale: 1.005 }}
            >
              <img 
                src={galleryImages[activeImage]} 
                alt={hotel.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Back Button Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <motion.button
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-1.5 text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold border border-white/10 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Hotels
                </motion.button>
              </div>

              {/* Action Buttons Overlay */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-8 h-8 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/10 transition-all ${isLiked ? 'bg-red-500 text-white shadow-glow-red' : 'bg-black/20 text-white hover:bg-black/30'}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-xl bg-black/20 hover:bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10 text-white transition-all shadow-lg"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </motion.button>
              </div>
              
              {/* Navigation Arrows - Smaller */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Counter - Compact */}
              <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-[10px] font-bold">
                {activeImage + 1} / {galleryImages.length}
              </div>
            </motion.div>

            {/* Thumbnail Images */}
            {galleryImages.slice(1, 5).map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveImage(index + 1)}
                className={`relative rounded-xl overflow-hidden cursor-pointer border border-gray-100 ${
                  index === 2 ? 'col-span-2' : ''
                }`}
              >
                <img src={img} alt={`Gallery ${index + 2}`} className="w-full h-full object-cover" />
                {index === 3 && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="text-white font-bold text-xs flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4" />
                      +{galleryImages.length - 4}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Info - Compact */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0">
                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-travel-text mb-1 truncate"
                  >
                    {hotel.name}
                  </motion.h1>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <MapPin className="w-4 h-4 text-travel-orange" />
                    <span className="text-[12px] font-bold uppercase tracking-tight">{hotel.location}, India</span>
                  </div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{hotel.stars}-star property</p>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center px-2 py-1 bg-travel-blue/5 rounded-lg border border-travel-blue/10">
                    <span className="text-xl font-bold text-travel-blue">{hotel.rating}</span>
                    <span className="text-[12px] font-bold text-travel-blue/60 ml-0.5">/5</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-travel-text capitalize">Excellent Experience</p>
                    <p className="text-[10px] text-gray-400 font-medium">{hotel.reviews} verified reviews</p>
                  </div>
                </div>
                {hotel.badge && (
                  <span className="ml-auto px-3 py-1 bg-travel-blue text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-glow-blue">
                    {hotel.badge}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Tabs - Compact */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-50 bg-gray-50/30">
                {['overview', 'amenities', 'rooms', 'reviews'].map((tab) => (
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
                        layoutId="hotelTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-travel-blue"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-sm font-bold text-travel-text uppercase tracking-widest mb-3 opacity-70">About this property</h3>
                        <p className="text-[13px] text-gray-500 leading-relaxed">
                          Experience luxury and comfort at {hotel.name}, located in the heart of {hotel.location}. 
                          Our property offers world-class amenities, exceptional service, and easy access to major attractions. 
                          Designed for both business and leisure travelers.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Check-in</p>
                          <p className="text-sm font-bold text-travel-text">3:00 PM</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Check-out</p>
                          <p className="text-sm font-bold text-travel-text">11:00 AM</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'amenities' && (
                    <motion.div
                      key="amenities"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    >
                      {amenities.map((amenity, index) => (
                        <motion.div
                          key={amenity.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.03 * index }}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all ${
                            amenity.available 
                              ? 'bg-gray-50 border-gray-100' 
                              : 'bg-white opacity-40 border-transparent grayscale'
                          }`}
                        >
                          <amenity.icon className={`w-4 h-4 ${amenity.available ? 'text-travel-blue' : 'text-gray-400'}`} />
                          <span className={`text-[12px] font-bold ${amenity.available ? 'text-travel-text' : 'text-gray-400'}`}>
                            {amenity.label}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'rooms' && (
                    <motion.div
                      key="rooms"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      {roomTypes.map((room, index) => (
                        <motion.div
                          key={room.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          onClick={() => setSelectedRoom(room.id)}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedRoom === room.id
                              ? 'border-travel-blue bg-travel-blue/0'
                              : 'border-gray-50 hover:border-gray-100'
                          }`}
                        >
                          <div className="flex gap-4">
                            <img src={room.image} alt={room.name} className="w-24 h-20 rounded-lg object-cover shadow-sm" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-bold text-travel-text text-sm mb-0.5">{room.name}</h4>
                                  <p className="text-[11px] text-gray-400 font-medium mb-2">{room.size} • {room.bed}</p>
                                  <div className="flex flex-wrap gap-1">
                                    {room.features.slice(0, 3).map((feature, i) => (
                                      <span key={i} className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-50 rounded text-gray-400">
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold text-travel-text leading-tight">${room.price}</p>
                                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">per night</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      {reviews.map((review, index) => (
                        <motion.div
                          key={index}
                          className="p-3 bg-gray-50 rounded-xl border border-gray-100"
                        >
                          <div className="flex items-start gap-3">
                            <img src={review.avatar} alt={review.name} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-0.5">
                                <h4 className="font-bold text-travel-text text-xs">{review.name}</h4>
                                <span className="text-[10px] font-medium text-gray-400">{review.date}</span>
                              </div>
                              <div className="flex items-center gap-0.5 mb-1.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-2.5 h-2.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                                  />
                                ))}
                              </div>
                              <p className="text-[11px] text-gray-500 leading-relaxed font-medium line-clamp-2">{review.comment}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Card - Compact */}
          <motion.div variants={fadeIn} className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div 
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-bold text-travel-text uppercase tracking-widest opacity-80">Book Your Stay</h2>
                  <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase">Best Price</span>
                  </div>
                </div>

                {/* Dates - Compact Row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-1.5">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input 
                        type="date" 
                        className="w-full pl-8 pr-2 py-2 rounded-lg border border-gray-100 bg-gray-50/50 text-[12px] font-bold focus:border-travel-blue focus:ring-2 focus:ring-travel-blue/5 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-1.5">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input 
                        type="date" 
                        className="w-full pl-8 pr-2 py-2 rounded-lg border border-gray-100 bg-gray-50/50 text-[12px] font-bold focus:border-travel-blue focus:ring-2 focus:ring-travel-blue/5 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Guests - Compact */}
                <div className="mb-4">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-1.5">Guests</label>
                  <div className="flex items-center justify-between bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 pl-2">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-sm font-bold text-travel-text">{guests}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center font-bold text-gray-500 shadow-sm"
                      >
                        -
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setGuests(guests + 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center font-bold text-gray-500 shadow-sm"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Selected Room - Micro */}
                <div className="p-3 bg-travel-blue/0 border border-travel-blue/10 rounded-xl mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bed className="w-3.5 h-3.5 text-travel-blue" />
                    <div>
                      <p className="text-[11px] font-bold text-travel-text leading-none mb-0.5">{selectedRoomType.name}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{selectedRoomType.bed}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="h-6 px-2 text-[10px] font-bold text-travel-blue hover:bg-travel-blue/5">Change</Button>
                </div>

                {/* Pricing - Streamlined */}
                <div className="space-y-2 mb-4 pt-4 border-t border-gray-50">
                  <div className="flex justify-between text-[11px] font-bold text-gray-400 tracking-tight">
                    <span>${selectedRoomType.price} × {nights} Nights</span>
                    <span className="text-travel-text">${selectedRoomType.price * nights}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-green-600 tracking-tight">
                    <span className="flex items-center gap-1">Member Discount</span>
                    <span>-$30</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-5 pt-3 border-t border-travel-text/5">
                  <span className="text-sm font-bold text-travel-text uppercase tracking-widest opacity-60">Total</span>
                  <motion.span 
                    key={totalPrice}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-travel-text"
                  >
                    ${totalPrice - 30}
                  </motion.span>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button 
                    onClick={() => setIsPaymentOpen(true)}
                    className="w-full gradient-blue text-white h-11 rounded-xl font-bold text-sm hover:shadow-glow-blue transition-all"
                  >
                    Complete Reservation
                  </Button>
                </motion.div>

                <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-tighter mt-3">
                  Secure checkout • No hidden fees
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>

    <PaymentGateway 
      isOpen={isPaymentOpen}
      onClose={() => setIsPaymentOpen(false)}
      amount={totalPrice - 30}
      onSuccess={() => {
        setIsPaymentOpen(false);
      }}
    />
    </>
  );
}
