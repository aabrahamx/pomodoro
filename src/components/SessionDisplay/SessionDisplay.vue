<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    session: String
});

</script>

<template>
    <div class="wrapper">
        <span v-if="props.session === 'default'">Ready to work?</span>
        <span v-else-if="props.session === 'finished'">Yay! Way to go! 👏🏼</span>
        <span v-else-if="props.session === 'work'">Work ⏰</span>
        <span v-else-if="props.session === 'short'">Short Break 🧘🏽‍♂️</span>
        <span v-else-if="props.session === 'long'">Long Break 🏖</span>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    padding: 5px 3px;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>