<script setup lang="ts">
import { LucideRocket } from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'
</script>

<template>
    <div>
        <h1>Welcome to the about</h1>
        <AppAlert> This is an auto-imported component </AppAlert>
        <Button>Button <LucideRocket /></Button>
    </div>
</template>
