import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Navbar from './sections/Navbar';
import Dashboard from './sections/Dashboard';
import FlightsPage from './sections/FlightsPage';
import HotelsPage from './sections/HotelsPage';
import PackagesPage from './sections/PackagesPage';
import FlightDetail from './sections/FlightDetail';
import HotelDetail from './sections/HotelDetail';
import PackageDetail from './sections/PackageDetail';
import LandingPage from './sections/LandingPage';
import Footer from './sections/Footer';

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/flights" element={<FlightsPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/flight/:id" element={<FlightDetail />} />
              <Route path="/hotel/:id" element={<HotelDetail />} />
              <Route path="/package/:id" element={<PackageDetail />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {(location.pathname === '/' || location.pathname === '/dashboard') && <Footer />}
    </div>
  );
}

export default App;
