import { defineStore } from 'pinia'

// first argument is a unique id of the store across application
export const useTimer = defineStore('timer', {
  state: () => {
      return {
          workSession: 25,
          shortBreak: 5,
          longBreak: 30,
          sessionAmount: 4
      }
  }
});
// need to migrate the rest of global state here