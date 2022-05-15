<script setup>
import Card from "@/components/Card/Card.vue"

const props = defineProps({
  session: String,
});
</script>

<template>
  <Card width="100%">
    <span v-if="props.session === 'default'">Ready to Start...</span>
    <span v-else-if="props.session === 'finished'">Yay! Way to go! 👏🏼</span>
    <span v-else-if="props.session === 'work'">Work ⏰</span>
    <span v-else-if="props.session === 'short'">Short Break 🧘🏽‍♂️</span>
    <span v-else-if="props.session === 'long'">Long Break 🏖</span>
  </Card>
</template>

<style scoped>

</style>
