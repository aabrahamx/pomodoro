<script setup>
import Card from '@/components/Card/Card.vue'
</script>

<template>
    <Card width="100%" margin-left="1rem">
        <input class="task-input" type="text" placeholder="what are you working on?" />
    </Card>
</template>

<style scoped>
input {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    text-align: inherit;
    color: var(--text-sec-color);
    transition: box-shadow 0.3s linear;
}

input::placeholder {
    color: var(--text-sec-color);
}

input:focus {
    outline: none;
    box-shadow: 0px 2px 0px 0px var(--text-sec-color);
}
</style>