import type { MapPoint } from '~/lib/type'

export const useMapStore = defineStore('useMapStore', () => {
    const mapPoints = ref<MapPoint[]>([])
    const selectedPoint = ref<MapPoint | null>(null)
    const addedPoint = ref<MapPoint | null>(null)
    const mapPin = '/map-pin-red.svg'
    const mapPinDark = '/map-pin.svg'
    const mapPinActive = '/map-pin-blue.svg'
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
                    const icon = L.divIcon({
                        html: `
                            <div class="custom-marker">
                                <div class="marker-inner">
                                    <img class="custom-marker__image" src="${mapPinDark}" alt="${p.name}" />
                                </div>
                            </div>
                        `,
                        className: '', // ❗ prevent Leaflet’s default icon styling
                        iconSize: [30, 30],
                        iconAnchor: [15, 30],
                        popupAnchor: [0, -35] // 👈 move popup 35px above the icon
                    })
                    const marker = L.marker([Number(p.lat), Number(p.long)], {
                        title: p.name,
                        icon,
                        draggable: true
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

                    marker.on('dragend', () => {
                        const newPos = marker.getLatLng()
                        console.log(
                            '📍 Marker dragged to:',
                            newPos.lat,
                            newPos.lng
                        )
                    })
                })

                const newMarkerIcon = L.divIcon({
                    html: `
                            <div class="custom-marker">
                                <div class="marker-inner">
                                    <img class="custom-marker__image" src="${mapPinActive}" alt="New Marker" />
                                </div>
                            </div>
                        `,
                    className: '', // ❗ prevent Leaflet’s default icon styling
                    iconSize: [30, 30],
                    iconAnchor: [15, 30],
                    popupAnchor: [0, -35] // 👈 move popup 35px above the icon
                })
                const newMarker = L.marker([0, 1], {
                    title: 'New Marker',
                    icon: newMarkerIcon,
                    draggable: true
                }).addTo(map)

                newMarker.on('dragend', () => {
                    const newPos = newMarker.getLatLng()
                    console.log('📍 Marker dragged to:', newPos.lat, newPos.lng)
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
                        14, // 👈 your desired zoom level
                        {
                            animate: true,
                            duration: 4 // smooth transition
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
        initMap,
        addedPoint
    }
})
