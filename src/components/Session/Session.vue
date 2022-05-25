<script setup>
  const props = defineProps({
    session: String,
  });
</script>

<template>
  <div
    class="flex items-center w-full h-20 p-1.5 font-bold text-white shadow-xl shadow-black/50 border border-black/10 rounded-full"
  >
    <div
      class="flex items-center justify-center w-1/3 h-full transition duration-300 rounded-l-full bg-slate-900"
      :class="props.session === 'work' ? 'bg-emerald-500' : null"
    >
      <p class="text-xs font-bold select-none">Focus ⏰</p>
    </div>
    <div class="h-2/3 w-0.5 rounded-full mx-2 bg-white/60"></div>
    <div
      class="flex items-center justify-center w-1/3 h-full transition duration-300 rounded"
      :class="props.session === 'short' ? 'bg-emerald-500' : null"
    >
      <p class="text-xs font-bold select-none">Short Break 🧘🏼‍♂️</p>
    </div>
    <div class="h-2/3 w-0.5 rounded-full mx-2 bg-white/50"></div>
    <div
      class="flex items-center justify-center w-1/3 h-full transition duration-300 rounded-r-full bg-slate-900"
      :class="props.session === 'long' ? 'bg-emerald-500' : null"
    >
      <p class="text-xs font-bold select-none">Long Break 🏖</p>
    </div>
  </div>
</template>
