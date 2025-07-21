import { defineStore } from "pinia";

export const useOrder = defineStore("order", {
  state: () => {
    return {
      fullname: '',
      phone: '',
      address: [],
      defaultAddress: {
        id: 0,
        addressLine: '',
        city: '',
        country: ''
      },
      defaultAddressID: 0,
      orderitems:[],
      discount: 0.15
    }
  },

  getters: {
    discountPercent: (state) => state.discount * 100,
    itemsTotal: (state) => state.orderitems.reduce((total, item) => total + item.subTotalPrice, 0),
    discountPrice: (state) => (state.itemsTotal * state.discount).toFixed(2),
    totalPrice: (state) => (state.itemsTotal - state.discountPrice).toFixed(2)
  },

  actions: {

  }
})
