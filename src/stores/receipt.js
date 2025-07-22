import { defineStore } from "pinia";
import {formatDate} from '@/utils/format.js'
import {formatTime} from '@/utils/format.js'
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
