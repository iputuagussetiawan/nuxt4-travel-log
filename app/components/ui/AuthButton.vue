<script lang="ts" setup>
import Button from './button/Button.vue'
const authStore = useAuthStore()
</script>
<template>
    <Button :disabled="authStore.loading" @click="authStore.signIn">
        Continue with GitHub
        <lucide-loader2 v-if="authStore.loading" class="animate-spin" />
        <lucide-github v-else />
    </Button>
</template>
<style lang="scss" scoped></style>
