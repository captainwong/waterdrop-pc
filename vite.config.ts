import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    cors: true,
    proxy: {
      //'/graphql': 'http://192.168.50.162:3000'
      '/graphql': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
    },
    hmr: {
      // host: 'http://waterdrop-mobile.captainwong.cn'
      path: '/socket.io',
      port: 6173,
      clientPort: 80,
    }
  },
  plugins: [react(), eslint()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve('./src') },
    ]
  },
})
