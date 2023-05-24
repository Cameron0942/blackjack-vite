import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://cameron0942.github.io/blackjack-vite/',
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],
  }
})
