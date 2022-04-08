<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        timer: String,
        currentSession: Number,
        numberOfSessions: Number,
    });
</script>

<template>
    <div class="wrapper">
        <div id="timer">
            <div id="time-holder">
                <span>{{ props.timer }}</span>
            </div>

            <div>
                <span>{{ props.currentSession }} / {{ props.numberOfSessions }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    width: 240px;
    height: 240px;
}

.wrapper > div {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
}
#timer {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
#time-holder {
    font-size: 1.5rem;
}
#timer > div {
    margin: 5px;
}
</style>