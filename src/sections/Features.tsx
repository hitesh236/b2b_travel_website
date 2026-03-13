import { useEffect, useRef, useState } from 'react';
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

export default function Features() {
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

  const additionalFeatures = [
    {
      icon: TrendingUp,
      title: 'Price Prediction',
      description: 'Our AI predicts price trends with 95% accuracy, helping you book at the optimal time.',
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Get notified instantly when prices drop or better deals become available.',
    },
    {
      icon: FileText,
      title: 'Auto Reports',
      description: 'Generate comprehensive travel expense reports with one click.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track travel spending patterns and identify cost-saving opportunities.',
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-travel-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-travel-blue/10 mb-6 ${
              isVisible ? 'animate-slide-down' : 'opacity-0'
            }`}
          >
            <Sparkles className="w-4 h-4 text-travel-blue" />
            <span className="text-sm font-medium text-travel-blue">Why Choose Us</span>
          </div>
          
          <h2 
            className={`text-3xl md:text-4xl font-bold text-travel-text mb-4 ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            Why Choose TravelAI Pro
          </h2>
          
          <p 
            className={`text-lg text-travel-text-secondary max-w-2xl mx-auto ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            Experience the future of corporate travel with our AI-powered platform designed for modern businesses.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Sparkles;
            return (
              <div 
                key={feature.id}
                className={`bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer border border-transparent hover:border-travel-blue/20 ${
                  isVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-travel-blue/10 to-travel-green/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-travel-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-travel-text mb-2 group-hover:text-travel-blue transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-travel-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className={`bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-travel-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-travel-blue" />
                </div>
                <h4 className="font-bold text-travel-text mb-2 group-hover:text-travel-blue transition-colors">
                  {feature.title}
                </h4>
                <p className="text-sm text-travel-text-secondary">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* AI Stats Banner */}
        <div 
          className={`mt-16 gradient-blue rounded-2xl p-8 md:p-12 text-white ${
            isVisible ? 'animate-scale-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.9s' }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">95%</p>
              <p className="text-white/80">Price Prediction Accuracy</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">40%</p>
              <p className="text-white/80">Average Cost Savings</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">3x</p>
              <p className="text-white/80">Faster Booking Process</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
