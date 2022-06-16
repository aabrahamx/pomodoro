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
    disabled: Boolean,
    mx: Boolean,
  });

  const { type, size, disabled } = toRefs(props);
  const emit = defineEmits(['click']);
</script>

<template>
  <button
    class="transition-opacity aspect-square hover:opacity-70"
    @click="emit('click')"
    :disabled="disabled"
    :class="{
      'h-8': size === 'md',
      'h-6': size === 'sm',
      'opacity-70': disabled,
      'mx-4': mx,
    }"
  >
    <ImgIcon :type="type" />
  </button>
</template>
