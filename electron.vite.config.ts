import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@/pages': resolve('src/renderer/src/pages'),
        '@/components': resolve('src/renderer/src/components'),
        '@/hooks': resolve('src/renderer/src/hooks'),
        '@/lib': resolve('src/renderer/src/lib'),
        '@/layouts': resolve('src/renderer/src/layouts'),
        '@/helpers': resolve('src/helpers')
      }
    },
    plugins: [react()]
  }
})
