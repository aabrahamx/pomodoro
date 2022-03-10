
<template>
    <div id="session-wrapper">
        <label for="sessionNumber">Sessions</label>
        <input v-model="timer.numberOfSessions" type="number" id="sessionNumber" min="1" max="10" step="1">
    </div>
    <div id="setting-wrapper">
        <div>
            <label for="focus"> Work </label>
            <input v-model="timer.focusTime" type="number" min="5" max="120" step="5" id="focus">
        </div>
        <div>
            <label for="short-break"> Short Break </label>
            <input v-model="timer.shortBreak" type="number" min="5" max="30" step="5" id="short-break" >
        </div>
        <div>
            <label for="long-break"> Long Break </label>
            <input v-model="timer.longBreak" type="number" min="15" max="120" step="15" id="long-break">
        </div>
    </div>
    <div id="timer-wrapper">
        <div>
            <div id="timer">
                <div>
                    <span id="session"></span>
                </div>
                <div id="time-holder">
                    <span> {{ timer.time }} </span>
                </div>
                <div id="icon-wrapper">
                    <div id="start-btn">
                        <button @click="timeCounter"> Start </button>
                    </div>
                    <div id="pause-btn" style="display: none;">
                        <button @click="pauseTimer"> Pause </button>
                    </div>
                </div>
                <div>
                    <span> {{ timer.currentSession }} / {{ timer.numberOfSessions }} </span>
                </div>
            </div>
        </div>
    </div>
    <div>
        <button id="reset" @click="userReset"> Reset </button>
    </div>
    <audio id="audio" >
        <source src="../assets/audio/positive-notification.mp3" type="audio/mp3" >
    </audio>
</template>


<script setup>

import { reactive } from 'vue';
import { displayElement, hideElement, playNotification, displaySession } from '../helpers/dom.js';
import { changeMinuteToSecond, formattedTime } from '../helpers/time-formatters.js';

const timer = reactive({
    // -- client input
    focusTime: 25,
    shortBreak: 5,
    longBreak: 30,
    numberOfSessions: 4,
    // -----------------

    time: '00 : 00',
    currentSession: 0,
    sessionOver: false,

    focusTimeTurn: true,
    shortBreakTurn: false,
    longBreakTurn: false,
    isPaused: false,
    pausedRemainingTime: null
})

function userReset() {
    timer.isPaused = true;
    timer.currentSession = 0;
    timer.numberOfSessions = 4;
    timer.sessionOver = false;
    timer.focusTimeTurn = true;
    timer.shortBreakTurn = false;
    timer.longBreakTurn = false;
    setTimeout(()=> {
        timer.isPaused = false;
        timer.pausedRemainingTime = null;
        timer.time = '00 : 00';
    }, 1100)
    console.log('resest')
}

function setTurn(runningTurn) {
    // ⬇ -- takes current running turn and sets for the next one --
    const difference = timer.numberOfSessions - timer.currentSession;
    if (difference > 0) {
        // ⬇ -- work session and short break -- 
        if (runningTurn === timer.focusTime) {
            timer.focusTimeTurn = false;
            timer.shortBreakTurn = true;
        } else if (runningTurn === timer.shortBreak) {
            timer.shortBreakTurn = false;
            timer.focusTimeTurn = true;
        }
        // ⬇ -- long break -- 
    } else if (difference === 0) {
        timer.focusTimeTurn = false;
        timer.shortBreakTurn = false;
        timer.longBreakTurn = true;
    }
}

function whichSessionToRun() {
    if (timer.focusTimeTurn === true) {
        console.log('focus')
        timer.currentSession++
        setTurn(timer.focusTime);
        displaySession('#session', 'Work Session 🎯')
        return timer.focusTime;
    } else if (timer.shortBreakTurn === true) {
        console.log('short')
        setTurn(timer.shortBreak);
        displaySession('#session', 'Short Break 🧘')
        return timer.shortBreak;
    } else if (timer.longBreakTurn === true) {
        console.log('long')
        timer.sessionOver = true;
        displaySession('#session', 'Long Break 🏖️')
        return timer.longBreak;
    }
}

function reset() {
    timer.focusTimeTurn = true;
    timer.shortBreakTurn = false;
    timer.longBreakTurn = false;
    timer.sessionOver = false;
    timer.currentSession = 0;
}

function timerExecutor() {
    if (!timer.sessionOver) {
        timeCounter();
    } else if (timer.sessionOver) {
        reset();
        displaySession('#session', 'Done! Great Job! 🎉')
        hideElement('#pause-btn');
        displayElement('#start-btn');
    }
}

function timeCounter() {
    let tickingTime;
    displayElement('#pause-btn');
    hideElement('#start-btn')
    if (timer.pausedRemainingTime > 0) {
        // plays from a paused state
        tickingTime = timer.pausedRemainingTime;
        timer.isPaused = false;
        timer.pausedRemainingTime = null;
    } else {
        tickingTime = changeMinuteToSecond(whichSessionToRun());
    }
    const timerId = setInterval(() => {
        if (timer.isPaused === true) {
            timer.pausedRemainingTime = tickingTime;
            displayElement('#start-btn');
            hideElement('#pause-btn')
            stopTimer(timerId);
        } else if (tickingTime === 0) {
            stopTimer(timerId);
            timerExecutor();
            playNotification('#audio');
        } else {
            tickingTime--
        }
        timer.time = formattedTime(tickingTime);
    }, 1000)
}

function stopTimer(timer) {
    clearInterval(timer);
}

function pauseTimer() {
    timer.isPaused = true;
}
</script>


<style scoped>

#timer-wrapper {
    height: 300px;
    width: 300px;
    margin: 10px auto;
    background-color: #adbbb2;
    border: 1px solid black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
#timer-wrapper > div {
    width: 85%;
    height: 85%;
    border-radius: 50%;
    border: 2px solid black;
    background-color: antiquewhite;
    display: flex;
    align-items: center;
    justify-content: center;
}
#timer {
    height: 95%;
    width: 95%;
    border-radius: 50%;
    background-color: #adbbb2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid black;
}
#time-holder {
    font-size: 1.5rem;
}
#timer > div {
    margin: 5px;
}
button {
    padding: 4px;
    margin: 10px;
    width: 70px;
    border-radius: 3px;
    border: 1px solid black;
    border-bottom: 2px solid black;
    color: black;
    background-color: antiquewhite;
    transition: transform 0.7 linear;
}
button:active,
button:hover {
    transform: scale(0.95);
}



/* setting styles */
input {
    padding-left: 25px;
    height: 20px;
    width: 50px;
    margin: 5px;
    border: 1px solid black;
    background-color: whitesmoke;
}
#setting-wrapper {
    display: flex;
}
#setting-wrapper > div {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
#session-wrapper label,
#session-wrapper input {
    display: block;
    margin: 0.25rem auto;
    text-align: center;
    width: 270px;
}
#reset {
    width: 270px;
    height: 40px;
}
</style>