import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const phrases = [
    'Where Emotions Live Forever.',
    'Your Soul. Your Chain. Your Story.',
    'Preserve Feelings, Not Followers.',
    'Mint Memories, Stake Your Soul.',
    'Every Transaction Tells Your Truth.',
    'Where Every Block Holds a Heartbeat.',
  ];
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    const current = phrases[loopIndex % phrases.length];
    const updatedText = isDeleting
      ? current.substring(0, typedText.length - 1)
      : current.substring(0, typedText.length + 1);

    const typingSpeed = 120;
    const deletingSpeed = 80;
    const pauseAfterTyping = 1800;

    let timeoutDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && updatedText === current) {
      timeoutDelay = pauseAfterTyping;
      const pauseTimer = setTimeout(() => setIsDeleting(true), timeoutDelay);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopIndex((prev) => prev + 1);
      timeoutDelay = typingSpeed;
    }

    const timer = setTimeout(() => {
      setTypedText(updatedText);
    }, timeoutDelay);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopIndex]);

  const handlePresaleClick = () => {
    const section = document.getElementById('presale');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-pink-600/20 blur-3xl animate-float"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-indigo-500/30 backdrop-blur-sm"
            style={{ minHeight: '2.5rem' }}
          >
            <span className="animate-pulse-slow mr-2">
              <Heart className="w-4 h-4 text-pink-500" />
            </span>
            <span className="text-indigo-200">
              The Human Archive of Emotions on the Blockchain
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">SoulChain:</span> <br />
            <span
              className="gradient-text-accent inline-block"
              style={{ minHeight: '4.5rem' }}
            >
              {typedText}
            </span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-xl text-indigo-200 mb-12 max-w-3xl mx-auto">
            A revolutionary Web3 platform preserving authentic human emotions as immutable blockchain entries.
            Capture your deepest regrets, dreams, lessons, and memories — anonymously, eternally, and with purpose.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handlePresaleClick}
              className="btn btn-accent text-lg group"
              aria-label="Join Token Presale"
            >
              Join Token Presale
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link to="/about" className="btn btn-secondary text-lg">
              Discover SoulChain
            </Link>
          </div>

          <div
            className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6 text-indigo-300 text-sm"
            style={{ minHeight: '3.5rem' }}
          >
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Built on Solana Blockchain</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span>2,000,000,000 SOUL Tokens Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Audited Smart Contracts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" className="text-indigo-300 hover:text-white" aria-label="Scroll to About Section">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .gradient-text {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .gradient-text-accent {
          background: linear-gradient(45deg, #f59e0b, #ef4444, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn {
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-accent {
          background: linear-gradient(45deg, #f59e0b, #ef4444);
          color: white;
        }

        .btn-accent:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: #a5b4fc;
          border: 2px solid #6366f1;
        }

        .btn-secondary:hover {
          background: #6366f1;
          color: white;
          transform: translateY(-2px);
        }

        .container-custom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
      `}</style>
    </section>
  );
};

export default Hero;
