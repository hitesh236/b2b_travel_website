import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Wallet,
  Headphones,
  Shield,
  TrendingUp,
  Bell,
  FileText,
  BarChart3
} from 'lucide-react';
import { features } from '@/data/dummyData';

const iconMap: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  wallet: Wallet,
  headphones: Headphones,
  shield: Shield,
};

const colorMap = [
  { iconBg: 'bg-travel-blue/10', iconColor: 'text-travel-blue', accent: 'border-travel-blue/20' },
  { iconBg: 'bg-travel-green/10', iconColor: 'text-travel-green', accent: 'border-travel-green/20' },
  { iconBg: 'bg-travel-orange/10', iconColor: 'text-travel-orange', accent: 'border-travel-orange/20' },
  { iconBg: 'bg-purple-100', iconColor: 'text-purple-600', accent: 'border-purple-200' },
];

const additionalFeatures = [
  { icon: TrendingUp, title: 'Price Prediction', description: '95% accuracy in price forecasting' },
  { icon: Bell, title: 'Smart Alerts', description: 'Instant deal notifications' },
  { icon: FileText, title: 'Auto Reports', description: 'One-click expense reports' },
  { icon: BarChart3, title: 'Analytics', description: 'Visual travel spending insights' },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-travel-blue/10 mb-5">
            <Sparkles className="w-4 h-4 text-travel-blue" />
            <span className="text-sm font-semibold text-travel-blue">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-travel-text mb-3">
            Everything You Need to Travel Smarter
          </h2>
          <p className="text-travel-text-secondary max-w-2xl mx-auto">
            Built for modern businesses — powerful AI, real savings, and zero hassle.
          </p>
        </div>

        {/* Main Features — horizontal card layout */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Sparkles;
            const color = colorMap[index % colorMap.length];
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-start gap-5 p-6 rounded-2xl border bg-white hover:shadow-lg hover:${color.accent} transition-all duration-300 group cursor-pointer border-gray-100`}
              >
                <div className={`w-12 h-12 rounded-xl ${color.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${color.iconColor}`} />
                </div>
                <div>
                  <h3 className={`font-bold text-travel-text mb-1 group-hover:${color.iconColor} transition-colors text-lg`}>
                    {feature.title}
                  </h3>
                  <p className="text-travel-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Features — compact pill grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.07 }}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#f8f9fb] border border-gray-100 hover:bg-white hover:shadow-md hover:border-travel-blue/20 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-travel-blue/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-travel-blue/20 transition-all duration-300">
                  <Icon className="w-5 h-5 text-travel-blue" />
                </div>
                <h4 className="font-bold text-travel-text text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-travel-text-secondary leading-tight">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* AI Stats Banner — compact 3-stat row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="gradient-blue rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: '95%', label: 'Price Prediction Accuracy' },
              { value: '40%', label: 'Average Cost Savings' },
              { value: '3×', label: 'Faster Booking Process' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                <div className="w-8 h-0.5 bg-white/30 mx-auto mb-2" />
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
