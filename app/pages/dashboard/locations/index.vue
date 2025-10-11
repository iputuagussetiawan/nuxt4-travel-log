<script setup lang="ts">
//1.modules import
import { Button, buttonVariants } from '@/components/ui/button'
import { LucideCirclePlus, Map } from 'lucide-vue-next'
import { cn } from '~/lib/utils'

//2.modules init
definePageMeta({
    layout: 'dashboard'
})
</script>

<template>
    <section>
        <div class="mt-4 px-4">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-lg font-bold">List Location</h1>
                    <p class="text-sm text-muted-foreground">
                        List of all locations here
                    </p>
                </div>
                <div class="flex gap-2">
                    <NuxtLink
                        to="/dashboard/locations/add"
                        :class="
                            cn(buttonVariants({ variant: 'default' }), 'gap-2')
                        "
                    >
                        Add Location
                        <LucideCirclePlus class="w-4 h-4" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
