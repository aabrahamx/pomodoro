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
  const { time, startingTime, sessCount, isRunning, state } = toRefs(pomodoro);

  const start = () => pomodoro.start();
  const pause = () => pomodoro.stop();
  const reset = () => pomodoro.reset();
</script>

<template>
  <main>
    <Display
      :time="formatTime(time)"
      :number-of-sessions="sessions"
      :current-session="sessCount"
      :percentage-left="(time / startingTime) * 100"
      :running="isRunning"
    />

    <Session :current-session="state" />

    <Controls
      @start="start"
      @pause="pause"
      @reset="reset"
      :running="isRunning"
    />
  </main>
</template>