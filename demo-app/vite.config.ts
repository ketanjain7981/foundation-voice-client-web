import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // You can change this port if needed
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
});
