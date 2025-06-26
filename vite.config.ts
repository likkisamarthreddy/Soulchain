import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
<<<<<<< HEAD
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    })
  ],
=======

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
>>>>>>> 1d71894 (Fix icon import and update build dependencies)
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
<<<<<<< HEAD
      '@': path.resolve(__dirname, './src')
    },
    dedupe: ['react', 'react-dom', 'wagmi', 'viem']
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'lucide-react',
      '@tanstack/react-query'
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
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react'],
          'vendor-web3-core': ['wagmi', 'viem'],
          'vendor-web3-modal': ['@reown/appkit-wagmi'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-helmet': ['react-helmet-async']
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
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
=======
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
>>>>>>> 1d71894 (Fix icon import and update build dependencies)
});
