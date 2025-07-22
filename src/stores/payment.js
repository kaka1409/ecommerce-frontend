import { defineStore } from "pinia";

export const usePayment = defineStore("payment", {
  state: () => {
    return {
      visaCheckRef: '',
      isProcessing: false
    }
  },

  getters: {

  },

  actions: {

  }
})
