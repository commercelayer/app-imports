import { defineConfig } from 'vitest/config'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
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
      '#ui': path.resolve(__dirname, './src/components/ui'),
      // polyfilling builtin node.JS util lib for Rollup build process
      // https://github.com/ionic-team/rollup-plugin-node-polyfills/blob/master/src/modules.ts
      util: 'rollup-plugin-node-polyfills/polyfills/util'
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./react-testing-library.config.js']
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        // add node.JS builtin lib polyfills for ESbuild
        // https://github.com/browserify/node-util/issues/43#issuecomment-1046110526
        NodeGlobalsPolyfillPlugin({
          // buffer: true,
          process: true
        })
      ]
    }
  }
})
