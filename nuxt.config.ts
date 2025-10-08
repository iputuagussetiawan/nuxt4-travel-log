// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import './app/lib/env'

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    alias: {
        '@db': '/db',
        '@components': '/components',
        '@utils': '/utils'
    },
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()]
    },
    modules: [
      '@nuxt/eslint',
      'shadcn-nuxt',
      '@nuxtjs/color-mode',
      'nuxt-lucide-icons',
      '@pinia/nuxt'
    ],
    colorMode: {
        classSuffix: ''
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./shadcn/ui"
         */
        componentDir: './shadcn/ui'
    },
    $production: {
        routeRules: {
            '/**': { isr: true }
        }
    },
    $development: {
        //
    },
    $env: {
        staging: {
            //
        }
    },
    eslint: {
        // options here
        // checker: true
        config: {
            standalone: false
        }
    }
})