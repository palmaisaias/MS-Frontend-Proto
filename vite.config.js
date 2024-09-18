// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend.melanatedsanctuary.com:5000', // Your backend API URL
        changeOrigin: true, // Change the origin of the request to match the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix when forwarding the request
      },
    },
  },
});
