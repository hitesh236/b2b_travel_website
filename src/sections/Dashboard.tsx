import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plane,
  Hotel,
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Bell,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Animated counter component
function AnimatedCounter({ value, prefix = '', suffix = '', duration = 2 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return (
    <span ref={countRef}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  changeType,
  icon: Icon,
  color,
  delay = 0
}: {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: string;
  changeType: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 cursor-pointer group transition-all hover:shadow-md"
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center group-hover:rotate-6 transition-transform shadow-sm`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[9px] font-bold ${changeType === 'up' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
          }`}>
          {changeType === 'up' ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{title}</p>
        <h4 className="text-xl font-bold text-travel-text tracking-tighter">
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </h4>
      </div>
    </motion.div>
  );
}

// Recent Booking Card
function RecentBooking({ booking, index }: { booking: any; index: number }) {
  const statusColors = {
    confirmed: 'bg-green-50 text-green-600 border-green-100 font-bold',
    pending: 'bg-orange-50 text-orange-600 border-orange-100 font-bold',
    cancelled: 'bg-red-50 text-red-600 border-red-100 font-bold',
  };

  const statusIcons = {
    confirmed: CheckCircle2,
    pending: Clock,
    cancelled: XCircle,
  };

  const StatusIcon = statusIcons[booking.status as keyof typeof statusIcons];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
      className="flex items-center gap-4 p-3.5 rounded-xl transition-all cursor-pointer border border-transparent hover:border-gray-100 group"
    >
      <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
        {booking.type === 'flight' ? (
          <Plane className="w-5 h-5 text-travel-blue" />
        ) : booking.type === 'hotel' ? (
          <Hotel className="w-5 h-5 text-travel-green" />
        ) : (
          <Package className="w-5 h-5 text-travel-orange" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-travel-text truncate text-[15px]">{booking.title}</h4>
          <span className="font-bold text-travel-blue text-[15px] ml-2 flex-shrink-0">${booking.amount}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <div className="flex items-center gap-3 text-xs text-travel-text-secondary font-medium">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Calendar className="w-3.5 h-3.5 opacity-60" />
              <span>{booking.date}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block" />
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 opacity-60" />
              <span>{booking.location}</span>
            </div>
          </div>
          <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider border flex-shrink-0 ${statusColors[booking.status as keyof typeof statusColors]}`}>
            <StatusIcon className="w-3 h-3" />
            {booking.status}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// AI Insight Card
function AIInsight({ insight, index }: { insight: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
      className="bg-white/40 backdrop-blur-md rounded-xl p-3.5 border border-white/60 shadow-sm cursor-pointer group flex items-start gap-3.5 transition-all duration-300 hover:bg-white/60 hover:shadow-md"
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-travel-blue to-travel-green flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-blue">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div>
        <h4 className="font-bold text-travel-text text-[13px] mb-0.5 group-hover:text-travel-blue transition-colors leading-tight">{insight.title}</h4>
        <p className="text-[10px] text-gray-400 font-medium leading-tight opacity-70">{insight.description}</p>
      </div>
    </motion.div>
  );
}

// Chart Component (Simple Bar Chart)
function SpendingChart() {
  const data = [
    { month: 'Jan', amount: 4500 },
    { month: 'Feb', amount: 5200 },
    { month: 'Mar', amount: 4800 },
    { month: 'Apr', amount: 6100 },
    { month: 'May', amount: 5500 },
    { month: 'Jun', amount: 7200 },
  ];

  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-bold text-travel-text text-lg">Spending Overview</h3>
          <p className="text-sm text-travel-text-secondary">Track your monthly travel expenses</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-travel-text tracking-tight">$32,300</p>
            <div className="flex items-center justify-end gap-1 text-xs font-bold text-green-600">
              <TrendingUp className="w-3 h-3" />
              +12.5%
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-56 flex flex-col justify-between">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-6 pointer-events-none">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full border-t border-dashed border-gray-100" />
          ))}
        </div>

        <div className="flex items-end justify-between gap-4 h-48 relative z-10 px-2 lg:px-4">
          {data.map((item, index) => (
            <motion.div
              key={item.month}
              initial={{ height: 0 }}
              animate={{ height: `${(item.amount / maxAmount) * 100}%` }}
              transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="flex-1 flex flex-col items-center gap-3 group relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`w-full max-w-[40px] rounded-t-lg relative cursor-pointer shadow-sm transition-all duration-300 group-hover:shadow-glow-blue ${index === 5 ? 'gradient-blue' : 'bg-gradient-to-t from-gray-100 to-gray-200 group-hover:from-travel-blue/40 group-hover:to-travel-blue/20'
                  }`}
                style={{ height: '100%' }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-travel-text text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 pointer-events-none z-20">
                  ${item.amount.toLocaleString()}
                </div>
                {index === 5 && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-t-lg" />
                )}
              </motion.div>
              <span className={`text-xs font-bold transition-colors duration-300 ${index === 5 ? 'text-travel-blue' : 'text-travel-text-secondary group-hover:text-travel-text'
                }`}>
                {item.month}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Destination Card
function DestinationCard({ destination, index }: { destination: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      <div className="absolute top-3 right-3">
        <div className="glass-dark px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-md bg-black/30 border border-white/20">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-[10px] font-bold">{destination.rating}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 group-hover:-translate-y-1">
        <h4 className="font-bold text-white text-lg leading-tight mb-1 group-hover:text-travel-blue-dark transition-colors">{destination.name}</h4>
        <div className="flex items-center gap-2">
          <span className="text-white/70 text-xs font-medium">{destination.trips} popular trips</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-travel-blue/10 flex items-center justify-center backdrop-blur-[2px]"
      >
        <div className="bg-white text-travel-blue rounded-full px-5 py-2 text-sm font-bold shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          Explore Now
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const stats = [
    { title: 'Total Bookings', value: 1247, change: '+23%', changeType: 'up' as const, icon: Calendar, color: 'bg-travel-blue' },
    { title: 'Total Spent', value: 45320, prefix: '$', change: '+15%', changeType: 'up' as const, icon: DollarSign, color: 'bg-travel-green' },
    { title: 'Active Travelers', value: 89, change: '+8%', changeType: 'up' as const, icon: Users, color: 'bg-travel-orange' },
    { title: 'Saved This Month', value: 3240, prefix: '$', change: '-5%', changeType: 'down' as const, icon: TrendingDown, color: 'bg-purple-500' },
  ];

  const recentBookings = [
    { id: 1, type: 'flight', title: 'Delhi to Mumbai', date: 'Today, 2:30 PM', location: 'Airways X', amount: 150, status: 'confirmed' },
    { id: 2, type: 'hotel', title: 'Hotel Alpha', date: 'Mar 15-18, 2024', location: 'Mumbai', amount: 360, status: 'confirmed' },
    { id: 3, type: 'package', title: 'Bangalore Tech Tour', date: 'Apr 1-5, 2024', location: 'Bangalore', amount: 620, status: 'pending' },
    { id: 4, type: 'flight', title: 'Mumbai to Dubai', date: 'Apr 10, 2024', location: 'Express Jet', amount: 320, status: 'confirmed' },
    { id: 5, type: 'hotel', title: 'The Grand Palace', date: 'May 1-3, 2024', location: 'Delhi', amount: 540, status: 'pending' },
  ];

  const aiInsights = [
    { title: 'Save $120 on Mumbai flights', description: 'Book 2 weeks in advance for better rates' },
    { title: 'Hotel prices dropping', description: 'Mumbai hotels are 15% cheaper next week' },
    { title: 'Best time to book Dubai', description: 'AI predicts prices will rise by 20% soon' },
  ];

  const topDestinations = [
    { name: 'Mumbai', trips: 45, rating: 4.5, image: '/images/hero-card3.jpg' },
    { name: 'Delhi', trips: 38, rating: 4.3, image: '/images/flight-delhi-mumbai.jpg' },
    { name: 'Bangalore', trips: 29, rating: 4.6, image: '/images/package-bangkok.jpg' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-travel-bg pt-28 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header & Integrated Actions */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 mb-5"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-blue flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-travel-blue/10">
                <span className="text-white text-base font-bold">A</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-travel-text flex items-center gap-1.5 leading-none mb-1">
                  {greeting}, <span className="text-travel-blue">Admin</span> 👋
                </h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5 opacity-60">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Travel Intelligence Active
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'Flight', icon: Plane, color: 'bg-travel-blue', section: 'flights' },
                { label: 'Hotel', icon: Hotel, color: 'bg-travel-green', section: 'hotels' },
                { label: 'Package', icon: Package, color: 'bg-travel-orange', section: 'packages' },
              ].map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/${action.section}`)}
                  className={`flex items-center gap-1.5 ${action.color} text-white px-3 h-8 rounded-lg text-[10px] font-bold shadow-sm hover:shadow-md transition-all`}
                >
                  <action.icon className="w-3 h-3" />
                  {action.label}
                </motion.button>
              ))}
              <div className="w-px h-6 bg-gray-100 mx-1 hidden lg:block" />
              <motion.div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.1 }} className="relative cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Bell className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">3</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} delay={0.2 + index * 0.1} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Chart & Destinations */}
          <div className="lg:col-span-2 space-y-8">
            {/* Spending Chart */}
            <SpendingChart />

            {/* Top Destinations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-travel-text text-lg">Top Destinations</h3>
                <Button variant="ghost" className="text-travel-blue">
                  View All <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {topDestinations.map((dest, index) => (
                  <DestinationCard key={dest.name} destination={dest} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Recent Bookings */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-white rounded-2xl p-6 shadow-card border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-travel-text text-lg">Recent Bookings</h3>
              </div>
              <div className="space-y-2">
                {recentBookings.map((booking, index) => (
                  <RecentBooking key={booking.id} booking={booking} index={index} />
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 rounded-xl">
                View All Bookings
              </Button>
            </motion.div>
          </div>
        </div>

        {/* AI Insights - Full Width Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="bg-gradient-to-br from-travel-blue/5 via-travel-green/5 to-transparent rounded-3xl p-8 border border-travel-blue/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-travel-blue/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className="w-10 h-10 rounded-xl gradient-ai flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-travel-text text-xl">AI Smart Insights</h3>
              <p className="text-sm text-travel-text-secondary">Personalized recommendations based on your activity</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {aiInsights.map((insight, index) => (
              <AIInsight key={index} insight={insight} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
