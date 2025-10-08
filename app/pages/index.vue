<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button' // ✅ Shadcn utility
import AuthButton from '~/components/ui/AuthButton.vue'
const authStore = useAuthStore()
</script>

<template>
    <section>
        <div class="container mx-auto">
            <div
                class="hero-content flex flex-col justify-center items-center text-center min-h-screen"
            >
                <div class="max-w-md">
                    <h1 class="mb-5 text-5xl font-bold">Travel Log</h1>
                    <p>A place to keep track of your travels</p>
                    <AuthButton v-if="!authStore.user" />
                    <NuxtLink
                        v-else
                        to="/dashboard"
                        :class="
                            buttonVariants({ variant: 'default', size: 'lg' })
                        "
                    >
                        Start Logging
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
