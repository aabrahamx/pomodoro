<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../../app/store";

import Session from "../Session/Session.vue";
import Loader from "../Loader/Loader.vue";
import TimeDisplay from "../TimeDisplay/TimeDisplay.vue";


import {
  changeMinuteToSecond,
  formattedTime,
} from "../../helpers/time-formatters.js";
import SectionBar from "../SectionBar/SectionBar.vue";
import Setting from "../Setting/Setting.vue";
import Task from "../Task/Task.vue";

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

  display: "",
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
  timer.display = "";
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
      timer.startingTime = changeMinuteToSecond(timer.focusTime);
      return changeMinuteToSecond(timer.focusTime);
    } else if (timer.sessionTurn === "short") {
      timer.sessionRunning = "short";
      setNextTurn("short");
      timer.startingTime = changeMinuteToSecond(timer.shortBreak);
      return changeMinuteToSecond(timer.shortBreak);
    } else if (timer.sessionTurn === "long") {
      timer.sessionRunning = "long";
      timer.sessionOver = true;
      timer.startingTime = changeMinuteToSecond(timer.longBreak);
      return changeMinuteToSecond(timer.longBreak);
    }
  }
}
</script>

<template>
  <main class="wrapper-main">

    <SectionBar>
      <Setting />
      <Task />
    </SectionBar>
    

    <section class="container-main">
      <div>
        <Loader 
          v-if="timer.remainingTime && timer.startingTime"
          :height="(timer.remainingTime / timer.startingTime) * 100" 
        />
        <Loader v-else :height="100" />
        <TimeDisplay 
          :timer="timer.display || `${timer.focusTime} : 00`" :current-session="timer.currentSession"
          :number-of-sessions="timer.numberOfSessions" 
          :running="timer.isRunning"
        />
      </div>
    </section>

    <SectionBar>
      <Session :session="timer.sessionRunning" />
    </SectionBar>

    <section class="container-bottom">
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
}

.container-top,
.container-main,
.container-main>div,
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
  background-color: rgb(20, 33, 61, .5);
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.25);
}

.container-main>div {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  flex-direction: column;
  background-color: #000000;
}

.container-btn {
  display: flex;
  justify-content: space-between;
}
.btn {
  width: 42.5%;
  height: 40px;
  margin: 1rem;
  border-radius: .25rem;
  font-size: 1rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.25);
  border: none;
  box-shadow: 0px 2px 0px 0px var(--highlighted-color);
  transition: all 0.4s linear;
}
.btn:hover {
  background: rgba(0, 0, 0, 1);
}

.btn:active,
.btn:hover {
  box-shadow: none;
}

.line-break {
  width: 100%;
  height: 1px;
  border: none;
  background: rgb(229, 229, 229, .65);
}
</style>
