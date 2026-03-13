import Hero from './Hero';
import SearchPanel from './SearchPanel';
import Stats from './Stats';
import Features from './Features';
import AIRecommendations from './AIRecommendations';
import Testimonials from './Testimonials';
import Comparison from './Comparison';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <div className="relative z-30">
        <SearchPanel />
      </div>
      <Stats />
      <Features />
      <Comparison />
      <AIRecommendations />
      <Testimonials />
    </motion.div>
  );
}
