import { defineConfig } from 'vitest/config'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import react from '@vitejs/plugin-react'
import path from 'path'
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const basePath =
    env.PUBLIC_PROJECT_PATH != null ? `/${env.PUBLIC_PROJECT_PATH}` : ''

  return {
    plugins: [react()],
    envPrefix: 'PUBLIC_',
    base: `${basePath}/`,
    build: {
      target: 'esnext'
    },
    server: {
      fs: {
        strict: false
      }
    },
    resolve: {
      alias: {
        '#styles': path.resolve(__dirname, './src/styles'),
        '#components': path.resolve(__dirname, './src/components'),
        '#data': path.resolve(__dirname, './src/data'),
        '#utils': path.resolve(__dirname, './src/utils'),
        '#schemas': path.resolve(__dirname, './src/schemas'),
        // polyfilling builtin node.JS util lib for Rollup build process
        // https://github.com/ionic-team/rollup-plugin-node-polyfills/blob/master/src/modules.ts
        util: 'rollup-plugin-node-polyfills/polyfills/util'
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./react-testing-library.config.js'],
      silent: true
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
  }
})
