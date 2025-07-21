<script setup>
  import CartItem from './CartItem.vue';

  import hostURL from '@/configs/env';
  import axios from 'axios';
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/css/index.css';
  import { reactive, onMounted, defineEmits, defineProps, watch } from 'vue';
  import { useCartItemList } from '@/stores/cartItemList'; const cartItemListState = useCartItemList()
  import { useToast } from 'vue-toastification'; const toast = useToast()

  const props = defineProps({
    isSelectedAllItems: {
      type: Boolean,
      default: false
    },

    isRemovingItems: {
      type: Boolean,
      default: false
    },

    isRemovingAllItems: {
      type: Boolean,
      default: false
    },

    itemsAfterRemoval: {
      type: Array,
      default: () => []
    }

  })

  const state = reactive({
    cartItems: [],
    selectedItems: [],
    isSelectedAllItems: props.isSelectedAllItems,
    isRemovingItems: props.isRemovingItems,
    isRemovingAllItems: props.isRemovingAllItems,
    itemsToRemove: [],
    isLoading: true
  })


  const emits = defineEmits([
    'items-loaded',
    'selectedItem-changed',
    'selectedItemList-changed'
  ])

  const updateQuantity = (items) => {
    state.cartItems = items

    // update quantity in selected items
    state.selectedItems.forEach(selectedItem => {
      state.cartItems.forEach(cartItem => {
        if (cartItem.id === selectedItem.id) {
          selectedItem.quantity = cartItem.quantity
          selectedItem.subTotalPrice = cartItem.subTotalPrice
        }
      })
    })

    emits('selectedItem-changed', state.selectedItems)
  }

  const itemRemoved = (items) => {
    state.cartItems = items.data
    state.selectedItems = state.selectedItems.filter((item) => {
      return item.id !== items.removedID
    })

    emits("selectedItem-changed", state.selectedItems)
  }

  const seletedItemChanged = (item) => {

    if (!item.selected) {
      // Remove the selected item
      state.selectedItems = state.selectedItems.filter(productItem => {
        return productItem.id !== item.productId
      })

      cartItemListState.selectedItems = state.selectedItems
    } else {
      // Add the selected item
      const seletedItem = state.cartItems.find(productItem => {
        return productItem.id === item.productId
      })

      state.selectedItems.push(seletedItem)

      cartItemListState.selectedItems = state.selectedItems
    }

    console.log(cartItemListState.selectedItems)
    emits('selectedItem-changed', state.selectedItems)
  }

  const selectAllItems = () => {
    if (state.isSelectedAllItems) {
      state.selectedItems = state.cartItems
    } else {
      state.selectedItems = []
    }
    emits('selectedItem-changed', state.selectedItems)
  }

  const selectItemsToRemove = (item) => {

    let itemsToRemove = state.itemsToRemove

    if (item.isSelected) {
      // Add product to remove list
      if (!itemsToRemove.includes(item.productId)) {
        itemsToRemove.push(item.productId)
      }
    } else {
      // Remove product from remove list
      const indexToRemove = itemsToRemove.indexOf(item.productId)
      itemsToRemove.splice(indexToRemove, 1)
    }

    emits('selectedItemList-changed', itemsToRemove)
  }

  const getCartItems = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await axios.get(`${hostURL}/api/v1/cart`, {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (res.status === 200) {
        // Success
        const data = res.data.data.cartItems
        state.cartItems = data
        // state.selectedItems = data

        emits('items-loaded', state.cartItems)
      } else {
        // Error
        toast.error(res.data.message)
        console.error('Error when load the cart:', res)
      }
    } catch (err) {
      // Error
      toast.error(err.response.data.message)
      console.error('Error when load the cart:', err)
    } finally {
      state.isLoading = false
    }
  }

  watch(() => props.isSelectedAllItems, (newVal, oldVal) => {
    state.isSelectedAllItems = newVal
    selectAllItems()
  });

  // watch change for isRemovingItems
  watch(() => props.isRemovingItems, (newVal, oldVal) => {
    state.isRemovingItems = newVal;
    state.itemsToRemove = [];
  });

  // watch change for removing all items
  watch(() => props.isRemovingAllItems, (newVal, oldVal) => {
    state.isRemovingAllItems = newVal
  });

  watch(() => props.itemsAfterRemoval, (newVal) => {
    if (newVal && Array.isArray(newVal)) {
      state.cartItems = newVal
    }
  })

  onMounted (() => {
    getCartItems()
    emits('items-loaded', state.selectedItems)
  })



</script>

<template>
  <section class="overflow-y-auto flex-1">
    <Loading
      :active="state.isLoading"
      loader="dots"
      color="#07f7b6"
    />

    <div
      class="w-full mt-8 flex flex-col items-center justify-center gap-2"
      v-if="state.cartItems.length === 0"
    >
      <span class="w-full text-center text-gray-500 font-poppins font-bold text-lg">
        Your cart is empty, let's add some products
      </span>
      <RouterLink
        class="px-4 py-2 bg-[#07f7b6] text-sm text-white font-bold rounded-md"
        to="/home"
      >Browse products</RouterLink>
    </div>

    <CartItem
      v-else
      v-for="cartItem in state.cartItems"
      :key="cartItem.id"
      :product="cartItem"
      :initialQuantity="cartItem.quantity"
      :inStockQuantity="cartItem.inStockQuantity"
      :isSelected="state.isSelectedAllItems"
      :isRemovingItems="state.isRemovingItems"
      :isSelectedToRemove="false"
      :isInRemoveAll="state.isRemovingAllItems"
      @quantity-changed="updateQuantity"
      @selection-changed="seletedItemChanged"
      @remove="itemRemoved"
      @selected-to-remove="selectItemsToRemove"
    />
  </section>
</template>
