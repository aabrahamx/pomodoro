<script setup>
import { defineProps } from "vue";

const props = defineProps({
    timer: String,
    currentSession: Number,
    numberOfSessions: Number,
    running: String
});
</script>

<template>
    <div class="wrapper-timer">
        <div class="container-timer">
            <div>
                <span class="time-holder">{{ props.timer }}</span>
            </div>
            <div>
                <span class="session-holder">{{ props.currentSession }} / {{ props.numberOfSessions }}</span>
            </div>
        </div>
        <div class="container-animation" :class="{animate: props.running}">
            <div class="top">
                <div class="pointer"></div>
            </div>
            <div class="center">
                <div class="left">
                    <div class="pointer"></div>
                </div>
                <div class="right">
                    <div class="pointer"></div>
                </div>
            </div>
            <div class="bottom">
                <div class="pointer"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper-timer {
    width: 240px;
    height: 240px;
    color: #edf5e1;
}

.container-timer {
    position: fixed;
    width: 240px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 50%;
}

.container-timer>div {
    margin: .15rem auto;
}

.time-holder {
    font-size: 1.85rem;
    font-weight: bold;
}


.container-animation {
    width: 240px;
    height: 240px;
    position: fixed;
    z-index: 10;
    border-radius: 50%;
    transform: rotate(45deg);
    overflow: hidden;
    padding: 1rem;
}
.container-animation.animate {
    animation: rotate .5s linear forwards;
}
@keyframes rotate {
    0% {
        transform: rotate(45deg);
    }
    99% {
        transform: rotate(405deg);
    }
    100% {
        opacity: 0;
    }
}
.container-animation > div {
    height: 33.33%;
}
.center {
    display: flex;
}
.center > div {
    width: 50%;
    height: 100%;
}

.pointer {
    background: #5cdb95;
    border-radius: 10px;
}
.top > .pointer,
.bottom > .pointer {
    height: 20px;
    width: 6px;
}
.left > .pointer,
.right > .pointer {
    width: 20px;
    height: 6px;
}

.top, .left, .right, .bottom {
    display: flex;
}
.left, .right {align-items: center;}
.top, .bottom {justify-content: center;}
.left {justify-content: flex-start;}
.right {justify-content: flex-end;}
.top {align-items: flex-start;}
.bottom {align-items: flex-end;}


</style>
