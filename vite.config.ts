import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig(async () => {
  const tailwindcss = (await import('tailwindcss')).default
  const autoprefixer = (await import('autoprefixer')).default

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            '@emotion/babel-plugin',
            ['babel-plugin-direct-import', { modules: ['lucide-react'] }]
          ]
        }
      }),
      ViteImageOptimizer({
        jpg: { quality: 80 },
        png: { quality: 80 },
        webp: { lossless: false, quality: 85 },
      }),
      visualizer({
        filename: 'dist/bundle-stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    build: {
      target: 'esnext',
      minify: 'terser',
      cssCodeSplit: true,
      sourcemap: process.env.NODE_ENV === 'development',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor_react'
              if (id.includes('lucide')) return 'vendor_icons'
              if (id.includes('framer-motion')) return 'vendor_animations'
              return 'vendor'
            }
          },
          assetFileNames: 'assets/[name]-[hash][extname]',
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
        }
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        format: {
          comments: false
        }
      }
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      },
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    },
    define: {
      'process.env': {},
      global: 'window',
    },
    optimizeDeps: {
      include: ['buffer'],
    },
    resolve: {
      alias: {
        buffer: 'buffer',
      },
    },
    server: {
      host: true,
      port: 4173,
      strictPort: true,
      hmr: {
        clientPort: 4173,
      },
    }
  }
})

