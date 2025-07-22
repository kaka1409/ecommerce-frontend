import { defineStore } from "pinia";

export const useUserInfo = defineStore("userInfo", {
  state: () => {
    return {
      username: '',
      email: '',
      fullname: '',
      phone: '',
      address: '',
      role: ''
    }
  },

  getters: {

  },

  actions: {
    
  }
})
