<script setup lang="ts">
import UiAuthButton from '~/components/ui/AuthButton.vue'
import { authClient } from '@/lib/auth-client'
const session = authClient.useSession()
</script>

<template>
    <div>
        <UiAuthButton v-if="!session?.data" />
        <div>
            <pre>{{ session.data }}</pre>
            <button v-if="session.data" @click="authClient.signOut()">
                Sign out
            </button>
        </div>
    </div>
</template>
