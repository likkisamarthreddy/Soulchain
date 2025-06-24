import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle, Coins, TrendingUp, Users, Shield } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
  category: 'general' | 'presale' | 'token' | 'platform';
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggle, category, index }) => {
  const getCategoryIcon = () => {
    switch (category) {
      case 'presale': return <Coins className="h-4 w-4" />;
      case 'token': return <TrendingUp className="h-4 w-4" />;
      case 'platform': return <Users className="h-4 w-4" />;
      default: return <HelpCircle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'presale': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'token': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'platform': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="bg-white/[0.02] border border-white/[0.08] rounded-lg hover:border-white/[0.12] transition-all duration-200">
      <button
        className="w-full p-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <div className="flex items-start space-x-4 flex-1">
          <div className={`p-2 rounded-lg border ${getCategoryColor()} flex-shrink-0 mt-0.5`}>
            {getCategoryIcon()}
          </div>
          <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-white/90 transition-colors">
            {question}
          </h3>
        </div>
        <div className="ml-6 flex-shrink-0">
          {isOpen ? (
            <Minus className="h-5 w-5 text-gray-400" />
          ) : (
            <Plus className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>

      <div 
        id={`faq-answer-${index}`}
        aria-labelledby={`faq-question-${index}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
        style={{ 
          minHeight: isOpen ? 'auto' : '0',
          transition: 'max-height 0.3s ease-in-out'
        }}
      >
        <div className="px-6 pb-6 border-t border-white/[0.05]">
          <div className="pt-4 pl-12">
            <p className="text-gray-300 leading-relaxed text-[15px]">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs = [
    // General Questions
    {
      question: "What is SoulChain?",
      answer: "SoulChain is a decentralized emotional journaling platform that allows users to anonymously document their regrets, dreams, life lessons, and memories as permanent, immutable records. Built on multiple blockchains including Solana, BNB Smart Chain, Polygon, and Base, it creates a collective human archive of emotions.",
      category: 'general' as const
    },
    {
      question: "What makes SoulChain different from social media?",
      answer: "Unlike traditional social media platforms focused on likes, followers, and curated content, SoulChain emphasizes emotional authenticity without social validation mechanisms. There are no comments, likes, or followers—just pure emotional expression and passive witnessing of the human experience.",
      category: 'platform' as const
    },
    {
      question: "Is my information private on SoulChain?",
      answer: "Yes, SoulChain is designed with privacy as a core principle. All submissions are anonymous by default, and the platform does not collect personal identifiers. Users have complete control over their emotional content and can choose private encrypted storage options for sensitive entries.",
      category: 'platform' as const
    },
    {
      question: "What are SoulCircles?",
      answer: "SoulCircles are curated emotional communities within SoulChain focused on specific experiences like grief, love, anxiety, or joy. These circles provide focused spaces for sharing and witnessing emotions related to particular life experiences or emotional states, fostering deeper connections through shared human experiences.",
      category: 'platform' as const
    },
    {
      question: "What happens to my entries after submission?",
      answer: "Once submitted, your entries become permanent records on the blockchain. They cannot be edited or deleted, ensuring the authenticity and immutability of the emotional archive. Your entries contribute to the collective human emotional experience preserved for future generations.",
      category: 'platform' as const
    },

    // Presale Questions
    {
      question: "How can I participate in the token presale?",
      answer: "You can participate in the SOUL token presale by connecting your wallet (MetaMask, Trust Wallet, WalletConnect, or Coinbase Wallet) to our presale platform. The presale is currently running on BNB Smart Chain. Purchase tokens using BNB, and after presale completion, tokens will be bridged to Solana and other supported chains.",
      category: 'presale' as const
    },
    {
      question: "What are the presale token prices and allocation?",
      answer: "The presale features multiple phases with progressive pricing: Phase 1 (200M tokens at $0.005), Phase 2 (200M tokens at $0.001), Phase 3 (200M tokens at $0.0015), and Phase 4 (200M tokens at $0.002) and it continues. Total presale allocation is 2.0 billion SOUL tokens out of 5 billion total supply.",
      category: 'presale' as const
    },
    {
      question: "When does the presale start and end?",
      answer: "The SOUL token presale launched on June 1st, 2025, and will run for 90 days or until the full presale allocation is sold out, whichever occurs first. The presale operates on a first-come, first-served basis across all pricing phases.",
      category: 'presale' as const
    },
    {
      question: "What wallets are supported for the presale?",
      answer: "We support MetaMask, Trust Wallet, WalletConnect, and Coinbase Wallet for the presale. Ensure your wallet is connected to BNB Smart Chain and has sufficient BNB for both token purchases and transaction fees (typically 0.001-0.003 BNB per transaction).",
      category: 'presale' as const
    },
    {
      question: "Are there bonuses for early presale participants?",
      answer: "Yes! Early participants receive substantial bonuses: 20% bonus tokens for purchases in Phase 1, 18% bonus in Phase 2, 16% bonus in Phase 3, and 14% bonus in Phase 4 and it continues. Additionally, purchases over $1,000 receive exclusive access to private community channels and governance privileges and unique NFTs.",
      category: 'presale' as const
    },
    {
      question: "What is the token distribution and vesting schedule?",
      answer: "Presale tokens follow a strategic release: 40% unlocked at Token Generation Event (TGE), then 20% released at month 1,  20% at month 2 and finally 20% at month 3. This structure ensures market stability while providing early platform access for our community members.",
      category: 'presale' as const
    },
    {
      question: "Which blockchains will SOUL be available on?",
      answer: "SOUL will be available on multiple blockchains including Solana (primary), BNB Smart Chain, Polygon, and Base. The presale is conducted on BNB Smart Chain, with seamless bridging to other chains post-launch, ensuring maximum accessibility and liquidity across ecosystems.",
      category: 'presale' as const
    },

    // Token Questions
    {
      question: "How does the SOUL token work?",
      answer: "SOUL is a multi-chain utility token powering the SoulChain ecosystem. It enables users to create emotional entries on-chain, access exclusive SoulCircles, participate in governance decisions, earn staking rewards, and receive platform participation incentives across all supported blockchains.",
      category: 'token' as const
    },
    {
      question: "What is the total token supply and allocation?",
      answer: "Total supply is 5 billion SOUL tokens. Allocation breakdown: 40% presale (2B), 25% Liquidity and CEX (1.25B), 5% team (250M with 6-month cliff and 2 years vesting), 15% Ecosystem Reserve (750M), 10% Marketing and Growth(500M), 5% Souldrop and Emotional Grant (250M).",
      category: 'token' as const
    },
    {
      question: "Where will SOUL tokens be listed?",
      answer: "SOUL will launch on PancakeSwap and Uniswap immediately after presale completion. We have confirmed listings on top-tier centralized exchanges including Coinbase, Binance, Bybit, and OKX within 60-90 days post-launch, ensuring maximum liquidity and accessibility for our community.",
      category: 'token' as const
    },
    {
      question: "When will staking be available?",
      answer: "SOUL staking will be available after the completion of presale token distribution, approximately 30 days post-TGE. Staking will offer competitive APY rates (20-35% initially) with additional rewards through platform fee sharing, exclusive content access, and enhanced governance voting power.",
      category: 'token' as const
    }
  ];

const categories = [
    { id: 'all', label: 'All Questions', count: faqs.length },
    { id: 'presale', label: 'Presale', count: faqs.filter(f => f.category === 'presale').length },
    { id: 'token', label: 'Tokenomics', count: faqs.filter(f => f.category === 'token').length },
    { id: 'platform', label: 'Platform', count: faqs.filter(f => f.category === 'platform').length },
    { id: 'general', label: 'General', count: faqs.filter(f => f.category === 'general').length }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-2 mb-6">
            <HelpCircle className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300 text-sm font-medium">Support Center</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about SoulChain platform and SOUL token presale.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-white/[0.02] rounded-xl border border-white/[0.05]">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                activeCategory === category.id
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>{category.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === category.id
                  ? 'bg-black/10 text-black/70'
                  : 'bg-white/[0.08] text-gray-500'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <FAQItem
              key={`${activeCategory}-${index}`}
              question={faq.question}
              answer={faq.answer}
              category={faq.category}
              isOpen={openIndex === index}
              toggle={() => toggleFAQ(index)}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 p-8 bg-white/[0.02] rounded-xl border border-white/[0.08] text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/[0.04] rounded-full mb-6 border border-white/[0.08]">
            <Shield className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">Need More Help?</h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Our support team is available 24/7 to assist with any questions about the platform or presale process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/soulchain"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Join Telegram
            </a>
            <a
              href="mailto:connect.soulchain@gmail.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/[0.04] text-white font-semibold rounded-lg border border-white/[0.08] hover:bg-white/[0.08] transition-colors duration-200"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
