import { defineConfig } from 'vite'
import vue from '@vite��pugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
