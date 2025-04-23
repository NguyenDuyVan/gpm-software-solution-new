import Aura from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  pages: true,
  routeRules: {
    "/admin/**": { ssr: false },
  },
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
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@primevue/nuxt-module",
    "@hebilicious/vue-query-nuxt",
  ],
  srcDir: "src/",
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  css: ["@/assets/css/main.css"],
  components: [
    {
      path: "@/components",
    },
  ],
  primevue: {
    autoImport: true,
    components: {
      prefix: "Prime",
    },
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".my-app-dark",
        },
      },
    },
  },
  postcss: {
    plugins: {
      "postcss-nested": {},
      "postcss-custom-media": {},
    },
  },
  serverDir: "src/server",
  devServer: {
    port: 3001,
  },
});