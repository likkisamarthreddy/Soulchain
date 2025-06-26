import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig(async () => {
  const tailwindcss = (await import('tailwindcss')).default;
  const autoprefixer = (await import('autoprefixer')).default;

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        babel: {
          plugins: [
            // Remove emotion plugin if not used
            // '@emotion/babel-plugin',
            ['babel-plugin-direct-import', { modules: ['lucide-react'] }]
          ]
        }
      }),
      ViteImageOptimizer({
        jpg: { quality: 75 }, // Reduced from 80
        png: { quality: 75 }, // Reduced from 80
        webp: { quality: 80, lossless: false }, // Reduced from 85
        avif: { quality: 70 }, // Added AVIF support
        svgo: {
          plugins: [
            { name: 'preset-default' },
            { name: 'removeViewBox', active: false }, // Keep viewBox for responsive SVGs
            { name: 'cleanupIds' },
            { name: 'minifyStyles' }
          ]
        }
      }),
      // Only generate bundle stats in production
      process.env.NODE_ENV === 'production' && visualizer({
        filename: 'dist/bundle-stats.html',
        gzipSize: true,
        brotliSize: true,
        open: false // Don't auto-open
      })
    ].filter(Boolean),
    resolve: {
      alias: {
        buffer: 'buffer',
        process: 'process/browser',
        '@': path.resolve(__dirname, './src')
      },
      dedupe: ['react', 'react-dom', 'wagmi', 'viem'] // Added more deduplication
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom',
        'lucide-react',
        '@tanstack/react-query'
      ],
      exclude: ['@reown/appkit-wagmi'], // Exclude large deps from pre-bundling
      esbuildOptions: {
        define: {
          global: 'globalThis'
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true
          })
        ]
      }
    },
    build: {
      target: 'es2020', // Changed from esnext for better compatibility
      minify: 'terser',
      cssCodeSplit: true,
      sourcemap: false, // Disable in production for smaller bundles
      chunkSizeWarningLimit: 500, // Reduced from 1000
      rollupOptions: {
        plugins: [rollupNodePolyFill()],
        output: {
          // More aggressive code splitting
          manualChunks: {
            // Core React chunk
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            
            // UI components
            'vendor-ui': ['lucide-react'],
            
            // Web3 related (largest chunk)
            'vendor-web3-core': ['wagmi', 'viem'],
            'vendor-web3-modal': ['@reown/appkit-wagmi'],
            
            // Query client
            'vendor-query': ['@tanstack/react-query'],
            
            // Helmet
            'vendor-helmet': ['react-helmet-async']
          },
          // Optimize asset naming
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') || [];
            const ext = info[info.length - 1];
            if (/\.(png|jpe?g|webp|avif|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (ext === 'css') {
              return `assets/css/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js'
        }
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.warn'],
          passes: 2 // Multiple compression passes
        },
        format: {
          comments: false
        },
        mangle: {
          safari10: true
        }
      }
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      },
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    },
    define: {

      'process.env': {},
      global: 'window',
    },
    optimizeDeps: {
      include: ['buffer', 'react', 'react-dom'],
      force: true
    },
    resolve: {
      alias: {
        buffer: 'buffer',
      },
      dedupe: ['react', 'react-dom']

      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')

    },
    server: {
      host: true,
      port: 4173,
      strictPort: true,
      hmr: {
        clientPort: 4173
      }
    },
    preview: {
      port: 4173,
      strictPort: true
    }

  }
})

  };
});

