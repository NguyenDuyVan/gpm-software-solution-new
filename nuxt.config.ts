import Aura from '@primeuix/themes/aura';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    strict: true,
  },
  srcDir: 'src',
  pages: true,

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    // head: {
    //   meta: [
    //     { name: "viewport", content: "width=device-width, initial-scale=1" },
    //     { name: "theme-color", content: "#ffffff" },
    //   ],
    // },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@primevue/nuxt-module',
    '@hebilicious/vue-query-nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  alias: {
    '@/': './src/',
  },
  css: ['./src/assets/css/main.css'],

  components: [
    {
      path: './src/components',
    },
  ],

  i18n: {
    restructureDir: './src/i18n',
    locales: [
      { code: 'en', language: 'English', file: 'en.json' },
      { code: 'vi', language: 'Vietnamese', file: 'vi.json' },
    ],
    defaultLocale: 'vi',
    lazy: true,
    bundle: {
      optimizeTranslationDirective: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
      cookieKey: 'i18n_redirected',
      cookieSecure: false,
      alwaysRedirect: false,
      redirectOn: 'root',
      fallbackLocale: 'vi',
    },
    vueI18n: 'i18n.config.ts',
  },

  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    },
  },

  postcss: {
    plugins: {
      'postcss-nested': {},
      'postcss-custom-media': {},
    },
  },

  serverDir: 'src/server',

  devServer: {
    port: 3001,
  },

  compatibilityDate: '2025-04-23',
});
