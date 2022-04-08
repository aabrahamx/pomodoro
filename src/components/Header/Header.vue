<script setup>

</script>

<template>
    <div class="wrapper">
        <span>Pomodoro Timer</span>
        <button>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/do-not-disturb-2.png"/>
            <img hidden src="https://img.icons8.com/ios-filled/50/ffffff/sun--v1.png"/>
        </button>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
}
.wrapper > button {
    margin: 0;
    padding: 0;
    background-color: rgba(0, 0, 0, .2);
    border: none;
    border-radius: 40%;
    height: 1.5rem;
    width: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.wrapper > button > img {
    height: 50%;
    width: 50%;
}
</style>