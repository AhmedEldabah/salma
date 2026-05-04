import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/salma-claude-build-website-template-xJHDc/',
  plugins: [react(), tailwindcss()],
})
