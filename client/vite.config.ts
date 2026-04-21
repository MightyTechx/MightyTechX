import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Dev proxy — only active when VITE_API_URL is not set
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui:    ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          redux:  ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@reduxjs/toolkit', 'react-redux', 'axios'],
  },
})
