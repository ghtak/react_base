import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { fileURLToPath, URL } from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url),
      ),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
    },
  },
  // scss global
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          // 주의: 여기에는 변수($)나 믹스인(@mixin)만 포함된 파일을 넣어야 합니다.
          // 실제 CSS 스타일이 포함된 파일을 넣으면 모든 SCSS 파일마다 코드가 중복되어 Code Bloat이 발생합니다.
          @use "@assets/styles/color.scss" as *;
        `,
      },
    },
  },

  server: {
    port: 3000,
    // 브라우저 자동 열기
    open: true,
    proxy: {
      // '/api' : {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   secure: false,
      //   // /api/users -> /users
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    },
  },
});
