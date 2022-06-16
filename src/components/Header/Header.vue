<script setup>
  import Logo from '../Logo/Logo.vue';
  import RouterIcon from '../RouterIcon/RouterIcon.vue';
</script>

<template>
  <header class="flex items-center justify-between py-4 border-b border-black">
    <Logo />
    <RouterIcon to="/settings" type="setting" size="sm" />
  </header>
</template>
