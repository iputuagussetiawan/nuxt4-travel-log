// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import './app/lib/env'

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL
        }
    },
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
        '@pinia/nuxt',
        'nuxt-csurf',
        '@nuxtjs/leaflet'
    ],
    csurf: {
        // optional
        https: true, // default true if in production
        cookieKey: '', // "__Host-csrf" if https is true otherwise just "csrf"
        cookie: {
            // CookieSerializeOptions from unjs/cookie-es
            path: '/',
            httpOnly: true,
            sameSite: 'strict'
        },
        methodsToProtect: ['POST', 'PUT', 'PATCH'], // the request methods we want CSRF protection for
        encryptSecret: '',
        addCsrfTokenToEventCtx: true, // default false, to run useCsrfFetch on server set it to true
        headerName: 'csrf-token' // the header where the csrf token is stored
    },

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
