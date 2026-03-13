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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
          changeType === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {changeType === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <h3 className="text-travel-text-secondary text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-travel-text">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </p>
    </motion.div>
  );
}

// Recent Booking Card
function RecentBooking({ booking, index }: { booking: any; index: number }) {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700',
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
      whileHover={{ x: 8, backgroundColor: '#f8f9fa' }}
      className="flex items-center gap-4 p-4 rounded-xl transition-colors cursor-pointer"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-travel-blue/20 to-travel-green/20 flex items-center justify-center flex-shrink-0">
        {booking.type === 'flight' ? (
          <Plane className="w-5 h-5 text-travel-blue" />
        ) : booking.type === 'hotel' ? (
          <Hotel className="w-5 h-5 text-travel-green" />
        ) : (
          <Package className="w-5 h-5 text-travel-orange" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-travel-text truncate">{booking.title}</h4>
        <div className="flex items-center gap-3 text-sm text-travel-text-secondary">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {booking.date}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {booking.location}
          </span>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-travel-text">${booking.amount}</p>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status as keyof typeof statusColors]}`}>
          <StatusIcon className="w-3 h-3" />
          {booking.status}
        </span>
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
      transition={{ duration: 0.5, delay: 1 + index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-travel-blue/5 to-travel-green/5 rounded-xl p-4 border border-travel-blue/10 cursor-pointer group"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-travel-blue to-travel-green flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-travel-text text-sm mb-1">{insight.title}</h4>
          <p className="text-xs text-travel-text-secondary">{insight.description}</p>
        </div>
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
      className="bg-white rounded-2xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-travel-text text-lg">Travel Spending</h3>
          <p className="text-sm text-travel-text-secondary">Monthly overview</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-travel-text">$32,300</span>
          <span className="flex items-center gap-1 text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
            <TrendingUp className="w-4 h-4" />
            +12%
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 h-48">
        {data.map((item, index) => (
          <motion.div
            key={item.month}
            initial={{ height: 0 }}
            animate={{ height: `${(item.amount / maxAmount) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.6 + index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex-1 flex flex-col items-center gap-2"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-full bg-gradient-to-t from-travel-blue to-travel-blue/60 rounded-t-lg relative group cursor-pointer"
              style={{ height: '100%' }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-travel-text text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                ${item.amount.toLocaleString()}
              </div>
            </motion.div>
            <span className="text-xs text-travel-text-secondary font-medium">{item.month}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Destination Card
function DestinationCard({ destination, index }: { destination: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
    >
      <img 
        src={destination.image} 
        alt={destination.name}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="font-bold text-white text-lg">{destination.name}</h4>
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-sm">{destination.trips} trips</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm">{destination.rating}</span>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-travel-blue/20 flex items-center justify-center"
      >
        <Button className="bg-white text-travel-blue rounded-full px-6">
          Explore
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function Dashboard({ onNavigate }: { onNavigate: (section: string) => void }) {
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
      className="min-h-screen bg-travel-bg pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-travel-text mb-1">
              {greeting}, <span className="text-gradient">Admin</span> 👋
            </h1>
            <p className="text-travel-text-secondary">Here's what's happening with your travel today.</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button variant="outline" className="rounded-full px-4 py-2 border-gray-200">
                <Bell className="w-5 h-5 text-travel-text-secondary" />
              </Button>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-card"
            >
              <div className="w-8 h-8 rounded-full gradient-blue flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <span className="font-medium text-travel-text hidden sm:block">Admin User</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {[
            { label: 'Book Flight', icon: Plane, color: 'bg-travel-blue', section: 'flights' },
            { label: 'Book Hotel', icon: Hotel, color: 'bg-travel-green', section: 'hotels' },
            { label: 'Explore Packages', icon: Package, color: 'bg-travel-orange', section: 'packages' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(action.section)}
              className={`flex items-center gap-2 ${action.color} text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow`}
            >
              <action.icon className="w-5 h-5" />
              {action.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} delay={0.2 + index * 0.1} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
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

          {/* Right Column - Recent Bookings & AI Insights */}
          <div className="space-y-8">
            {/* Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-white rounded-2xl p-6 shadow-card"
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

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-white rounded-2xl p-6 shadow-card"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-ai flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-travel-text text-lg">AI Insights</h3>
              </div>
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <AIInsight key={index} insight={insight} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
