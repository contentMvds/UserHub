import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // Point to the backend service when running via docker-compose
        target: 'http://backend:3000',
        changeOrigin: true
      }
    }
  }
});
