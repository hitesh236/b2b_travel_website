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
        className="md:col-span-2 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden group"
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative h-64 md:h-full overflow-hidden">
            <motion.img 
              src={pkg.image} 
              alt={pkg.name}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:bg-gradient-to-t md:from-black/50 md:to-transparent" />
            
            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold text-white ${badge.bg}`}>
                <Sparkles className="w-4 h-4" />
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
            </div>

            {/* Rating */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-travel-text">{pkg.rating}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <h3 className="font-bold text-2xl text-travel-text mb-2 group-hover:text-travel-blue transition-colors">
              {pkg.name}
            </h3>
            
            <div className="flex items-center gap-4 mb-4 text-travel-text-secondary">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {pkg.destination}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {pkg.duration}
              </span>
            </div>

            <p className="text-travel-text-secondary mb-6">
              Experience the best of {pkg.destination} with our carefully curated package including flights, accommodation, and exclusive experiences.
            </p>

            {/* Includes */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {pkg.includes.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-travel-text-secondary"
                >
                  <Check className="w-4 h-4 text-travel-success" />
                  {item}
                </motion.div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div>
                <motion.div 
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  className="flex items-baseline gap-1"
                >
                  <span className="text-4xl font-bold text-travel-text">${pkg.price}</span>
                  <span className="text-travel-text-secondary">/person</span>
                </motion.div>
                <p className="text-xs text-travel-text-secondary">All inclusive</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => onViewDetail(pkg.id)}
                  className="gradient-blue text-white px-8 py-6 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 flex items-center gap-2"
                >
                  Explore Package
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
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
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          src={pkg.image} 
          alt={pkg.name}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white ${badge.bg}`}>
            <Sparkles className="w-3 h-3" />
            {badge.text}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${isLiked ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
          </motion.button>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-travel-text">{pkg.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-travel-text mb-1 group-hover:text-travel-blue transition-colors">
          {pkg.name}
        </h3>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-travel-text-secondary">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {pkg.destination}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {pkg.duration}
          </span>
        </div>

        {/* Includes */}
        <div className="space-y-2 mb-4">
          {pkg.includes.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-travel-text-secondary">
              <Check className="w-4 h-4 text-travel-success" />
              {item}
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <motion.div 
              animate={{ scale: isHovered ? 1.05 : 1 }}
              className="flex items-baseline gap-1"
            >
              <span className="text-2xl font-bold text-travel-text">${pkg.price}</span>
              <span className="text-sm text-travel-text-secondary">/person</span>
            </motion.div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => onViewDetail(pkg.id)}
              className="gradient-blue text-white px-6 py-5 rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
            >
              View Details
            </Button>
          </motion.div>
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
      className="min-h-screen bg-travel-bg pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-travel-orange/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-travel-orange" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-travel-text">Packages</h1>
          </div>
          <p className="text-travel-text-secondary">All-inclusive travel packages curated by AI for the best experience</p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-card p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Search packages, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-xl border-gray-200 focus:border-travel-orange"
              />
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 h-14 rounded-xl font-medium transition-all ${
                  showFilters ? 'bg-travel-orange text-white' : 'bg-gray-100 text-travel-text hover:bg-gray-200'
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
