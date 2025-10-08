<script setup lang="ts">
import Footer from './Footer.vue'
import Header from './Header.vue'
const authStore = useAuthStore()
await authStore.init()
</script>
<template>
    <div>
        <Header />
        <slot />
        <Footer />
    </div>
</template>

<style lang="scss"></style>
