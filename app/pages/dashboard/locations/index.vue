<script setup lang="ts">
//1.modules import
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowUpRightIcon, LucideCirclePlus, MapPin } from 'lucide-vue-next'
import {
    Card,
    CardDescription,
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
import { Skeleton } from '~/components/ui/skeleton'
import MapClient2 from '~/components/MapClient2.vue'
const locationsStore = useLocationsStore()
const { locations, status } = storeToRefs(locationsStore)
const showForm = ref(false)

const mapStore = useMapStore()

//2.modules init
definePageMeta({
    layout: 'dashboard'
})

onMounted(() => {
    locationsStore.refresh()
})

const toggleForm = () => {
    showForm.value = !showForm.value
}
</script>

<template>
    <section class="mt-4 px-4">
        <div class="flex flex-col gap-4">
            <!-- Header -->
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-lg font-bold">My Location</h2>
                    <p class="text-sm text-muted-foreground">
                        Manage your locations and view them on the map
                    </p>
                </div>
                <div class="flex gap-2">
                    <Button @click="toggleForm">
                        {{ showForm ? 'Close Form' : 'Add Location' }}
                        <LucideCirclePlus class="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
            <!-- Locations List -->
            <div v-if="!+showForm">
                <div v-if="locations && locations.length > 0" class="mt-6">
                    <h3 class="text-lg font-semibold mb-3">Location List</h3>

                    <div
                        v-if="status === 'pending'"
                        class="grid grid-cols-6 gap-4 mt-6"
                    >
                        <Card v-for="i in 12" :key="i">
                            <CardHeader>
                                <CardTitle>
                                    <Skeleton class="h-2 w-1/2" />
                                </CardTitle>
                                <CardDescription class="space-y-1">
                                    <Skeleton class="h-2 w-full" />
                                    <Skeleton class="h-2 w-1/2" />
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    <div
                        v-else
                        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6"
                    >
                        <Card
                            v-for="location in locations"
                            :key="location.id"
                            @click="mapStore.selectedPoint = location"
                            @mouseleave="mapStore.selectedPoint = null"
                            class="bg-primary/10 hover:bg-primary/20 cursor-pointer transition-all duration-400 ease-in-out"
                            :class="{
                                'border-primary':
                                    location.id === mapStore.selectedPoint?.id
                            }"
                        >
                            <CardHeader>
                                <CardTitle>{{ location.name }}</CardTitle>
                                <CardDescription>
                                    {{ location.description }}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="w-full mt-6">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <MapPin
                                    class="w-10 h-10 text-muted-foreground"
                                />
                            </EmptyMedia>

                            <EmptyTitle>No Locations Found</EmptyTitle>
                            <EmptyDescription>
                                You haven't added any locations yet. Start by
                                creating your first one to begin tracking and
                                managing your data.
                            </EmptyDescription>
                        </EmptyHeader>

                        <EmptyContent>
                            <div class="flex gap-2">
                                <Button @click="toggleForm">
                                    Create Location
                                </Button>
                            </div>
                        </EmptyContent>

                        <Button
                            variant="link"
                            asChild
                            class="text-muted-foreground"
                            size="sm"
                        >
                            <NuxtLink to="/dashboard">
                                Learn more about managing locations
                                <ArrowUpRightIcon class="w-4 h-4 ml-1" />
                            </NuxtLink>
                        </Button>
                    </Empty>
                </div>
            </div>

            <!-- Main Content Area -->
            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300"
            >
                <!-- Left Side: Form -->
                <div v-if="showForm" class="bg-card rounded-xl p-4 shadow-sm">
                    <h2 class="text-lg font-semibold mb-2">
                        Create a New Location
                    </h2>
                    <p class="text-sm text-muted-foreground mb-4">
                        Fill in the form to add a new location.
                    </p>
                    <FormLocation />
                </div>

                <!-- Right Side: Map -->
                <div
                    class="bg-card rounded-xl p-2 relative overflow-hidden"
                    :class="showForm ? 'col-span-2 h-[600px]' : 'col-span-3'"
                >
                    <ClientOnly fallback-tag="span" fallback="Loading Map...">
                        <MapClient2 />
                    </ClientOnly>
                </div>
            </div>
        </div>
    </section>
</template>
