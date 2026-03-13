import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plane, 
  Hotel, 
  Package, 
  ArrowRightLeft,
  Plus,
  Minus,
  Search,
  Sparkles,
  Trash2
} from 'lucide-react';
import type { SearchTab } from '@/types';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const CITIES = [
  { name: 'Delhi', code: 'DEL', airport: 'Indira Gandhi Intl Airport', country: 'India' },
  { name: 'Mumbai', code: 'BOM', airport: 'Chhatrapati Shivaji Intl', country: 'India' },
  { name: 'Bangalore', code: 'BLR', airport: 'Kempegowda Intl Airport', country: 'India' },
  { name: 'Hyderabad', code: 'HYD', airport: 'Rajiv Gandhi Intl Airport', country: 'India' },
  { name: 'Chennai', code: 'MAA', airport: 'Chennai Intl Airport', country: 'India' },
  { name: 'Kolkata', code: 'CCU', airport: 'Netaji Subhash Chandra Bose Intl', country: 'India' },
  { name: 'Dubai', code: 'DXB', airport: 'Dubai Intl Airport', country: 'UAE' },
  { name: 'London', code: 'LHR', airport: 'Heathrow Airport', country: 'UK' },
  { name: 'New York', code: 'JFK', airport: 'John F. Kennedy Intl', country: 'USA' },
  { name: 'Singapore', code: 'SIN', airport: 'Changi Airport', country: 'Singapore' },
];

export default function SearchPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SearchTab>('flights');
  const [isSearching, setIsSearching] = useState(false);
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip' | 'multiCity'>('oneWay');
  const [fromCity, setFromCity] = useState(CITIES[0]);
  const [toCity, setToCity] = useState(CITIES[1]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [showTravelerDropdown, setShowTravelerDropdown] = useState(false);
  
  const [multiCityFlights, setMultiCityFlights] = useState([
    { id: 1, from: CITIES[0].name + ' (' + CITIES[0].code + ')', to: CITIES[1].name + ' (' + CITIES[1].code + ')', date: '' },
    { id: 2, from: CITIES[1].name + ' (' + CITIES[1].code + ')', to: CITIES[2].name + ' (' + CITIES[2].code + ')', date: '' }
  ]);
  const [activeMultiCityDropdown, setActiveMultiCityDropdown] = useState<{ index: number, type: 'from' | 'to' } | null>(null);

  const updateMultiCityFlight = (index: number, type: 'from' | 'to', city: typeof CITIES[0]) => {
    const newFlights = [...multiCityFlights];
    newFlights[index] = { 
      ...newFlights[index], 
      [type]: `${city.name} (${city.code})` 
    };
    setMultiCityFlights(newFlights);
    setActiveMultiCityDropdown(null);
  };

  const handleSearch = () => {
    setIsSearching(true);
    
    // Construct search query/state
    const searchData = {
      tripType,
      fromCity,
      toCity,
      adults,
      children,
      infants,
      cabinClass,
      multiCityFlights: tripType === 'multiCity' ? multiCityFlights : null
    };

    setTimeout(() => {
      setIsSearching(false);
      const targetPath = activeTab === 'flights' ? '/flights' : activeTab === 'hotels' ? '/hotels' : '/packages';
      navigate(targetPath, { state: searchData });
    }, 1500);
  };

  const handleSwap = (e: React.MouseEvent) => {
    e.stopPropagation();
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

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
      setMultiCityFlights(multiCityFlights.filter(f => f.id !== id));
    }
  };

  const tabs = [
    { id: 'flights' as SearchTab, label: 'Flights', icon: Plane },
    { id: 'hotels' as SearchTab, label: 'Hotels', icon: Hotel },
    { id: 'packages' as SearchTab, label: 'Packages', icon: Package },
  ];

  return (
    <section id="search" className="py-16 bg-[#f2f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[32px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] p-6 md:p-8 -mt-32 relative z-20 border border-gray-100">
          {/* Tab Selection - Compact Style */}
          <div className="flex flex-wrap gap-2 mb-8 bg-gray-50/50 p-1.5 rounded-[20px] w-fit border border-gray-100/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-[16px] text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 ${
                    activeTab === tab.id
                      ? 'bg-white text-travel-blue shadow-lg shadow-travel-blue/10'
                      : 'text-gray-400 hover:text-travel-text'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-travel-blue' : 'text-gray-300'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Flight Search Form */}
          {activeTab === 'flights' && (
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
              {/* Trip Type Selector - More Compact */}
              <div className="flex flex-wrap gap-8 mb-6 px-1">
                {[
                  { id: 'oneWay', label: 'One Way' },
                  { id: 'roundTrip', label: 'Round Trip' },
                  { id: 'multiCity', label: 'Multi City' },
                ].map((type) => (
                  <label key={type.id} className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="radio" 
                        name="tripType"
                        checked={tripType === type.id}
                        onChange={() => setTripType(type.id as any)}
                        className="peer appearance-none w-5 h-5 rounded-full border-[3px] border-gray-100 checked:border-travel-blue transition-all duration-300"
                      />
                      <div className="absolute w-2 h-2 rounded-full bg-travel-blue scale-0 peer-checked:scale-100 transition-transform duration-300" />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                      tripType === type.id ? 'text-travel-blue' : 'text-gray-400 group-hover:text-travel-text'
                    }`}>
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>

              {tripType !== 'multiCity' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-[1.5px] border-gray-100 rounded-[24px] shadow-sm hover:border-gray-200 transition-all duration-500 bg-white relative z-30">
                  {/* FROM */}
                  <div 
                    className="lg:col-span-3 p-5 border-b lg:border-b-0 lg:border-r-[1.5px] border-gray-100 hover:bg-blue-50/20 transition-all cursor-pointer group/item relative"
                    onClick={() => {
                      setShowFromDropdown(!showFromDropdown);
                      setShowToDropdown(false);
                    }}
                  >
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2 group-hover/item:text-travel-blue transition-colors font-montserrat">From</span>
                    <div className="flex flex-col font-montserrat">
                      <div 
                        className="text-2xl font-black text-travel-text bg-transparent outline-none w-full tracking-tight flex items-baseline gap-2 uppercase"
                      >
                        {fromCity.name} <span className="text-sm font-bold text-travel-blue uppercase opacity-60">{fromCity.code}</span>
                      </div>
                      <span className="text-[9px] text-gray-400 font-bold mt-1 uppercase truncate block">{fromCity.airport}</span>
                    </div>

                    <AnimatePresence>
                      {showFromDropdown && (
                        <>
                          <div 
                            className="fixed inset-0 z-40 bg-transparent" 
                            onClick={() => setShowFromDropdown(false)}
                          />
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute left-0 top-full mt-2 w-[350px] bg-white rounded-2xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.2)] border border-gray-100 z-50 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Popular Cities</span>
                            </div>
                            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                              {CITIES.map((city) => (
                                <button
                                  key={city.code}
                                  onClick={() => {
                                    setFromCity(city);
                                    setShowFromDropdown(false);
                                  }}
                                  className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 text-left group/btn"
                                >
                                  <div>
                                    <p className="text-sm font-black text-travel-text group-hover/btn:text-travel-blue transition-colors">{city.name}, {city.country}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{city.airport}</p>
                                  </div>
                                  <span className="text-xs font-black text-gray-300 group-hover/btn:text-travel-blue/40">{city.code}</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>

                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 hidden lg:block">
                      <button 
                        onClick={handleSwap}
                        className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center text-travel-blue hover:bg-travel-blue hover:text-white transition-all duration-500 transform hover:rotate-180"
                      >
                        <ArrowRightLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* TO */}
                  <div 
                    className="lg:col-span-3 p-5 border-b lg:border-b-0 lg:border-r-[1.5px] border-gray-100 hover:bg-blue-50/20 transition-all cursor-pointer group/item relative"
                    onClick={() => {
                      setShowToDropdown(!showToDropdown);
                      setShowFromDropdown(false);
                    }}
                  >
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2 group-hover/item:text-travel-blue transition-colors font-montserrat">To</span>
                    <div className="flex flex-col font-montserrat">
                      <div 
                        className="text-2xl font-black text-travel-text bg-transparent outline-none w-full tracking-tight flex items-baseline gap-2 uppercase"
                      >
                        {toCity.name} <span className="text-sm font-bold text-travel-blue uppercase opacity-60">{toCity.code}</span>
                      </div>
                      <span className="text-[9px] text-gray-400 font-bold mt-1 uppercase truncate block">{toCity.airport}</span>
                    </div>

                    <AnimatePresence>
                      {showToDropdown && (
                        <>
                          <div 
                            className="fixed inset-0 z-40 bg-transparent" 
                            onClick={() => setShowToDropdown(false)}
                          />
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute left-0 top-full mt-2 w-[350px] bg-white rounded-2xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.2)] border border-gray-100 z-50 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Popular Cities</span>
                            </div>
                            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                              {CITIES.map((city) => (
                                <button
                                  key={city.code}
                                  onClick={() => {
                                    setToCity(city);
                                    setShowToDropdown(false);
                                  }}
                                  className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 text-left group/btn"
                                >
                                  <div>
                                    <p className="text-sm font-black text-travel-text group-hover/btn:text-travel-blue transition-colors">{city.name}, {city.country}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{city.airport}</p>
                                  </div>
                                  <span className="text-xs font-black text-gray-300 group-hover/btn:text-travel-blue/40">{city.code}</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* DEPART */}
                  <div className="lg:col-span-2 p-5 border-b lg:border-b-0 lg:border-r-[1.5px] border-gray-100 hover:bg-blue-50/20 transition-all cursor-pointer group/item">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2 group-hover/item:text-travel-blue transition-colors">Departure</span>
                    <div className="flex flex-col">
                      <input 
                        type="date"
                        className="text-lg font-black text-travel-text bg-transparent outline-none w-full cursor-pointer h-8 tracking-tight"
                      />
                      <span className="text-[9px] text-gray-400 font-bold mt-1 uppercase">Friday, '24</span>
                    </div>
                  </div>

                  {/* RETURN */}
                  <div className={`lg:col-span-2 p-5 border-b lg:border-b-0 lg:border-r-[1.5px] border-gray-100 transition-all cursor-pointer group/item ${
                    tripType === 'oneWay' ? 'bg-[#fafafa]/50 cursor-not-allowed' : 'hover:bg-blue-50/20'
                  }`}>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2 group-hover/item:text-travel-blue transition-colors">Return</span>
                    <div className={`flex flex-col ${tripType === 'oneWay' ? 'opacity-30' : ''}`}>
                      <input 
                        type="date"
                        disabled={tripType === 'oneWay'}
                        className="text-lg font-black text-travel-text bg-transparent outline-none w-full cursor-pointer h-8 tracking-tight"
                      />
                      <span className="text-[9px] text-gray-400 font-bold mt-1 uppercase">
                        {tripType === 'oneWay' ? 'Select Round Trip' : 'Select Return'}
                      </span>
                    </div>
                  </div>

                  {/* TRAVELERS */}
                  <div 
                    className="lg:col-span-2 p-5 hover:bg-blue-50/20 transition-all cursor-pointer group/item relative"
                    onClick={() => {
                      setShowTravelerDropdown(!showTravelerDropdown);
                      setShowFromDropdown(false);
                      setShowToDropdown(false);
                    }}
                  >
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2 group-hover/item:text-travel-blue transition-colors">Travellers</span>
                    <div className="flex flex-col">
                      <div className="text-sm font-black text-travel-text truncate uppercase tracking-tight">
                        {(adults + children + infants).toString().padStart(2, '0')} {(adults + children + infants) > 1 ? 'Travellers' : 'Adult'}
                      </div>
                      <span className="text-[9px] text-gray-400 font-bold mt-1 uppercase">{cabinClass}</span>
                    </div>

                    <AnimatePresence>
                      {showTravelerDropdown && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setShowTravelerDropdown(false); }} />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full right-0 lg:left-0 lg:right-auto mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-[28px] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.2)] border border-gray-100 p-6 z-[100]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="space-y-5 text-left">
                              {[
                                { label: 'Adults', sub: '12+ years', state: adults, setState: setAdults, min: 1 },
                                { label: 'Children', sub: '2-12 years', state: children, setState: setChildren, min: 0 },
                                { label: 'Infants', sub: 'Under 2 years', state: infants, setState: setInfants, min: 0 },
                              ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between pb-1 font-montserrat">
                                  <div className="flex flex-col text-left">
                                    <span className="text-[11px] font-black text-travel-text uppercase tracking-widest leading-none mb-1">{item.label}</span>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.sub}</span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <button 
                                      onClick={() => item.setState(Math.max(item.min, item.state - 1))}
                                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                        item.state > item.min 
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

                              <div className="pt-4 border-t border-gray-50">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4 underline decoration-travel-blue/30 underline-offset-4">Cabin Class</span>
                                <div className="flex flex-wrap gap-2">
                                  {['Economy', 'Premium', 'Business'].map((cls) => (
                                    <button 
                                      key={cls}
                                      onClick={() => setCabinClass(cls)}
                                      className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                        cabinClass === cls 
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
                                className="w-full mt-2 rounded-[16px] bg-travel-text text-white h-11 font-black text-[10px] uppercase tracking-widest"
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
              ) : (
                <div className="space-y-4">
                  {multiCityFlights.map((flight, index) => (
                    <div key={flight.id} className="grid grid-cols-1 md:grid-cols-12 gap-0 border-[1.5px] border-gray-100 rounded-[20px] shadow-sm relative group/row animate-in slide-in-from-left-2 transition-all bg-white mb-4 last:mb-0">
                      {/* FROM */}
                      <div 
                        className="md:col-span-4 p-4 border-b md:border-b-0 md:border-r-[1.5px] border-gray-100 hover:bg-blue-50/20 transition-all cursor-pointer relative"
                        onClick={() => setActiveMultiCityDropdown({ index, type: 'from' })}
                      >
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block font-montserrat">From</span>
                        <div className="text-lg font-black text-travel-text tracking-tight uppercase font-montserrat">
                          {flight.from || 'Select City'}
                        </div>

                        <AnimatePresence>
                          {activeMultiCityDropdown?.index === index && activeMultiCityDropdown?.type === 'from' && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setActiveMultiCityDropdown(null); }} />
                              <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute left-0 top-full mt-2 w-[350px] bg-white rounded-2xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.2)] border border-gray-100 z-50 overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Popular Cities</span>
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

                      {/* TO */}
                      <div 
                        className="md:col-span-4 p-4 border-b md:border-b-0 md:border-r-[1.5px] border-gray-100 hover:bg-blue-50/20 transition-all cursor-pointer relative"
                        onClick={() => setActiveMultiCityDropdown({ index, type: 'to' })}
                      >
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block font-montserrat">To</span>
                        <div className="text-lg font-black text-travel-text tracking-tight uppercase font-montserrat">
                          {flight.to || 'Select City'}
                        </div>

                        <AnimatePresence>
                          {activeMultiCityDropdown?.index === index && activeMultiCityDropdown?.type === 'to' && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setActiveMultiCityDropdown(null); }} />
                              <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute left-0 top-full mt-2 w-[350px] bg-white rounded-2xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.2)] border border-gray-100 z-50 overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Popular Cities</span>
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
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block font-montserrat">Departure</span>
                        <input type="date" className="text-lg font-black text-travel-text bg-transparent outline-none w-full h-7 tracking-tight cursor-pointer font-montserrat" />
                      </div>
                      <div className="md:col-span-1 flex items-center justify-center p-2 bg-gray-50/30">
                        {multiCityFlights.length > 2 && (
                          <button 
                            onClick={() => removeMultiCityFlight(flight.id)}
                            className="w-8 h-8 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
                    <button 
                      onClick={addMultiCityFlight}
                      disabled={multiCityFlights.length >= 5}
                      className="flex items-center gap-2 px-6 py-3 rounded-[16px] text-travel-blue font-black text-[10px] uppercase tracking-[0.15em] bg-blue-50/50 hover:bg-travel-blue hover:text-white transition-all duration-300 disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                      Add Flight
                    </button>
                    
                    <div 
                      className="p-4 border-[1.5px] border-dashed border-gray-100 rounded-[18px] flex flex-col min-w-[220px] hover:bg-blue-50/20 transition-all cursor-pointer bg-white group/trav relative"
                      onClick={() => setShowTravelerDropdown(!showTravelerDropdown)}
                    >
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block group-hover/trav:text-travel-blue font-montserrat">Travellers & Class</span>
                      <div className="text-sm font-black text-travel-text uppercase tracking-tight font-montserrat">
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
                              className="absolute top-full right-0 lg:left-0 lg:right-auto mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-[28px] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.2)] border border-gray-100 p-6 z-[100]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="space-y-5 text-left">
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
                                        onClick={(e) => { e.stopPropagation(); item.setState(Math.max(item.min, item.state - 1)); }}
                                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                          item.state > item.min 
                                            ? 'border-travel-blue/20 text-travel-blue hover:bg-travel-blue hover:text-white hover:border-travel-blue' 
                                            : 'border-gray-50 text-gray-200 cursor-not-allowed'
                                        }`}
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="text-sm font-black text-travel-text w-4 text-center font-montserrat">{item.state}</span>
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); item.setState(Math.min(9, item.state + 1)); }}
                                        className="w-8 h-8 rounded-full border border-travel-blue/20 flex items-center justify-center text-travel-blue hover:bg-travel-blue hover:text-white hover:border-travel-blue transition-all"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                ))}

                                <div className="pt-4 border-t border-gray-50">
                                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4 underline decoration-travel-blue/30 underline-offset-4">Cabin Class</span>
                                  <div className="flex flex-wrap gap-2">
                                    {['Economy', 'Premium', 'Business'].map((cls) => (
                                      <button 
                                        key={cls}
                                        onClick={(e) => { e.stopPropagation(); setCabinClass(cls); }}
                                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                          cabinClass === cls 
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
                                  className="w-full mt-2 rounded-[16px] bg-travel-text text-white h-11 font-black text-[10px] uppercase tracking-widest"
                                  onClick={(e) => { e.stopPropagation(); setShowTravelerDropdown(false); }}
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
              )}
            </div>
          )}

          {/* Hotel & Package placeholders */}
          {(activeTab === 'hotels' || activeTab === 'packages') && (
             <div className="animate-in fade-in duration-500 py-6 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'hotels' ? <Hotel className="w-8 h-8 text-gray-300" /> : <Package className="w-8 h-8 text-gray-300" />}
                </div>
                <h3 className="text-xl font-black text-travel-text mb-1 uppercase tracking-tighter">Premium {activeTab === 'hotels' ? 'Hotels' : 'Packages'}</h3>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Our AI-powered search is initializing...</p>
             </div>
          )}

          {/* Search Button Section - More Balanced */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6 items-center justify-between border-t border-gray-50 pt-8">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-travel-orange/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-travel-orange animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-travel-text leading-tight">AI Smart Engine</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Scanning 500+ airlines for best value</span>
              </div>
            </div>

            <Button 
              size="lg"
              className="w-full sm:w-auto gradient-blue text-white px-12 py-7 rounded-[20px] font-black text-[10px] uppercase tracking-[0.25em] shadow-2xl shadow-travel-blue/30 hover:shadow-glow transition-all duration-500 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2.5"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  {activeTab === 'flights' ? 'Explore Flights' : activeTab === 'hotels' ? 'Find Hotels' : 'View Packages'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
