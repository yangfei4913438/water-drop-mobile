import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  server: {
    proxy: {},
    port: 5002,
  },
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 映射的目录必须以/开头，表示根目录
    },
  },
});
