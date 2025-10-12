<script lang="ts" setup>
interface MapPinMarkerProps {
    label: string
    active: boolean
}
const mapPin = '/map-pin-red.svg'
const mapPinDark = '/map-pin.svg'
const mapPinActive = '/map-pin-blue.svg'
const colorMode = useColorMode()
const props = defineProps<MapPinMarkerProps>()

const pinUrl = computed(() => {
    if (props.active) return mapPinActive
    return colorMode.value === 'dark' ? mapPinDark : mapPin
})
</script>
<template>
    <div class="custom-marker">
        <div class="custom-marker__image-container">
            <span class="custom-marker__animation"></span>
            <img
                class="custom-marker__image"
                :src="pinUrl"
                :alt="props.label"
            />
        </div>
        <div class="custom-marker__popup-container">
            <div class="custom-marker__popup">
                {{ props.label }}
                <!-- <svg
                    class="custom-marker__arrow-down"
                    width="23"
                    height="17"
                    viewBox="0 0 23 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.76915 16.0103C10.5395 17.3409 12.4605 17.3409 13.2309 16.0103L22.5 0H0.5L9.76915 16.0103Z"
                        fill="#1E293B"
                    />
                </svg> -->
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.custom-marker {
    background-color: transparent;
}
</style>
