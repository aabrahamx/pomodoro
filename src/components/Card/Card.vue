<script setup>

const props = defineProps({
  width: {
    type: String,
    required: true
  },
  marginRight: {
    type: String,
    default: 0,
  },
  marginLeft: {
    type: String,
    default: 0,
  }
});

const style = {
  width: props.width,
  marginLeft: props.marginLeft,
  marginRight: props.marginRight,
};

</script>

<template>
  <div class="card" :style="style">
    <slot />
  </div>
</template>

<style scoped>
.card {
  height: 35px;
  font-size: .9em;
  text-align: center;
  color: var(--text-sec-color);
  background: var(--layer-sec-bg);

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>