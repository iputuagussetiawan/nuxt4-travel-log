// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

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
    modules: ['@nuxt/eslint'],
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
