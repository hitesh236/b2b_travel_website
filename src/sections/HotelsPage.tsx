import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Hotel, 
  Search, 
  Filter, 
  Star,
  MapPin,
  Heart,
  Share2,
  Wifi,
  Coffee,
  Dumbbell,
  Waves,
  Car,
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
  'Parking': Car,
};

interface HotelsPageProps {
  onViewDetail: (id: string) => void;
}

function HotelCard({ hotel, onViewDetail }: { hotel: typeof hotels[0]; onViewDetail: (id: string) => void }) {
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
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img 
          src={hotel.image} 
          alt={hotel.name}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${badge.bg}`}>
            {badge.text}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${isLiked ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
          >
            <Share2 className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Rating Overlay */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-travel-text">{hotel.rating}</span>
          </div>
          <span className="text-white/80 text-sm">({hotel.reviews} reviews)</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-xl text-travel-text mb-1 group-hover:text-travel-blue transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 text-travel-text-secondary">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{hotel.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(hotel.stars)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity, i) => {
            const Icon = amenityIcons[amenity] || Check;
            return (
              <motion.span 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-gray-100 rounded-full text-travel-text-secondary"
              >
                <Icon className="w-3 h-3" />
                {amenity}
              </motion.span>
            );
          })}
          {hotel.amenities.length > 4 && (
            <span className="text-xs px-3 py-1.5 bg-gray-100 rounded-full text-travel-text-secondary">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <motion.div 
              animate={{ scale: isHovered ? 1.05 : 1 }}
              className="flex items-baseline gap-1"
            >
              <span className="text-3xl font-bold text-travel-text">${hotel.price}</span>
              <span className="text-travel-text-secondary">/night</span>
            </motion.div>
            <p className="text-xs text-travel-text-secondary">Includes taxes & fees</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => onViewDetail(hotel.id)}
              className="gradient-blue text-white px-6 py-5 rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
            >
              View Deal
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HotelsPage({ onViewDetail }: HotelsPageProps) {
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
      className="min-h-screen bg-travel-bg pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-travel-green/10 flex items-center justify-center">
              <Hotel className="w-5 h-5 text-travel-green" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-travel-text">Hotels</h1>
          </div>
          <p className="text-travel-text-secondary">Discover perfect stays with AI-curated recommendations</p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-card p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Search hotels, cities, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-xl border-gray-200 focus:border-travel-green"
              />
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 h-14 rounded-xl font-medium transition-all ${
                  showFilters ? 'bg-travel-green text-white' : 'bg-gray-100 text-travel-text hover:bg-gray-200'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filters
              </motion.button>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-14 px-6 pr-10 rounded-xl bg-gray-100 text-travel-text font-medium appearance-none cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
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
            <HotelCard key={hotel.id} hotel={hotel} onViewDetail={onViewDetail} />
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
