<script setup>
import Timer from '../components/Timer/Timer.vue'
import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer/Footer.vue';

const windowHeight = window.innerHeight;
document.documentElement.style
    .setProperty('--window-height', `${windowHeight}px`);

</script>

<template>

    <Header />
    <Timer />
    <Footer />

</template>

<style>
@import '@/assets/global.css';
@import '@/assets/base.css';

:root {
    --window-height: '';
}

#app {
    margin: auto;
    padding: 0 1rem;
    width: 100vw;
    max-width: 32.5rem;
    height: var(--window-height);
}
</style>