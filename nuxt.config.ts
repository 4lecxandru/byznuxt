export default defineNuxtConfig({
  // Extinde tema părinte WooNuxt
  extends: ['./woonuxt_base'],
  
  // Modulele folosite (inclusiv Apollo pentru GraphQL)
  modules: [
    '@nuxt/image',
    '@nuxtjs/apollo'
  ],
  
  components: [{ path: './components', pathPrefix: false }],

  // Optimizări în <head> (Preconnect către WordPress pe Coolify)
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://api.byzbros.com' },
        { rel: 'dns-prefetch', href: 'https://api.byzbros.com' }
      ]
    }
  },

  // 1. Inlining CSS pentru a elimina render-blocking (FCP mai rapid)
  experimental: {
    inlineSSRStyles: true,
  },

  // 2. Optimizare Vite pentru split de CSS și JS
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },

  // 3. Configurare avansată @nuxt/image
  image: {
    format: ['webp', 'avif'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },

  // 4. Configurare Apollo Client & Automatic Persisted Queries (APQ)
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://api.byzbros.com/graphql',
        persisted: true,
        connectToDevTools: process.env.NODE_ENV !== 'production',
      },
    },
  },

  // 5. Nitro server & Caching / SWR pentru a proteja WordPress-ul din spatele Traefik/Coolify
  nitro: {
    routeRules: {
      '/': { swr: 3600 },
      '/product/**': { swr: 1800 },   // Cache pentru paginile individuale de produs
      '/products/**': { swr: 1800 },
      '/product-category/**': {swr: 1800},
      '/categories': {swr: 1800},
    },
    prerender: {
      concurrency: 10,
      interval: 1000,
      failOnError: false,
    },
  },
});