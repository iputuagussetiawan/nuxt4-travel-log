<script lang="ts" setup>
import UiUserAvatar from './UserAvatar.vue'
import Button from './button/Button.vue'
import DropdownMenu from './dropdown-menu/DropdownMenu.vue'
import DropdownMenuContent from './dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from './dropdown-menu/DropdownMenuItem.vue'
import DropdownMenuTrigger from './dropdown-menu/DropdownMenuTrigger.vue'
const authStore = useAuthStore()
</script>
<template>
    <div>
        <DropdownMenu v-if="!authStore.loading && authStore.user">
            <DropdownMenuTrigger>
                <UiUserAvatar />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <NuxtLink to="/sign-out">
                        Sign out
                        <LucideLogOut />
                    </NuxtLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <Button v-else :disabled="authStore.loading" @click="authStore.signIn">
            Continue with GitHub
            <lucide-loader2 v-if="authStore.loading" class="animate-spin" />
            <lucide-github v-else />
        </Button>
    </div>
</template>
<style lang="scss" scoped></style>
