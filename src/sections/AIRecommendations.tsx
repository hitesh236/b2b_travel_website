import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Star, 
  Clock, 
  MapPin, 
  Plane, 
  Hotel as HotelIcon, 
  Package as PackageIcon,
  ArrowRight,
  Check
} from 'lucide-react';
import { flights, hotels, packages } from '@/data/dummyData';
import type { Flight, Hotel, Package as PackageType } from '@/types';

export default function AIRecommendations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Best Deal':
        return 'bg-travel-success text-white';
      case 'AI Pick':
        return 'gradient-ai text-white';
      case 'Popular':
        return 'bg-travel-orange text-white';
      case 'Fastest':
        return 'bg-travel-blue text-white';
      case 'Top Rated':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const FlightCard = ({ flight, index }: { flight: Flight; index: number }) => (
    <div 
      className={`bg-white rounded-2xl shadow-card overflow-hidden hover-lift group cursor-pointer transition-all duration-300 ${
        isVisible ? 'animate-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${0.3 + index * 0.15}s` }}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={flight.image} 
          alt={flight.airline}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(flight.badge)}`}>
            {flight.badge}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold">{flight.rating}</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-travel-text">{flight.airline}</h3>
          <span className="text-2xl font-bold text-travel-blue">${flight.price}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-travel-text-secondary mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{flight.fromCode} → {flight.toCode}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{flight.duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {flight.features.slice(0, 2).map((feature, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-travel-text-secondary">
              {feature}
            </span>
          ))}
        </div>

        <Button className="w-full gradient-blue text-white rounded-xl py-5 font-semibold hover:shadow-glow transition-all duration-300">
          View Details
        </Button>
      </div>
    </div>
  );

  const HotelCard = ({ hotel, index }: { hotel: Hotel; index: number }) => (
    <div 
      className={`bg-white rounded-2xl shadow-card overflow-hidden hover-lift group cursor-pointer transition-all duration-300 ${
        isVisible ? 'animate-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${0.3 + index * 0.15}s` }}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(hotel.badge)}`}>
            {hotel.badge}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold">{hotel.rating}</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-travel-text">{hotel.name}</h3>
          <div className="flex items-center gap-1">
            {[...Array(hotel.stars)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-travel-text-secondary mb-3">
          <MapPin className="w-4 h-4" />
          <span>{hotel.location}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-travel-blue">${hotel.price}</span>
          <span className="text-sm text-travel-text-secondary">per night</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity: string, i: number) => (
            <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-travel-text-secondary">
              {amenity}
            </span>
          ))}
        </div>

        <Button className="w-full gradient-blue text-white rounded-xl py-5 font-semibold hover:shadow-glow transition-all duration-300">
          View Details
        </Button>
      </div>
    </div>
  );

  const PackageCard = ({ pkg, index }: { pkg: PackageType; index: number }) => (
    <div 
      className={`bg-white rounded-2xl shadow-card overflow-hidden hover-lift group cursor-pointer transition-all duration-300 ${
        isVisible ? 'animate-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${0.3 + index * 0.15}s` }}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(pkg.badge)}`}>
            {pkg.badge}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold">{pkg.rating}</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-travel-text mb-1">{pkg.name}</h3>
        
        <div className="flex items-center gap-1 text-sm text-travel-text-secondary mb-3">
          <MapPin className="w-4 h-4" />
          <span>{pkg.destination}</span>
          <span className="mx-2">•</span>
          <Clock className="w-4 h-4" />
          <span>{pkg.duration}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-travel-blue">${pkg.price}</span>
          <span className="text-sm text-travel-text-secondary">per person</span>
        </div>

        <div className="space-y-2 mb-4">
          {pkg.includes.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-travel-text-secondary">
              <Check className="w-4 h-4 text-travel-success" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <Button className="w-full gradient-blue text-white rounded-xl py-5 font-semibold hover:shadow-glow transition-all duration-300">
          View Details
        </Button>
      </div>
    </div>
  );

  return (
    <section id="recommendations" ref={sectionRef} className="py-20 bg-travel-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-travel-blue/10 mb-6 ${
              isVisible ? 'animate-slide-down' : 'opacity-0'
            }`}
          >
            <Sparkles className="w-4 h-4 text-travel-blue" />
            <span className="text-sm font-medium text-travel-blue">AI-Powered Recommendations</span>
          </div>
          
          <h2 
            className={`text-3xl md:text-4xl font-bold text-travel-text mb-4 ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            Smart Travel Intelligence
          </h2>
          
          <p 
            className={`text-lg text-travel-text-secondary max-w-2xl mx-auto ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            Our advanced AI analyzes millions of data points to find the perfect travel options for your business.
          </p>
        </div>

        {/* Flights Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-travel-blue/10 flex items-center justify-center">
                <Plane className="w-5 h-5 text-travel-blue" />
              </div>
              <h3 className="text-xl font-bold text-travel-text">Recommended Flights</h3>
            </div>
            <button className="text-travel-blue hover:text-travel-blue-dark flex items-center gap-2 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.slice(0, 3).map((flight, index) => (
              <FlightCard key={flight.id} flight={flight} index={index} />
            ))}
          </div>
        </div>

        {/* Hotels Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-travel-green/10 flex items-center justify-center">
                <HotelIcon className="w-5 h-5 text-travel-green" />
              </div>
              <h3 className="text-xl font-bold text-travel-text">Top Hotels</h3>
            </div>
            <button className="text-travel-green hover:text-travel-green/80 flex items-center gap-2 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.slice(0, 3).map((hotel, index) => (
              <HotelCard key={hotel.id} hotel={hotel} index={index} />
            ))}
          </div>
        </div>

        {/* Packages Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-travel-orange/10 flex items-center justify-center">
                <PackageIcon className="w-5 h-5 text-travel-orange" />
              </div>
              <h3 className="text-xl font-bold text-travel-text">Curated Packages</h3>
            </div>
            <button className="text-travel-orange hover:text-travel-orange/80 flex items-center gap-2 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <PackageCard key={pkg.id} pkg={pkg} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
