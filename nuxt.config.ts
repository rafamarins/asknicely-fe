// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [['@pinia/nuxt', { autoImports: ['defineStore'] }], '@nuxt/ui', '@vueuse/nuxt', 'nuxt-security'],
  sourcemap: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ['tiktoken-node']
    },
    server: {
      hmr: {
        port: 24679,
        protocol: 'wss',
        clientPort: 443,
        path: 'hmr/'
      }
    }
  },
  devServer: {
    port: 4000
  }
})
