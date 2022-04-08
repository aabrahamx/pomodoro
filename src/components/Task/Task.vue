<script setup>

</script>

<template>
    <div class="wrapper">
        <input 
            type="text" 
            placeholder="what are you working on?"
        />
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
}
.wrapper > input {
    width: 100%;
    border: none;
    background-color: rgba(0, 0, 0, .2);
    padding: 5px 3px;
}
::placeholder {
    color: #edf5e1;
    text-align: center;
}
</style>