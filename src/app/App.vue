<script setup>
import Timer from '../components/Timer/Timer.vue'
import Header from '../components/Header/Header.vue';

const windowHeight = window.innerHeight;
document.documentElement.style
    .setProperty('--window-height', `${windowHeight}px`);

</script>

<template>
    <div class="wrapper">
        <Header />
        <hr class="line-break"/>
        <Timer />
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Major+Mono+Display&family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap");
:root {
    --window-height: '';
}
#app {
    background-color: #5cdb95;
    height: var(--window-height);
    width: 100vw;
    margin: 0;
    padding: 0;
    font-family: "Outfit", sans-serif;
    font-weight: 700;

}
.wrapper {
    margin: auto;
    width: 100%;
    max-width: 25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.line-break {
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, .9);
    border: none;
}
</style>