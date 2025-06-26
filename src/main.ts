import { Buffer } from 'buffer';
if (!window.Buffer) window.Buffer = Buffer;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';

import App from './App.tsx';
import ScrollToTop from './ScrollToTop';
import { config, queryClient } from './wagmi';

import './index.css';

// Only create Web3Modal on client side
if (typeof window !== 'undefined') {
  createWeb3Modal({
    wagmiConfig: config,
    projectId: '3ea763e274f64a0daf88d4206fe4ab82',
    enableAnalytics: true,
    enableOnramp: true,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-color-mix': '#FF69B4',
      '--w3m-color-mix-strength': 20,
      '--w3m-accent': '#FF69B4',
      '--w3m-border-radius-master': '12px'
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ScrollToTop />
            <App />
          </QueryClientProvider>
        </WagmiProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
