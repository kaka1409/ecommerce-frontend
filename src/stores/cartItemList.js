import { defineStore } from "pinia";

export const useCartItemList = defineStore("cartItemList", {
  state: () => {
    return {
      cartItems: [],
      selectedItems: [],
      itemsToRemove: [],
      isLoading: true
    }
  },

  getters: {
  },

  actions: {
    setSelectedItem(selectedItems) {
      this.selectedItems = selectedItems
    }
  }
})
