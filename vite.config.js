import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or vue, etc.
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})