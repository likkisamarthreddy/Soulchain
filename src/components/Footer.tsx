import React, { useState } from 'react';
import { Mail, Globe, Shield, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const legalContent = {
    terms: {
      title: "Terms of Service",
      content: `📜 Terms of Service
Effective Date: January 2025

Welcome to SoulChain, an on-chain emotional journaling platform offering access to SOUL token presales. By using this website or interacting with the presale smart contracts, you agree to these legally binding Terms of Service.

1. Acceptance of Terms
By accessing the SoulChain presale platform, purchasing tokens, or using any related services, you accept and agree to comply with these Terms and all applicable laws and regulations.

2. Eligibility
You must be at least 18 years of age and have the legal capacity to enter into a contract in your jurisdiction. By using our platform, you confirm that you are not a resident of a jurisdiction where participation in token sales is restricted or illegal.

3. Token Purchase Terms
Token purchases are final, non-refundable, and non-reversible.

You understand that purchasing SOUL tokens does not entitle you to any ownership, equity, dividends, or control over SoulChain or its affiliates.

You are responsible for ensuring you use the correct wallet address and understand the blockchain networks involved.

Participation in the presale does not guarantee token listing, price appreciation, or platform launch.

4. Intellectual Property
All content on the SoulChain website (texts, graphics, logos, contracts, etc.) is the property of SoulChain and is protected by copyright and trademark laws.

5. Prohibited Activities
You agree not to:

Use the platform for illegal purposes (e.g., money laundering, terrorist financing)

Engage in fraudulent or deceptive activity

Exploit any bugs or vulnerabilities in the smart contracts

Use bots, scripts, or automation to access the platform

6. Limitation of Liability
SoulChain shall not be held liable for:

Any direct or indirect financial losses

Network or contract vulnerabilities

Delays in token delivery

Market volatility or third-party exchange decisions
Use the platform at your own risk.

7. Termination
We reserve the right to suspend or terminate access to the platform for users who violate these Terms or applicable laws.

8. Modifications
These Terms may be modified at any time. You are responsible for checking for updates. Continued use constitutes acceptance of the modified terms.

9. Governing Law
These Terms are governed by the laws of [insert your jurisdiction]. Any disputes will be subject to the exclusive jurisdiction of courts in [insert city].

10. Contact
If you have questions, email us at connect.soulchain@gmail.com.`
    },
    privacy: {
      title: "Privacy Policy",
      content: `🔒 Privacy Policy
Effective Date: January 2025

SoulChain values your privacy. This Privacy Policy describes how we collect, use, and protect your data when you use our website and participate in the SOUL token presale.

1. What We Collect
Wallet address (for presale transactions)

Email (only if you subscribe to newsletters or whitelist)

IP address, device type, and browser (for analytics)

Cookies (see Cookie Policy)

2. How We Use Your Data
To deliver presale services and token allocations

To contact you with project updates or legal notices

To analyze website usage and improve our services

To comply with legal obligations

3. Data Sharing
We do not sell, rent, or share your data with third parties except when:

Required by law

Working with trusted service providers (e.g., analytics, security)

Investigating fraud or technical issues

4. Cookies
We use cookies to manage user sessions and collect anonymous usage data. See our Cookie Policy for full details.

5. Data Retention
We retain data only as long as necessary for its purpose or legal compliance.

6. Your Rights
You may request to access, modify, or delete your data by emailing connect.soulchain@gmail.com.

You can opt-out of non-essential cookies and communications.

7. Security
We implement industry-standard security practices such as SSL, firewalls, and smart contract audits. However, no system is 100% secure.

8. Children's Privacy
Our platform is not intended for users under the age of 18. We do not knowingly collect data from minors.`
    },
    cookies: {
      title: "Cookie Policy",
      content: `🍪 Cookie Policy
Effective Date: January 2025

This Cookie Policy explains how SoulChain uses cookies and similar technologies on our website.

1. What Are Cookies?
Cookies are small files stored on your device that help websites recognize your preferences and track usage patterns.

2. Types of Cookies We Use
Essential Cookies: Required for basic platform functions such as login and presale access.

Performance Cookies: Help us understand user behavior via anonymized analytics.

Functionality Cookies: Remember preferences like dark/light mode.

Third-Party Cookies: From services like Google Analytics.

3. Managing Cookies
You can configure your browser to accept or reject cookies or alert you when cookies are set. Disabling cookies may impact site functionality.

4. Consent
By using our website, you consent to the use of cookies as described in this policy.`
    },
    risk: {
      title: "Risk Disclosure",
      content: `⚠️ Risk Disclosure
Effective Date: January 2025

Participating in the SoulChain token presale involves high risks. By continuing, you confirm that you understand and accept these risks.

1. Market Risk
Token values can fluctuate significantly. There is no guarantee of return on investment or market liquidity.

2. Technical Risk
Smart contracts are experimental and may have vulnerabilities, bugs, or exploits that can result in loss of funds.

3. Regulatory Risk
Cryptocurrency regulations are evolving. New laws or government actions could restrict access or utility of the SOUL token.

4. No Investment Advice
SoulChain does not provide investment, tax, or legal advice. Participation in the presale is solely at your discretion.

5. Loss of Access
Loss of private keys or wallet access may permanently prevent you from retrieving your tokens. SoulChain is not responsible for user errors.

6. Token Utility
SOUL tokens are intended for access to platform features and do not represent equity or governance rights.

7. No Guarantees
We do not guarantee project delivery timelines, exchange listings, or specific features.`
    }
  };

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
  }

  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 border border-indigo-500/30 rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-indigo-500/20">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-indigo-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto flex-1">
            <pre className="text-indigo-200 whitespace-pre-wrap font-sans leading-relaxed">
              {content}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <footer className="relative bg-gray-900 border-t border-indigo-500/20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="logo.jpg" 
                  alt="SoulChain Logo" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-bold text-2xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  SoulChain
                </span>
              </div>
              <p className="text-indigo-200 mb-6">
                Preserving the human emotional experience on the blockchain.
                Authentic, immutable, and eternally valuable.
              </p>
              <div className="flex space-x-4">
                <a href="https://x.com/TheSoulChain?t=qr0nKOqI0s6yeCXvmutZ4Q&s=09" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.097 10.097 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://t.me/thesoulchain" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/connect.soulchain?utm_source=ig_web_button_share_sheet&igsh=ZGx0eG52dzF6Mmdt" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/#about" className="text-indigo-300 hover:text-white transition-colors">About</Link>        
                </li>
                <li>
                  <Link to="/#tokenomics" className="text-indigo-300 hover:text-white transition-colors">Tokenomics</Link>
                </li>
                <li>
                  <Link to="/#roadmap" className="text-indigo-300 hover:text-white transition-colors">Roadmap</Link>               
                </li>
                <li>
                  <Link to="/#community" className="text-indigo-300 hover:text-white transition-colors">Community</Link>
                </li>
                <li>
                  <Link to="/#faq" className="text-indigo-300 hover:text-white transition-colors">FAQ</Link>
                </li>
                <li>
                  <Link to="/#presale" className="text-indigo-300 hover:text-white transition-colors">Token Presale</Link>
                </li>
                <li>
                  <Link to="/blog" className="text-indigo-300 hover:text-white transition-colors">Blog</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => setActiveModal('terms')}
                    className="text-indigo-300 hover:text-white transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="text-indigo-300 hover:text-white transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('cookies')}
                    className="text-indigo-300 hover:text-white transition-colors text-left"
                  >
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('risk')}
                    className="text-indigo-300 hover:text-white transition-colors text-left"
                  >
                    Risk Disclosure
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-indigo-400 mr-3" />
                  <a href="mailto:connect.soulchain@gmail.com" className="text-indigo-300 hover:text-white transition-colors">
                    connect.soulchain@gmail.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Globe className="w-5 h-5 text-indigo-400 mr-3" />
                  <a href="https://thesoulchain.xyz" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-white transition-colors">
                    thesoulchain.xyz
                  </a>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-indigo-400 mr-3" />
                  <span className="text-indigo-300">
                    Security Audited
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-indigo-500/20 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-indigo-300 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} SoulChain. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <button
                  onClick={() => setActiveModal('terms')}
                  className="text-indigo-300 hover:text-white text-sm transition-colors"
                >
                  Terms
                </button>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="text-indigo-300 hover:text-white text-sm transition-colors"
                >
                  Privacy
                </button>
                <button
                  onClick={() => setActiveModal('cookies')}
                  className="text-indigo-300 hover:text-white text-sm transition-colors"
                >
                  Cookies
                </button>
                <button
                  onClick={() => setActiveModal('risk')}
                  className="text-indigo-300 hover:text-white text-sm transition-colors"
                >
                  Risks
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title={legalContent.terms.title}
        content={legalContent.terms.content}
      />
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title={legalContent.privacy.title}
        content={legalContent.privacy.content}
      />
      <Modal
        isOpen={activeModal === 'cookies'}
        onClose={() => setActiveModal(null)}
        title={legalContent.cookies.title}
        content={legalContent.cookies.content}
      />
      <Modal
        isOpen={activeModal === 'risk'}
        onClose={() => setActiveModal(null)}
        title={legalContent.risk.title}
        content={legalContent.risk.content}
      />
    </>
  );
};

export default Footer;
