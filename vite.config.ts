import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter} from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
    }
  },
  // scss global
  css : {
    preprocessorOptions : {
      scss : {
        additionalData : `
          @use "@assets/styles/color.scss" as *;
        `
      }
    }
  }
})
