<script setup>
  import { toRefs } from 'vue';
  import icons from '@/assets/icons/icons';

  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
  });

  const { type } = toRefs(props);
</script>

<template>
  <img
    :src="icons[type].src"
    :alt="icons[type].src"
    class="h-full w-auto pointer-events-none"
  />
</template>