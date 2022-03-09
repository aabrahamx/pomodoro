
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
                    <span>{{timer.currentRunningSession}}</span>
                </div>
                <div id="time-holder">
                    <span> {{ timer.minute }} : {{ timer.second }} </span>
                </div>
                <div id="icon-wrapper">
                    <div id="start">
                        <button @click="timeCounter"> Start </button>
                    </div>
                    <div id="pause" style="display: none;">
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
        <button id="reset" @click="reset">Reset</button>
    </div>
    <audio id="audio" >
        <source src="../assets/audio/positive-notification.mp3" type="audio/mp3" >
    </audio>
</template>


<script setup>

import { reactive } from 'vue'

const timer = reactive({
    minute: '00',
    second: '00',

    currentRunningSession: '',
    currentSession: 0,
    numberOfSessions: 4,
    sessionOver: false,

    focusTime: .10,
    shortBreak: .15,
    longBreak: .30,

    focusTimeTurn: true,
    shortBreakTurn: false,
    longBreakTurn: false,

    isPaused: false,
    pausedRemainingTime: null

})

function changeMinuteToSecond(minute) {
    return minute * 60
}

function displayTime(timeInSeconds) {
    const minute = Math.floor(timeInSeconds / 60);
    const second = Math.floor(timeInSeconds % 60);
    if (minute < 10) {
        timer.minute = '0' + minute;
    } else {
        timer.minute = minute;
    }
    if (second < 10) {
        timer.second = '0' + second;
    } else {
        timer.second = second;
    }
}

function setTurn(data) {
    //checks if number current session is in it's last turn
    //current session increments on every work session
    const difference = timer.numberOfSessions - timer.currentSession;
    if (difference > 0) {
        //sets values between work and short break
        if (data === timer.focusTime) {
            timer.focusTimeTurn = false;
            timer.shortBreakTurn = true;
        } else if (data === timer.shortBreak) {
            timer.shortBreakTurn = false;
            timer.focusTimeTurn = true;
        }
        //sets long break for the final
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
        timer.currentRunningSession = 'Work Session 🎯';
        return timer.focusTime;

    } else if (timer.shortBreakTurn === true) {

        console.log('short')
        setTurn(timer.shortBreak);
        timer.currentRunningSession = 'Short Break 🧘'
        return timer.shortBreak;

    } else if (timer.longBreakTurn === true) {
        console.log('long')
        timer.sessionOver = true;
        timer.currentRunningSession = 'Long Break 🏖️'
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
        timer.currentRunningSession = 'Done! Great Job! 🎉'
        const playIcon = document.getElementById('start');
        const pauseIcon = document.getElementById('pause');
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

function timeCounter() {

    const playIcon = document.getElementById('start');
    const pauseIcon = document.getElementById('pause');
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';

    let time

    //the first condition is to play from a paused state
    if (timer.pausedRemainingTime > 0) {

        time = timer.pausedRemainingTime;
        timer.isPaused = false;
        timer.pausedRemainingTime = null;
        //the second contition here is start from blank to continue to other sessions
    } else {
        console.log('function')
        time = changeMinuteToSecond(whichSessionToRun());
    console.log(time + 'time')
    }
    const timerId = setInterval(() => {
        if (timer.isPaused === true) {

            timer.pausedRemainingTime = time;
            console.log(`Paused time: ${timer.pausedRemainingTime}`)

            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';

            stopTimer(timerId);

        } else if (time === 0) {

            stopTimer(timerId)
            timerExecutor()
            const notify = document.getElementById('audio');
            notify.play();

        } else {
            time--
        }

        displayTime(time);

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