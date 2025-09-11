import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'simple-peer': 'simple-peer/simplepeer.min.js', // Keep this alias for simple-peer
    },
  },
  define: {
    global: 'globalThis', // Fix 'global is not defined' issues
  },
});
