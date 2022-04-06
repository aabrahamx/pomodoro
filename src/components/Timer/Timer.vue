<script setup>
import { reactive } from "vue";
import SessionDisplay from '../SessionDisplay/SessionDisplay.vue'
import {
    displayElement,
    hideElement,
    playNotification,
    displaySession,
} from "../../helpers/dom.js";
import {
    changeMinuteToSecond,
    formattedTime,
} from "../../helpers/time-formatters.js";

const timer = reactive({
    // --- mutated by user ---
    focusTime: 0.1,
    shortBreak: 0.2,
    longBreak: 0.5,
    numberOfSessions: 4,

    // --- mutated internally ---
    time: null,
    display: "00 : 00",
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
    (timer.time = null), (timer.display = "00 : 00");
    timer.isRunning = false;
    timer.isPaused = false;
    timer.pausedRemainingTime = null;
    timer.currentSession = 0;
    timer.sessionOver = false;
    timer.sessionTurn = "work";
    timer.sessionRunning = "default";
}
function sessionRunner() {
    timer.time = sessionPicker();
    counter.start(countDown);
}
function countDown() {
    timer.display = formattedTime(timer.time);
    timer.time === 0 ? timerManager() : timer.time--;
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
    timer.pausedRemainingTime = timer.time;
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
    <div id="session-wrapper">
        <label for="sessionNumber">Sessions</label>
        <input
            v-model="timer.numberOfSessions"
            type="number"
            id="sessionNumber"
            min="1"
            max="10"
            step="1"
        />
    </div>
    <div id="setting-wrapper">
        <div>
            <label for="focus">Work</label>
            <input v-model="timer.focusTime" type="number" min="5" max="120" step="5" id="focus" />
        </div>
        <div>
            <label for="short-break">Short Break</label>
            <input
                v-model="timer.shortBreak"
                type="number"
                min="5"
                max="30"
                step="5"
                id="short-break"
            />
        </div>
        <div>
            <label for="long-break">Long Break</label>
            <input
                v-model="timer.longBreak"
                type="number"
                min="15"
                max="120"
                step="15"
                id="long-break"
            />
        </div>
    </div>

    <div id="timer-wrapper">
        <div>
            <div id="timer">
                <div id="time-holder">
                    <span>{{ timer.display }}</span>
                </div>

                <div>
                    <span>{{ timer.currentSession }} / {{ timer.numberOfSessions }}</span>
                </div>
            </div>
        </div>
    </div>
    <SessionDisplay :session="timer.sessionRunning" />
    <div id="btn-wrapper">
        <div>
            <button id="reset" @click="handleReset">Reset</button>
        </div>
        <div>
            <div id="start-btn">
                <button v-if="!timer.isRunning" @click="handleStart">Start</button>
            </div>
            <div id="pause-btn">
                <button v-if="timer.isRunning" @click="handlePause">Pause</button>
            </div>
        </div>
    </div>
    <audio id="audio">
        <source src="../assets/audio/positive-notification.mp3" type="audio/mp3" />
    </audio>
    <audio id="tickingAudio">
        <source src="../assets/audio/Ticking.mp3" />
    </audio>
</template>

<style scoped>
* {
    color: #edf5e1;
}
#timer-wrapper {
    height: 300px;
    width: 300px;
    margin: 10px auto;
    background-color: #05386b;
    border: 2px solid #8ee4af;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
#timer-wrapper > div {
    width: 85%;
    height: 85%;
    border-radius: 50%;
    border: 3px solid #8ee4af;
    background-color: #5cdb95;
    display: flex;
    align-items: center;
    justify-content: center;
}
#timer {
    height: 95%;
    width: 95%;
    border-radius: 50%;
    background-color: #05386b;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 2px solid #8ee4af;
}
#time-holder {
    font-size: 1.5rem;
}
#timer > div {
    margin: 5px;
}
button {
    padding: 4px;
    width: 100px;
    height: 30px;
    border: 1px solid #05386b;
    color: #05386b;
    font-weight: bolder;
    background-color: #8ee4af;
    transition: transform 0.7 linear;
}
button:active,
button:hover {
    transform: scale(0.95);
}

/* setting styles */
input {
    height: 20px;
    width: 50px;
    margin: 5px;
    text-align: center;
    color: #05386b;
    border: none;
    background-color: #379683;
}
#setting-wrapper {
    display: flex;
}
#setting-wrapper > div {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
}
#session-wrapper label,
#session-wrapper input {
    display: block;
    margin: 0.25rem auto;
    width: 270px;
}
#btn-wrapper {
    display: flex;
}
#btn-wrapper > div {
    margin: 1rem 0.5rem;
}
</style>
