import { authClient } from '~/lib/auth-client'
export const useAuthStore = defineStore('useAuthStore', () => {
    const loading = ref(false)
    async function signIn() {
        loading.value = true
        await authClient.signIn.social({
            provider: 'github',
            callbackURL: '/dashboard',
            errorCallbackURL: '/error',
            newUserCallbackURL: '/profile'
        })
        loading.value = false
    }
    return {
        loading,
        signIn
    }
})
