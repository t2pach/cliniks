import { useState, useEffect } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import ServiceCategories from './sections/ServiceCategories';
import PopularServices from './sections/PopularServices';
import FeaturedClinics from './sections/FeaturedClinics';
import HowItWorks from './sections/HowItWorks';
import AISearch from './sections/AISearch';
import TrustStats from './sections/TrustStats';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';
import Dashboard from './pages/Dashboard';
import SearchResults from './sections/SearchResults';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [currentView, setCurrentView] = useState<'main' | 'dashboard' | 'search'>('main');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Scroll to top on mount and when view changes
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
  };

  return (
    <AuthProvider>
      {currentView === 'main' ? (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--clinics-surface)' }}>
          <Navigation onNavigateToDashboard={() => setCurrentView('dashboard')} />
          <main className="flex-1">
            <Hero onSearch={handleSearch} />
            <ServiceCategories />
            <PopularServices />
            <FeaturedClinics />
            <HowItWorks />
            <AISearch />
            <TrustStats />
            <Testimonials />
            <FAQ />
          </main>
          <Footer />
        </div>
      ) : currentView === 'search' ? (
        <SearchResults query={searchQuery} onClose={() => setCurrentView('main')} />
      ) : (
        <Dashboard onNavigateToMain={() => setCurrentView('main')} />
      )}
    </AuthProvider>
  );
}

export default App;
