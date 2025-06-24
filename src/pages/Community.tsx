import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Users,
  Instagram,
  Twitter,
  Send,
  CheckCircle,
  Mail,
  Heart,
  Sparkles,
  Globe,
  MessageCircle,
  BookOpen,
  Star,
  Award,
  Calendar,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Target,
  FileText,
  Map,
  UserCheck,
  Gift,
  Trophy,
  Rocket,
  ChevronRight,
  X
} from 'lucide-react';

interface CommunityProps {}

const Community: React.FC<CommunityProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: [] as string[]
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [showWhitepaper, setShowWhitepaper] = useState(false);

  const currentDate = new Date().toISOString();
  const lastUpdated = "2025-06-22T10:00:00Z";

  const socialLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="w-6 h-6" />,
      url: 'https://x.com/TheSoulChain?t=qr0nKOqI0s6yeCXvmutZ4Q&s=09',
      color: 'from-blue-500 to-blue-600',
      description: 'Daily updates & blockchain discussions',
    },
    {
      name: 'Telegram',
      icon: <Send className="w-6 h-6" />,
      url: 'https://t.me/thesoulchain',
      color: 'from-sky-500 to-sky-600',
      description: 'Real-time community chat & support',
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6" />,
      url: 'https://www.instagram.com/connect.soulchain?utm_source=ig_web_button_share_sheet&igsh=ZGx0eG52dzF6Mmdt',
      color: 'from-pink-500 to-purple-600',
      description: 'Visual content & behind-the-scenes',
    },
  ];

  const interestOptions = [
    { id: 'blockchain', label: 'Blockchain Technology 2025', icon: <Globe className="w-4 h-4" /> },
    { id: 'mental-health', label: 'Mental Health Web3 Platform', icon: <Heart className="w-4 h-4" /> },
    { id: 'community', label: 'Emotional Blockchain Community', icon: <Users className="w-4 h-4" /> },
    { id: 'development', label: 'Development Updates & News', icon: <Zap className="w-4 h-4" /> },
    { id: 'trading', label: 'Trading & DeFi Innovation', icon: <Star className="w-4 h-4" /> },
    { id: 'nft', label: 'NFTs & Digital Art', icon: <Award className="w-4 h-4" /> }
  ];

  const communityStats = [
    { label: 'Active Members Worldwide', value: '38.5K+', icon: <Users />, color: 'from-blue-500 to-cyan-500', growth: '+12% this month' },
    { label: 'Countries Represented', value: '127', icon: <Globe />, color: 'from-green-500 to-emerald-500', growth: 'Global reach' },
    { label: 'Daily Messages & Interactions', value: '2.4K+', icon: <MessageCircle />, color: 'from-purple-500 to-pink-500', growth: '+25% engagement' },
    { label: 'Community Events Hosted', value: '45+', icon: <Calendar />, color: 'from-orange-500 to-red-500', growth: 'Monthly events' }
  ];

  const communityFeatures = [
    {
      title: 'Weekly AMAs & Expert Sessions',
      description: 'Join our weekly Ask Me Anything sessions with blockchain experts and mental health professionals',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      benefit: 'Direct access to industry leaders'
    },
    {
      title: 'Exclusive Community Events',
      description: 'Access to exclusive meetups, workshops, and mental health awareness events worldwide',
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      benefit: 'Network with like-minded individuals'
    },
    {
      title: 'Early Access to Features',
      description: 'Get early access to new platform features, beta testing, and exclusive content',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      benefit: 'Be the first to try innovations'
    },
    {
      title: 'Rewards & Recognition Program',
      description: 'Earn tokens and recognition for active community participation and valuable contributions',
      icon: <Award className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      benefit: 'Get rewarded for engagement'
    }
  ];

  const communityGuidelines = [
    {
      title: 'Emotional Authenticity First',
      description: 'We value genuine emotional expression and authentic mental health discussions',
      icon: <Heart className="w-5 h-5" />
    },
    {
      title: 'Respect & Inclusion',
      description: 'Everyone deserves respect regardless of their mental health journey or background',
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: 'Educational Sharing',
      description: 'Share knowledge about blockchain, mental health, and personal growth experiences',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: 'Support & Encouragement',
      description: 'Offer support to community members and celebrate collective achievements',
      icon: <UserCheck className="w-5 h-5" />
    }
  ];

  const upcomingEvents = [
    {
      title: 'Mental Health Awareness Workshop',
      date: '2025-06-15',
      description: 'Interactive workshop on blockchain applications for mental health tracking',
      type: 'Workshop',
      attendees: '500+ registered'
    },
    {
      title: 'Token Launch Community Call',
      date: '2025-06-22',
      description: 'Exclusive preview of tokenomics and early access opportunities',
      type: 'AMA',
      attendees: 'Community exclusive'
    },
    {
      title: 'Global Community Meetup',
      date: '2025-07-22',
      description: 'Virtual meetup connecting SoulChain communities worldwide',
      type: 'Meetup',
      attendees: '1000+ expected'
    }
  ];

  const learningResources = [
    {
      title: 'Blockchain Basics for Mental Health',
      type: 'Course',
      duration: '2 hours',
      level: 'Beginner'
    },
    {
      title: 'Understanding Emotional Data Privacy',
      type: 'Guide',
      duration: '30 min read',
      level: 'Intermediate'
    },
    {
      title: 'Building Mental Health dApps',
      type: 'Tutorial',
      duration: '4 hours',
      level: 'Advanced'
    }
  ];

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInterestChange = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const sheetData = {
      data: {
        name: formData.name,
        email: formData.email,
        interests: formData.interests.join(', '),
        timestamp: new Date().toISOString(),
        source: 'Community Page'
      }
    };

    try {
      const res = await fetch('https://sheetdb.io/api/v1/f1uipewrtjhub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sheetData),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Submission failed. Try again later.');
    }

    setIsSubmitting(false);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://thesoulchain.xyz/community",
        "url": "https://thesoulchain.xyz/community",
        "name": "Join SoulChain Community - 38.5K+ Emotional Blockchain Members | Mental Health Web3 Platform",
        "description": "Join the world's largest emotional blockchain community with 38.5K+ members across 127 countries. Connect with mental health advocates and Web3 innovators building the future of emotional expression.",
        "datePublished": currentDate,
        "dateModified": lastUpdated,
        "inLanguage": "en-US",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://thesoulchain.xyz",
          "name": "SoulChain",
          "url": "https://thesoulchain.xyz"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://thesoulchain.xyz"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Community",
              "item": "https://thesoulchain.xyz/community"
            }
          ]
        }
      },
      {
        "@type": "Organization",
        "@id": "https://thesoulchain.xyz/#organization",
        "name": "SoulChain",
        "alternateName": "The SoulChain",
        "url": "https://thesoulchain.xyz",
        "logo": "https://thesoulchain.xyz/logo.png",
        "description": "Revolutionary blockchain platform for emotional expression and mental health support",
        "foundingDate": "2024",
        "numberOfEmployees": "25-50",
        "sameAs": [
          "https://twitter.com/TheSoulChain",
          "https://t.me/thesoulchain",
          "https://instagram.com/connect.soulchain"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "community@thesoulchain.xyz"
        }
      },
      {
        "@type": "Community",
        "name": "SoulChain Community",
        "description": "Global community of 38.5K+ members focused on emotional blockchain technology and mental health innovation",
        "url": "https://thesoulchain.xyz/community",
        "memberOf": {
          "@type": "Organization",
          "@id": "https://thesoulchain.xyz/#organization"
        },
        "numberOfMembers": "38500",
        "location": "Global - 127 countries"
      }
    ]
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Welcome to SoulChain Community | Thank You for Joining Our 38.5K+ Member Network</title>
          <meta name="description" content="Thank you for joining the SoulChain emotional blockchain community! Check your email for exclusive benefits and connect with 38.5K+ members worldwide." />
          <meta name="robots" content="noindex, follow" />
          <link rel="canonical" href="https://thesoulchain.xyz/community/welcome" />
        </Helmet>
        <main className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8 animate-bounce">
                <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text animate-fadeIn">
                Welcome to SoulChain Community! 🎉
              </h1>
              <p className="text-xl text-gray-300 mb-8 animate-slideIn">
                Thank you for joining our emotional blockchain community, <span className="text-purple-400 font-semibold">{formData.name}</span>!
                Check your email for exclusive benefits and next steps.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`card bg-gradient-to-r ${link.color} text-white hover:scale-105 transition-all duration-300 animate-fadeIn`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={`Join SoulChain ${link.name} community with ${link.members} members`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                        <span aria-label={`${link.name} Icon`}>{link.icon}</span>
                      </div>
                      <span className="font-semibold">{link.name}</span>
                      <span className="text-sm opacity-90">{link.members} members</span>
                    </div>
                  </a>
                ))}
              </div>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', interests: [] });
                }}
                className="btn btn-secondary"
                aria-label="Return to community page"
              >
                ← Back to Community
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Join SoulChain Community - 38.5K+ Emotional Blockchain Members | Mental Health Web3 Platform 2025</title>
        <meta name="description" content="Join the world's largest emotional blockchain community with 38.5K+ members across 127 countries. Connect with mental health advocates and Web3 innovators. Free access to exclusive events, AMAs, and early token opportunities." />
        <meta name="keywords" content="blockchain community 2025, emotional blockchain technology, Web3 mental health platform, SoulChain community, mental health blockchain, cryptocurrency community, emotional expression Web3, blockchain mental health support" />
        <link rel="canonical" href="https://thesoulchain.xyz/community" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="SoulChain Team" />
        <meta name="publisher" content="SoulChain" />
        <meta name="article:published_time" content={currentDate} />
        <meta name="article:modified_time" content={lastUpdated} />
        <meta property="og:title" content="Join SoulChain Community - 38.5K+ Emotional Blockchain Members | Mental Health Web3 Platform" />
        <meta property="og:description" content="Join the world's largest emotional blockchain community with 38.5K+ members across 127 countries. Connect with mental health advocates and Web3 innovators building the future." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thesoulchain.xyz/community" />
        <meta property="og:site_name" content="SoulChain" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TheSoulChain" />
        <meta name="twitter:creator" content="@TheSoulChain" />
        <meta name="twitter:title" content="Join SoulChain Community - 38.5K+ Emotional Blockchain Members" />
        <meta name="twitter:description" content="Join the world's largest emotional blockchain community with 38.5K+ members across 127 countries. Free access to exclusive events and early opportunities." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <meta name="theme-color" content="#8B5CF6" />
        <link rel="alternate" hrefLang="en" href="https://thesoulchain.xyz/community" />
      </Helmet>

      <main className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="container relative z-10">
          {/* Navigation and Internal Links */}
          <nav className="flex justify-center gap-4 mb-12 flex-wrap" role="navigation" aria-label="Page navigation">
            <Link
              to="/roadmap"
              className="btn btn-secondary animate-fadeIn group"
              aria-label="View SoulChain development roadmap and milestones"
            >
              <Map className="w-5 h-5" />
              <span className="font-medium">Development Roadmap</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/presale"
              className="btn btn-secondary animate-fadeIn group"
              aria-label="Learn about SoulChain token economics and presale"
            >
              <Rocket className="w-5 h-5" />
              <span className="font-medium">Token Presale</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/blog"
              className="btn btn-secondary animate-fadeIn group"
              aria-label="Read SoulChain blog for latest updates and insights"
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Community Blog</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </nav>

          {/* Hero Section */}
          <header className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 animate-fadeIn">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 font-medium">Join 38.5K+ Members Worldwide</span>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">LIMITED TIME</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
              <span className="gradient-text">World's Largest</span>
              <br />
              <span className="text-white">Emotional Blockchain Community</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-slideIn mb-6">
              Join the revolutionary community of mental health advocates, blockchain innovators, and emotional expression pioneers
              building the future of Web3 mental health platforms. Get exclusive access to early token opportunities, expert AMAs,
              and a supportive global network across 127 countries.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-purple-300 mb-8">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Last updated: {new Date(lastUpdated).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Growing 12% monthly
              </span>
            </div>
          </header>

          {/* Limited Time Offer Banner */}
          <section className="mb-20">
            <div className="card bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Gift className="w-6 h-6 text-red-400 animate-pulse" />
                <h2 className="text-2xl font-bold text-white">Exclusive Launch Offer - Limited Time!</h2>
              </div>
              <p className="text-red-200 mb-4">
                Join our community in the next 48 hours and receive exclusive benefits:
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>Priority token presale access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Exclusive NFT airdrop</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Founder-level community status</span>
                </div>
              </div>
            </div>
          </section>

          {/* Community Statistics */}
          <section className="mb-20" aria-labelledby="community-stats-heading">
            <h2 id="community-stats-heading" className="text-3xl font-bold text-center mb-12 gradient-text">
              Global Emotional Blockchain Community Impact
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {communityStats.map((stat, index) => (
                <article key={index} className={`card text-center group animate-fadeIn`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-white" aria-hidden="true">
                      {stat.icon}
                    </span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-indigo-300 text-sm mb-2">{stat.label}</div>
                  <div className="text-xs text-green-400">{stat.growth}</div>
                </article>
              ))}
            </div>
          </section>

          {/* Community Guidelines */}
          <section className="mb-20" aria-labelledby="community-guidelines-heading">
            <h2 id="community-guidelines-heading" className="text-3xl font-bold text-center mb-12 gradient-text">
              Our Mental Health Web3 Community Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communityGuidelines.map((guideline, index) => (
                <article key={index} className="card group animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white" aria-hidden="true">
                      {guideline.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{guideline.title}</h3>
                  <p className="text-indigo-200 text-sm">{guideline.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Community Features */}
          <section className="mb-20" aria-labelledby="community-features-heading">
            <h2 id="community-features-heading" className="text-3xl font-bold text-center mb-12 gradient-text">
              Exclusive Blockchain Community Benefits
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communityFeatures.map((feature, index) => (
                <article key={index} className={`card group animate-fadeIn hover:border-purple-400/50 transition-all`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-white" aria-hidden="true">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-indigo-200 text-sm mb-3">{feature.description}</p>
                  <div className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full inline-block">
                    {feature.benefit}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="mb-20" aria-labelledby="upcoming-events-heading">
            <h2 id="upcoming-events-heading" className="text-3xl font-bold text-center mb-12 gradient-text">
              Upcoming Community Events & Milestones
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <article key={index} className="card animate-fadeIn hover:border-blue-400/50 transition-all" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 text-sm">{new Date(event.date).toLocaleDateString()}</span>
                    <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full ml-auto">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-indigo-200 text-sm mb-3">{event.description}</p>
                  <div className="text-xs text-green-400">{event.attendees}</div>
                </article>
              ))}
            </div>
          </section>

          {/* Learning Resources */}
          <section className="mb-20" aria-labelledby="learning-resources-heading">
            <h2 id="learning-resources-heading" className="text-3xl font-bold text-center mb-12 gradient-text">
              Free Blockchain & Mental Health Learning Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {learningResources.map((resource, index) => (
                <article key={index} className="card animate-fadeIn hover:border-green-400/50 transition-all" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-green-400" />
                    <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
                      {resource.type}
                    </span>
                    <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full ml-auto">
                      {resource.level}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                  <div className="text-sm text-indigo-300">{resource.duration}</div>
                  <div className="mt-4 text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-full inline-block">
                    Coming Soon
                  </div>
                </article>
              ))}
            </div>
            <p className="text-center text-indigo-300 mt-8">
              Our educational resources are currently in development and will be available soon.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Social Links */}
            <section className="animate-slideIn" aria-labelledby="social-links-heading">
              <h2 id="social-links-heading" className="text-3xl font-bold mb-6 gradient-text flex items-center gap-3">
                <Heart className="w-8 h-8 text-purple-400" />
                Connect With Our Global Community
              </h2>
              <p className="text-indigo-200 mb-8 text-lg">
                The SoulChain emotional blockchain community spans across 127 countries, bringing together mental health advocates,
                blockchain developers, and individuals passionate about authentic emotional expression. Join our vibrant discussions
                about Web3 mental health innovations, participate in exclusive AMAs, and connect with like-minded individuals
                who understand the importance of emotional well-being in the digital age.
              </p>

              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className="card flex items-center gap-4 p-6 hover:scale-105 transition-all duration-300 group hover:border-purple-400/50"
                    aria-label={`Join SoulChain ${link.name} community with ${link.members} active members`}
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <span aria-hidden="true">{link.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold text-lg">{link.name}</span>
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                          {link.members}
                        </span>
                      </div>
                      <p className="text-indigo-300 text-sm mb-1">{link.description}</p>
                      <p className="text-xs text-green-400">{link.engagement}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>

              {/* Community Quote */}
              <blockquote className="card bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30 mt-8 animate-fadeIn">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-indigo-100 italic mb-4">
                      "SoulChain has transformed how I think about emotional expression and mental health in Web3.
                      The community is incredibly supportive, and I've learned so much about blockchain applications
                      for mental wellness. It's amazing to be part of something that combines technology with genuine human connection."
                    </p>
                    <footer className="text-sm">
                      <cite className="text-purple-300 font-semibold">Sarah Chen</cite>
                      <span className="text-indigo-400"> - Mental Health Advocate & Community Member</span>
                    </footer>
                  </div>
                </div>
              </blockquote>
            </section>

            {/* Newsletter Signup */}
            <section className="card bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 animate-fadeIn" aria-labelledby="newsletter-heading">
              <header className="text-center mb-8">
                <Mail className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                <h2 id="newsletter-heading" className="text-2xl font-bold gradient-text mb-4">
                  Join Our Exclusive Community Updates
                </h2>
                <p className="text-indigo-200">
                  Subscribe to receive the latest updates about SoulChain development, exclusive token presale announcements,
                  community events, and insights from our mental health Web3 platform. Be the first to know about opportunities
                  and connect with our growing community of 38.5K+ members worldwide.
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="community-name" className="block text-sm font-medium text-indigo-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="community-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                    aria-required="true"
                    autoComplete="name"
                  />
                  {formErrors.name && (
                    <p id="name-error" className="text-red-400 text-sm mt-1" role="alert">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="community-email" className="block text-sm font-medium text-indigo-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="community-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email address"
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                    aria-required="true"
                    autoComplete="email"
                  />
                  {formErrors.email && (
                    <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <fieldset>
                  <legend className="block text-sm font-medium text-indigo-300 mb-3">
                    What interests you most? (Optional)
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {interestOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all text-sm ${
                          formData.interests.includes(option.id)
                            ? 'bg-purple-500/30 border border-purple-400 text-purple-200'
                            : 'bg-white/5 border border-white/10 text-indigo-300 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={formData.interests.includes(option.id)}
                          onChange={() => handleInterestChange(option.id)}
                          aria-describedby={`${option.id}-description`}
                        />
                        <span aria-hidden="true">{option.icon}</span>
                        <span id={`${option.id}-description`}>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-describedby="submit-description"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner" aria-hidden="true"></div>
                      <span>Joining Community...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Join 38.5K+ Members Now</span>
                    </>
                  )}
                </button>

                <p id="submit-description" className="text-xs text-indigo-400 text-center">
                  By subscribing, you agree to receive updates from SoulChain about our emotional blockchain platform,
                  token presale opportunities, and community events. We respect your privacy and will never share your information.
                  You can unsubscribe at any time.
                </p>
              </form>
            </section>
          </div>

          {/* Whitepaper Modal */}
          {showWhitepaper && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30 relative">
                <button 
                  onClick={() => setShowWhitepaper(false)}
                  className="absolute top-10 right-10 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                  aria-label="Close whitepaper"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold gradient-text mb-4">SoulChain Whitepaper</h2>
                    <p className="text-indigo-300">Emotional Blockchain Technology for Mental Health</p>
                    <div className="flex items-center justify-center gap-4 mt-4 text-sm text-purple-300">
                      <span>Version 1.0</span>
                      <span>Last Updated: {new Date(lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <h3 className="text-2xl font-bold text-white mb-4">Abstract</h3>
                    <p className="mb-6">
                      In an age where social media dominates human interaction, people are constantly pressured to present a filtered, 
                      idealized version of themselves. Platforms like Instagram, Snapchat, and Facebook thrive on curated aesthetics, 
                      shallow dopamine-driven feedback loops, and the pursuit of followers and validation.
                    </p>
                    <p className="mb-6">
                      Lost in this storm of artificial connection is the raw, honest essence of being human: our regrets, our dreams, 
                      the lessons we learn the hard way, and the beautiful or painful memories we never want to forget. Enter SoulChain — 
                      a revolutionary Web3 project designed not to capture attention, but to capture authenticity.
                    </p>

                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">The SoulChain Vision</h3>
                    <p className="mb-6">
                      SoulChain is a decentralized emotional journaling platform — a permanent public library for the soul. 
                      Its mission is to preserve the most intimate human emotions as on-chain entries, accessible by all, 
                      owned by none, and eternal.
                    </p>
                    <ul className="mb-6 space-y-2">
                      <li className="flex items-start gap-2">
                        <Heart className="w-5 h-5 text-pink-500 flex-shrink-0" />
                        <span><strong>Regrets</strong> - The mistakes we've made, words we wish we could take back, paths not taken that haunt our quiet moments.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span><strong>Dreams</strong> - Our deepest aspirations, futures we envision, hopes that drive us forward despite obstacles.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BookOpen className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <span><strong>Life Lessons</strong> - Wisdom earned through experience, insights from living, truths discovered the hard way.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span><strong>Memories</strong> - Moments that shaped us, both beautiful and painful, preserved as emotional artifacts for eternity.</span>
                      </li>
                    </ul>

                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">Technical Architecture</h3>
                    <h4 className="text-xl font-bold text-white mb-2">Blockchain Infrastructure</h4>
                    <p className="mb-4">
                      Built on Solana blockchain, chosen for:
                    </p>
                    <ul className="mb-6 grid grid-cols-2 gap-2">
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>High speed and low transaction costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Environmental sustainability compared to proof-of-work networks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>Robust ecosystem for Web3 applications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Strong developer tooling and community support</span>
                      </li>
                    </ul>

                    <h4 className="text-xl font-bold text-white mb-2 mt-6">Key Features</h4>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="card p-4">
                        <h5 className="font-bold text-white mb-2">SoulDrop</h5>
                        <p className="text-sm">Daily random emotional entry gifted to users</p>
                      </div>
                      <div className="card p-4">
                        <h5 className="font-bold text-white mb-2">Anonymous by default</h5>
                        <p className="text-sm">No social pressure or ego involvement</p>
                      </div>
                      <div className="card p-4">
                        <h5 className="font-bold text-white mb-2">500 character limit</h5>
                        <p className="text-sm">Focused, meaningful expression</p>
                      </div>
                      <div className="card p-4">
                        <h5 className="font-bold text-white mb-2">Mood tagging</h5>
                        <p className="text-sm">Enhanced with emojis and themes</p>
                      </div>
                      <div className="card p-4 col-span-2">
                        <h5 className="font-bold text-white mb-2">No social mechanics</h5>
                        <p className="text-sm">No likes, comments, or follower counts</p>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">SOUL Token Economics</h3>
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-white mb-2">Total Supply: 5,000,000,000 SOUL</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div className="card p-4">
                          <h5 className="font-bold text-white mb-1">Presale</h5>
                          <p className="text-2xl gradient-text">40%</p>
                        </div>
                        <div className="card p-4">
                          <h5 className="font-bold text-white mb-1">Ecosystem Growth</h5>
                          <p className="text-2xl gradient-text">15%</p>
                        </div>
                        <div className="card p-4">
                          <h5 className="font-bold text-white mb-1">Liquidity</h5>
                          <p className="text-2xl gradient-text">25%</p>
                        </div>
                        <div className="card p-4">
                          <h5 className="font-bold text-white mb-1">Team (Vested)</h5>
                          <p className="text-2xl gradient-text">5%</p>
                        </div>
                        <div className="card p-4">
                          <h5 className="font-bold text-white mb-1">Marketing</h5>
                          <p className="text-2xl gradient-text">10%</p>
                        </div>
                        <div className="card p-4">
                          <h5 className="font-bold text-white mb-1">SoulDrop</h5>
                          <p className="text-2xl gradient-text">5%</p>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2 mt-6">Token Utility</h4>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-2">
                        <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span>Premium features and AI-powered insights</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <span>Private encrypted vaults</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <span>NFT minting of meaningful entries</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span>DAO governance participation</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-pink-400 flex-shrink-0" />
                        <span>Staking rewards and emotional badges</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">Philosophical Impact</h3>
                    <h4 className="text-xl font-bold text-white mb-2">Redefining Digital Connection</h4>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="card p-4">
                        <div className="text-2xl mb-2">🎭→🔍</div>
                        <h5 className="font-bold text-white mb-1">Performance to Authenticity</h5>
                        <p className="text-sm">Share genuine experiences rather than curated personas</p>
                      </div>
                      <div className="card p-4">
                        <div className="text-2xl mb-2">🏆→🤝</div>
                        <h5 className="font-bold text-white mb-1">Competition to Connection</h5>
                        <p className="text-sm">Foster empathy rather than social comparison</p>
                      </div>
                      <div className="card p-4">
                        <div className="text-2xl mb-2">⏰→♾️</div>
                        <h5 className="font-bold text-white mb-1">Temporary to Eternal</h5>
                        <p className="text-sm">Emotional entries become permanent human heritage</p>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">Development Phases</h3>
                    <div className="space-y-6 mb-6">
                      <div className="card p-6">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">Phase 0</span>
                          <span>Vision & Architecture</span>
                          <span className="ml-auto text-sm text-purple-300">Q3–Q4 2024</span>
                        </h4>
                        <p className="text-sm text-indigo-200">
                          Define SoulChain's emotional philosophy and use case • Research decentralized identity, encrypted storage...
                        </p>
                      </div>
                      <div className="card p-6">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Phase 1</span>
                          <span>Testnet & Community Bootstrap</span>
                          <span className="ml-auto text-sm text-blue-300">Q1 2024</span>
                        </h4>
                        <p className="text-sm text-indigo-200">
                          Launch SoulChain MVP on BSC Testnet • Integrate wallet journaling, mood tagging, encryption...
                        </p>
                      </div>
                      <div className="card p-6">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Phase 2</span>
                          <span>Mainnet Launch & Presale</span>
                          <span className="ml-auto text-sm text-green-300">Q2 2025</span>
                        </h4>
                        <p className="text-sm text-indigo-200">
                          Deploy SoulToken and SoulPresale contracts on BSC Mainnet • Enable public journaling and mood tracking...
                        </p>
                      </div>
                      <div className="card p-6">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">Phase 3</span>
                          <span>Soul Circles, DAO, and AI Prompts</span>
                          <span className="ml-auto text-sm text-yellow-300">Q2–Q3 2025</span>
                        </h4>
                        <p className="text-sm text-indigo-200">
                          Launch emotional SoulCircles (Love, Grief, Anxiety, etc.) • Integrate AI-based emotional journaling prompts (offline/secure)...
                        </p>
                      </div>
                      <div className="card p-6">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">Phase 4</span>
                          <span>Listing & Therapy Mode & Mental Health Partnerships</span>
                          <span className="ml-auto text-sm text-red-300">Q4 2025</span>
                        </h4>
                        <p className="text-sm text-indigo-200">
                          Listing on the Top Tier CEX Exchanges and Pancakeswap/Uniswap • Secure therapist integration for encrypted journal sharing...
                        </p>
                      </div>
                      <div className="card p-6">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                          <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm">Phase 5</span>
                          <span>Ecosystem Growth & Legacy Mode</span>
                          <span className="ml-auto text-sm text-pink-300">2026–2027</span>
                        </h4>
                        <p className="text-sm text-indigo-200">
                          Launch Legacy Mode: Time-locked emotional archives for future sharing • Expand AI companions for journaling therapy...
                        </p>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">Privacy & Ethics</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="card p-6">
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-blue-400" />
                          <span>Privacy by Design</span>
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>Anonymous by default</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>Wallet-based identity control</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>Optional attribution levels</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>End-to-end encryption options</span>
                          </li>
                        </ul>
                      </div>
                      <div className="card p-6">
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                          <Heart className="w-5 h-5 text-pink-400" />
                          <span>Ethical Safeguards</span>
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>Mental health resource integration</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>Community moderation systems</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>Cultural sensitivity protocols</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>Licensed therapist partnerships</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 mt-8">Conclusion</h3>
                    <p className="mb-6">
                      SoulChain represents more than a Web3 project — it's a movement toward authentic digital connection. 
                      In a world where everything is temporary, SoulChain makes feelings permanent.
                    </p>
                    <p className="mb-6">
                      By preserving the emotional heritage of our species on an immutable blockchain, we create a bridge between 
                      generations, cultures, and individual experiences. This is our invitation: join us in building not just the 
                      future of Web3, but the future of human emotional connection.
                    </p>
                    <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-6 italic text-xl">
                      "In a world where everything is temporary, SoulChain makes feelings permanent."
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Internal Links Section */}
          <section className="mt-20 text-center" aria-labelledby="explore-more-heading">
            <h2 id="explore-more-heading" className="text-3xl font-bold mb-8 gradient-text">
              Explore More About SoulChain
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setShowWhitepaper(true)}
                className="card hover:border-blue-400/50 transition-all group text-left cursor-pointer"
                aria-label="Read SoulChain whitepaper for technical details and vision"
              >
                <FileText className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Technical Whitepaper</h3>
                <p className="text-indigo-200 text-sm mb-3">
                  Deep dive into our emotional blockchain technology and tokenomics
                </p>
                <span className="text-blue-400 text-sm group-hover:text-blue-300">
                  Read whitepaper →
                </span>
              </button>
              <Link
                to="/roadmap"
                className="card hover:border-purple-400/50 transition-all group"
                aria-label="View SoulChain development roadmap and upcoming milestones"
              >
                <Target className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Development Roadmap</h3>
                <p className="text-indigo-200 text-sm mb-3">
                  Track our progress and upcoming platform features
                </p>
                <span className="text-purple-400 text-sm group-hover:text-purple-300">
                  View roadmap →
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Community;
