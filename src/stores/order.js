import { defineStore } from "pinia";

export const useOrder = defineStore("order", {
  state: () => {
    return {
      orderCode:'',
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
      discount: 0.15,
      totalPrice: 0,
      isPreparing: true,
      isOrderProcessing: false
    }
  },

  getters: {
    discountPercent: (state) => state.discount * 100,
    itemsTotal: (state) => state.orderitems.reduce((total, item) => total + item.subTotalPrice, 0),
    discountPrice: (state) => (state.itemsTotal * state.discount).toFixed(2),
    totalAmount: (state) => (state.itemsTotal - state.discountPrice).toFixed(2)
  },

  actions: {

  }
})
