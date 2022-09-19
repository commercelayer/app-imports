import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'PUBLIC_',
  resolve: {
    alias: {
      '#styles': path.resolve(__dirname, './src/styles'),
      '#components': path.resolve(__dirname, './src/components'),
      '#data': path.resolve(__dirname, './src/data'),
      '#utils': path.resolve(__dirname, './src/utils'),
      '#schemas': path.resolve(__dirname, './src/schemas'),
      '#specs': path.resolve(__dirname, './specs')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
