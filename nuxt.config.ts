// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules:[['@pinia/nuxt', {
      autoImports: [
        // automatically imports `defineStore`
        'defineStore', // import { defineStore } from 'pinia'
        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
      ],
    }]],
    css: [
      "@/assets/css/main.css",
      // "@/assets/css/media.css",
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    imports:{
      dirs:["./store"]
    },
   app:{
    head:{
      viewport: "width=device-width, initial-scale=1, maximum-scale=1"
    }
  },
  })
