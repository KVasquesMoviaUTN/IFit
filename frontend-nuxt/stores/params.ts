import { defineStore } from 'pinia'

export const useParamsStore = defineStore('params', {
  state: () => ({
    sharedString: ''
  }),
  actions: {
    updateString(newString: string) {
      this.sharedString = newString
    }
  }
})
