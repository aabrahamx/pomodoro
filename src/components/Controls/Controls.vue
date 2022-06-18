<script setup>
  import { toRefs } from 'vue';
  import BtnIcon from '../BtnIcon/BtnIcon.vue';

  const props = defineProps({
    running: {
      type: Boolean,
      required: true,
    },
    currentSession: {
      type: String,
      required: true,
    },
  });

  const { running } = toRefs(props);
  const emit = defineEmits(['start', 'pause', 'reset', 'skip']);
</script>

<template>
  <section class="flex justify-center my-8">
    <BtnIcon
      type="reset"
      size="md"
      @click="emit('reset')"
      :disabled="currentSession === 'idle'"
      mx
    />
    <BtnIcon type="play" size="md" @click="emit('start')" mx v-if="!running" />
    <BtnIcon
      type="pause"
      size="md"
      @click="emit('pause')"
      mx
      v-else="running"
    />
    <BtnIcon
      type="skip"
      size="md"
      @click="emit('skip')"
      :disabled="currentSession === 'long' || currentSession === 'idle'"
      mx
    />
  </section>
</template>
