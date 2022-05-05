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
    color: rgb(229, 229, 229, .75);
    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(229, 229, 229, 0.25);
    font-size: .75em;
    padding: 7px 3px;
    text-align: center;
    border-radius: .25rem;
    transition: box-shadow 0.3s linear;
}
.task-input::placeholder {
    color: rgb(229, 229, 229, .75);
    text-align: center;
}
.task-input:focus {
    outline: 1px solid rgba(229, 229, 229, 0.5);
}
</style>