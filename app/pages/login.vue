<script setup lang="ts">
import { authClient } from '@/lib/auth-client'
const session = authClient.useSession()

const router = useRouter()
const loading = ref(false)
const error = ref<string | null>(null)

async function handleLogin() {
    try {
        loading.value = true
        error.value = null

        await authClient.signIn.social({
            provider: 'github',
            callbackURL: process.env.GITHUB_CALLBACK_URL,
            errorCallbackURL: '/error',
            newUserCallbackURL: '/profile',
            disableRedirect: true // important: prevents automatic redirect
        })

        // result contains the redirect URL from the provider
    } catch (err: any) {
        error.value = err.message || 'Login failed.'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div>
        <button
            v-if="!session?.data"
            @click="
                () =>
                    authClient.signIn.social({
                        provider: 'github',
                        errorCallbackURL: '/error',
                        newUserCallbackURL: '/profile'
                    })
            "
        >
            Continue with GitHub
        </button>
        <div>
            <pre>{{ session.data }}</pre>
            <button v-if="session.data" @click="authClient.signOut()">
                Sign out
            </button>
        </div>
    </div>
</template>
