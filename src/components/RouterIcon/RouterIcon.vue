<script setup>
  import { toRefs } from 'vue';
  import ImgIcon from '../ImgIcon/ImgIcon.vue';

  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  });

  const { type, to } = toRefs(props);
</script>

<template>
  <RouterLink
    class="block"
    :to="to"
    :class="{
      'h-8': size === 'md',
      'h-6': size === 'sm',
    }"
  >
    <ImgIcon :type="type" />
  </RouterLink>
</template>
