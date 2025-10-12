<script lang="ts" setup>
import { MAP_BOUNDS, MAP_CENTER } from '~/lib/constants'
import UiMapPinMarker from './ui/MapPinMarker.vue'

const colorMode = useColorMode()
const mapStore = useMapStore()

const lightMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const darkMap = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

const mapUrl = computed(() =>
    colorMode.preference === 'dark' ? darkMap : lightMap
)

onMounted(() => {
    mapStore.init()
})
</script>
<template>
    <LMap
        style="height: 850px"
        :zoom="5"
        :min-zoom="3"
        :center="MAP_CENTER"
        :max-bounds="MAP_BOUNDS"
        :max-bounds-viscosity="1.0"
        :use-global-leaflet="false"
        :fit-bounds-on-load="true"
    >
        <LTileLayer
            :url="mapUrl"
            attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            layer-type="base"
            name="OpenStreetMap"
        />
        <LMarker
            v-for="point in mapStore.mapPoints"
            :key="point.id"
            :lat-lng="[point.lat, point.long]"
        >
            <LIcon
                :icon-size="[30, 30]"
                :icon-anchor="[15, 30]"
                :popup-anchor="[0, -30]"
                class-name="my-custom-marker"
            >
                <UiMapPinMarker
                    :label="point.name"
                    :active="mapStore.selectedPoint?.id === point.id"
                />
            </LIcon>
            <LPopup>
                <div>
                    <h3 class="text-2xl mb-1">{{ point.name }}</h3>
                    <div class="text-sm m-0" v-if="point.description">
                        {{ point.description }}
                    </div>
                </div>
            </LPopup>
        </LMarker>
    </LMap>
</template>
<style lang="scss" scoped></style>
