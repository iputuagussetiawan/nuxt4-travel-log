export const useLocationsStore = defineStore('useLocationsStore', () => {
    const { data, status, refresh } = useFetch('/api/locations', {
        lazy: true
    })

    const sidebarStore = useSidebarStore()
    const mapStore = useMapStore()

    effect(() => {
        if (data.value) {
            sidebarStore.sidebarItems = data.value.map((location) => ({
                id: `location-${location.id}`,
                label: location.name,
                icon: 'tabler:map-pin-filled',
                href: '#',
                location
            }))

            mapStore.mapPoints = data.value.map((location) => ({
                id: location.id,
                name: location.name,
                description: location.description,
                lat: location.lat,
                long: location.long
            }))
        }
        sidebarStore.loading = status.value === 'pending'
    })

    return {
        locations: data,
        status,
        refresh
    }
})
