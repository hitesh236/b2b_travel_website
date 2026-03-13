import { useState } from 'react';
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
import Footer from './sections/Footer';

type SectionType = 'dashboard' | 'flights' | 'hotels' | 'packages';
type DetailType = 'flight' | 'hotel' | 'package' | null;

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
  const [currentSection, setCurrentSection] = useState<SectionType>('dashboard');
  const [detailType, setDetailType] = useState<DetailType>(null);
  const [detailId, setDetailId] = useState<string>('');

  const handleNavigate = (section: string) => {
    setCurrentSection(section as SectionType);
    setDetailType(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetail = (type: DetailType, id: string) => {
    setDetailType(type);
    setDetailId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setDetailType(null);
    setDetailId('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    // If viewing a detail page
    if (detailType === 'flight') {
      return <FlightDetail flightId={detailId} onBack={handleBackToList} />;
    }
    if (detailType === 'hotel') {
      return <HotelDetail hotelId={detailId} onBack={handleBackToList} />;
    }
    if (detailType === 'package') {
      return <PackageDetail packageId={detailId} onBack={handleBackToList} />;
    }

    // Otherwise show listing pages
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'flights':
        return <FlightsPage onViewDetail={(id) => handleViewDetail('flight', id)} />;
      case 'hotels':
        return <HotelsPage onViewDetail={(id) => handleViewDetail('hotel', id)} />;
      case 'packages':
        return <PackagesPage onViewDetail={(id) => handleViewDetail('package', id)} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        currentSection={detailType || currentSection}
        onNavigate={handleNavigate}
      />

      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSection}-${detailType}-${detailId}`}
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentSection === 'dashboard' && !detailType && <Footer />}
    </div>
  );
}

export default App;
