<script setup lang="ts">
import Footer from './Footer.vue'
import Header from './Header.vue'
</script>
<template>
    <div>
        <Header />
        <slot />
        <Footer />
    </div>
</template>

<style lang="scss"></style>
