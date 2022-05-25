<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    height: Number,
  });
</script>

<template>
  <div class="wrapper">
    <div v-if="!props.height" class="bg-slate-900"></div>
    <div
      v-else
      :style="{ height: props.height + '%' }"
      class="bg-slate-900"
    ></div>
  </div>
</template>

<style scoped>
  .wrapper {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    position: absolute;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }
  .wrapper > div {
    height: 100%;
    width: 100%;
  }
</style>
