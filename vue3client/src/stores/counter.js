//import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    increment() {
      this.count++
    },
    async randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})