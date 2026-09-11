import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js ecosystem into its own chunk
          'three-core': ['three'],
          'three-fiber': ['@react-three/fiber', '@react-three/drei'],
          'three-postprocessing': ['@react-three/postprocessing'],
          // Split framer-motion separately
          'framer': ['framer-motion'],
          // Split gesture library
          'gesture': ['@use-gesture/react'],
          // Split react
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
  },
})
