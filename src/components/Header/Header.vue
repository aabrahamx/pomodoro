<script setup>
  import Setting from '../Setting/Setting.vue';
  import Logo from '../Logo/Logo.vue';
</script>

<template>
  <header
    class="flex items-center justify-between py-4 text-2xl font-semibold border-b text-emerald-500 border-black/50"
  >
    <Logo />
    <Setting />
  </header>
</template>