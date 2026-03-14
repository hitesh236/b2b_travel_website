import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Star,
  Clock,
  MapPin,
  Plane,
  Hotel as HotelIcon,
  Package as PackageIcon,
  ArrowRight,
  Check,
  Zap,
  TrendingDown,
  Award,
} from 'lucide-react';
import { flights, hotels, packages } from '@/data/dummyData';

const tabs = [
  { id: 'flights', label: 'Flights', icon: Plane, color: 'text-travel-blue', bg: 'bg-travel-blue' },
  { id: 'hotels', label: 'Hotels', icon: HotelIcon, color: 'text-travel-green', bg: 'bg-travel-green' },
  { id: 'packages', label: 'Packages', icon: PackageIcon, color: 'text-travel-orange', bg: 'bg-travel-orange' },
];

interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  price: string;
  priceSuffix: string;
  rating: number;
  badge?: string;
  image: string;
  features: string[];
}

const getBadgeStyle = (badge?: string) => {
  switch (badge) {
    case 'Best Deal': return { cls: 'bg-emerald-500 text-white', icon: TrendingDown };
    case 'AI Pick': return { cls: 'bg-purple-500 text-white', icon: Sparkles };
    case 'Popular': return { cls: 'bg-travel-orange text-white', icon: Award };
    case 'Fastest': return { cls: 'bg-travel-blue text-white', icon: Zap };
    case 'Top Rated': return { cls: 'bg-yellow-500 text-white', icon: Star };
    case 'Limited Offer': return { cls: 'bg-red-500 text-white', icon: Zap };
    default: return { cls: 'bg-gray-400 text-white', icon: Sparkles };
  }
};

export default function AIRecommendations() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('flights');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeTabData = tabs.find(t => t.id === activeTab)!;

  const flightItems: CardItem[] = flights.slice(0, 4).map(f => ({
    id: f.id,
    title: f.airline,
    subtitle: `${f.fromCode} → ${f.toCode}`,
    meta: f.duration,
    price: `$${f.price}`,
    priceSuffix: 'per person',
    rating: f.rating,
    badge: f.badge as string | undefined,
    image: f.image,
    features: f.features.slice(0, 2),
  }));

  const hotelItems: CardItem[] = hotels.slice(0, 4).map(h => ({
    id: h.id,
    title: h.name,
    subtitle: h.location,
    meta: `${h.stars}★ Hotel`,
    price: `$${h.price}`,
    priceSuffix: 'per night',
    rating: h.rating,
    badge: h.badge as string | undefined,
    image: h.image,
    features: h.amenities?.slice(0, 2) || [],
  }));

  const packageItems: CardItem[] = packages.slice(0, 4).map(p => ({
    id: p.id,
    title: p.name,
    subtitle: p.destination,
    meta: p.duration,
    price: `$${p.price}`,
    priceSuffix: 'per person',
    rating: p.rating,
    badge: p.badge as string | undefined,
    image: p.image,
    features: p.includes?.slice(0, 2) || [],
  }));

  const itemsMap: Record<string, CardItem[]> = {
    flights: flightItems,
    hotels: hotelItems,
    packages: packageItems,
  };

  const currentItems = itemsMap[activeTab];

  const routeMap: Record<string, string> = {
    flights: '/flights',
    hotels: '/hotels',
    packages: '/packages',
  };

  return (
    <section
      id="recommendations"
      ref={sectionRef}
      className="py-24 bg-[#f5f7fa] relative overflow-hidden"
    >
      {/* Subtle decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-travel-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-travel-orange/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-14 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-travel-blue/10 mb-5">
            <Sparkles className="w-4 h-4 text-travel-blue" />
            <span className="text-sm font-semibold text-travel-blue tracking-wide">AI-Powered Picks</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-travel-text mb-3">
            Top Picks Just For You
          </h2>
          <p className="text-travel-text-secondary max-w-xl mx-auto">
            Our AI scans millions of options to surface the best flights, hotels & packages in seconds.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={`flex justify-center mb-10 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 gap-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? `${tab.bg} text-white shadow-md`
                      : 'text-gray-500 hover:text-travel-text hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {currentItems.map((item, index) => {
              const badge = getBadgeStyle(item.badge);
              const BadgeIcon = badge.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.12)' }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group transition-all duration-300"
                  onClick={() => navigate(routeMap[activeTab])}
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-2.5 left-2.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${badge.cls}`}>
                          <BadgeIcon className="w-3 h-3" />
                          {item.badge}
                        </span>
                      </div>
                    )}

                    {/* Rating */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-[10px] font-bold">{item.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-travel-text text-sm mb-1 truncate group-hover:text-travel-blue transition-colors">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[80px]">{item.subtitle}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.meta}</span>
                      </div>
                    </div>

                    {/* One key feature */}
                    {item.features[0] && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <Check className="w-3 h-3 text-travel-green flex-shrink-0" />
                        <span className="text-[10px] text-gray-500 truncate">{item.features[0]}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <div>
                        <p className="text-lg font-bold text-travel-text leading-none">{item.price}</p>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest">{item.priceSuffix}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-xl ${activeTabData.bg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <div className={`mt-10 text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => navigate(routeMap[activeTab])}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 border-2 hover:shadow-lg group ${
              activeTab === 'flights'
                ? 'border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white'
                : activeTab === 'hotels'
                ? 'border-travel-green text-travel-green hover:bg-travel-green hover:text-white'
                : 'border-travel-orange text-travel-orange hover:bg-travel-orange hover:text-white'
            }`}
          >
            View All {activeTabData.label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
