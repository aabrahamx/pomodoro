<script setup>

</script>

<template>
  <section class="styled-divider">
    <slot />
  </section>
</template>

<style scoped>
.styled-divider {
  padding: .75rem 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
}
</style>