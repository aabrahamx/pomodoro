<script setup>
  import { reactive, toRefs } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useStore } from '@/app/store';

  import Pomodoro from '@/util/pomodoro';
  import { formatTime } from '@/helpers/formatters';

  import Session from '@/components/Session/Session.vue';
  import Controls from '@/components/Controls/Controls.vue';
  import Display from '@/components/Display/Display.vue';

  const store = useStore();
  const { focus, short, long, sessions } = storeToRefs(store);

  const userSettings = reactive({ focus, short, long, sessions });
  const pomodoro = reactive(new Pomodoro(userSettings));
  const { runningTime, startingTime, sessionProgress, isRunning, state } =
    toRefs(pomodoro);
</script>

<template>
  <main>
    <Display
      :time="formatTime(runningTime)"
      :number-of-sessions="sessions"
      :current-session="sessionProgress"
      :percentage-left="(runningTime / startingTime) * 100"
      :running="isRunning"
    />

    <Session :current-session="state" />

    <Controls
      @start="pomodoro.handleStartClick()"
      @pause="pomodoro.handlePauseClick()"
      @reset="pomodoro.handleResetClick()"
      @skip="pomodoro.handleSkipClick()"
      :running="isRunning"
      :current-session="state"
    />
  </main>
</template>
