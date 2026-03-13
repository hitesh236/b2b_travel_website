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

interface HotelDetailProps {
  hotelId: string;
  onBack: () => void;
}

export default function HotelDetail({ hotelId, onBack }: HotelDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('standard');
  const [guests, setGuests] = useState(2);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

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
              <span className="font-medium">Back to Hotels</span>
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
        {/* Image Gallery */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px]">
            {/* Main Large Image */}
            <motion.div 
              className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group"
              whileHover={{ scale: 1.01 }}
            >
              <img 
                src={galleryImages[activeImage]} 
                alt={hotel.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Navigation Arrows */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {activeImage + 1} / {galleryImages.length}
              </div>
            </motion.div>

            {/* Thumbnail Images */}
            {galleryImages.slice(1, 5).map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveImage(index + 1)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer ${
                  index === 2 ? 'col-span-2' : ''
                }`}
              >
                <img src={img} alt={`Gallery ${index + 2}`} className="w-full h-full object-cover" />
                {index === 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      +{galleryImages.length - 4} more
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
            {/* Header Info */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-travel-text mb-2"
                  >
                    {hotel.name}
                  </motion.h1>
                  <div className="flex items-center gap-2 text-travel-text-secondary">
                    <MapPin className="w-5 h-5" />
                    <span>{hotel.location}, India</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-travel-text-secondary">{hotel.stars}-star Hotel</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                  <span className="text-2xl font-bold text-green-700">{hotel.rating}</span>
                  <span className="text-green-700">/ 5</span>
                </div>
                <div>
                  <p className="font-semibold text-travel-text">Excellent</p>
                  <p className="text-sm text-travel-text-secondary">{hotel.reviews} verified reviews</p>
                </div>
                {hotel.badge && (
                  <span className="ml-auto px-4 py-2 bg-travel-blue text-white rounded-full text-sm font-semibold">
                    {hotel.badge}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-card overflow-hidden">
              <div className="flex border-b border-gray-100">
                {['overview', 'amenities', 'rooms', 'reviews'].map((tab) => (
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
                        layoutId="hotelTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-travel-blue"
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
                        <h3 className="text-lg font-semibold text-travel-text mb-3">About this property</h3>
                        <p className="text-travel-text-secondary leading-relaxed">
                          Experience luxury and comfort at {hotel.name}, located in the heart of {hotel.location}. 
                          Our hotel offers world-class amenities, exceptional service, and easy access to major attractions. 
                          Whether you're traveling for business or leisure, we ensure a memorable stay with our 
                          well-appointed rooms, fine dining options, and state-of-the-art facilities.
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="font-semibold text-travel-text mb-1">Check-in</p>
                          <p className="text-sm text-travel-text-secondary">From 3:00 PM</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="font-semibold text-travel-text mb-1">Check-out</p>
                          <p className="text-sm text-travel-text-secondary">Until 11:00 AM</p>
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
                      className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                    >
                      {amenities.map((amenity, index) => (
                        <motion.div
                          key={amenity.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.03 * index }}
                          className={`flex items-center gap-3 p-3 rounded-xl ${
                            amenity.available ? 'bg-gray-50' : 'bg-gray-100 opacity-50'
                          }`}
                        >
                          <amenity.icon className={`w-5 h-5 ${amenity.available ? 'text-travel-blue' : 'text-gray-400'}`} />
                          <span className={`text-sm ${amenity.available ? 'text-travel-text' : 'text-gray-400'}`}>
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
                      className="space-y-4"
                    >
                      {roomTypes.map((room, index) => (
                        <motion.div
                          key={room.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => setSelectedRoom(room.id)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedRoom === room.id
                              ? 'border-travel-blue bg-travel-blue/5'
                              : 'border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <div className="flex gap-4">
                            <img src={room.image} alt={room.name} className="w-32 h-24 rounded-xl object-cover" />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-travel-text">{room.name}</h4>
                                  <p className="text-sm text-travel-text-secondary">{room.size} • {room.bed}</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {room.features.map((feature, i) => (
                                      <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-travel-text-secondary">
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <p className="text-xl font-bold text-travel-text">${room.price}</p>
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
                      className="space-y-4"
                    >
                      {reviews.map((review, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="flex items-start gap-4">
                            <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-travel-text">{review.name}</h4>
                                <span className="text-sm text-travel-text-secondary">{review.date}</span>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <p className="text-travel-text-secondary">{review.comment}</p>
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

          {/* Right Column - Booking Card */}
          <motion.div variants={fadeIn} className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-card-hover p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-travel-text">Book Your Stay</h2>
                  <div className="flex items-center gap-1 text-green-600">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Best Price</span>
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-travel-text mb-2">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="date" 
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-travel-blue focus:ring-2 focus:ring-travel-blue/20 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-travel-text mb-2">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="date" 
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-travel-blue focus:ring-2 focus:ring-travel-blue/20 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-travel-text mb-2">Guests</label>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                    >
                      -
                    </motion.button>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-travel-text-secondary" />
                      <span className="text-xl font-semibold">{guests}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setGuests(guests + 1)}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Selected Room */}
                <div className="p-4 bg-gray-50 rounded-xl mb-6">
                  <div className="flex items-center gap-3">
                    <Bed className="w-5 h-5 text-travel-blue" />
                    <div>
                      <p className="font-medium text-travel-text">{selectedRoomType.name}</p>
                      <p className="text-sm text-travel-text-secondary">{selectedRoomType.bed}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between text-travel-text-secondary">
                    <span>${selectedRoomType.price} x {nights} nights</span>
                    <span>${selectedRoomType.price * nights}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Member Discount
                    </span>
                    <span>-$30</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Total</span>
                  <motion.span 
                    key={totalPrice}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-travel-text"
                  >
                    ${totalPrice - 30}
                  </motion.span>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full gradient-blue text-white py-6 rounded-xl font-semibold text-lg hover:shadow-glow transition-all">
                    Reserve Now
                  </Button>
                </motion.div>

                <p className="text-center text-sm text-travel-text-secondary mt-4">
                  Free cancellation until 24 hours before check-in
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
