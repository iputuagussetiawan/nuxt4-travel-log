<script lang="ts" setup>
const mapStore = useMapStore()

const lightMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const darkMap = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

const colorMode = useColorMode()

const mapUrl = computed(() =>
    colorMode.preference === 'dark' ? darkMap : lightMap
)

onMounted(async () => {
    await mapStore.initMap('map', mapUrl) // ✅ pass the container ID
})
</script>
<template>
    <div id="map" style="height: 850px; width: 100%"></div>
</template>
<style lang="scss" scoped></style>
