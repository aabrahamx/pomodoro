import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useTimer = defineStore('timer', {
  state: () => {
      return {
          workSession: 25,
          shortBreak: 5,
          longBreak: 30,
          sessionAmount: 4
      }
  }
})