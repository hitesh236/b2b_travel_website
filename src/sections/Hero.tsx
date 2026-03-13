import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardsRef.current) return;
      const cards = cardsRef.current.querySelectorAll('.hero-card');
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      cards.forEach((card, index) => {
        const factor = (index + 1) * 0.02;
        const rotateX = (clientY - centerY) * factor;
        const rotateY = (clientX - centerX) * factor;
        (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSearch = () => {
    document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-travel-blue/90 via-travel-blue-dark/90 to-travel-green/80" />

        {/* Animated Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-travel-orange/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-travel-green/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-slide-down">
              <Sparkles className="w-4 h-4 text-travel-orange" />
              <span className="text-sm font-medium">AI-Powered Travel Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Smart Corporate
              </span>
              <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Travel Solutions
              </span>
            </h1>

            <p className="text-lg text-white/80 max-w-lg animate-slide-up" style={{ animationDelay: '0.3s' }}>
              AI-powered booking platform for modern businesses. Save up to 40% on corporate travel with intelligent recommendations and seamless expense management.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                className="bg-white text-travel-blue px-8 py-6 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                onClick={scrollToSearch}
              >
                Start Booking
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white text-travel-blue px-8 py-6 rounded-full font-semibold "
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-travel-blue to-travel-green flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold">1000+ Companies</p>
                <p className="text-white/60 text-sm">Trust TravelAI Pro</p>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div ref={cardsRef} className="relative hidden lg:block h-[500px]">
            {/* Card 1 */}
            <div
              className="hero-card absolute top-0 right-0 w-72 h-96 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-200 animate-scale-in"
              style={{ animationDelay: '0.6s' }}
            >
              <img
                src="/images/hero-card1.jpg"
                alt="Tropical Resort"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-semibold">Maldives Resort</p>
                <p className="text-white/70 text-sm">$299/night</p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="hero-card absolute top-20 left-0 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-200 animate-scale-in"
              style={{ animationDelay: '0.8s' }}
            >
              <img
                src="/images/hero-card2.jpg"
                alt="Mountain Landscape"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-semibold">Swiss Alps</p>
                <p className="text-white/70 text-sm">$189/night</p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="hero-card absolute bottom-0 left-20 w-60 h-72 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-200 animate-scale-in"
              style={{ animationDelay: '1s' }}
            >
              <img
                src="/images/hero-card3.jpg"
                alt="City Skyline"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-semibold">Dubai City</p>
                <p className="text-white/70 text-sm">$249/night</p>
              </div>
            </div>

            {/* Floating Badge */}
            <div
              className="absolute top-10 right-20 px-4 py-2 rounded-full bg-white shadow-lg animate-bounce-in"
              style={{ animationDelay: '1.2s' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-travel-success animate-pulse" />
                <span className="text-sm font-medium text-travel-text">AI Match 98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#f8f9fa"
          />
        </svg>
      </div>
    </section>
  );
}
