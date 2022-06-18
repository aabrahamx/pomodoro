<script setup>
  import { RouterView } from 'vue-router';

  import Header from '@/components/Header/Header.vue';
  import Footer from '@/components/Footer/Footer.vue';
</script>

<template>
  <Header />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view>
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
