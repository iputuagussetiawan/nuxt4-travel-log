<script lang="ts" setup>
import Avatar from './avatar/Avatar.vue'
import AvatarImage from './avatar/AvatarImage.vue'
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
                <div class="flex items-center gap-1">
                    <Avatar>
                        <AvatarImage
                            v-if="authStore.user.image"
                            :src="
                                authStore.user.image ||
                                'https://github.com/unovue.png'
                            "
                            :alt="authStore.user.name || 'User avatar'"
                        />
                        <AvatarFallback>
                            {{
                                authStore?.user?.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || 'U'
                            }}</AvatarFallback
                        >
                    </Avatar>
                    {{ authStore.user.name }}
                </div>
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
