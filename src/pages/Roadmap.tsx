import React, { useState, useMemo } from 'react';
import { CheckCircle, Circle, X, FileText, Heart, Sparkles, BookOpen, Calendar, Globe, Shield, Award, Users, Zap } from 'lucide-react';

const Roadmap: React.FC = () => {
  const [isSoulPaperOpen, setIsSoulPaperOpen] = useState(false);

  // Memoized roadmap data to prevent unnecessary re-renders
  const roadmapPhases = useMemo(() => [
    {
      phase: 'Phase 0',
      title: 'Vision & Architecture',
      period: 'Q3–Q4 2024',
      completed: true,
      milestones: [
        'Define SoulChain\'s emotional philosophy and use case',
        'Research decentralized identity, encrypted storage',
        'Draft tokenomics and journaling interaction model',
        'Build small prototype with wallet-based journal system'
      ]
    },
    {
      phase: 'Phase 1',
      title: 'Testnet & Community Bootstrap',
      period: 'Q1 2024',
      completed: true,
      milestones: [
        'Launch SoulChain MVP on BSC Testnet',
        'Integrate wallet journaling, mood tagging, encryption',
        'Open private alpha for 100 early testers',
        'Conduct token presale for early backers',
        'Launch website, brand identity, SoulPaper v1'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Mainnet Launch & Presale',
      period: 'Q2 2025',
      completed: false,
      milestones: [
        'Deploy SoulToken and SoulPresale contracts on BSC Mainnet',
        'Enable public journaling and mood tracking',
        'List token info on CoinGecko, CoinMarketCap',
        'Begin aggressive marketing: influencers, KOLs, PR, Twitter/X ads',
        'Publish SoulPaper v2 and get third-party contract audits'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Soul Circles, DAO, and AI Prompts',
      period: 'Q2–Q3 2025',
      completed: false,
      milestones: [
        'Launch emotional SoulCircles (Love, Grief, Anxiety, etc.)',
        'Integrate AI-based emotional journaling prompts (offline/secure)',
        'DAO launch for community voting on prompts and themes',
        'Expand to multi-chain support via bridge (Polygon, Base, etc.)',
        'Begin research into emotion-based soul-score model'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Listing & Therapy Mode & Mental Health Partnerships',
      period: 'Q4 2025',
      completed: false,
      milestones: [
        'Listing on the Top Tier CEX Exchanges and Pancakeswap/Uniswap',
        'Secure therapist integration for encrypted journal sharing',
        'Partner with NGOs and digital wellness organizations',
        'Start Emotional Grants Program using 5% of token supply',
        'Enable SoulChain SDK for third-party emotion dApps',
        'Mobile app prototype for journaling on-the-go'
      ]
    },
    {
      phase: 'Phase 5',
      title: 'Ecosystem Growth & Legacy Mode',
      period: '2026–2027',
      completed: false,
      milestones: [
        'Launch Legacy Mode: Time-locked emotional archives for future sharing',
        'Expand AI companions for journaling therapy',
        'Emotional fingerprinting with user consent (emotion evolution)',
        'Scale to 1M+ emotional entries, 100K+ users',
        'Start SoulChain Foundation for digital emotional well-being',
        'Conduct full ecosystem audit and launch SoulChain v2'
      ]
    }
  ], []);

  // Complete whitepaper content with all sections
  const renderWhitepaperContent = () => (
    <article className="space-y-8 text-slate-300">
      <section aria-labelledby="abstract-heading">
        <h2 id="abstract-heading" className="text-2xl font-semibold text-indigo-300 mb-4">
          Abstract
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">
            In an age where social media dominates human interaction, people are constantly pressured to present filtered versions of themselves.
          </p>
          <p>
            SoulChain captures authentic human emotions - our regrets, dreams, and meaningful memories - preserving them permanently on blockchain.
          </p>
        </div>
      </section>

      <section aria-labelledby="vision-heading">
        <h2 id="vision-heading" className="text-2xl font-semibold text-indigo-300 mb-4">
          Core Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Heart, title: 'Regrets', color: 'text-pink-500', description: 'The mistakes and words we wish we could take back' },
            { icon: Sparkles, title: 'Dreams', color: 'text-yellow-400', description: 'Our deepest aspirations and hopes' },
            { icon: BookOpen, title: 'Lessons', color: 'text-blue-400', description: 'Wisdom earned through experience' },
            { icon: Calendar, title: 'Memories', color: 'text-green-400', description: 'Moments that shaped us, preserved forever' }
          ].map((item, i) => (
            <div 
              key={i}
              className="bg-slate-800/50 p-4 rounded-lg transition-all hover:scale-[1.02]"
              role="article"
              aria-labelledby={`vision-item-${i}`}
            >
              <h3 id={`vision-item-${i}`} className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <item.icon className={`w-5 h-5 ${item.color}`} aria-hidden="true" />
                <span>{item.title}</span>
              </h3>
              <p className="text-sm text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="architecture-heading">
        <h2 id="architecture-heading" className="text-2xl font-semibold text-indigo-300 mb-4">
          Technical Architecture
        </h2>
        <div className="bg-slate-800/30 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Blockchain Infrastructure</h3>
          <p className="mb-4">Built on Solana blockchain for high performance and low costs</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>High speed and low transaction costs</li>
            <li>Environmental sustainability</li>
            <li>Robust developer ecosystem</li>
            <li>Strong community support</li>
          </ul>
        </div>
        <div className="bg-slate-800/30 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>SoulDrop:</strong> Daily random emotional entries</li>
            <li><strong>Anonymous by default:</strong> No social pressure</li>
            <li><strong>500 character limit:</strong> Focused expression</li>
            <li><strong>Mood tagging:</strong> Enhanced with emojis</li>
            <li><strong>No social mechanics:</strong> No likes/comments</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="tokenomics-heading">
        <h2 id="tokenomics-heading" className="text-2xl font-semibold text-indigo-300 mb-4">
          Token Economics
        </h2>
        <div className="bg-slate-800/30 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Total Supply: 5,000,000,000 SOUL</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Presale</span>
                <span className="text-indigo-300">40%</span>
              </div>
              <div className="flex justify-between">
                <span>Ecosystem Growth</span>
                <span className="text-indigo-300">15%</span>
              </div>
              <div className="flex justify-between">
                <span>Liquidity</span>
                <span className="text-indigo-300">25%</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Team (Vested)</span>
                <span className="text-indigo-300">5%</span>
              </div>
              <div className="flex justify-between">
                <span>Marketing</span>
                <span className="text-indigo-300">10%</span>
              </div>
              <div className="flex justify-between">
                <span>SoulDrop</span>
                <span className="text-indigo-300">5%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/30 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Token Utility</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Premium features and AI-powered insights</li>
            <li>Private encrypted vaults</li>
            <li>NFT minting of meaningful entries</li>
            <li>DAO governance participation</li>
            <li>Staking rewards and emotional badges</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="philosophy-heading">
        <h2 id="philosophy-heading" className="text-2xl font-semibold text-indigo-300 mb-4">
          Philosophical Impact
        </h2>
        <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Redefining Digital Connection</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🎭→🔍</div>
              <p><strong>Performance to Authenticity</strong><br/>Share genuine experiences rather than curated personas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🏆→🤝</div>
              <p><strong>Competition to Connection</strong><br/>Foster empathy rather than social comparison</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⏰→♾️</div>
              <p><strong>Temporary to Eternal</strong><br/>Emotional entries become permanent human heritage</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="development-heading">
        <h2 id="development-heading" className="text-2xl font-semibold text-indigo-300 mb-4">
          Development Phases
        </h2>
        <div className="space-y-4">
          {roadmapPhases.map((phase, index) => (
            <div key={index} className="bg-slate-800/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">{phase.phase}: {phase.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  phase.completed ? 'bg-green-500/20 text-green-400' : 'bg-indigo-500/20 text-indigo-300'
                }`}>
                  {phase.period}
                </span>
              </div>
              <p className="text-sm text-slate-400">
                {phase.milestones.slice(0, 2).join(' • ')}
                {phase.milestones.length > 2 && '...'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="privacy-heading">
        <h2 id="privacy-heading" className="text-2xl font-semibold text-indigo-300 mb-4">
          Privacy & Ethics
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/30 p-6 rounded-lg">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>Privacy by Design</span>
            </h3>
            <ul className="text-sm space-y-2">
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
          <div className="bg-slate-800/30 p-6 rounded-lg">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              <span>Ethical Safeguards</span>
            </h3>
            <ul className="text-sm space-y-2">
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
      </section>

      <section aria-labelledby="conclusion-heading">
        <h2 id="conclusion-heading" className="text-2xl font-semibold text-indigo-300 mb-4">
          Conclusion
        </h2>
        <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-lg">
          <p className="leading-relaxed mb-4 text-lg">
            SoulChain represents more than a Web3 project — it's a movement toward authentic digital connection.
          </p>
          <p className="leading-relaxed">
            By preserving the emotional heritage of our species on an immutable blockchain, we create a bridge between generations and individual experiences.
          </p>
          <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-6 italic text-xl">
            "In a world where everything is temporary, SoulChain makes feelings permanent."
          </blockquote>
        </div>
      </section>
    </article>
  );

  // Memoized roadmap item component
  const RoadmapItem = useMemo(() => ({ phase, index }: { phase: typeof roadmapPhases[0], index: number }) => (
    <div 
      className={`flex flex-col md:flex-row ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      } items-center gap-8 relative`}
      role="article"
      aria-labelledby={`phase-${index}-heading`}
    >
      {/* Timeline indicator */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 z-10 hidden md:flex items-center justify-center">
        {phase.completed ? (
          <CheckCircle 
            className="w-10 h-10 text-green-500 bg-gray-900 rounded-full p-1" 
            aria-label="Completed phase"
          />
        ) : (
          <Circle 
            className="w-10 h-10 text-indigo-500 bg-gray-900 rounded-full p-1" 
            aria-label="Upcoming phase"
          />
        )}
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 flex md:justify-end">
        <div className={`card w-full md:max-w-lg relative ${
          phase.completed ? 'border-green-500/30' : ''
        }`}>
          {/* Mobile indicator */}
          <div className="md:hidden absolute -top-5 -left-2">
            {phase.completed ? (
              <CheckCircle className="w-10 h-10 text-green-500 bg-gray-900 rounded-full p-1" />
            ) : (
              <Circle className="w-10 h-10 text-indigo-500 bg-gray-900 rounded-full p-1" />
            )}
          </div>

          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 id={`phase-${index}-heading`} className="text-xl font-bold text-white">
                {phase.phase}: {phase.title}
              </h3>
              <p className="text-indigo-200">{phase.period}</p>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              phase.completed ? 'bg-green-500/20 text-green-400' : 'bg-indigo-500/20 text-indigo-300'
            }`}>
              {phase.completed ? 'Completed' : 'Upcoming'}
            </span>
          </div>

          <ul className="space-y-2">
            {phase.milestones.map((milestone, i) => (
              <li key={i} className="flex items-start">
                <span className="text-indigo-400 mr-2" aria-hidden="true">•</span>
                <span className="text-indigo-200">{milestone}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ), []);

  return (
    <section id="roadmap" className="section-padding relative">
      <div className="container-custom">
        <header className="text-center mb-16">
          <h1 className="section-title">SoulChain Roadmap</h1>
          <p className="section-subtitle">
            Our journey to create a decentralized emotional infrastructure for the Web3 era.
          </p>
        </header>

        <div className="relative">
          {/* Timeline line */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-indigo-500/30 hidden md:block"
            aria-hidden="true"
          />

          {/* Roadmap items */}
          <div className="space-y-16">
            {roadmapPhases.map((phase, index) => (
              <RoadmapItem key={phase.phase} phase={phase} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <footer className="text-center mt-20 pt-12 border-t border-slate-700/50">
          <h2 className="text-2xl font-bold text-white mb-4">Join Our Emotional Revolution</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Be part of building the future of emotional wellness in Web3.
          </p>
          <button
            onClick={() => setIsSoulPaperOpen(true)}
            className="px-8 py-3 border border-slate-600 text-slate-300 font-medium rounded-lg hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
            aria-label="Read SoulChain technical whitepaper"
          >
            <FileText className="w-4 h-4" />
            Read SoulPaper
          </button>
        </footer>
      </div>

      {/* Whitepaper Modal */}
      {isSoulPaperOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="whitepaper-heading"
        >
          <div className="bg-gray-900 border border-slate-700 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 id="whitepaper-heading" className="text-2xl font-bold text-white">
                SoulChain Whitepaper
              </h2>
              <button
                onClick={() => setIsSoulPaperOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close whitepaper"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {renderWhitepaperContent()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Roadmap;
