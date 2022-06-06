import { defineStore } from 'pinia'

// defineStore() first argument is a
// unique id of the store across application
export const useStore = defineStore('timer', {
  state: () => {
      return {
          focus: 25,
          short: 5,
          long: 30,
          sessions: 4
      }
  }
});