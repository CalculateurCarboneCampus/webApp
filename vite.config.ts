import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      VitePWA({
          registerType: 'autoUpdate',
          mode: 'production',
          includeAssets: ['favicon.ico', 'logo.png', 'logo.svg'],
          manifest: {
              name: 'Calculateur Carbone Campus',
              short_name: 'CalculateurCarboneCampus',
              description: 'Calculateur Carbone Campus, HEAD et HEG project',
              theme_color: '#ffffff',
              icons: [
                  {
                      src: 'logo.png',
                      sizes: '192x192',
                      type: 'image/png'
                  },
                  {
                      src: 'logo.png',
                      sizes: '512x512',
                      type: 'image/png'
                  }
              ]
          }
      })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
