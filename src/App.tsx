import React, { useState, useEffect, lazy, Suspense, useMemo, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Lazily loaded pages - with proper chunking
const AboutPage = lazy(() => import(/* webpackChunkName: "about" */ './pages/About'));
const TokenomicsPage = lazy(() => import(/* webpackChunkName: "tokenomics" */ './pages/Tokenomics'));
const RoadmapPage = lazy(() => import(/* webpackChunkName: "roadmap" */ './pages/Roadmap'));
const CommunityPage = lazy(() => import(/* webpackChunkName: "community" */ './pages/Community'));
const BlogPage = lazy(() => import(/* webpackChunkName: "blog" */ './pages/Blog'));
const FAQPage = lazy(() => import(/* webpackChunkName: "faq" */ './pages/FAQ'));
const PresaleSection = lazy(() => import(/* webpackChunkName: "presale" */ './components/PresaleSection'));

// Critical components (keep these eager)
import Hero from './components/Hero';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/ui/BackToTop';
import ScrollToHashElement from './components/utils/ScrollToHashElement';

// Memoized loading component
const LoadingFallback = React.memo(() => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
));

// Memoized 404 component
const NotFoundPage = React.memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">404 - Not Found</h1>
      <p className="text-gray-400">The page you're looking for does not exist.</p>
    </div>
  </div>
));

// Memoized home page content
const HomePage = React.memo(() => (
  <>
    <Hero />
    <Suspense fallback={<LoadingFallback />}>
      <AboutPage />
    </Suspense>
    <Suspense fallback={<LoadingFallback />}>
      <TokenomicsPage />
    </Suspense>
    <Suspense fallback={<LoadingFallback />}>
      <RoadmapPage />
    </Suspense>
    <Suspense fallback={<LoadingFallback />}>
      <CommunityPage />
    </Suspense>
    <Suspense fallback={<LoadingFallback />}>
      <BlogPage />
    </Suspense>
    <Suspense fallback={<LoadingFallback />}>
      <FAQPage />
    </Suspense>
    <Suspense fallback={<LoadingFallback />}>
      <PresaleSection />
    </Suspense>
  </>
));

function AppContent() {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Memoize the background to prevent unnecessary re-renders
  const backgroundElement = useMemo(() => (
    <div className="stars fixed inset-0 z-0 overflow-hidden pointer-events-none"></div>
  ), []);

  // Memoize BackToTop visibility
  const backToTopVisible = useMemo(() => scrollY > 300, [scrollY]);

  return (
    <div className="relative overflow-x-hidden">
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-950 text-white font-sans">
        {backgroundElement}

        <Header scrollY={scrollY} />

        <main className="relative z-10 pt-24">
          <ScrollToHashElement />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<Suspense fallback={<LoadingFallback />}><AboutPage /></Suspense>} />
            <Route path="/tokenomics" element={<Suspense fallback={<LoadingFallback />}><TokenomicsPage /></Suspense>} />
            <Route path="/roadmap" element={<Suspense fallback={<LoadingFallback />}><RoadmapPage /></Suspense>} />
            <Route path="/community" element={<Suspense fallback={<LoadingFallback />}><CommunityPage /></Suspense>} />
            <Route path="/blog" element={<Suspense fallback={<LoadingFallback />}><BlogPage /></Suspense>} />
            <Route path="/blog/:slug" element={<Suspense fallback={<LoadingFallback />}><BlogPage /></Suspense>} />
            <Route path="/faq" element={<Suspense fallback={<LoadingFallback />}><FAQPage /></Suspense>} />
            <Route path="/presale" element={<Suspense fallback={<LoadingFallback />}><PresaleSection /></Suspense>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
        <BackToTop visible={backToTopVisible} />
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
