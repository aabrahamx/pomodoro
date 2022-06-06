<script setup>
  import { defineProps, toRefs } from 'vue';
  import PointerAnimation from '../PointerAnimation/PointerAnimation.vue';

  const props = defineProps({
    time: String,
    currentSession: Number,
    numberOfSessions: Number,
    running: Boolean,
  });

  const { time, currentSession, numberOfSessions, running } = toRefs(props);
</script>

<template>
  <div class="wrapper-timer text-white">
    <div class="cont-timer">
      <p class="font-bold text-3xl tracking-wider">
        {{ time }}
      </p>
      <p class="font-semibold">
        {{ currentSession }} / {{ numberOfSessions }}
      </p>
    </div>
    <PointerAnimation :running="running" />
  </div>
</template>

<style scoped>
  .wrapper-timer {
    width: 240px;
    height: 240px;
  }

  .cont-timer {
    position: absolute;
    width: 240px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 50%;
  }
</style>
