<script setup>
  import { reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useStore } from '../../app/store';

  import Session from '../Session/Session.vue';
  import Loader from '../Loader/Loader.vue';
  import TimeDisplay from '../TimeDisplay/TimeDisplay.vue';

  import {
    changeMinuteToSecond,
    formattedTime,
  } from '../../helpers/time-formatters.js';

  const store = useStore();
  const { workSession, shortBreak, longBreak, sessionAmount } =
    storeToRefs(store);

  const timer = reactive({
    // --- mutated by user ---
    focusTime: workSession,
    shortBreak: shortBreak,
    longBreak: longBreak,
    numberOfSessions: sessionAmount,

    // --- mutated internally ---
    remainingTime: null,
    startingTime: null,

    display: '00 : 00',
    isRunning: false,
    isPaused: false,
    pausedRemainingTime: null,
    currentSession: 0,
    sessionOver: false,
    focusTimeTurn: true,
    shortBreakTurn: false,
    longBreakTurn: false,
    sessionTurn: 'work',
    sessionRunning: 'default',
  });

  const counter = {
    start(functionToBeExecuted) {
      this.setIntervalID = setInterval(functionToBeExecuted, 1000);
    },
    stop() {
      clearInterval(this.setIntervalID);
    },
  };
  function handleReset() {
    counter.stop();
    reset();
  }
  function setNextTurn(currentRunningTurn) {
    const all = timer.numberOfSessions;
    const current = timer.currentSession;
    const done = all - current === 0;
    if (!done) {
      currentRunningTurn === 'work'
        ? (timer.sessionTurn = 'short')
        : (timer.sessionTurn = 'work');
    } else if (done) {
      timer.sessionTurn = 'long';
    }
  }
  function reset() {
    timer.remainingTime = null;
    timer.startingTime = null;
    timer.display = '00 : 00';
    timer.isRunning = false;
    timer.isPaused = false;
    timer.pausedRemainingTime = null;
    timer.currentSession = 0;
    timer.sessionOver = false;
    timer.sessionTurn = 'work';
    timer.sessionRunning = 'default';
  }
  function sessionRunner() {
    timer.remainingTime = sessionPicker();
    counter.start(countDown);
  }
  function countDown() {
    timer.display = formattedTime(timer.remainingTime);
    timer.remainingTime === 0 ? timerManager() : timer.remainingTime--;
  }
  function timerManager() {
    counter.stop();
    timer.sessionOver ? handleReset() : sessionRunner();
  }
  function handleStart() {
    timer.isPaused = false;
    timer.isRunning = true;
    sessionRunner();
  }
  function handlePause() {
    counter.stop();
    timer.isPaused = true;
    timer.isRunning = false;
    timer.pausedRemainingTime = timer.remainingTime;
  }
  function sessionPicker() {
    if (timer.pausedRemainingTime) {
      const PausedTimeAt = timer.pausedRemainingTime;
      timer.pausedRemainingTime = null;
      return PausedTimeAt;
    } else {
      if (timer.sessionTurn === 'work') {
        timer.sessionRunning = 'work';
        timer.currentSession++;
        setNextTurn('work');
        timer.startingTime = changeMinuteToSecond(timer.focusTime);
        return changeMinuteToSecond(timer.focusTime);
      } else if (timer.sessionTurn === 'short') {
        timer.sessionRunning = 'short';
        setNextTurn('short');
        timer.startingTime = changeMinuteToSecond(timer.shortBreak);
        return changeMinuteToSecond(timer.shortBreak);
      } else if (timer.sessionTurn === 'long') {
        timer.sessionRunning = 'long';
        timer.sessionOver = true;
        timer.startingTime = changeMinuteToSecond(timer.longBreak);
        return changeMinuteToSecond(timer.longBreak);
      }
    }
  }
</script>

<template>
  <main>
    <section class="shadow-lg container-main shadow-black/50">
      <div class="bg-emerald-700">
        <Loader :height="(timer.remainingTime / timer.startingTime) * 100" />
        <TimeDisplay
          :timer="timer.display"
          :current-session="timer.currentSession"
          :number-of-sessions="timer.numberOfSessions"
          :running="timer.isRunning"
        />
      </div>
    </section>

    <Session :session="timer.sessionRunning" />

    <section class="container-bottom">
      <div class="container-btn">
        <button class="p-2 btn" @click="handleReset">
          <img
            class="h-8"
            src="https://img.icons8.com/ios-glyphs/90/ffffff/recurring-appointment.png"
          />
        </button>
        <button class="p-2 btn" @click="handleStart" v-if="!timer.isRunning">
          <img
            class="h-8"
            src="https://img.icons8.com/ios-glyphs/90/ffffff/play--v1.png"
          />
        </button>
        <button class="p-2 btn" @click="handlePause" v-if="timer.isRunning">
          <img
            class="h-8"
            src="https://img.icons8.com/ios-glyphs/90/ffffff/pause--v1.png"
          />
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
  .container-top,
  .container-main,
  .container-main > div,
  .container-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container-main {
    height: 300px;
    width: 300px;
    margin: 2rem auto;
    border-radius: 50%;
  }

  .container-main > div {
    width: 260px;
    height: 260px;
    border-radius: 50%;
    flex-direction: column;
  }

  .container-btn {
    display: flex;
    justify-content: center;
  }
  .btn {
    margin: 1rem;
    border-radius: 50%;
    color: #fff;
  }
</style>
