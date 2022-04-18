<script setup>

</script>

<template>
    <div class="wrapper-task">
        <input 
            class="task-input"
            type="text" 
            placeholder="what are you working on?"
        />
    </div>
</template>

<style scoped>
.wrapper-task {
    width: 100%;
    margin-left: .25rem;
}
.wrapper-task > input {
    width: 100%;
    height: 32.5px;
    border: none;
    color: rgba(0, 0, 0, 0.65);
    background: rgba(0, 0, 0, 0.1);
    font-weight: bold;
    font-size: .9rem;
    padding: 7px 3px;
    text-align: center;
    border-radius: 10px;
    transition: box-shadow 0.3s linear;
}
.task-input::placeholder {
    color: rgba(0, 0, 0, 0.55);
    text-align: center;
}
.task-input:focus {
    outline: none;
    box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, .2)
}
</style>