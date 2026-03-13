import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plane, 
  Hotel, 
  Package, 
  MapPin, 
  Calendar, 
  Users,
  ArrowRightLeft,
  Search,
  Sparkles
} from 'lucide-react';
import type { SearchTab } from '@/types';

export default function SearchPanel() {
  const [activeTab, setActiveTab] = useState<SearchTab>('flights');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1500);
  };

  const tabs = [
    { id: 'flights' as SearchTab, label: 'Flights', icon: Plane },
    { id: 'hotels' as SearchTab, label: 'Hotels', icon: Hotel },
    { id: 'packages' as SearchTab, label: 'Packages', icon: Package },
  ];

  return (
    <section id="search" className="py-16 bg-travel-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-card-hover p-6 md:p-8 -mt-32 relative z-20">
          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'gradient-blue text-white shadow-lg'
                      : 'bg-gray-100 text-travel-text-secondary hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Flight Search Form */}
          {activeTab === 'flights' && (
            <div className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <Input 
                      placeholder="Delhi (DEL)"
                      className="pl-10 h-14 rounded-xl border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    To
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <Input 
                      placeholder="Mumbai (BOM)"
                      className="pl-10 h-14 rounded-xl border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    Departure
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <Input 
                      type="date"
                      className="pl-10 h-14 rounded-xl border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    Return
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <Input 
                      type="date"
                      className="pl-10 h-14 rounded-xl border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    Travelers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <select className="w-full h-14 pl-10 pr-4 rounded-xl border border-gray-200 focus:border-travel-blue focus:ring-2 focus:ring-travel-blue/20 outline-none appearance-none bg-white">
                      <option>1 Traveler</option>
                      <option>2 Travelers</option>
                      <option>3 Travelers</option>
                      <option>4+ Travelers</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Swap Button (Mobile) */}
              <div className="flex justify-center my-4 md:hidden">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <ArrowRightLeft className="w-5 h-5 text-travel-blue" />
                </button>
              </div>
            </div>
          )}

          {/* Hotel Search Form */}
          {activeTab === 'hotels' && (
            <div className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <Input 
                      placeholder="Mumbai, India"
                      className="pl-10 h-14 rounded-xl border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    Check-in
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <Input 
                      type="date"
                      className="pl-10 h-14 rounded-xl border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    Check-out
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <Input 
                      type="date"
                      className="pl-10 h-14 rounded-xl border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <select className="w-full h-14 pl-10 pr-4 rounded-xl border border-gray-200 focus:border-travel-blue focus:ring-2 focus:ring-travel-blue/20 outline-none appearance-none bg-white">
                      <option>1 Guest, 1 Room</option>
                      <option>2 Guests, 1 Room</option>
                      <option>2 Guests, 2 Rooms</option>
                      <option>Family (4+ Guests)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Package Search Form */}
          {activeTab === 'packages' && (
            <div className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <Input 
                      placeholder="Bangkok, Thailand"
                      className="pl-10 h-14 rounded-xl border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <Input 
                      placeholder="Delhi (DEL)"
                      className="pl-10 h-14 rounded-xl border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    Dates
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <Input 
                      type="date"
                      className="pl-10 h-14 rounded-xl border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 relative">
                  <label className="block text-sm font-medium text-travel-text-secondary mb-2">
                    Travelers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-travel-blue" />
                    <select className="w-full h-14 pl-10 pr-4 rounded-xl border border-gray-200 focus:border-travel-blue focus:ring-2 focus:ring-travel-blue/20 outline-none appearance-none bg-white">
                      <option>2 Travelers</option>
                      <option>4 Travelers</option>
                      <option>6+ Travelers</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Button */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
            <Button 
              size="lg"
              className="w-full sm:w-auto gradient-blue text-white px-8 py-6 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Search with AI
                </>
              )}
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-travel-text-secondary">
              <Sparkles className="w-4 h-4 text-travel-orange" />
              <span>AI will find the best deals for you</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
