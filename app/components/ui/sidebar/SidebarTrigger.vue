<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PanelRightClose, PanelRightOpen } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSidebar } from './utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()

const { open, toggleSidebar } = useSidebar()
// const isOpen = ref(false)
// const toggleSidebar = () => (isOpen.value = !isOpen.value)
</script>

<template>
    <Tooltip>
        <TooltipTrigger as-child>
            <Button
                data-sidebar="trigger"
                data-slot="sidebar-trigger"
                variant="ghost"
                size="icon"
                :class="cn('h-7 w-7', props.class)"
                @click="toggleSidebar"
            >
                <component :is="open ? PanelRightOpen : PanelRightClose" />
                <span class="sr-only">Toggle Sidebar</span>
            </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
            <p>{{ open ? 'Close Sidebar' : 'Open Sidebar' }}</p>
        </TooltipContent>
    </Tooltip>
</template>
