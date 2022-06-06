<script setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useStore } from '@/app/store';

  import settingIcon from '@/assets/icons/glyph-settings-90.png';
  import closeIcon from '@/assets/icons/glyph-cancel-90.png';

  const store = useStore();
  const { focus, short, long, sessions } = storeToRefs(store);

  const showSetting = ref(false);
</script>

<template>
  <div class="flex items-center justify-center">
    <button @click="showSetting = !showSetting">
      <img
        :src="settingIcon"
        alt="setting icon"
        class="h-6 pointer-events-none"
      />
    </button>

    <div
      v-if="showSetting"
      @click.self="showSetting = !showSetting"
      class="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen backdrop-blur bg-black/50"
    >
      <form class="relative rounded shadow-lg form bg-slate-900 bottom-10">
        <button @click="showSetting = !showSetting">
          <img
            :src="closeIcon"
            alt="close icon"
            class="h-6 pointer-events-none"
          />
        </button>
        <h2 class="mb-8 font-semibold text-center text-white">App Settings</h2>
        <section>
          <label for="session-number" class="flex flex-col items-center">
            <span class="text-base label-title">Number of Sessions</span>
            <span class="text-sm text-center input-value">{{ sessions }}</span>
          </label>
          <input
            v-model.number="sessions"
            type="range"
            id="session-number"
            min="1"
            max="10"
            step="1"
            class="accent-emerald-500"
          />
        </section>
        <section>
          <label for="work-session" class="flex flex-col items-center">
            <span class="text-base label-title">Focus Session</span>
            <span class="text-sm text-center input-value"
              >{{ focus }} minutes</span
            >
          </label>
          <input
            v-model.number="focus"
            type="range"
            min="5"
            max="120"
            step="5"
            id="work-session"
            class="accent-emerald-500"
          />
        </section>
        <section>
          <label for="short-break" class="flex flex-col items-center">
            <span class="text-base label-title">Short Break</span>
            <span class="text-sm text-center input-value"
              >{{ short }} minutes</span
            >
          </label>
          <input
            v-model.number="short"
            type="range"
            min="5"
            max="30"
            step="5"
            id="short-break"
            class="accent-emerald-500"
          />
        </section>
        <section>
          <label for="long-break" class="flex flex-col items-center">
            <span class="text-base label-title">Long Break</span>
            <span class="text-sm text-center input-value"
              >{{ long }} minutes</span
            >
          </label>
          <input
            v-model.number="long"
            type="range"
            min="15"
            max="120"
            step="15"
            id="long-break"
            class="accent-emerald-500"
          />
        </section>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .form {
    width: 95%;
    max-width: 25rem;
    padding: 2rem;
    color: white;
  }

  .form > section {
    width: 15rem;
    padding: 0.5rem 0 0.75rem 0;
    margin: 0 auto 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 4px solid transparent;
    border-left: 5px solid rgba(255, 255, 255, 0.85);
    background: rgba(0, 0, 0, 0.1);
  }
</style>
