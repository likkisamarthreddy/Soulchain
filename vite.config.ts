import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    })
  ],
  define: {
    global: 'globalThis',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
      '@': path.resolve(__dirname, './src')
    },
    dedupe: ['react', 'react-dom', 'wagmi', 'viem']
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'ethers',
      'lucide-react',
      '@tanstack/react-query',
      'buffer',
      'process'
    ],
    exclude: ['@reown/appkit-wagmi'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      // Removed 'ethers' from external array
      external: [],
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react'],
          'vendor-web3-core': ['wagmi', 'viem'],
          'vendor-web3-modal': ['@reown/appkit-wagmi'],
          'vendor-query': ['@tanstack/react-query'],
          // Add ethers to its own chunk
          'vendor-ethers': ['ethers']
        }
      }
    }
  },
  server: {
    host: true,
    port: 4173,
    strictPort: true
  },
  preview: {
    port: 4173,
    strictPort: true
  }
});
