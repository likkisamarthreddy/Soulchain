import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url, title }) => {
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`
    },
    {
      name: 'Telegram',
      icon: '📱',
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'Reddit',
      icon: '📖',
      url: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    },
    {
      name: 'Email',
      icon: '✉️',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 id="share-modal-title" className="text-xl font-medium text-white">Share Article</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close share modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              onClick={onClose}
              aria-label={`Share on ${option.name}`}
            >
              <span className="text-2xl" aria-hidden="true">{option.icon}</span>
              <span className="text-white font-medium">{option.name}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            aria-label="Shareable link"
          />
          <button
            onClick={copyToClipboard}
            className={`px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors ${copied ? 'text-green-400' : ''}`}
            aria-label={copied ? "Link copied" : "Copy link to clipboard"}
          >
            {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>
        {copied && (
          <p className="text-green-400 text-sm mt-2" aria-live="polite">Link copied to clipboard!</p>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
