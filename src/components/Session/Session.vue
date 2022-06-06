<script setup>
  import { toRefs } from 'vue';

  const props = defineProps({
    currentSession: {
      type: String,
      required: true
    },
  });

  const { currentSession } = toRefs(props);
</script>

<template>
  <div
    class="flex items-center w-full h-20 p-0.5 font-bold text-white shadow-xl shadow-black/50 border border-black/10 rounded-full"
  >
    <div
      class="flex items-center justify-center w-1/3 h-full transition duration-300 rounded-l-full"
      :class="currentSession === 'focus' ? 'bg-emerald-500' : 'bg-slate-900'"
    >
      <p class="text-xs font-bold select-none">Focus ⏰</p>
    </div>
    <div class="h-1/3 w-0.5 rounded-full mx-2 bg-white/50"></div>
    <div
      class="flex items-center justify-center w-1/3 h-full transition duration-300"
      :class="currentSession === 'short' ? 'bg-emerald-500' : 'bg-slate-900'"
    >
      <p class="text-xs font-bold select-none">Short Break 🧘🏼‍♂️</p>
    </div>
    <div class="h-1/3 w-0.5 rounded-full mx-2 bg-white/50"></div>
    <div
      class="flex items-center justify-center w-1/3 h-full transition duration-300 rounded-r-full"
      :class="currentSession === 'long' ? 'bg-emerald-500' : 'bg-slate-900'"
    >
      <p class="text-xs font-bold select-none">Long Break 🏖</p>
    </div>
  </div>
</template>
