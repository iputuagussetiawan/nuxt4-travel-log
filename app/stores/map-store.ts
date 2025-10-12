import type { MapPoint } from '~/lib/type'

export const useMapStore = defineStore('useMapStore', () => {
    const mapPoints = ref<MapPoint[]>([])
    const selectedPoint = ref<MapPoint | null>(null)

    async function init() {
        const L = await import('leaflet')
        const map = ref<L.Map | null>(null)

        // Watch for changes in mapPoints and fit bounds automatically
        effect(() => {
            if (!map.value) return
            if (mapPoints.value.length === 0) return

            const first = mapPoints.value[0]
            if (!first) return
            const calculatedBounds = mapPoints.value.reduce(
                (bounds, point) =>
                    bounds.extend([Number(point.lat), Number(point.long)]),
                L.latLngBounds([[Number(first.lat), Number(first.long)]])
            )

            // Apply fitBounds to the active map
            map.value.fitBounds(calculatedBounds, {
                padding: [50, 50], // optional, adds a bit of spacing around markers
                maxZoom: 1 // prevent zooming in too far
            })
        })
    }

    return {
        init,
        mapPoints,
        selectedPoint
    }
})
