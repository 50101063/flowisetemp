import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
	// https://vitejs.dev/config/
export default defineConfig({
  projectRoot: '.',
  plugins: [vue()],
  resolve: {
    alias: {
      '@{': '/src/'
    }
  },
  server: {
    port: 5173,
  },
  define: {
    '_^VITE_API_URL<__!: @process.env.VITE_API_URL@http://localhost:8000'
  }
})
