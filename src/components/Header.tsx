import React, { useState, useEffect } from 'react';
import { Menu, X, Wallet, TrendingUp, Clock } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  scrollY: number;
}

const Header: React.FC<HeaderProps> = ({ scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handlePresaleClick = () => {
    if (isHomePage) {
      const section = document.getElementById('presale');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/presale');
    }
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Tokenomics', to: '/tokenomics' },
    { name: 'Roadmap', to: '/roadmap' },
    { name: 'Community', to: '/community' },
    { name: 'Blog', to: '/blog' },
    { name: 'FAQ', to: '/faq' },
  ];

  const isActiveLink = (linkTo: string): boolean => {
    return location.pathname === linkTo;
  };

const bannerItems = [
  <span key="1" className="flex items-center space-x-2">
    <TrendingUp size={16} />
    <span>🚀 PRESALE PRICE INCREASING SOON!</span>
  </span>,
  <span key="2" className="flex items-center space-x-2">
    <Clock size={16} />
    <span>⚡ BUY FAST – LIMITED TIME OFFER!</span>
  </span>,
  <span key="3" className="flex items-center space-x-2">
    <Wallet size={16} />
    <span>💎 SECURE YOUR TOKENS NOW!</span>
  </span>,
  <span key="4" className="flex items-center space-x-2">
    <TrendingUp size={16} />
    <span>🔥 NEXT PRICE TIER IN 24 HOURS!</span>
  </span>,
  <span key="5" className="flex items-center space-x-2">
    <Clock size={16} />
    <span>⏰ DON'T MISS OUT – ACT NOW!</span>
  </span>,
  <span key="6" className="flex items-center space-x-2">
    <Wallet size={16} />
    <span>🛡️ EARLY BUYERS GET UP TO 20% BONUS!</span>
  </span>,
  <span key="7" className="flex items-center space-x-2">
    <TrendingUp size={16} />
    <span>📈 STAGE 1 NEARLY SOLD OUT!</span>
  </span>,
  <span key="8" className="flex items-center space-x-2">
    <Clock size={16} />
    <span>⌛ TIME IS RUNNING OUT TO JOIN EARLY</span>
  </span>,
];

  return (
    <>
      {/* Announcement Banner */}
      <div className="fixed top-0 left-0 right-0 z-60 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <div className="flex items-center space-x-12 text-sm font-bold">
            {bannerItems}
            {bannerItems}
            {bannerItems}
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="SoulChain Logo"
                className="w-10 h-10 rounded-full object-cover"
                width="40"
                height="40"
                loading="lazy"
              />
            </div>
            <span className="font-bold text-2xl gradient-text">SoulChain</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-indigo-200 hover:text-white transition-colors duration-300 ${
                  isActiveLink(link.to) ? 'font-bold text-white' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={handlePresaleClick}
              className="btn btn-accent animate-pulse"
              aria-label="Join Presale"
            >
              Join Presale
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-indigo-200 hover:text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-lg">
            <nav className="container-custom py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`text-indigo-200 hover:text-white py-2 transition-colors duration-300 ${
                    isActiveLink(link.to) ? 'font-bold text-white' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  handlePresaleClick();
                  setIsMenuOpen(false);
                }}
                className="btn btn-accent mt-4 animate-pulse"
                aria-label="Join Presale"
              >
                Join Presale
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Styles */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee {
          animation: marquee 7s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        .gradient-text {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn {
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-accent {
          background: linear-gradient(45deg, #f59e0b, #ef4444);
          color: white;
          border: none;
        }

        .btn-accent:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
        }

        .container-custom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .z-60 {
          z-index: 60;
        }
      `}</style>
    </>
  );
};

export default Header;
