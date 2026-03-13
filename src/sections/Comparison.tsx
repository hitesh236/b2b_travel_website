import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  X, 
  Star, 
  Plane, 
  ArrowRight,
  Sparkles,
  TrendingDown,
  Zap,
  Award
} from 'lucide-react';
import { flights } from '@/data/dummyData';

export default function Comparison() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(['f1', 'f2', 'f3']);

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

  const comparisonFlights = flights.slice(0, 3);

  const getBadgeIcon = (badge?: string) => {
    switch (badge) {
      case 'Best Deal':
        return <TrendingDown className="w-4 h-4" />;
      case 'Fastest':
        return <Zap className="w-4 h-4" />;
      case 'Popular':
        return <Award className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Best Deal':
        return 'bg-travel-success text-white';
      case 'Fastest':
        return 'bg-travel-blue text-white';
      case 'Popular':
        return 'bg-travel-orange text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="comparison" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-travel-green/10 mb-6 ${
              isVisible ? 'animate-slide-down' : 'opacity-0'
            }`}
          >
            <Sparkles className="w-4 h-4 text-travel-green" />
            <span className="text-sm font-medium text-travel-green">Smart Comparison</span>
          </div>
          
          <h2 
            className={`text-3xl md:text-4xl font-bold text-travel-text mb-4 ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            Compare & Choose Wisely
          </h2>
          
          <p 
            className={`text-lg text-travel-text-secondary max-w-2xl mx-auto ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            Side-by-side comparison of the best options. AI highlights the deals that matter most for your business.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {comparisonFlights.map((flight, index) => (
            <div 
              key={flight.id}
              className={`relative bg-white rounded-2xl border-2 transition-all duration-500 ${
                selectedItems.includes(flight.id)
                  ? flight.badge === 'Best Deal'
                    ? 'border-travel-success shadow-lg shadow-travel-success/20'
                    : 'border-travel-blue shadow-lg shadow-travel-blue/20'
                  : 'border-gray-100 shadow-card'
              } ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${0.3 + index * 0.15}s` }}
            >
              {/* Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className={`inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg ${getBadgeColor(flight.badge)}`}>
                  {getBadgeIcon(flight.badge)}
                  {flight.badge}
                </span>
              </div>

              <div className="p-6 pt-8">
                {/* Airline Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-travel-blue/10 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-travel-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-travel-text">{flight.airline}</h3>
                    <p className="text-sm text-travel-text-secondary">{flight.airlineCode} • Economy</p>
                  </div>
                </div>

                {/* Route */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-travel-text">{flight.departure}</p>
                    <p className="text-sm text-travel-text-secondary">{flight.fromCode}</p>
                  </div>
                  
                  <div className="flex-1 px-4">
                    <div className="relative">
                      <div className="border-t-2 border-dashed border-gray-300" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                        <Plane className="w-4 h-4 text-travel-blue" />
                      </div>
                    </div>
                    <p className="text-center text-xs text-travel-text-secondary mt-1">{flight.duration}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold text-travel-text">{flight.arrival}</p>
                    <p className="text-sm text-travel-text-secondary">{flight.toCode}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(flight.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-travel-text">{flight.rating}</span>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {flight.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-travel-text-secondary">
                      <Check className="w-4 h-4 text-travel-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-3xl font-bold text-travel-text">${flight.price}</p>
                    <p className="text-sm text-travel-text-secondary">per person</p>
                  </div>
                  <Button 
                    className={`px-6 py-5 rounded-xl font-semibold transition-all duration-300 ${
                      selectedItems.includes(flight.id)
                        ? 'gradient-blue text-white hover:shadow-glow'
                        : 'bg-gray-100 text-travel-text hover:bg-gray-200'
                    }`}
                    onClick={() => toggleSelection(flight.id)}
                  >
                    {selectedItems.includes(flight.id) ? 'Selected' : 'Compare'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {selectedItems.length > 1 && (
          <div className="bg-travel-bg rounded-2xl p-6 md:p-8 animate-slide-up">
            <h3 className="text-xl font-bold text-travel-text mb-6">Detailed Comparison</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-travel-text">Feature</th>
                    {comparisonFlights
                      .filter(f => selectedItems.includes(f.id))
                      .map(flight => (
                        <th key={flight.id} className="text-left py-3 px-4 font-semibold text-travel-text">
                          {flight.airline}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-travel-text-secondary">Price</td>
                    {comparisonFlights
                      .filter(f => selectedItems.includes(f.id))
                      .map(flight => (
                        <td key={flight.id} className="py-3 px-4">
                          <span className={`font-bold ${flight.badge === 'Best Deal' ? 'text-travel-success' : 'text-travel-text'}`}>
                            ${flight.price}
                          </span>
                        </td>
                      ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-travel-text-secondary">Duration</td>
                    {comparisonFlights
                      .filter(f => selectedItems.includes(f.id))
                      .map(flight => (
                        <td key={flight.id} className="py-3 px-4 font-medium text-travel-text">
                          {flight.duration}
                        </td>
                      ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-travel-text-secondary">Rating</td>
                    {comparisonFlights
                      .filter(f => selectedItems.includes(f.id))
                      .map(flight => (
                        <td key={flight.id} className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium text-travel-text">{flight.rating}</span>
                          </div>
                        </td>
                      ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-travel-text-secondary">Departure</td>
                    {comparisonFlights
                      .filter(f => selectedItems.includes(f.id))
                      .map(flight => (
                        <td key={flight.id} className="py-3 px-4 font-medium text-travel-text">
                          {flight.departure}
                        </td>
                      ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-travel-text-secondary">WiFi</td>
                    {comparisonFlights
                      .filter(f => selectedItems.includes(f.id))
                      .map(flight => (
                        <td key={flight.id} className="py-3 px-4">
                          {flight.features.includes('Free WiFi') ? (
                            <Check className="w-5 h-5 text-travel-success" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400" />
                          )}
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="gradient-blue text-white px-8 py-5 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 flex items-center gap-2">
                Book Selected <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
