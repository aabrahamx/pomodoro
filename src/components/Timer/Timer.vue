<script setup>
  import { reactive, ref } from "vue";
  import { storeToRefs } from "pinia";
  import { useTimer } from "../../app/store";

  import Session from "../Session/Session.vue";
  import Loader from "../Loader/Loader.vue";
  import TimeDisplay from "../TimeDisplay/TimeDisplay.vue";
  import Setting from "../Setting/Setting.vue";
  import Task from "../Task/Task.vue";

  import {
    changeMinuteToSecond,
    formattedTime,
  } from "../../helpers/time-formatters.js";

  const store = useTimer();
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

    display: "25 : 00",
    isRunning: false,
    isPaused: false,
    pausedRemainingTime: null,
    currentSession: 0,
    sessionOver: false,
    focusTimeTurn: true,
    shortBreakTurn: false,
    longBreakTurn: false,
    sessionTurn: "work",
    sessionRunning: "default",
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
      currentRunningTurn === "work"
        ? (timer.sessionTurn = "short")
        : (timer.sessionTurn = "work");
    } else if (done) {
      timer.sessionTurn = "long";
    }
  }
  function reset() {
    timer.remainingTime = null;
    timer.startingTime = null;
    timer.display = "00 : 00";
    timer.isRunning = false;
    timer.isPaused = false;
    timer.pausedRemainingTime = null;
    timer.currentSession = 0;
    timer.sessionOver = false;
    timer.sessionTurn = "work";
    timer.sessionRunning = "default";
  }
  function sessionRunner() {
    timer.remainingTime = sessionPicker();
    timer.startingTime = timer.remainingTime;
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
      if (timer.sessionTurn === "work") {
        timer.sessionRunning = "work";
        timer.currentSession++;
        setNextTurn("work");
        return changeMinuteToSecond(timer.focusTime);
      } else if (timer.sessionTurn === "short") {
        timer.sessionRunning = "short";
        setNextTurn("short");
        return changeMinuteToSecond(timer.shortBreak);
      } else if (timer.sessionTurn === "long") {
        timer.sessionRunning = "long";
        timer.sessionOver = true;
        return changeMinuteToSecond(timer.longBreak);
      }
    }
  }
</script>

<template>
  <main class="wrapper-main">
    <section class="container-top">
      <Setting />
      <Task />
    </section>

    <section class="container-main">
      <div>
        <Loader :height="(timer.remainingTime / timer.startingTime) * 100" />
        <TimeDisplay
          :timer="timer.display"
          :current-session="timer.currentSession"
          :number-of-sessions="timer.numberOfSessions"
        />
      </div>
    </section>

    <hr class="line-break" />

    <section class="container-bottom">
      <Session :session="timer.sessionRunning" />
      <div class="container-btn">
        <button class="btn" @click="handleReset">Reset</button>
        <button class="btn" @click="handleStart" v-if="!timer.isRunning">
          Start
        </button>
        <button class="btn" @click="handlePause" v-if="timer.isRunning">
          Pause
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
  .wrapper-main,
  .container-top,
  .container-bottom,
  .container-btn {
    width: 100%;
    overflow: hidden;
  }
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
    background-color: #05386b;
  }
  .container-main > div {
    width: 260px;
    height: 260px;
    border-radius: 50%;
    flex-direction: column;
    background-color: #5cdb95;
  }
  .btn {
    width: 100px;
    height: 30px;
    padding: 4px;
    margin: 10px 15px;
    border: none;
    font-weight: bolder;
    color: #05386b;
    background-color: #8ee4af;
    transition: box-shadow 0.3s linear;
  }
  .btn:active,
  .btn:hover {
    border: 1px solid #05386b;
    box-shadow: -2px 2px 0px 0px #05386b;
  }
  .line-break {
    width: 100%;
    height: 1px;
    border: none;
    background-color: rgba(0, 0, 0, 0.9);
  }
</style>
