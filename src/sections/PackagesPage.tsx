import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Search, 
  Filter, 
  Star,
  MapPin,
  Clock,
  Heart,
  Check,
  ChevronDown,
  ArrowRight,
  Users,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { packages } from '@/data/dummyData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

interface PackagesPageProps {
  onViewDetail: (id: string) => void;
}

function PackageCard({ pkg, featured = false, onViewDetail }: { pkg: typeof packages[0]; featured?: boolean; onViewDetail: (id: string) => void }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getBadgeStyles = (badge?: string) => {
    switch (badge) {
      case 'Best Deal':
        return { bg: 'bg-green-500', text: 'Best Deal' };
      case 'Popular':
        return { bg: 'bg-travel-orange', text: 'Popular' };
      case 'AI Pick':
        return { bg: 'gradient-ai', text: 'AI Pick' };
      case 'Limited Offer':
        return { bg: 'bg-red-500', text: 'Limited' };
      default:
        return { bg: 'bg-gray-500', text: '' };
    }
  };

  const badge = getBadgeStyles(pkg.badge);

  if (featured) {
    return (
      <motion.div
        variants={itemVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="md:col-span-2 bg-white rounded-2xl shadow-sm hover:shadow-card-hover border border-gray-100 transition-all duration-500 overflow-hidden group"
      >
        <div className="grid md:grid-cols-5 h-full">
          {/* Image - Compact ratio */}
          <div className="relative h-44 md:h-full md:col-span-2 overflow-hidden">
            <motion.img 
              src={pkg.image} 
              alt={pkg.name}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            
            {/* Badge - Compact */}
            <div className="absolute top-2.5 left-2.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-bold text-white shadow-lg ${badge.bg} border border-white/10 backdrop-blur-sm`}>
                <Sparkles className="w-2.5 h-2.5" />
                {badge.text}
              </span>
            </div>

            {/* Rating - Compact */}
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-lg shadow-sm border border-gray-100">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-[10px] text-travel-text">{pkg.rating}</span>
            </div>
          </div>

          {/* Content - Compact */}
          <div className="p-4 md:col-span-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-1.5">
                <h3 className="font-bold text-lg text-travel-text group-hover:text-travel-blue transition-colors leading-tight">
                  {pkg.name}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${isLiked ? 'bg-red-50 text-red-500 shadow-sm' : 'bg-gray-50 text-gray-400'}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>
              </div>
              
              <div className="flex items-center gap-3 mb-2.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-travel-blue opacity-70" />
                  {pkg.destination}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-travel-blue opacity-70" />
                  {pkg.duration}
                </span>
              </div>

              <p className="text-[12px] text-gray-500 line-clamp-2 mb-3 leading-relaxed font-medium">
                Experience the pinnacle of {pkg.destination} with our premium AI-curated itinerary.
              </p>

              {/* Includes - Compact Grid */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
                {pkg.includes.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                    <Check className="w-2.5 h-2.5 text-green-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Price & CTA - Compact Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-bold text-travel-text tracking-tighter">${pkg.price}</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Per Head</span>
              </div>
              <Button 
                onClick={() => onViewDetail(pkg.id)}
                className="gradient-blue text-white px-4 h-9 rounded-xl text-[11px] font-bold shadow-glow-blue transition-all flex items-center gap-1.5"
              >
                View Package
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-card-hover border border-gray-100 transition-all duration-500 overflow-hidden group flex flex-col"
    >
      {/* Image - Compact height */}
      <div className="relative h-40 overflow-hidden">
        <motion.img 
          src={pkg.image} 
          alt={pkg.name}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Badge - Compact */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-bold text-white shadow-sm ${badge.bg} border border-white/10 backdrop-blur-sm`}>
            <Sparkles className="w-2.5 h-2.5" />
            {badge.text}
          </span>
        </div>

        {/* Actions - Compact */}
        <div className="absolute top-2.5 right-2.5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all backdrop-blur-md ${isLiked ? 'bg-red-500 text-white shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Rating - Compact */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-lg border border-gray-100">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-[10px] text-travel-text">{pkg.rating}</span>
        </div>
      </div>

      {/* Content - Compact */}
      <div className="p-3.5 flex flex-col flex-1">
        <h3 className="font-bold text-base text-travel-text mb-1 group-hover:text-travel-blue transition-colors leading-tight line-clamp-1">
          {pkg.name}
        </h3>
        
        <div className="flex items-center gap-2.5 mb-2.5 text-[9px] font-bold text-gray-400 border-b border-gray-50 pb-2 uppercase tracking-widest">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-travel-blue opacity-70" />
            {pkg.destination}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-travel-blue opacity-70" />
            {pkg.duration}
          </span>
        </div>

        {/* Includes - Micro List */}
        <div className="space-y-1.5 mb-3 flex-1">
          {pkg.includes.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
              <Check className="w-2.5 h-2.5 text-green-500" />
              {item}
            </div>
          ))}
        </div>

        {/* Price & CTA - Compact row */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-0.5">
            <span className="text-xl font-bold text-travel-text tracking-tighter">${pkg.price}</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Per Head</span>
          </div>
          <Button 
            onClick={() => onViewDetail(pkg.id)}
            className="gradient-blue text-white px-3.5 h-8 rounded-lg text-[10px] font-bold shadow-glow-blue transition-all"
          >
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PackagesPage({ onViewDetail }: PackagesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  const filteredPackages = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchQuery.toLowerCase())
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
              <div className="w-9 h-9 rounded-lg bg-travel-orange/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-travel-orange" />
              </div>
              <h1 className="text-xl font-bold text-travel-text">Packages</h1>
            </div>

            {/* Search Input - Compact */}
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search packages, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl border-gray-100 focus:border-travel-orange bg-gray-50/50"
              />
            </div>

            {/* Actions - Compact */}
            <div className="flex gap-2 w-full lg:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 h-11 rounded-xl text-sm font-bold transition-all ${
                  showFilters ? 'bg-travel-orange text-white' : 'bg-gray-100 text-travel-text hover:bg-gray-200 border border-gray-100'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </motion.button>
              <div className="relative flex-1 lg:flex-none">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-11 w-full lg:w-40 px-4 pr-9 rounded-xl bg-gray-100 text-travel-text text-sm font-bold appearance-none cursor-pointer hover:bg-gray-200 border border-gray-100 transition-colors"
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
                  <label className="block text-sm font-medium text-travel-text mb-2">Price per person</label>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Min" className="rounded-lg" />
                    <span className="text-gray-400">-</span>
                    <Input placeholder="Max" className="rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-travel-text mb-2">Duration</label>
                  <div className="flex gap-2">
                    {['3-5 days', '1 week', '2+ weeks'].map((duration) => (
                      <button key={duration} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors">
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-travel-text mb-2">Includes</label>
                  <div className="space-y-2">
                    {['Flights', 'Hotel', 'Meals', 'Transfers'].map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-travel-orange focus:ring-travel-orange" />
                        <span className="text-sm text-travel-text-secondary">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-travel-text mb-2">Travelers</label>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <select className="flex-1 h-10 rounded-lg border border-gray-200 px-3 text-sm">
                      <option>2 Travelers</option>
                      <option>4 Travelers</option>
                      <option>6+ Travelers</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
          <p className="text-travel-text-secondary">
            Showing <span className="font-semibold text-travel-text">{filteredPackages.length}</span> packages
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, index) => (
            <PackageCard 
              key={pkg.id} 
              pkg={pkg} 
              featured={index === 0}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>

        {/* Load More */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white rounded-xl shadow-card text-travel-text font-medium hover:shadow-card-hover transition-shadow"
          >
            Load More Packages
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
