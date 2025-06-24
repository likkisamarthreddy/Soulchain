import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Lazily loaded pages (below-the-fold content)
const AboutPage = lazy(() => import('./pages/About'));
const TokenomicsPage = lazy(() => import('./pages/Tokenomics'));
const RoadmapPage = lazy(() => import('./pages/Roadmap'));
const CommunityPage = lazy(() => import('./pages/Community'));
const BlogPage = lazy(() => import('./pages/Blog'));
const FAQPage = lazy(() => import('./pages/FAQ'));

// Hero is critical LCP content — eager load
import Hero from './components/Hero';

// Lazy load presale section
const PresaleSection = lazy(() => import('./components/PresaleSection'));

// Eagerly loaded layout components
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/ui/BackToTop';
import ScrollToHashElement from './components/utils/ScrollToHashElement';

function AppContent() {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-950 text-white font-sans">
        <div className="stars fixed inset-0 z-0 overflow-hidden pointer-events-none"></div>

        <Header scrollY={scrollY} />

        <main className="relative z-10 pt-24">
          <ScrollToHashElement />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />

                  <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
                    <AboutPage />
                    <TokenomicsPage />
                    <RoadmapPage />
                    <CommunityPage />
                    <BlogPage />
                    <FAQPage />
                    <PresaleSection />
                  </Suspense>
                </>
              }
            />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/tokenomics" element={<TokenomicsPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/presale" element={<PresaleSection />} />
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">404 - Not Found</h1>
                    <p className="text-gray-400">The page you’re looking for does not exist.</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
        <BackToTop visible={scrollY > 300} />
      </div>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AppContent />
    </HelmetProvider>
  );
}

export default App;
