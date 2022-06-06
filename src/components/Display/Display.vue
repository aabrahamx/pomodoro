<script setup>
  import { toRefs } from 'vue';
  import TimeAnimation from '../TimeAnimation/TimeAnimation.vue';
  import TimeDisplay from '../TimeDisplay/TimeDisplay.vue';

  const props = defineProps({
    time: {
      type: String,
      required: true,
    },
    currentSession: {
      type: Number,
      required: true,
    },
    numberOfSessions: {
      type: Number,
      required: true,
    },
    running: {
      type: Boolean,
      required: true,
    },
    percentageLeft: {
      type: Number,
      required: true,
    },
  });

  const { time, running, percentageLeft, currentSession, numberOfSessions } =
    toRefs(props);
</script>

<template>
  <section class="outter-cont shadow-lg shadow-black/50">
    <div class="inner-cont bg-emerald-700">
      <TimeAnimation :height="percentageLeft" />
      <TimeDisplay
        :time="time"
        :current-session="currentSession"
        :number-of-sessions="numberOfSessions"
        :running="running"
      />
    </div>
  </section>
</template>

<style scoped>
  .outter-cont {
    height: 300px;
    width: 300px;
    margin: 2rem auto;
  }

  .inner-cont {
    width: 260px;
    height: 260px;
    flex-direction: column;
  }

  .outter-cont,
  .inner-cont {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
</style>
