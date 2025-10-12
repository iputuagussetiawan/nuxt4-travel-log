import type { MapPoint } from '~/lib/type'

export const useMapStore = defineStore('useMapStore', () => {
    const mapPoints = ref<MapPoint[]>([])
    const selectedPoint = ref<MapPoint | null>(null)
    // ✅ Called once to create and render the Leaflet map
    async function initMap(mapContainerId: string, mapUrl: Ref<string>) {
        const L = await import('leaflet')
        const markers = ref<L.Marker[]>([])

        // Initialize map
        const map = L.map(mapContainerId, {
            center: [-1.537901, 125.463867],
            minZoom: 2,
            zoom: 10,
            zoomControl: true,
            maxBounds: L.latLngBounds([-90, -180], [90, 180])
        })

        // Add tile layer (light map example)
        let tileLayer = L.tileLayer(mapUrl.value, {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map)

        // Watch for theme change (light/dark)
        watch(mapUrl, (newUrl) => {
            map.removeLayer(tileLayer)
            tileLayer = L.tileLayer(newUrl, {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map)
        })

        // ✅ Fit bounds automatically when points change
        watch(
            mapPoints,
            (points) => {
                if (!map) return

                // Remove old markers
                markers.value.forEach((m) => m.remove())
                markers.value = []

                // Add new markers
                points.forEach((p) => {
                    const marker = L.marker([Number(p.lat), Number(p.long)], {
                        title: p.name
                    }).addTo(map)

                    // Optional popup
                    if (p.name || p.description) {
                        marker.bindPopup(
                            `<strong>${p.name}</strong><br>${p.description || ''}`
                        )
                    }

                    // Handle marker click → select point
                    marker.on('click', () => {
                        selectedPoint.value = p
                    })

                    // markers.value.push(marker)
                })

                // Fit bounds
                if (points.length > 0) {
                    const bounds = L.latLngBounds(
                        points.map((p) => [Number(p.lat), Number(p.long)])
                    )
                    map.fitBounds(bounds, { padding: [50, 50] })
                }
            },
            { deep: true, immediate: true }
        )

        // ✅ Watch selected point and pan smoothly
        watch(
            selectedPoint,
            (point) => {
                if (point && map) {
                    // You can use flyTo for a smoother zoom + pan animation
                    map.flyTo(
                        [Number(point.lat), Number(point.long)],
                        10, // 👈 your desired zoom level
                        {
                            animate: true,
                            duration: 0.8 // smooth transition
                        }
                    )
                }
            },
            { deep: true }
        )
    }

    return {
        mapPoints,
        selectedPoint,
        initMap
    }
})
