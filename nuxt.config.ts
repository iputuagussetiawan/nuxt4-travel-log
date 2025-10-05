// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
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
