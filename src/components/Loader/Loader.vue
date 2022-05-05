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
    border: 1px solid #14213d;
}
.wrapper > div {
    background-color: rgb(20, 33, 61, .55);
    height: 100%;
    width: 100%;
}
</style>