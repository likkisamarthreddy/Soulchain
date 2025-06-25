// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { visualizer } from "file:///home/project/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { ViteImageOptimizer } from "file:///home/project/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
var vite_config_default = defineConfig(async () => {
  const tailwindcss = (await import("file:///home/project/node_modules/tailwindcss/lib/index.js")).default;
  const autoprefixer = (await import("file:///home/project/node_modules/autoprefixer/lib/autoprefixer.js")).default;
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            "@emotion/babel-plugin",
            ["babel-plugin-direct-import", { modules: ["lucide-react"] }]
          ]
        }
      }),
      ViteImageOptimizer({
        jpg: { quality: 80 },
        png: { quality: 80 },
        webp: { lossless: false, quality: 85 }
      }),
      visualizer({
        filename: "dist/bundle-stats.html",
        gzipSize: true,
        brotliSize: true
      })
    ],
    build: {
      target: "esnext",
      minify: "terser",
      cssCodeSplit: true,
      sourcemap: process.env.NODE_ENV === "development",
      chunkSizeWarningLimit: 1e3,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react")) return "vendor_react";
              if (id.includes("lucide")) return "vendor_icons";
              if (id.includes("framer-motion")) return "vendor_animations";
              return "vendor";
            }
          },
          assetFileNames: "assets/[name]-[hash][extname]",
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js"
        }
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log"]
        },
        format: {
          comments: false
        }
      }
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly"
      },
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    },
    define: {
      "process.env": {},
      global: "window"
    },
    optimizeDeps: {
      include: ["buffer"]
    },
    resolve: {
      alias: {
        buffer: "buffer"
      }
    },
    server: {
      host: true,
      port: 4173,
      strictPort: true,
      hmr: {
        clientPort: 4173
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCB7IFZpdGVJbWFnZU9wdGltaXplciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlLW9wdGltaXplcidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGFzeW5jICgpID0+IHtcbiAgY29uc3QgdGFpbHdpbmRjc3MgPSAoYXdhaXQgaW1wb3J0KCd0YWlsd2luZGNzcycpKS5kZWZhdWx0XG4gIGNvbnN0IGF1dG9wcmVmaXhlciA9IChhd2FpdCBpbXBvcnQoJ2F1dG9wcmVmaXhlcicpKS5kZWZhdWx0XG5cbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCh7XG4gICAgICAgIGJhYmVsOiB7XG4gICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgJ0BlbW90aW9uL2JhYmVsLXBsdWdpbicsXG4gICAgICAgICAgICBbJ2JhYmVsLXBsdWdpbi1kaXJlY3QtaW1wb3J0JywgeyBtb2R1bGVzOiBbJ2x1Y2lkZS1yZWFjdCddIH1dXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIFZpdGVJbWFnZU9wdGltaXplcih7XG4gICAgICAgIGpwZzogeyBxdWFsaXR5OiA4MCB9LFxuICAgICAgICBwbmc6IHsgcXVhbGl0eTogODAgfSxcbiAgICAgICAgd2VicDogeyBsb3NzbGVzczogZmFsc2UsIHF1YWxpdHk6IDg1IH0sXG4gICAgICB9KSxcbiAgICAgIHZpc3VhbGl6ZXIoe1xuICAgICAgICBmaWxlbmFtZTogJ2Rpc3QvYnVuZGxlLXN0YXRzLmh0bWwnLFxuICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgICAgc291cmNlbWFwOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyxcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3QnKSkgcmV0dXJuICd2ZW5kb3JfcmVhY3QnXG4gICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbHVjaWRlJykpIHJldHVybiAndmVuZG9yX2ljb25zJ1xuICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2ZyYW1lci1tb3Rpb24nKSkgcmV0dXJuICd2ZW5kb3JfYW5pbWF0aW9ucydcbiAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgICAgICBwdXJlX2Z1bmNzOiBbJ2NvbnNvbGUubG9nJ11cbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgY29tbWVudHM6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgbW9kdWxlczoge1xuICAgICAgICBsb2NhbHNDb252ZW50aW9uOiAnY2FtZWxDYXNlT25seSdcbiAgICAgIH0sXG4gICAgICBwb3N0Y3NzOiB7XG4gICAgICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzcywgYXV0b3ByZWZpeGVyXVxuICAgICAgfVxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICAncHJvY2Vzcy5lbnYnOiB7fSxcbiAgICAgIGdsb2JhbDogJ3dpbmRvdycsXG4gICAgfSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFsnYnVmZmVyJ10sXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBidWZmZXI6ICdidWZmZXInLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIHBvcnQ6IDQxNzMsXG4gICAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgICAgaG1yOiB7XG4gICAgICAgIGNsaWVudFBvcnQ6IDQxNzMsXG4gICAgICB9LFxuICAgIH1cbiAgfVxufSlcblxuIl0sCiAg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
