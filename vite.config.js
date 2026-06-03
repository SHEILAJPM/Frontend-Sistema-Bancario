import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@api':        resolve(__dirname, 'src/api'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks':      resolve(__dirname, 'src/hooks'),
      '@utils':      resolve(__dirname, 'src/utils'),
      '@pages':      resolve(__dirname, 'src/pages'),
      '@context':    resolve(__dirname, 'src/context'),
    }
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
