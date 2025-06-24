import React, { useState, useMemo } from 'react';
import { PieChart, TrendingUp, Users, Lock, Gift, Coins, Vote, Star, Flame } from 'lucide-react';

const Tokenomics: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [hoveredUtility, setHoveredUtility] = useState<number | null>(null);

  const tokenAllocation = useMemo(() => [
    { name: 'Presale', percentage: 40, color: '#6366f1', details: '2,000,000,000 SOUL tokens across 10 stages × 200M each' },
    { name: 'Liquidity & CEX', percentage: 25, color: '#8b5cf6', details: '1,250,000,000 SOUL tokens locked with phased release for exchanges' },
    { name: 'Ecosystem Reserve', percentage: 15, color: '#14b8a6', details: '750,000,000 SOUL tokens for staking, community rewards, and DApp integration' },
    { name: 'Marketing & Growth', percentage: 10, color: '#f59e0b', details: '500,000,000 SOUL tokens for influencers, CEX listings, and PR campaigns' },
    { name: 'Team & Founders', percentage: 5, color: '#ec4899', details: '250,000,000 SOUL tokens with 6-month cliff and 2-year vesting' },
    { name: 'Souldrop & Emotional Grant', percentage: 5, color: '#06b6d4', details: '250,000,000 SOUL tokens for launchpad rewards and giveaways' }
  ], []);

  const tokenUtility = useMemo(() => [
    {
      title: 'Presale Participation',
      description: 'Access to 10 presale stages with exclusive pricing and early token allocation',
      icon: Coins,
      benefit: 'Early access advantage'
    },
    {
      title: 'Staking Rewards',
      description: 'Stake SOUL tokens to earn passive rewards from the ecosystem reserve pool',
      icon: Star,
      benefit: 'Passive income generation'
    },
    {
      title: 'CEX Trading',
      description: 'Trade on major centralized exchanges with guaranteed liquidity backing',
      icon: TrendingUp,
      benefit: 'High liquidity trading'
    },
    {
      title: 'Governance & Voting',
      description: 'Vote on ecosystem proposals, treasury usage, and platform developments',
      icon: Vote,
      benefit: 'Democratic participation'
    },
    {
      title: 'Community Rewards',
      description: 'Earn SOUL through airdrops, launchpad participation, and community events',
      icon: Gift,
      benefit: 'Reward opportunities'
    }
  ], []);

  const piePaths = useMemo(() => {
    return tokenAllocation.reduce((acc, segment, i) => {
      const prevTotal = acc.total;
      const total = prevTotal + segment.percentage;

      const startAngle = prevTotal * 3.6;
      const endAngle = total * 3.6;

      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;

      const x1 = 50 + 40 * Math.cos(startRad);
      const y1 = 50 + 40 * Math.sin(startRad);
      const x2 = 50 + 40 * Math.cos(endRad);
      const y2 = 50 + 40 * Math.sin(endRad);

      const largeArcFlag = segment.percentage > 50 ? 1 : 0;

      const path = (
        <path
          key={i}
          d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
          fill={segment.color}
          stroke="#1a1f3c"
          strokeWidth="0.5"
          className={`transition-all duration-300 cursor-pointer ${
            activeSegment === segment.name
              ? 'opacity-100 drop-shadow-lg'
              : 'opacity-80 hover:opacity-90'
          }`}
          onMouseEnter={() => setActiveSegment(segment.name)}
          onMouseLeave={() => setActiveSegment(null)}
          style={{
            filter: activeSegment === segment.name ? 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))' : 'none',
            transform: activeSegment === segment.name ? 'scale(1.03)' : 'scale(1)'
          }}
          aria-label={`${segment.name} allocation: ${segment.percentage}%`}
        />
      );

      return {
        total,
        paths: [...acc.paths, path]
      };
    }, { total: 0, paths: [] as React.ReactNode[] }).paths;
  }, [tokenAllocation, activeSegment]);

  return (
    <section id="tokenomics" className="section-padding bg-gray-900/50 relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">SOUL Token Economics</h2>
          <p className="section-subtitle">
            A carefully designed token economy balancing platform growth, community fairness, and project sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 gradient-text">Token Allocation</h3>
            <p className="text-indigo-200 mb-6">
              The total supply of SOUL tokens is capped at 5,000,000,000. This distribution ensures balanced growth
              with appropriate incentives for all stakeholders while maintaining community ownership.
            </p>

            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <Flame className="w-5 h-5 text-red-500 mr-2 animate-pulse" />
                <span className="text-red-400 font-semibold">🔥 Burn Mechanism</span>
              </div>
              <p className="text-red-200 text-sm">
                0.5% auto-burn on every on-chain transaction (buy, sell, transfer). Burned tokens are permanently removed from circulation.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              {tokenAllocation.map((segment) => (
                <div
                  key={segment.name}
                  className="flex items-center cursor-pointer transition-all duration-300 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
                  onMouseEnter={() => setActiveSegment(segment.name)}
                  onMouseLeave={() => setActiveSegment(null)}
                  aria-label={`${segment.name} allocation details`}
                >
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: segment.color }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white">{segment.name}</span>
                      <span className="text-indigo-300 font-bold">{segment.percentage}%</span>
                    </div>
                    {activeSegment === segment.name && (
                      <p className="text-sm text-indigo-200 mt-2 animate-fadeIn leading-relaxed">
                        {segment.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fixed Pie Chart Container */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-xs h-80 sm:h-96 md:h-[28rem] lg:h-[32rem]">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full transform -rotate-90 drop-shadow-lg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {piePaths}
                  <circle cx="50" cy="50" r="15" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center bg-gray-900/80 backdrop-blur-sm rounded-full p-4 border border-white/10 w-24 h-24 flex flex-col items-center justify-center">
                  <PieChart className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
                  <div className="text-xs text-indigo-200">TOTAL SUPPLY</div>
                  <div className="text-sm font-bold gradient-text">5B SOUL</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Token Utility & Benefits
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Multiple use cases designed to create sustainable value and genuine utility for SOUL token holders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {tokenUtility.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 h-full cursor-pointer transition-all duration-500 hover:border-indigo-500/50 hover:bg-slate-800/60 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/10 ${
                    hoveredUtility === index ? 'border-indigo-500/70 bg-slate-800/70 scale-105 shadow-xl shadow-indigo-500/20' : ''
                  }`}
                  onMouseEnter={() => setHoveredUtility(index)}
                  onMouseLeave={() => setHoveredUtility(null)}
                  role="region"
                  aria-labelledby={`utility-${index}-title`}
                >
                  <div className="flex flex-col h-full">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center mb-4 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-colors">
                      <IconComponent 
                        className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" 
                        aria-hidden="true"
                      />
                    </div>

                    <h3 id={`utility-${index}-title`} className="text-lg font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-300 text-sm mb-4 flex-grow leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-auto">
                      <div className="inline-flex items-center text-xs font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                        <Star className="w-3 h-3 mr-1" />
                        {item.benefit}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
