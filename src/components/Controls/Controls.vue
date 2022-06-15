<script setup>
  import { toRefs } from 'vue';

  import playIcon from '@/assets/icons/glyph-play-90.png';
  import pauseIcon from '@/assets/icons/glyph-pause-90.png';
  import resetIcon from '@/assets/icons/glyph-reset-90.png';
  import skipIcon from '@/assets/icons/glyph-skip-90.png';

  const props = defineProps({
    running: {
      type: Boolean,
      required: true,
    },
    currentSession: {
      type: String,
      required: true.valueOf,
    },
  });
  const { running } = toRefs(props);

  const emit = defineEmits(['start', 'pause', 'reset', 'skip']);
  const handleStart = () => emit('start');
  const handlePause = () => emit('pause');
  const handleReset = () => emit('reset');
  const handleSkip = () => emit('skip');
</script>

<template>
  <section class="flex justify-center my-8">
    <button
      @click="handleReset"
      class="mx-5 hover:opacity-70 transition-opacity"
    >
      <img :src="resetIcon" alt="reset icon" class="h-8 pointer-events-none" />
    </button>

    <button
      v-if="!running"
      @click="handleStart"
      class="mx-5 hover:opacity-70 transition-opacity"
    >
      <img :src="playIcon" alt="play icon" class="h-8 pointer-events-none" />
    </button>

    <button
      v-else="running"
      @click="handlePause"
      class="mx-5 hover:opacity-70 transition-opacity"
    >
      <img :src="pauseIcon" alt="pause icon" class="h-8 pointer-events-none" />
    </button>

    <button
      :disabled="currentSession === 'long' || !running"
      @click="handleSkip"
      class="mx-5 hover:opacity-70 transition-opacity scale-110"
    >
      <img :src="skipIcon" alt="skip icon" class="h-8 pointer-events-none" />
    </button>
  </section>
</template>
