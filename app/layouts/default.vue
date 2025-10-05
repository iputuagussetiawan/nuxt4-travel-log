<template>
    <div>
        <div class="navbar">
            <div class="navbar__logo">U</div>
            <ul>
                <li class="text-4xl">aa</li>
            </ul>
        </div>
        <slot />
        <AppFooter />
    </div>
</template>

<style lang="scss">
.navbar {
    background-color: blue;
    height: 100px;
    width: 100%;

    &__logo {
        width: 50px;
        height: 50px;
        background-color: red;
    }
}
</style>
