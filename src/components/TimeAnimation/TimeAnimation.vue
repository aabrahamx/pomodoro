<script setup>
  import { defineProps, toRefs } from 'vue';

  const props = defineProps({
    height: {
      type: Number,
      required: true
    },
  });
  
  const { height } = toRefs(props);
</script>

<template>
  <div class="cont">
    <div
      class="bg-slate-900 w-full"
      :style="{ height: height ? `${height}%` : '100%' }"
    ></div>
  </div>
</template>

<style scoped>
  .cont {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    position: absolute;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    transition: all 1s linear;
  }
</style>
