import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Hotel, 
  Search, 
  Filter, 
  Star,
  MapPin,
  Heart,
  Wifi,
  Coffee,
  Dumbbell,
  Waves,
  Utensils,
  Sparkles,
  Check,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { hotels } from '@/data/dummyData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const amenityIcons: Record<string, React.ElementType> = {
  'Free WiFi': Wifi,
  'Breakfast': Coffee,
  'Pool': Waves,
  'Gym': Dumbbell,
  'Spa': Sparkles,
  'Restaurant': Utensils,
};

function HotelCard({ hotel }: { hotel: typeof hotels[0] }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getBadgeStyles = (badge?: string) => {
    switch (badge) {
      case 'Best Deal':
        return { bg: 'bg-green-500', text: 'Best Deal' };
      case 'Top Rated':
        return { bg: 'bg-purple-500', text: 'Top Rated' };
      case 'AI Pick':
        return { bg: 'gradient-ai', text: 'AI Pick' };
      case 'Popular':
        return { bg: 'bg-travel-orange', text: 'Popular' };
      default:
        return { bg: 'bg-gray-500', text: '' };
    }
  };

  const badge = getBadgeStyles(hotel.badge);

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden group border border-transparent hover:border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-40 overflow-hidden">
        <motion.img 
          src={hotel.image} 
          alt={hotel.name}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-2.5 left-2.5">
          <span className={`px-2 py-0.5 rounded-lg text-[9px] uppercase font-bold tracking-wider text-white ${badge.bg} border border-white/10 backdrop-blur-[2px]`}>
            {badge.text}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`w-7 h-7 rounded-lg backdrop-blur-md flex items-center justify-center transition-all ${isLiked ? 'bg-red-500 shadow-md' : 'bg-white/10 hover:bg-white/20'}`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
          </motion.button>
        </div>

        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-lg shadow-sm border border-gray-100">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-travel-text text-[10px]">{hotel.rating}</span>
          </div>
          <span className="text-white/80 text-[10px] font-bold tracking-tight">({hotel.reviews})</span>
        </div>
      </div>

      <div className="p-3.5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-1 mb-1.5">
          <div className="min-w-0">
            <h3 className="font-bold text-base text-travel-text truncate group-hover:text-travel-blue transition-colors leading-tight">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 text-gray-400 mt-0.5 uppercase tracking-widest text-[9px] font-bold">
              <MapPin className="w-2.5 h-2.5 opacity-70" />
              {hotel.location}
            </div>
          </div>
          <div className="flex pt-1">
            {[...Array(hotel.stars)].map((_, i) => (
              <Star 
                key={i} 
                className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" 
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3 pt-2 border-t border-gray-50 mt-1">
          {hotel.amenities.slice(0, 3).map((amenity, i) => {
            const Icon = amenityIcons[amenity] || Check;
            return (
              <span 
                key={i}
                className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 bg-gray-50/50 rounded-md text-gray-400 font-bold uppercase tracking-tighter"
              >
                <Icon className="w-2 h-2 opacity-60" />
                {amenity}
              </span>
            );
          })}
        </div>

        <div className="mt-auto pt-2.5 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-bold text-travel-text tracking-tighter">${hotel.price}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">/Night</span>
            </div>
            <span className="text-[8px] text-gray-300 font-bold uppercase tracking-tighter">Tax Incl.</span>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={() => navigate(`/hotel/${hotel.id}`)}
              className="gradient-blue text-white h-8 px-4 rounded-lg text-[10px] font-bold shadow-glow-blue transition-all"
            >
              Book Now
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-travel-bg pt-28 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header & Search Bar */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-card p-3 mb-6">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* Title Section - Integrated */}
            <div className="flex items-center gap-3 pr-4 lg:border-r border-gray-100 min-w-max">
              <div className="w-9 h-9 rounded-lg bg-travel-green/10 flex items-center justify-center">
                <Hotel className="w-5 h-5 text-travel-green" />
              </div>
              <h1 className="text-xl font-bold text-travel-text">Hotels</h1>
            </div>

            {/* Search Input - Compact */}
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search hotels, cities, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl border-gray-100 focus:border-travel-green bg-gray-50/50"
              />
            </div>

            {/* Actions - Compact */}
            <div className="flex gap-2 w-full lg:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 h-11 rounded-xl text-sm font-bold transition-all ${
                  showFilters ? 'bg-travel-green text-white' : 'bg-gray-50 text-travel-text hover:bg-gray-100 border border-gray-100'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </motion.button>
              <div className="relative flex-1 lg:flex-none">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-11 w-full lg:w-40 px-4 pr-9 rounded-xl bg-gray-50 text-travel-text text-sm font-bold appearance-none cursor-pointer hover:bg-gray-100 border border-gray-100 transition-colors"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Low Price</option>
                  <option value="price-high">High Price</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-gray-100 grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-travel-text mb-2">Price per night</label>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Min" className="rounded-lg" />
                    <span className="text-gray-400">-</span>
                    <Input placeholder="Max" className="rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-travel-text mb-2">Star Rating</label>
                  <div className="flex gap-2">
                    {[3, 4, 5].map((stars) => (
                      <button key={stars} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors">
                        {stars}★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-travel-text mb-2">Amenities</label>
                  <div className="space-y-2">
                    {['Free WiFi', 'Breakfast', 'Pool', 'Gym'].map((amenity) => (
                      <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-travel-green focus:ring-travel-green" />
                        <span className="text-sm text-travel-text-secondary">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-travel-text mb-2">Guest Rating</label>
                  <div className="space-y-2">
                    {['Excellent 9+', 'Very Good 8+', 'Good 7+'].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-travel-green focus:ring-travel-green" />
                        <span className="text-sm text-travel-text-secondary">{rating}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
          <p className="text-travel-text-secondary">
            Showing <span className="font-semibold text-travel-text">{filteredHotels.length}</span> properties
          </p>
          <div className="flex items-center gap-2 text-sm text-travel-text-secondary">
            <MapPin className="w-4 h-4" />
            <span>Mumbai, India</span>
          </div>
        </motion.div>

        {/* Hotel Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        {/* Load More */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white rounded-xl shadow-card text-travel-text font-medium hover:shadow-card-hover transition-shadow"
          >
            Load More Hotels
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
