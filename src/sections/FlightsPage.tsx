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
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 overflow-hidden group"
    >
      <div className="p-4 sm:p-5">
        {/* Header - Compact */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-travel-blue/5 transition-colors">
              <Plane className="w-5 h-5 text-travel-blue" />
            </div>
            <div>
              <h3 className="font-bold text-base text-travel-text leading-tight">{flight.airline}</h3>
              <p className="text-[11px] text-travel-text-secondary font-medium tracking-wide uppercase">{flight.airlineCode} • Economy</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm ${badge.bg}`}>
              <BadgeIcon className="w-3 h-3" />
              {badge.text}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Flight Route - Compact & Symmetrical */}
        <div className="flex items-center gap-6 mb-5 px-2">
          <div className="w-20 text-center">
            <p className="text-2xl font-bold text-travel-text leading-none mb-1">{flight.departure}</p>
            <p className="text-[11px] font-bold text-travel-text-secondary uppercase">{flight.fromCode}</p>
          </div>

          <div className="flex-1">
            <div className="relative flex items-center justify-center">
              <div className="w-full h-[1px] bg-gray-200 border-t border-dashed border-gray-300" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 flex flex-col items-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mb-1">{flight.duration}</span>
                <Plane className="w-3.5 h-3.5 text-travel-blue rotate-90" />
              </div>
            </div>
          </div>

          <div className="w-20 text-center">
            <p className="text-2xl font-bold text-travel-text leading-none mb-1">{flight.arrival}</p>
            <p className="text-[11px] font-bold text-travel-text-secondary uppercase">{flight.toCode}</p>
          </div>
        </div>

        {/* Info Bars & Price - Unified Row */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md border border-yellow-100/50">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-bold text-travel-text">{flight.rating}</span>
            </div>
            <div className="hidden sm:flex gap-2">
              {flight.features.slice(0, 2).map((feature, i) => (
                <span key={i} className="text-[10px] font-medium text-travel-text-secondary flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-travel-green" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-travel-text leading-none">${flight.price}</span>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Total</span>
              </div>
              <p className="text-[9px] text-gray-400 font-medium">Incl. taxes & fees</p>
            </div>
            <Button 
              onClick={() => onViewDetail(flight.id)}
              className="gradient-blue text-white h-9 px-6 rounded-lg text-xs font-bold hover:shadow-glow transition-all"
            >
              Select Flight
            </Button>
          </div>
        </div>
      </div>
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
      className="min-h-screen bg-travel-bg pt-28 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header & Search Bar */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-card p-3 mb-6">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* Title Section - Integrated */}
            <div className="flex items-center gap-3 pr-4 lg:border-r border-gray-100 min-w-max">
              <div className="w-9 h-9 rounded-lg bg-travel-blue/10 flex items-center justify-center">
                <Plane className="w-5 h-5 text-travel-blue" />
              </div>
              <h1 className="text-xl font-bold text-travel-text">Flights</h1>
            </div>

            {/* Search Input - Compact */}
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search flights, airlines, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl border-gray-100 focus:border-travel-blue bg-gray-50/50"
              />
            </div>

            {/* Actions - Compact */}
            <div className="flex gap-2 w-full lg:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 h-11 rounded-xl text-sm font-bold transition-all ${
                  showFilters ? 'bg-travel-blue text-white' : 'bg-gray-50 text-travel-text hover:bg-gray-100 border border-gray-100'
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
