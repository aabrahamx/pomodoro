<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    session: String
});

let expression;
switch(props.session) {
    case 'finished':
        expression = 'yay! way to go! 👏🏼';
        break;
    case 'work':
        expression = 'work ⏰';
        break;
    case 'short':
        expression = 'short break 🧘🏽‍♂️';
        break;
    case 'long':
        expression = 'long break 🏖'
        break;
    default: 
        expression = 'ready to work?'
}
</script>

<template>
    <div class="wrapper">
        <span>{{ expression }}</span>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    padding: 5px 3px;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>