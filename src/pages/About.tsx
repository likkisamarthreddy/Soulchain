import React, { useState, useEffect } from 'react';
import { BookHeart, UserCheck, Lock, Sparkles, ChevronDown } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <div
      className="transform transition-all duration-700 opacity-100 translate-y-0"
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-indigo-200 transition-colors">
          {title}
        </h3>
        <p className="text-indigo-200 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const About = () => {
  const [expandedCard, setExpandedCard] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);

  const exampleEntries = [
    {
      text: "I wish I had told my grandfather how much he meant to me before he passed. His stories shaped who I am today, but I was too busy with my own life to sit with him those final months. I hope somehow he knew.",
      location: "Somewhere in Japan",
      time: "3 hours ago",
      tags: ["#regret", "#family"],
      mood: "Reflective 🤔",
      emoji: "💭"
    },
    {
      text: "Today I finally quit my job that was draining my soul. I'm terrified about the future, but for the first time in years, I feel like I can breathe. Sometimes the scariest decisions are the most necessary ones.",
      location: "Anonymous User",
      time: "1 day ago",
      tags: ["#courage", "#change"],
      mood: "Hopeful 🌱",
      emoji: "🚀"
    },
    {
      text: "Watching my daughter take her first steps today reminded me that every ending is also a beginning. She's growing so fast, and I want to remember this moment forever - her wobbly legs, her proud smile, her pure joy.",
      location: "Parent in Canada",
      time: "5 hours ago",
      tags: ["#parenthood", "#joy"],
      mood: "Grateful ❤️",
      emoji: "👶"
    }
  ];

  // Auto-rotate examples every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % exampleEntries.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [exampleEntries.length]);

  const features = [
    {
      icon: <BookHeart className="w-10 h-10 text-pink-500" />,
      title: "Emotional Journaling",
      description: "Document your regrets, dreams, life lessons, and memories in a permanent, anonymous format that preserves your authentic human experience."
    },
    {
      icon: <UserCheck className="w-10 h-10 text-indigo-500" />,
      title: "Anonymous by Default",
      description: "Share your deepest emotions without fear of judgment. No usernames, profiles, or social validation—just pure, unfiltered human expression."
    },
    {
      icon: <Lock className="w-10 h-10 text-purple-500" />,
      title: "Immutable Records",
      description: "All entries are permanently recorded on the Solana blockchain, ensuring they become an unchangeable part of human digital heritage."
    },
    {
      icon: <Sparkles className="w-10 h-10 text-blue-500" />,
      title: "SoulDrop Feature",
      description: "Receive a daily random emotional entry from someone around the world—a spiritual fortune cookie that connects hearts across continents."
    }
  ];

  return (
    <section
      id="about"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <header className="text-center mb-16">
          <h2
            id="about-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight"
          >
            The Emotional Revolution
          </h2>
          <p className="text-xl md:text-2xl text-indigo-200 max-w-4xl mx-auto leading-relaxed">
            In an age dominated by curated perfection on social media, SoulChain offers a haven for authentic human expression.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.2}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Beyond Social Media
              </h3>
              <div className="space-y-6 text-indigo-200 text-lg leading-relaxed">
                <p>
                  SoulChain is not another social platform. It's a digital library for the collective human experience,
                  free from likes, comments, and the pressure to perform. Here, emotions aren't filtered or curated—they're
                  raw, honest, and preserved for generations to come.
                </p>
                <p>
                  Each submission is capped at 500 characters and can be accompanied by mood emojis, tags, and optional
                  location data. These emotional artifacts become part of an ever-growing river of human experience that
                  transcends borders, race, gender, and age.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Core Values</h4>
              <div className="flex flex-wrap gap-3">
                {['#authenticity', '#emotional-legacy', '#blockchain-for-good', '#web3-innovation'].map((tag, i) => (
                  <span
                    key={tag}
                    className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-indigo-500/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">500</div>
                <div className="text-sm text-indigo-300">Character Limit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">∞</div>
                <div className="text-sm text-indigo-300">Permanent Storage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">100%</div>
                <div className="text-sm text-indigo-300">Anonymous</div>
              </div>
            </div>
          </div>

          <div className="sticky top-8">
            <div className="bg-white/5 border border-white/20 rounded-2xl p-8 relative transform hover:scale-105 transition-all duration-500 shadow-2xl">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full px-4 py-2 text-sm font-medium shadow-lg animate-pulse">
                Live Example
              </div>

              {/* Progress indicator */}
              <div className="flex space-x-2 mb-6">
                {exampleEntries.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      index === currentExample ? 'bg-indigo-400' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <div className="relative min-h-[350px]">
                {exampleEntries.map((entry, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 transform ${
                      index === currentExample
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-4 text-xl shadow-lg">
                        <span className="animate-bounce">{entry.emoji}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-lg">{entry.location}</h4>
                        <p className="text-sm text-indigo-300">{entry.time}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <blockquote className="italic text-indigo-100 text-lg leading-relaxed border-l-4 border-indigo-400 pl-4">
                        "{entry.text}"
                      </blockquote>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                        Mood: {entry.mood}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Manual navigation dots */}
              <div className="flex justify-center space-x-3 mt-6 pt-4 border-t border-indigo-500/20">
                {exampleEntries.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentExample(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentExample
                        ? 'bg-indigo-400 scale-125'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`View example ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setExpandedCard(!expandedCard)}
                className="w-full mt-6 pt-4 border-t border-indigo-500/20 flex items-center justify-center text-indigo-300 hover:text-indigo-200 transition-colors"
                aria-expanded={expandedCard}
                aria-controls="additional-info"
              >
                <span className="text-sm mr-2">
                  {expandedCard ? 'Less Info' : 'More Info'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    expandedCard ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedCard && (
                <div
                  id="additional-info"
                  className="mt-4 p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20 opacity-0 animate-fadeIn"
                  style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
                >
                  <p className="text-sm text-indigo-200 mb-2">
                    <strong>Blockchain Hash:</strong> 7x9k2m...8n4p
                  </p>
                  <p className="text-sm text-indigo-200">
                    <strong>Immutable Since:</strong> Block #4,728,392
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default About;
