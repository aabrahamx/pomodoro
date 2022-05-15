<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia';
import { useStore } from "../../app/store";

import Card from "../Card/Card.vue";

const store = useStore();
const { workSession, shortBreak, longBreak, sessionAmount } = storeToRefs(store);

const showSetting = ref(false);
</script>

<template>
    <Card width="fit-content">
        <button class="btn" @click="showSetting = !showSetting">
            <img class="icon"
                src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/ffffff/external-setting-essentials-pack-tanah-basah-glyph-tanah-basah.png" />
        </button>

        <div v-if="showSetting" @click.self="showSetting = !showSetting" class="setting-container">
            <form class="form">
                <button class="btn" @click="showSetting = !showSetting">
                    <img class="icon" src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png" />
                </button>
                <section id="session-wrapper">
                    <label for="session-number">
                        <span class="label-title">Number of Sessions</span>
                        <br>
                        <span class="input-value">{{ sessionAmount }}</span>
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
    </Card>
</template>

<style scoped>
.btn {
    width: 37.5px;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
.icon {
    width: 1.1rem;
    opacity: .7;
}

.setting-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 15;
}

.form {
    width: 100%;
    max-width: 20rem;
    height: 75%;
    padding: 1rem;
    border-radius: .5rem;
    backdrop-filter: blur(100px);
    background: var(--background-main);
    border: 1px solid var(--border-sec-color);
}

.form>section {
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
    font-weight: bolder;
    color: rgb(255, 255, 255, .9);
}

.input-value {
    font-size: .85rem;
    color: rgb(255, 255, 255, .5);
    margin-top: 1rem;
}
</style>
