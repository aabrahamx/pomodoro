<script setup>
  import { defineProps } from "vue";

  const props = defineProps({
    session: String,
  });
</script>

<template>
  <div class="wrapper-session">
    <span v-if="props.session === 'default'">Ready to work?</span>
    <span v-else-if="props.session === 'finished'">Yay! Way to go! 👏🏼</span>
    <span v-else-if="props.session === 'work'">Work ⏰</span>
    <span v-else-if="props.session === 'short'">Short Break 🧘🏽‍♂️</span>
    <span v-else-if="props.session === 'long'">Long Break 🏖</span>
  </div>
</template>

<style scoped>
  .wrapper-session {
    width: 100%;
    height: 32.5px;
    padding: 5px 3px;
    border-radius: 0.25rem;
    text-align: center;
    font-size: .75em;
    color: rgb(229, 229, 229, .75);
    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(229, 229, 229, 0.25);
  }
</style>
