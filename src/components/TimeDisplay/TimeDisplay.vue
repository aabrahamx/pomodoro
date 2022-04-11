<script setup>
import { defineProps } from "vue";

const props = defineProps({
    timer: String,
    currentSession: Number,
    numberOfSessions: Number,
});
</script>

<template>
    <div class="wrapper-timer">
        <div class="container-timer">
            <div class="timer">
                <span>{{ props.timer }}</span>
            </div>
            <div>
                <span>{{ props.currentSession }} / {{ props.numberOfSessions }}</span>
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

.timer {
    font-size: 1.5rem;
}
</style>
