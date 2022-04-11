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
    margin-left: .5rem;
}
.wrapper-task > input {
    width: 100%;
    border: none;
    color: #edf5e1;
    background-color: rgba(0, 0, 0, .2);
    font-weight: bold;
    font-size: .9rem;
    padding: 7px 3px;
    text-align: center;
}
.task-input::placeholder {
    color: #edf5e1;
    text-align: center;
}
.task-input:focus {
    outline: none;
}
</style>