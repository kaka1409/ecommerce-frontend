import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss()
  ],

  server: {
    port: 3000,
    // proxy: {
    //   '/host': {
    //     target: "https://thang.tail704409.ts.net/",
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/host/, ''),
    //   }
    // }
  },

  devServer: {
    host: '0.0.0.0',
    port: 8080
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
