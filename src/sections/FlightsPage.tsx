import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronDown,
  X,
  Plus,
  Minus,
  ShieldCheck,
  Briefcase,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { flights } from '@/data/dummyData';

const CITIES = [
  { name: 'Delhi', code: 'DEL', airport: 'Indira Gandhi Intl Airport', country: 'India' },
  { name: 'Mumbai', code: 'BOM', airport: 'Chhatrapati Shivaji Intl', country: 'India' },
  { name: 'Bangalore', code: 'BLR', airport: 'Kempegowda Intl Airport', country: 'India' },
  { name: 'Hyderabad', code: 'HYD', airport: 'Rajiv Gandhi Intl Airport', country: 'India' },
  { name: 'Chennai', code: 'MAA', airport: 'Chennai Intl Airport', country: 'India' },
  { name: 'Kolkata', code: 'CCU', airport: 'Netaji Subhash Chandra Bose Intl', country: 'India' },
  { name: 'Dubai', code: 'DXB', airport: 'Dubai Intl Airport', country: 'UAE' },
  { name: 'London', code: 'LHR', airport: 'Heathrow Airport', country: 'UK' },
  { name: 'New York', code: 'JFK', airport: 'John J. Kennedy Intl', country: 'USA' },
  { name: 'Singapore', code: 'SIN', airport: 'Changi Airport', country: 'Singapore' },
];

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



function FlightCard({
  flight,
  onViewDetail,
  currentFrom,
  currentTo
}: {
  flight: typeof flights[0];
  onViewDetail: (id: string) => void;
  currentFrom: typeof CITIES[0];
  currentTo: typeof CITIES[0];
}) {
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
      <div className="p-3 sm:px-5 sm:py-4">
        {/* Header - Compact Elegant */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-travel-blue/5 transition-colors">
              <Plane className="w-4 h-4 text-travel-blue" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-travel-text leading-tight">{flight.airline}</h3>
              <p className="text-[10px] text-travel-text-secondary font-medium tracking-wider uppercase">{flight.airlineCode} • Economy</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white shadow-sm ${badge.bg}`}>
              <BadgeIcon className="w-2.5 h-2.5" />
              {badge.text}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Flight Route - Compact & Clear */}
        <div className="flex items-center gap-6 mb-4 px-1">
          <div className="w-20 text-center">
            <p className="text-2xl font-black text-travel-text leading-none mb-0.5">{flight.departure}</p>
            <p className="text-[10px] font-bold text-travel-text-secondary uppercase">{currentFrom.code}</p>
          </div>

          <div className="flex-1">
            <div className="relative flex items-center justify-center">
              <div className="w-full h-[1.5px] bg-gray-200 border-t-2 border-dashed border-gray-200" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 flex flex-col items-center">
                <Plane className="w-3.5 h-3.5 text-travel-blue rotate-45 mb-0.5" />
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{flight.duration}</span>
              </div>
            </div>
          </div>

          <div className="w-20 text-center">
            <p className="text-2xl font-black text-travel-text leading-none mb-0.5">{flight.arrival}</p>
            <p className="text-[10px] font-bold text-travel-text-secondary uppercase">{currentTo.code}</p>
          </div>
        </div>

        {/* Info Bars & Price - Compact Separated */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-100/50">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-[10px] font-bold text-travel-text">{flight.rating}</span>
            </div>
            <div className="hidden sm:flex gap-2">
              {flight.features.slice(0, 2).map((feature, i) => (
                <span key={i} className="text-[10px] font-medium text-travel-text-secondary flex items-center gap-1">
                  <Check className="w-3 h-3 text-travel-green" />
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-travel-text leading-none">${flight.price}</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
              </div>
              <p className="text-[8px] text-gray-400 font-medium tracking-wide">Incl. taxes/fees</p>
            </div>
            <Button
              onClick={() => onViewDetail(flight.id)}
              className="gradient-blue text-white h-8 px-5 rounded-lg text-xs font-bold hover:shadow-glow transition-all"
            >
              Select Flight
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FlightsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchState = location.state as any;

  const getCityCode = (str: string) => {
    if (typeof str !== 'string') return '';
    const match = str.match(/\((.*?)\)/);
    return match ? match[1] : str;
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isEditingSearch, setIsEditingSearch] = useState(false);

  // Initialize with search state if available
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip' | 'multiCity'>(searchState?.tripType || 'oneWay');
  const [fromCity, setFromCity] = useState(searchState?.fromCity || CITIES[0]);
  const [toCity, setToCity] = useState(searchState?.toCity || CITIES[1]);
  const [adults, setAdults] = useState(searchState?.adults || 1);
  const [children, setChildren] = useState(searchState?.children || 0);
  const [infants, setInfants] = useState(searchState?.infants || 0);
  const [cabinClass, setCabinClass] = useState(searchState?.cabinClass || 'Economy');

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFareRules, setShowFareRules] = useState(false);
  const [showTravelerDropdown, setShowTravelerDropdown] = useState(false);
  const [multiCityFlights, setMultiCityFlights] = useState(searchState?.multiCityFlights || [
    { id: 1, from: CITIES[0].name + ' (' + CITIES[0].code + ')', to: CITIES[1].name + ' (' + CITIES[1].code + ')', date: '' },
    { id: 2, from: CITIES[1].name + ' (' + CITIES[1].code + ')', to: CITIES[2].name + ' (' + CITIES[2].code + ')', date: '' }
  ]);
  const [activeMultiCityDropdown, setActiveMultiCityDropdown] = useState<{ index: number, type: 'from' | 'to' } | null>(null);

  const addMultiCityFlight = () => {
    if (multiCityFlights.length < 5) {
      setMultiCityFlights([
        ...multiCityFlights,
        { id: Date.now(), from: '', to: '', date: '' }
      ]);
    }
  };

  const removeMultiCityFlight = (id: number) => {
    if (multiCityFlights.length > 2) {
      setMultiCityFlights(multiCityFlights.filter((f: any) => f.id !== id));
    }
  };

  const updateMultiCityFlight = (index: number, type: 'from' | 'to', city: typeof CITIES[0]) => {
    const newFlights = [...multiCityFlights];
    newFlights[index] = {
      ...newFlights[index],
      [type]: `${city.name} (${city.code})`
    };
    setMultiCityFlights(newFlights);
    setActiveMultiCityDropdown(null);
  };

  const handleSwap = (e: React.MouseEvent) => {
    e.stopPropagation();
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const filteredFlights = flights.filter((flight: any) => {
    const matchesSearch = flight.airline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = activeFilters.length === 0 || activeFilters.every((filter: string) => {
      if (filter === 'Non Stop') return flight.duration.includes('0m') || flight.duration.includes('15m');
      if (filter === 'Refundable') return flight.features.includes('Flexible Booking') || flight.features.includes('Complimentary Meal');
      if (filter === 'Air India') return flight.airline === 'Airways X' || flight.airline === 'Airways Y'; // Mocking airline filter
      return true;
    });
    return matchesSearch && matchesFilters;
  });

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-[#f5f7fa] pt-28 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hyper-Compact Premium Search Header */}


        {/* Hyper-Compact Glassmorphism Filters */}
        <motion.div
          variants={itemVariants}
          className="bg-white/70 backdrop-blur-xl rounded-[24px] shadow-[0_8px_32px_0_rgba(31,41,55,0.05)] border border-white/50 p-2 mb-8 flex flex-wrap items-center justify-between gap-4 px-8 relative z-20"
        >
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-travel-blue/10 flex items-center justify-center">
                <Filter className="w-3.5 h-3.5 text-travel-blue" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[9px] font-black text-travel-text uppercase tracking-widest font-montserrat">Filters</h2>
                {(activeFilters.length > 0 || searchQuery) && (
                  <button 
                    onClick={() => { setActiveFilters([]); setSearchQuery(''); }}
                    className="text-[8px] font-bold text-red-500 hover:text-red-600 uppercase tracking-widest transition-colors text-left"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[
                { label: 'Non Stop', icon: Zap },
                { label: 'Refundable', icon: ShieldCheck },
                { label: 'Air India', icon: Plane }
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => toggleFilter(label)}
                  className={`px-4 py-2 text-[8px] font-black uppercase tracking-widest rounded-xl border transition-all flex items-center gap-2 ${activeFilters.includes(label)
                      ? 'bg-travel-blue text-white border-travel-blue shadow-lg shadow-travel-blue/20'
                      : 'bg-gray-50/50 text-gray-500 border-gray-100 hover:border-travel-blue hover:bg-white hover:text-travel-blue'
                    }`}
                >
                  <Icon className={`w-3 h-3 ${activeFilters.includes(label) ? 'text-white' : 'text-travel-blue'}`} />
                  {label}
                </button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${showFilters ? 'bg-travel-text text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
              >
                <Plus className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-45' : ''}`} />
              </motion.button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group/search">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-hover/search:text-travel-blue transition-colors" />
              <input
                placeholder="SEARCH FLIGHTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 rounded-xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-travel-blue/30 focus:ring-8 focus:ring-travel-blue/5 transition-all text-[10px] font-black tracking-[0.1em] text-travel-text outline-none w-48 focus:w-64 shadow-inner placeholder:text-gray-300"
              />
            </div>

            <div className="h-6 w-px bg-gray-100" />

            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest font-montserrat">Sort</span>
              <div className="relative">
                <button 
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50/50 border border-transparent hover:border-travel-blue/20 hover:bg-white transition-all group/sort min-w-[140px] justify-between"
                >
                  <span className="text-[9px] font-black text-travel-text uppercase tracking-widest font-montserrat">
                    {['recommended', 'price-low', 'price-high', 'duration'].find(v => v === sortBy) === 'recommended' && "Recommended"}
                    {sortBy === 'price-low' && "Lowest Price"}
                    {sortBy === 'price-high' && "Highest Price"}
                    {sortBy === 'duration' && "Fastest First"}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${showSortDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showSortDropdown && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setShowSortDropdown(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-100 p-2 z-40 overflow-hidden"
                      >
                        {[
                          { value: 'recommended', label: 'Recommended', icon: Award, color: 'text-travel-orange' },
                          { value: 'price-low', label: 'Lowest Price', icon: TrendingDown, color: 'text-green-500' },
                          { value: 'price-high', label: 'Highest Price', icon: Zap, color: 'text-travel-blue' },
                          { value: 'duration', label: 'Fastest First', icon: Clock, color: 'text-purple-500' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setShowSortDropdown(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group/item ${
                              sortBy === option.value 
                                ? 'bg-travel-blue/5 text-travel-blue' 
                                : 'text-gray-500 hover:bg-gray-50 hover:text-travel-text'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                              sortBy === option.value ? 'bg-travel-blue/10' : 'bg-gray-50 group-hover/item:bg-white'
                            }`}>
                              <option.icon className={`w-3 h-3 ${sortBy === option.value ? 'text-travel-blue' : option.color}`} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">{option.label}</span>
                            {sortBy === option.value && (
                              <div className="ml-auto w-1 h-1 rounded-full bg-travel-blue" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Info Section */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-4">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Found <span className="text-travel-text">{filteredFlights.length}</span> Flights for <span className="text-travel-blue">{fromCity.code}</span> to <span className="text-travel-blue">{toCity.code}</span>
            </p>
            <div className="w-1.5 h-1.5 rounded-full bg-travel-blue animate-pulse" />
          </div>

          <div
            onClick={() => setShowFareRules(true)}
            className="flex items-center gap-2 text-[10px] font-black text-travel-blue hover:text-travel-blue-dark cursor-pointer group uppercase tracking-widest"
          >
            <span>View Fare Rules</span>
            <X className="w-3 h-3 group-hover:translate-x-1 transition-transform rotate-45" />
          </div>
        </motion.div>

        {/* Dynamic Flight Cards */}
        <div className="space-y-4">
          {tripType === 'multiCity' ? (
            multiCityFlights.map((leg: any, idx: number) => (
              <div key={leg.id} className="space-y-4 mb-10 last:mb-0">
                <div className="flex items-center gap-3 px-4 py-2 bg-blue-50/50 rounded-xl w-fit border border-blue-100/50">
                  <div className="w-6 h-6 rounded-lg gradient-blue flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                    {idx + 1}
                  </div>
                  <span className="text-[10px] font-black text-travel-blue uppercase tracking-widest">Flight Leg</span>
                  <div className="w-1 h-1 rounded-full bg-travel-blue opacity-30" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-montserrat">{leg.from || 'Select'} → {leg.to || 'Select'}</span>
                </div>

                <div className="space-y-4">
                  {(filteredFlights.length > 0 ? filteredFlights : flights.slice(0, 3)).slice(0, 2).map((flight: any) => (
                    <FlightCard
                      key={`${leg.id}-${flight.id}`}
                      flight={flight}
                      onViewDetail={(id) => navigate(`/flight/${id}`)}
                      currentFrom={{ code: getCityCode(leg.from), name: (leg.from || '').split(' (')[0] } as any}
                      currentTo={{ code: getCityCode(leg.to), name: (leg.to || '').split(' (')[0] } as any}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : tripType === 'roundTrip' ? (
            <div className="space-y-12">
              {/* Outbound */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-blue-50/50 rounded-xl w-fit border border-blue-100/50">
                  <div className="w-6 h-6 rounded-lg gradient-blue flex items-center justify-center text-white shadow-sm">
                    <Plane className="w-3 h-3" />
                  </div>
                  <span className="text-[10px] font-black text-travel-blue uppercase tracking-widest">Outbound Journey</span>
                  <div className="w-1 h-1 rounded-full bg-travel-blue opacity-30" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-montserrat">{fromCity.name} to {toCity.name}</span>
                </div>
                {filteredFlights.length > 0 ? (
                  filteredFlights.slice(0, 3).map((flight: any) => (
                    <FlightCard
                      key={`out-${flight.id}`}
                      flight={flight}
                      onViewDetail={(id) => navigate(`/flight/${id}`)}
                      currentFrom={fromCity}
                      currentTo={toCity}
                    />
                  ))
                ) : (
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">No outbound flights found</p>
                )}
              </div>

              {/* Return */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-orange-50/50 rounded-xl w-fit border border-orange-100/50">
                  <div className="w-6 h-6 rounded-lg bg-travel-orange flex items-center justify-center text-white shadow-sm">
                    <Plane className="w-3 h-3 rotate-180" />
                  </div>
                  <span className="text-[10px] font-black text-travel-orange uppercase tracking-widest">Return Journey</span>
                  <div className="w-1 h-1 rounded-full bg-travel-orange opacity-30" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-montserrat">{toCity.name} to {fromCity.name}</span>
                </div>
                {filteredFlights.length > 0 ? (
                  filteredFlights.slice(0, 3).map((flight: any) => (
                    <FlightCard
                      key={`ret-${flight.id}`}
                      flight={{ ...flight, id: `ret-${flight.id}` }}
                      onViewDetail={(id) => navigate(`/flight/${id}`)}
                      currentFrom={toCity}
                      currentTo={fromCity}
                    />
                  ))
                ) : (
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">No return flights found</p>
                )}
              </div>
            </div>
          ) : (
            filteredFlights.length > 0 ? (
              filteredFlights.map((flight: any) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onViewDetail={(id) => navigate(`/flight/${id}`)}
                  currentFrom={fromCity}
                  currentTo={toCity}
                />
              ))
            ) : (
              <div className="bg-white rounded-[40px] p-24 text-center shadow-sm border-2 border-dashed border-gray-100">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Plane className="w-12 h-12 text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-travel-text mb-3 uppercase tracking-tight">No Matching Flights</h3>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">We couldn't find any flights matching your criteria. Try adjusting filters or search with different dates.</p>
                <Button
                  variant="outline"
                  className="mt-10 rounded-2xl px-10 py-6 font-black text-xs uppercase tracking-widest border-2"
                  onClick={() => setSearchQuery('')}
                >
                  Clear All Search
                </Button>
              </div>
            )
          )}
        </div>

        {/* Bottom Pagination */}
        {filteredFlights.length > 0 && (
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 bg-white border-2 border-gray-100 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-travel-blue hover:border-travel-blue hover:shadow-2xl hover:shadow-travel-blue/10 transition-all duration-500"
            >
              Show More Flights
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Modify Search Modal Overlay */}
      <AnimatePresence>
        {isEditingSearch && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a223d]/90 backdrop-blur-xl"
              onClick={() => setIsEditingSearch(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="bg-white rounded-[32px] w-full max-w-5xl shadow-[0_40px_100px_-20px_rgba(0,0,20,0.3)] relative z-10 border border-gray-100 max-h-[85vh] flex flex-col overflow-hidden font-montserrat"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header - Fixed */}
              <div className="px-8 lg:px-10 pt-8 lg:pt-10 pb-6 border-b border-gray-50 flex-shrink-0 bg-white z-20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-travel-blue/5 flex items-center justify-center">
                      <Plane className="w-5 h-5 text-travel-blue" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-travel-text uppercase tracking-tight leading-none mb-1">Modify Your Journey</h2>
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-travel-orange" />
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Optimized Search Results</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditingSearch(false)}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all group"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Trip Type Selector */}
                <div className="flex flex-wrap gap-8 bg-[#f8fafc] p-1.5 rounded-[18px] border border-gray-100 w-fit">
                  {[
                    { id: 'oneWay', label: 'One Way' },
                    { id: 'roundTrip', label: 'Round Trip' },
                    { id: 'multiCity', label: 'Multi City' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setTripType(type.id as any)}
                      className={`px-6 py-2.5 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all ${tripType === type.id
                          ? 'bg-white text-travel-blue shadow-sm'
                          : 'text-gray-400 hover:text-travel-text'
                        }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-8 lg:px-10 py-8">
                {tripType === 'multiCity' ? (
                  <div className="space-y-4 mb-8">
                    {multiCityFlights.map((flight: any, index: number) => (
                      <div key={flight.id} className="grid grid-cols-1 md:grid-cols-12 gap-0 border-[1.5px] border-gray-100 rounded-[20px] shadow-sm relative group/row animate-in slide-in-from-left-2 transition-all bg-white mb-4 last:mb-0">
                        <div
                          className="md:col-span-4 p-4 border-b md:border-b-0 md:border-r-[1.5px] border-gray-100 hover:bg-blue-50/20 transition-all cursor-pointer relative"
                          onClick={() => setActiveMultiCityDropdown({ index, type: 'from' })}
                        >
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block font-montserrat text-left">From</span>
                          <div className="text-lg font-black text-travel-text tracking-tight uppercase font-montserrat">
                            {flight.from || 'Select City'}
                          </div>

                          <AnimatePresence>
                            {activeMultiCityDropdown?.index === index && activeMultiCityDropdown?.type === 'from' && (
                              <>
                                <div className="fixed inset-0 z-[110]" onClick={(e) => { e.stopPropagation(); setActiveMultiCityDropdown(null); }} />
                                <motion.div
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                  className="absolute left-0 top-full mt-2 w-[350px] bg-white rounded-2xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.2)] border border-gray-100 z-[120] overflow-hidden"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 font-montserrat text-left">Popular Cities</span>
                                  </div>
                                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                    {CITIES.map((city) => (
                                      <button
                                        key={city.code}
                                        onClick={() => updateMultiCityFlight(index, 'from', city)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 text-left group/btn"
                                      >
                                        <div className="font-montserrat">
                                          <p className="text-sm font-black text-travel-text group-hover/btn:text-travel-blue transition-colors uppercase">{city.name}, {city.country}</p>
                                          <p className="text-[10px] text-gray-400 font-bold uppercase">{city.airport}</p>
                                        </div>
                                        <span className="text-xs font-black text-gray-300 group-hover/btn:text-travel-blue/40 font-montserrat">{city.code}</span>
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>

                        <div
                          className="md:col-span-4 p-4 border-b md:border-b-0 md:border-r-[1.5px] border-gray-100 hover:bg-blue-50/20 transition-all cursor-pointer relative"
                          onClick={() => setActiveMultiCityDropdown({ index, type: 'to' })}
                        >
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block font-montserrat text-left">To</span>
                          <div className="text-lg font-black text-travel-text tracking-tight uppercase font-montserrat">
                            {flight.to || 'Select City'}
                          </div>

                          <AnimatePresence>
                            {activeMultiCityDropdown?.index === index && activeMultiCityDropdown?.type === 'to' && (
                              <>
                                <div className="fixed inset-0 z-[110]" onClick={(e) => { e.stopPropagation(); setActiveMultiCityDropdown(null); }} />
                                <motion.div
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                  className="absolute left-0 top-full mt-2 w-[350px] bg-white rounded-2xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.2)] border border-gray-100 z-[120] overflow-hidden"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 font-montserrat font-left">Popular Cities</span>
                                  </div>
                                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                    {CITIES.map((city) => (
                                      <button
                                        key={city.code}
                                        onClick={() => updateMultiCityFlight(index, 'to', city)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 text-left group/btn"
                                      >
                                        <div className="font-montserrat">
                                          <p className="text-sm font-black text-travel-text group-hover/btn:text-travel-blue transition-colors uppercase">{city.name}, {city.country}</p>
                                          <p className="text-[10px] text-gray-400 font-bold uppercase">{city.airport}</p>
                                        </div>
                                        <span className="text-xs font-black text-gray-300 group-hover/btn:text-travel-blue/40 font-montserrat">{city.code}</span>
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="md:col-span-3 p-4 hover:bg-blue-50/20 transition-all">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block font-montserrat text-left">Departure</span>
                          <input type="date" className="text-lg font-black text-travel-text bg-transparent outline-none w-full h-7 tracking-tight cursor-pointer font-montserrat" />
                        </div>
                        <div className="md:col-span-1 flex items-center justify-center p-2 bg-gray-50/30">
                          {multiCityFlights.length > 2 && (
                            <button
                              onClick={() => removeMultiCityFlight(flight.id)}
                              className="w-8 h-8 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
                      <button
                        onClick={addMultiCityFlight}
                        disabled={multiCityFlights.length >= 5}
                        className="flex items-center gap-2 px-6 py-3 rounded-[16px] text-travel-blue font-black text-[10px] uppercase tracking-[0.15em] bg-blue-50/50 hover:bg-travel-blue hover:text-white transition-all duration-300 disabled:opacity-50 font-montserrat"
                      >
                        <Plus className="w-4 h-4" />
                        Add Flight
                      </button>

                      <div
                        className="p-4 border-[1.5px] border-dashed border-gray-100 rounded-[18px] flex flex-col min-w-[220px] hover:bg-blue-50/20 transition-all cursor-pointer bg-white group/trav relative"
                        onClick={() => setShowTravelerDropdown(!showTravelerDropdown)}
                      >
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block group-hover/trav:text-travel-blue font-montserrat">Travellers & Class</span>
                        <div className="text-sm font-black text-travel-text uppercase tracking-tight leading-none font-montserrat">
                          {(adults + children + infants).toString().padStart(2, '0')} {(adults + children + infants) > 1 ? 'Travellers' : 'Adult'}, {cabinClass}
                        </div>

                        <AnimatePresence>
                          {showTravelerDropdown && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setShowTravelerDropdown(false); }} />
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-[28px] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.2)] border border-gray-100 p-6 z-[100]"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="space-y-5">
                                  {[
                                    { label: 'Adults', sub: '12+ years', state: adults, setState: setAdults, min: 1 },
                                    { label: 'Children', sub: '2-12 years', state: children, setState: setChildren, min: 0 },
                                    { label: 'Infants', sub: 'Under 2 years', state: infants, setState: setInfants, min: 0 },
                                  ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between pb-1">
                                      <div className="flex flex-col text-left">
                                        <span className="text-[11px] font-black text-travel-text uppercase tracking-widest leading-none mb-1">{item.label}</span>
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.sub}</span>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <button
                                          onClick={() => item.setState(Math.max(item.min, item.state - 1))}
                                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${item.state > item.min
                                              ? 'border-travel-blue/20 text-travel-blue hover:bg-travel-blue hover:text-white hover:border-travel-blue'
                                              : 'border-gray-50 text-gray-200 cursor-not-allowed'
                                            }`}
                                        >
                                          <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-sm font-black text-travel-text w-4 text-center font-montserrat">{item.state}</span>
                                        <button
                                          onClick={() => item.setState(Math.min(9, item.state + 1))}
                                          className="w-8 h-8 rounded-full border border-travel-blue/20 flex items-center justify-center text-travel-blue hover:bg-travel-blue hover:text-white hover:border-travel-blue transition-all"
                                        >
                                          <Plus className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}

                                  <div className="pt-4 border-t border-gray-50 text-left">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4 underline decoration-travel-blue/30 underline-offset-4 font-montserrat">Cabin Class</span>
                                    <div className="flex flex-wrap gap-2">
                                      {['Economy', 'Premium', 'Business'].map((cls) => (
                                        <button
                                          key={cls}
                                          onClick={() => setCabinClass(cls)}
                                          className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${cabinClass === cls
                                              ? 'bg-travel-blue text-white shadow-lg shadow-travel-blue/20'
                                              : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-travel-text'
                                            }`}
                                        >
                                          {cls}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <Button
                                    className="w-full mt-2 rounded-[16px] bg-travel-text text-white h-11 font-black text-[10px] uppercase tracking-widest font-montserrat"
                                    onClick={() => setShowTravelerDropdown(false)}
                                  >
                                    Apply Changes
                                  </Button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-[1.5px] border-gray-100 rounded-[20px] shadow-sm bg-white hover:border-gray-200 transition-all duration-300 relative z-30 mb-8">
                    <div
                      className="lg:col-span-3 p-5 border-b lg:border-b-0 lg:border-r-[1.5px] border-gray-100 hover:bg-blue-50/30 transition-all cursor-pointer group/item relative"
                      onClick={() => {
                        setShowFromDropdown(!showFromDropdown);
                        setShowToDropdown(false);
                      }}
                    >
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2 group-hover/item:text-travel-blue transition-colors font-montserrat">From</span>
                      <div className="flex flex-col font-montserrat">
                        <div className="text-xl font-black text-travel-text tracking-tight flex items-baseline gap-2 uppercase">
                          {fromCity.name} <span className="text-sm font-bold text-travel-blue uppercase opacity-60">{fromCity.code}</span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-bold uppercase truncate block mt-0.5">{fromCity.airport}</span>
                      </div>

                      <AnimatePresence>
                        {showFromDropdown && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowFromDropdown(false)} />
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute left-0 top-full mt-2 w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                              onClick={e => e.stopPropagation()}
                            >
                              <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-2 font-montserrat">Popular Cities</span>
                              </div>
                              <div className="max-h-60 overflow-y-auto">
                                {CITIES.map(city => (
                                  <button
                                    key={city.code}
                                    onClick={() => {
                                      setFromCity(city);
                                      setShowFromDropdown(false);
                                    }}
                                    className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors text-left group/btn border-b border-gray-50 last:border-0"
                                  >
                                    <div className="font-montserrat">
                                      <p className="text-xs font-black text-travel-text group-hover/btn:text-travel-blue uppercase">{city.name}, {city.country}</p>
                                      <p className="text-[9px] text-gray-400 font-bold uppercase">{city.airport}</p>
                                    </div>
                                    <span className="text-[10px] font-black text-travel-text/40 group-hover/btn:text-travel-blue font-montserrat">{city.code}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>

                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 hidden lg:block">
                        <div
                          onClick={handleSwap}
                          className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-travel-blue hover:bg-travel-blue hover:text-white transition-all cursor-pointer"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    <div
                      className="lg:col-span-3 p-5 border-b lg:border-b-0 lg:border-r-[1.5px] border-gray-100 hover:bg-blue-50/30 transition-all cursor-pointer group/item relative"
                      onClick={() => {
                        setShowToDropdown(!showToDropdown);
                        setShowFromDropdown(false);
                      }}
                    >
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2 group-hover/item:text-travel-blue transition-colors font-montserrat">To</span>
                      <div className="flex flex-col font-montserrat">
                        <div className="text-xl font-black text-travel-text tracking-tight flex items-baseline gap-2 uppercase">
                          {toCity.name} <span className="text-sm font-bold text-travel-blue uppercase opacity-60">{toCity.code}</span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-bold uppercase truncate block mt-0.5">{toCity.airport}</span>
                      </div>

                      <AnimatePresence>
                        {showToDropdown && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowToDropdown(false)} />
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute left-0 top-full mt-2 w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                              onClick={e => e.stopPropagation()}
                            >
                              <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-2 font-montserrat">Popular Cities</span>
                              </div>
                              <div className="max-h-60 overflow-y-auto">
                                {CITIES.map(city => (
                                  <button
                                    key={city.code}
                                    onClick={() => {
                                      setToCity(city);
                                      setShowToDropdown(false);
                                    }}
                                    className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors text-left group/btn border-b border-gray-50 last:border-0"
                                  >
                                    <div className="font-montserrat">
                                      <p className="text-xs font-black text-travel-text group-hover/btn:text-travel-blue uppercase">{city.name}, {city.country}</p>
                                      <p className="text-[9px] text-gray-400 font-bold uppercase">{city.airport}</p>
                                    </div>
                                    <span className="text-[10px] font-black text-travel-text/40 group-hover/btn:text-travel-blue font-montserrat">{city.code}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="lg:col-span-2 p-5 border-b lg:border-b-0 lg:border-r-[1.5px] border-gray-100 hover:bg-blue-50/30 transition-all cursor-pointer group/item relative text-center lg:text-left">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2 group-hover/item:text-travel-blue transition-colors font-montserrat">Departure</span>
                      <div className="flex flex-col font-montserrat">
                        <div className="text-xl font-black text-travel-text tracking-tight flex items-baseline gap-2 justify-center lg:justify-start">
                          15 <span className="text-sm font-bold text-travel-blue uppercase opacity-60">Mar</span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-bold uppercase block mt-0.5">Friday, '24</span>
                      </div>
                    </div>

                    <div className={`lg:col-span-2 p-5 border-b lg:border-b-0 lg:border-r-[1.5px] border-gray-100 transition-all cursor-pointer group/item relative text-center lg:text-left ${tripType === 'oneWay' ? 'bg-[#fafafa] cursor-not-allowed opacity-30 select-none' : 'hover:bg-blue-50/30'
                      }`}>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2 group-hover/item:text-travel-blue transition-colors font-montserrat">Return</span>
                      <div className="flex flex-col font-montserrat">
                        <div className="text-xl font-black text-travel-text tracking-tight flex items-baseline gap-2 justify-center lg:justify-start">
                          18 <span className="text-sm font-bold text-travel-blue uppercase opacity-60">Mar</span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-bold uppercase block mt-0.5">Monday, '24</span>
                      </div>
                    </div>

                    <div
                      className="lg:col-span-2 p-5 hover:bg-blue-50/30 transition-all cursor-pointer group/item relative text-center lg:text-left"
                      onClick={() => {
                        setShowTravelerDropdown(!showTravelerDropdown);
                        setShowFromDropdown(false);
                        setShowToDropdown(false);
                      }}
                    >
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2 group-hover/item:text-travel-blue transition-colors font-montserrat">Travellers</span>
                      <div className="flex flex-col font-montserrat">
                        <div className="text-sm font-black text-travel-text tracking-tight leading-none mb-1 uppercase">
                          {(adults + children + infants).toString().padStart(2, '0')} {(adults + children + infants) > 1 ? 'Travellers' : 'Adult'}
                        </div>
                        <span className="text-[9px] text-gray-400 font-bold uppercase">{cabinClass}</span>
                      </div>

                      <AnimatePresence>
                        {showTravelerDropdown && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setShowTravelerDropdown(false); }} />
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute top-full right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-[28px] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.2)] border border-gray-100 p-6 z-[100]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="space-y-5">
                                {[
                                  { label: 'Adults', sub: '12+ years', state: adults, setState: setAdults, min: 1 },
                                  { label: 'Children', sub: '2-12 years', state: children, setState: setChildren, min: 0 },
                                  { label: 'Infants', sub: 'Under 2 years', state: infants, setState: setInfants, min: 0 },
                                ].map((item) => (
                                  <div key={item.label} className="flex items-center justify-between pb-1">
                                    <div className="flex flex-col text-left">
                                      <span className="text-[11px] font-black text-travel-text uppercase tracking-widest leading-none mb-1">{item.label}</span>
                                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.sub}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <button
                                        onClick={() => item.setState(Math.max(item.min, item.state - 1))}
                                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${item.state > item.min
                                            ? 'border-travel-blue/20 text-travel-blue hover:bg-travel-blue hover:text-white hover:border-travel-blue'
                                            : 'border-gray-50 text-gray-200 cursor-not-allowed'
                                          }`}
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="text-sm font-black text-travel-text w-4 text-center font-montserrat">{item.state}</span>
                                      <button
                                        onClick={() => item.setState(Math.min(9, item.state + 1))}
                                        className="w-8 h-8 rounded-full border border-travel-blue/20 flex items-center justify-center text-travel-blue hover:bg-travel-blue hover:text-white hover:border-travel-blue transition-all"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                ))}

                                <div className="pt-4 border-t border-gray-50 text-left">
                                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4 underline decoration-travel-blue/30 underline-offset-4 font-montserrat">Cabin Class</span>
                                  <div className="flex flex-wrap gap-2">
                                    {['Economy', 'Premium', 'Business'].map((cls) => (
                                      <button
                                        key={cls}
                                        onClick={() => setCabinClass(cls)}
                                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${cabinClass === cls
                                            ? 'bg-travel-blue text-white shadow-lg shadow-travel-blue/20'
                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-travel-text'
                                          }`}
                                      >
                                        {cls}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <Button
                                  className="w-full mt-2 rounded-[16px] bg-travel-text text-white h-11 font-black text-[10px] uppercase tracking-widest font-montserrat"
                                  onClick={() => setShowTravelerDropdown(false)}
                                >
                                  Apply Changes
                                </Button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer - Fixed */}
              <div className="px-8 lg:px-10 py-6 border-t border-gray-50 flex-shrink-0 bg-gray-50/20 z-20">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-travel-orange/10 flex items-center justify-center">
                      <Sparkles className="w-4.5 h-4.5 text-travel-orange animate-pulse" />
                    </div>
                    <div className="flex flex-col font-montserrat">
                      <span className="text-[10px] font-black uppercase tracking-widest text-travel-text">Live Price Match</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Checking 150+ travel patterns</span>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setIsEditingSearch(false)}
                      className="flex-1 sm:flex-none px-8 py-4 rounded-[16px] font-black text-[9px] uppercase tracking-[0.2em] text-gray-400 border border-gray-100 hover:bg-gray-50 transition-all font-montserrat"
                    >
                      Dismiss
                    </button>
                    <Button
                      className="flex-1 sm:flex-none gradient-blue text-white px-10 py-4 rounded-[16px] font-black text-[9px] uppercase tracking-[0.2em] shadow-xl shadow-travel-blue/20 hover:shadow-glow transition-all active:scale-95 font-montserrat"
                      onClick={() => setIsEditingSearch(false)}
                    >
                      Update Results
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fare Rules Modal */}
      <AnimatePresence>
        {showFareRules && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a223d]/80 backdrop-blur-md"
              onClick={() => setShowFareRules(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 border border-gray-100"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-travel-blue/10 flex items-center justify-center text-travel-blue">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-travel-text uppercase tracking-tight">Fare Rules & Policy</h2>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{fromCity.code} → {toCity.code} Flight</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFareRules(false)}
                    className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Baggage Policy */}
                  <div className="bg-blue-50/30 rounded-2xl p-5 border border-blue-100/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="w-4 h-4 text-travel-blue" />
                      <h3 className="text-[11px] font-black text-travel-text uppercase tracking-widest">Baggage Allowance</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-xl border border-blue-100/30">
                        <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Cabin Baggage</span>
                        <p className="text-sm font-black text-travel-text">7 Kgs (01 Piece per pax)</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-blue-100/30">
                        <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Check-in Baggage</span>
                        <p className="text-sm font-black text-travel-text">15 Kgs (01 Piece per pax)</p>
                      </div>
                    </div>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="bg-orange-50/30 rounded-2xl p-5 border border-orange-100/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-travel-orange" />
                      <h3 className="text-[11px] font-black text-travel-text uppercase tracking-widest">Cancellation Charges</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-orange-100/20">
                        <span className="text-[10px] font-bold text-gray-500">0 - 2 Hours before departure</span>
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-wider">Non-Refundable</span>
                      </div>
                      <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-orange-100/20">
                        <span className="text-[10px] font-bold text-gray-500">2 - 24 Hours before departure</span>
                        <span className="text-[10px] font-black text-travel-text">$120 / pax</span>
                      </div>
                      <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-orange-100/20">
                        <span className="text-[10px] font-bold text-gray-500">More than 24 Hours</span>
                        <span className="text-[10px] font-black text-travel-text">$80 / pax</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                    * Terms and conditions apply. Fare rules are subject to change by the airline without prior notice.
                  </p>
                  <Button
                    onClick={() => setShowFareRules(false)}
                    className="mt-6 w-full rounded-2xl bg-travel-text text-white py-6 font-black text-xs uppercase tracking-widest"
                  >
                    Got It, Thanks
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
