<script setup>
import { RouterView } from 'vue-router';

import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import Pomodoro from '@/components/Pomodoro/Pomodoro.vue';
</script>

<template>
    <Header />
    <RouterView />
    <Footer />
</template>

<style>
@import '@/assets/style/base.css';

#app {
    margin: auto;
    padding: 0 1rem;
    height: 100%;
    width: 100%;
    max-width: 32.5rem;
}
</style>