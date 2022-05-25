<script setup>
import Timer from '../components/Timer/Timer.vue'
import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer/Footer.vue';
</script>

<template>
    <Header />
    <Timer />
    <Footer />
</template>

<style>
@import '@/assets/base.css';

#app {
    margin: auto;
    padding: 0 1rem;
    height: 100%;
    width: 100%;
    max-width: 32.5rem;
}
</style>