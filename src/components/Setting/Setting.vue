<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia';
import { useTimer } from "../../app/store";

const store = useTimer();

const { workSession, shortBreak, longBreak, sessionAmount } = storeToRefs(store);
const showSetting = ref(false);
</script>

<template>
    <div class="wrapper">
        <button class="btn-toggle" @click="showSetting = !showSetting">
            <img width="20"
                src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/ffffff/external-setting-essentials-pack-tanah-basah-glyph-tanah-basah.png" />
        </button>

        <div v-if="showSetting" class="wrapper-setting">
            <form class="container-setting">
                <button class="btn-toggle" @click="showSetting = !showSetting">x</button>
                <section id="session-wrapper">
                    <label for="session-number">
                        <span class="label-title">Number of Sessions</span>
                        <br>
                        <span class="input-value">{{ sessionAmount }} minutes</span>
                    </label>
                    <input v-model="sessionAmount" type="range" id="session-number" min="1" max="10" step="1" />
                </section>
                <section>
                    <label for="work-session">
                        <span class="label-title">Work Session</span>
                        <br>
                        <span class="input-value">{{ workSession }} minutes</span>
                    </label>
                    <input v-model="workSession" type="range" min="5" max="120" step="5" id="work-session" />
                </section>
                <section>
                    <label for="short-break">
                        <span class="label-title">Short Break</span>
                        <br>
                        <span class="input-value">{{ shortBreak }} minutes</span>
                    </label>
                    <input v-model="shortBreak" type="range" min="5" max="30" step="5" id="short-break" />
                </section>
                <section>
                    <label for="long-break">
                        <span class="label-title">Long Break</span>
                        <br>
                        <span class="input-value">{{ longBreak }} minutes</span>
                    </label>
                    <input v-model="longBreak" type="range" min="15" max="120" step="15" id="long-break" />
                </section>
            </form>
        </div>
    </div>
</template>

<style scoped>
* {
    outline: 0px solid red;
}
.wrapper {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: flex-start;
}
.btn-toggle {
    border: 0;
    margin: 0;
    padding: 0;
    background-color: inherit;
}
.wrapper-setting {
    position: fixed;
    width: 100vw;
    height: 95vh;
    left: 0;
    top: 5vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    z-index: 12;
}
.container-setting {
    box-sizing: border-box;
    width: 100%;
    max-width: 25rem;
    height: 85%;
    padding: 1rem;
    background-color: #5cdb95;
    border: 1px solid black;
}
.container-setting > section {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
label {
    text-align: center;
}
.label-title {
    font-weight: bolder
}
.input-value {
    font-size: .85rem;
    margin-top: 1rem;
}
</style>
