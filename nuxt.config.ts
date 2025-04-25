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
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode',
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  css: ['@/assets/css/main.css'],

  components: [
    {
      path: '@/components',
    },
  ],

  imports: {
    autoImport: true,
    // Auto import config
    dirs: [
      'composables/api', // Automatically imports composables from this directory
    ],
  },
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
    importTheme: { from: '@/configs/primevue/theme.ts' },
  },

  postcss: {
    plugins: {
      'postcss-nested': {},
      'postcss-custom-media': {},
      '@tailwindcss/postcss7-compat': {},
      autoprefixer: {},
    },
  },

  serverDir: 'src/server',

  devServer: {
    port: 3001,
  },

  compatibilityDate: '2025-04-23',
});
