import { defineConfig } from 'vite'
import vue from '@vite©öpugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
