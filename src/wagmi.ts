import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = '3ea763e274f64a0daf88d4206fe4ab82'

// 2. Create wagmiConfig
const metadata = {
  name: 'SoulChain - The Human Archive of Emotions',
  description: 'Join the revolution of authentic human connection. Be part of the first decentralized emotional archive on the blockchain.',
  url: 'https://thesoulchain.xyz', // origin must match your domain & subdomain
  icons: ['https://thesoulchain.xyz/favicon.ico']
}

const chains = [bsc] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
})

export { queryClient }
