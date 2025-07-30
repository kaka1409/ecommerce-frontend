import { defineStore } from "pinia";

export const useCartItem = defineStore("cartItem", {
  state: () => {
    return {
      quantity: 0,
      isSelected: false,
      variants: ['256 Gb', '512 Gb', '1 Tb'],
      showRemoveButton: false,
      isRemovingItems: false,
      isSelectedToRemove: false
    }
  },

  getters: {
    selectedVariant: (state) => state.variants[0]
  },

  actions: {

  }

})

