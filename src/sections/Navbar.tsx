import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Plane, Home, Hotel, Package } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'flights', label: 'Flights', icon: Plane, path: '/flights' },
  { id: 'hotels', label: 'Hotels', icon: Hotel, path: '/hotels' },
  { id: 'packages', label: 'Packages', icon: Package, path: '/packages' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass shadow-lg py-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavClick('/')}
            >
              <motion.div 
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-xl gradient-blue flex items-center justify-center"
              >
                <Plane className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold transition-colors text-travel-text">
                TravelAI<span className="text-travel-blue">Pro</span>
              </span>
            </motion.div>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    active
                      ? 'gradient-blue text-white shadow-lg'
                      : 'text-travel-text hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 gradient-blue rounded-full -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right: CTA Button & Mobile Menu */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <div className="hidden md:block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="gradient-blue text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-glow transition-all duration-300"
                  onClick={() => handleNavClick('/flights')}
                >
                  Book Now
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-travel-text" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-travel-text" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden"
            >
              <motion.div 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                className="mt-4 py-4 border-t border-gray-200/20 space-y-2"
              >
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        active
                          ? 'gradient-blue text-white'
                          : 'text-travel-text hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </motion.button>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="pt-2"
                >
                  <Button 
                    className="w-full gradient-blue text-white py-3 rounded-xl font-semibold"
                    onClick={() => handleNavClick('/flights')}
                  >
                    Book Now
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
