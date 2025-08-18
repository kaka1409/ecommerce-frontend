import { defineStore } from "pinia";
import {formatDate, formatTime} from '@/utils/date.js'

export const useReceipt = defineStore("receipt", {
  state: () => {
    return {
      "receiptId": "",
      "status": "",
      "visaCheckRef": "",
      "paymentDate": "",
      "finalPrice": 0,

    }
  },

  getters: {
    time: (state) => {
      return formatTime(state.paymentDate);
    },
    date: (state) => {
      return formatDate(state.paymentDate);
    }
  },

  actions: {

  }
})
