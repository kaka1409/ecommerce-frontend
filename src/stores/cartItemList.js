import { defineStore } from "pinia";

export const useCartItemList = defineStore("cartItemList", {
  state: () => {
    return {
      cartItems: [],
      selectedItems: [],
      itemsToRemove: [],
      subTotalPrice: 0,
      totalPrice: 0,
      isLoading: true
    }
  },

  getters: {
    totalCartItems: (state) => state.cartItems.length
  },

  actions: {

  }
})
