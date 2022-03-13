
<script setup>
    import Timer from './components/Timer.vue'
</script>

<template> 
    <div class="wrapper">
        <Timer />
    </div>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Major+Mono+Display&family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');
    html, body {
        background-color: #5CDB95;
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        font-family: 'Outfit', sans-serif;
        font-weight: 700;
    }
    #app {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: auto;
    }
</style>