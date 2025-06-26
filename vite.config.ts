import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(async () => {
  const tailwindcss = (await import('tailwindcss')).default;
  const autoprefixer = (await import('autoprefixer')).default;

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        babel: {
          plugins: [
            ['babel-plugin-direct-import', { modules: ['lucide-react'] }]
          ]
        }
      })
    ],
    resolve: {
      alias: {
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
          },
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
          passes: 2
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
  };
});
