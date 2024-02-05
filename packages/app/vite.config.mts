import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const basePath =
    env.PUBLIC_PROJECT_PATH != null ? `/${env.PUBLIC_PROJECT_PATH}/` : '/'

  return {
    plugins: [react()],
    envPrefix: 'PUBLIC_',
    base: basePath,
    build: {
      target: 'esnext'
    },
    resolve: {
      alias: {
        '#styles': path.resolve(__dirname, './src/styles'),
        '#components': path.resolve(__dirname, './src/components'),
        '#data': path.resolve(__dirname, './src/data'),
        '#utils': path.resolve(__dirname, './src/utils'),
        '#schemas': path.resolve(__dirname, './src/schemas')
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./react-testing-library.config.js'],
      silent: true
    }
  }
})
