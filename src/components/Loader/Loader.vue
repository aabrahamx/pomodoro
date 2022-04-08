<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    height: Number,
});
</script>

<template>
    <div class="wrapper">
        <div :style="{ height: props.height + '%' }"></div>
    </div>
</template>

<style scoped>
.wrapper {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    position: fixed;
    display: flex;
    justify-content: flex-end;
    overflow: hidden;
    border: 1px solid #05386b;
}
.wrapper > div {
    background-color: #05386b;
    height: 100%;
    width: 100%;
}
</style>