import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Search, 
  Filter, 
  ArrowRightLeft,
  Star,
  Check,
  Heart,
  Share2,
  Sparkles,
  TrendingDown,
  Zap,
  Award,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { flights } from '@/data/dummyData';

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

interface FlightsPageProps {
  onViewDetail: (id: string) => void;
}

function FlightCard({ flight, onViewDetail }: { flight: typeof flights[0]; onViewDetail: (id: string) => void }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getBadgeStyles = (badge?: string) => {
    switch (badge) {
      case 'Best Deal':
        return { bg: 'bg-green-500', icon: TrendingDown, text: 'Best Deal' };
      case 'Fastest':
        return { bg: 'bg-travel-blue', icon: Zap, text: 'Fastest' };
      case 'Popular':
        return { bg: 'bg-travel-orange', icon: Award, text: 'Popular' };
      case 'AI Pick':
        return { bg: 'gradient-ai', icon: Sparkles, text: 'AI Pick' };
      default:
        return { bg: 'bg-gray-500', icon: Star, text: '' };
    }
  };

  const badge = getBadgeStyles(flight.badge);
  const BadgeIcon = badge.icon;

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden group"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              animate={{ rotate: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-travel-blue/20 to-travel-green/20 flex items-center justify-center"
            >
              <Plane className="w-7 h-7 text-travel-blue" />
            </motion.div>
            <div>
              <h3 className="font-bold text-lg text-travel-text">{flight.airline}</h3>
              <p className="text-sm text-travel-text-secondary">{flight.airlineCode} • Economy Class</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-red-50' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>
        </div>

        {/* Flight Route */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <motion.p 
              animate={{ scale: isHovered ? 1.1 : 1 }}
              className="text-3xl font-bold text-travel-text"
            >
              {flight.departure}
            </motion.p>
            <p className="text-sm text-travel-text-secondary">{flight.fromCode}</p>
          </div>

          <div className="flex-1 px-6">
            <div className="relative">
              <div className="border-t-2 border-dashed border-gray-300" />
              <motion.div 
                animate={{ x: isHovered ? 20 : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute top-1/2 left-0 -translate-y-1/2"
              >
                <div className="w-8 h-8 rounded-full bg-travel-blue flex items-center justify-center shadow-lg">
                  <Plane className="w-4 h-4 text-white rotate-90" />
                </div>
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3">
                <span className="text-xs text-travel-text-secondary font-medium">{flight.duration}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <motion.p 
              animate={{ scale: isHovered ? 1.1 : 1 }}
              className="text-3xl font-bold text-travel-text"
            >
              {flight.arrival}
            </motion.p>
            <p className="text-sm text-travel-text-secondary">{flight.toCode}</p>
          </div>
        </div>

        {/* Features & Rating */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(flight.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-1 text-sm font-medium text-travel-text">{flight.rating}</span>
            </div>
            <div className="flex gap-2">
              {flight.features.slice(0, 2).map((feature, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-travel-text-secondary">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white ${badge.bg}`}>
            <BadgeIcon className="w-3 h-3" />
            {badge.text}
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <motion.p 
              animate={{ scale: isHovered ? 1.05 : 1 }}
              className="text-3xl font-bold text-travel-text"
            >
              ${flight.price}
            </motion.p>
            <p className="text-sm text-travel-text-secondary">per person</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => onViewDetail(flight.id)}
              className="gradient-blue text-white px-8 py-5 rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
            >
              View Details
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Expandable Details */}
      {isHovered && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 px-6 pb-6 overflow-hidden"
        >
          <div className="pt-4 grid grid-cols-3 gap-4">
            {flight.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-travel-text-secondary">
                <Check className="w-4 h-4 text-travel-success" />
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function FlightsPage({ onViewDetail }: FlightsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  const filteredFlights = flights.filter(flight => 
    flight.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.to.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="w-10 h-10 rounded-xl bg-travel-blue/10 flex items-center justify-center">
              <Plane className="w-5 h-5 text-travel-blue" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-travel-text">Flights</h1>
          </div>
          <p className="text-travel-text-secondary">Find the best flights with AI-powered recommendations</p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-card p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Search flights, airlines, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-xl border-gray-200 focus:border-travel-blue"
              />
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 h-14 rounded-xl font-medium transition-all ${
                  showFilters ? 'bg-travel-blue text-white' : 'bg-gray-100 text-travel-text hover:bg-gray-200'
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
                  <label className="block text-sm font-medium text-travel-text mb-2">Price Range</label>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Min" className="rounded-lg" />
                    <span className="text-gray-400">-</span>
                    <Input placeholder="Max" className="rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-travel-text mb-2">Airlines</label>
                  <div className="space-y-2">
                    {['Airways X', 'Airways Y', 'Airways Z'].map((airline) => (
                      <label key={airline} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-travel-blue focus:ring-travel-blue" />
                        <span className="text-sm text-travel-text-secondary">{airline}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-travel-text mb-2">Stops</label>
                  <div className="space-y-2">
                    {['Non-stop', '1 Stop', '2+ Stops'].map((stop) => (
                      <label key={stop} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-travel-blue focus:ring-travel-blue" />
                        <span className="text-sm text-travel-text-secondary">{stop}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-travel-text mb-2">Departure Time</label>
                  <div className="space-y-2">
                    {['Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)'].map((time) => (
                      <label key={time} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-travel-blue focus:ring-travel-blue" />
                        <span className="text-sm text-travel-text-secondary">{time}</span>
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
            Showing <span className="font-semibold text-travel-text">{filteredFlights.length}</span> flights
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-travel-text-secondary">From</span>
            <span className="font-bold text-travel-text">Delhi (DEL)</span>
            <ArrowRightLeft className="w-4 h-4 text-gray-400" />
            <span className="font-bold text-travel-text">Mumbai (BOM)</span>
          </div>
        </motion.div>

        {/* Flight Cards */}
        <div className="space-y-6">
          {filteredFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} onViewDetail={onViewDetail} />
          ))}
        </div>

        {/* Load More */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white rounded-xl shadow-card text-travel-text font-medium hover:shadow-card-hover transition-shadow"
          >
            Load More Flights
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
