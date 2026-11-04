export default defineNuxtConfig({
  // Extinde tema părinte WooNuxt
  extends: ['./woonuxt_base'],
  
  // Modulele folosite
  modules: [
    '@nuxt/image',
    '@nuxtjs/apollo',
    'nuxt-security'
  ],

  // 🟢 CONFIGURARE SECURITATE TESTATĂ PENTRU E-COMMERCE
  security: {
    nonce: true,

    // Protecție anti-DDoS / Brute-force pe rutele de API / Checkout
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 60000,
      headers: true,
    },

      allowedHosts: ['127.0.0.1', 'localhost'], // Must be explicit stringsq
    headers: {
      xContentTypeOptions: 'nosniff',
      
      // ⚠️ IMPORTANT: 'unsafe-none' previne blocarea imaginilor și a API-ului de pe domain extern
      crossOriginEmbedderPolicy: 'unsafe-none',
      
      referrerPolicy: 'strict-origin-when-cross-origin',

      permissionsPolicy: {
        camera: ['none'],
        microphone: ['none'],
        geolocation: ['none'],
      },
      contentSecurityPolicy: {
        // Doar scripturi sigure cu nonce dinamic și strict-dynamic (Fără 'https:' larg deschis!)
        'script-src': [
          "'nonce-{{nonce}}'",
          "'strict-dynamic'"
        ],
        // Permite cereri exclusiv către propriul API GraphQL
        'connect-src': [
          "'self'",
          'https://api.byzbros.com'
        ],
        // Permite imagini de pe serverul tău WordPress + data URIs (placeholder-e)
        'img-src': [
          "'self'",
          'data:',
          'https://api.byzbros.com'
        ],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        'frame-ancestors': ["'self'"],
        'require-trusted-types-for': ["'script'"]
      }
    }
  },
  
  components: [{ path: './components', pathPrefix: false }],

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://api.byzbros.com' },
        { rel: 'dns-prefetch', href: 'https://api.byzbros.com' }
      ]
    }
  },

  experimental: {
    inlineSSRStyles: true,
  },

  vite: {
    build: {
      cssCodeSplit: true,
    },
  },

  image: {
    provider: 'ipx',
    ipx: {
      maxAge: 31536000 // 1 an în secunde
    },
    format: ['webp', 'avif'],
    quality: 80,
    screens: {
      xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536,
    },
    domains: [
      'api.byzbros.com'
    ],
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://api.byzbros.com/graphql',
        persisted: true,
        connectToDevTools: process.env.NODE_ENV !== 'production',
      },
    },
  },

  nitro: {
    routeRules: {
      '/': { swr: 3600 },
      '/product/**': { swr: 1800 },
      '/products/**': { swr: 1800 },
      '/product-category/**': { swr: 1800 },
      '/categories': { swr: 1800 },
      
      // 🔴 REZOLVARE CACHE IMAGINI NU XT IMAGE / IPX
      '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    },
    prerender: {
      concurrency: 10,
      interval: 1000,
      failOnError: false,
    },
  },
});