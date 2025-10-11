<script setup lang="ts">
//1.modules import
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowUpRightIcon, LucideCirclePlus } from 'lucide-vue-next'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '~/components/ui/card'

import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from '@/components/ui/empty'

import { cn } from '~/lib/utils'

const { data, status } = await useFetch('/api/locations', {
    lazy: true
})

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

            <div v-if="status === 'pending'">Loading...</div>
            <div v-else-if="data" class="grid grid-cols-6 gap-4 mt-6">
                <!-- <pre>{{ data }}</pre> -->
                <Card
                    v-for="location in data"
                    :key="location.id"
                    class="bg-primary/10 hover:bg-primary/20 cursor-pointer transition-all duration-400 ease-in-out"
                >
                    <CardHeader>
                        <CardTitle>{{ location.name }}</CardTitle>
                        <CardDescription>{{
                            location.description
                        }}</CardDescription>
                    </CardHeader>
                    <!-- <CardContent> sdfsdff </CardContent>
                    <CardFooter> sdfsd </CardFooter> -->
                </Card>
            </div>
            <div v-else>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <FolderCode />
                        </EmptyMedia>
                        <EmptyTitle>No Projects Yet</EmptyTitle>
                        <EmptyDescription>
                            You haven't created any projects yet. Get started by
                            creating your first project.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <div class="flex gap-2">
                            <Button>Create Location</Button>
                        </div>
                    </EmptyContent>
                    <Button
                        variant="link"
                        as-child
                        class="text-muted-foreground"
                        size="sm"
                    >
                        <a href="/dashboard">
                            Learn More <ArrowUpRightIcon />
                        </a>
                    </Button>
                </Empty>
            </div>
        </div>
    </section>
</template>
