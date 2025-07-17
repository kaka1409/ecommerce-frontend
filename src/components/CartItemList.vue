<script setup>
  import CartItem from './CartItem.vue';

  import { reactive, onMounted, defineEmits, defineProps, watch } from 'vue';
  import axios from 'axios';
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/css/index.css';
  import { useToast } from 'vue-toastification'; const toast = useToast()

  const props = defineProps({
    isRemovingItems: {
      type: Boolean,
      default: false
    }
  })

  const state = reactive({
    cartItems: [],
    selectedItems: [],
    isRemovingItems: props.isRemovingItems,
    itemsToRemove: [],
    isLoading: true
  })

  const emits = defineEmits([
    'items-loaded',
    'selectedItem-changed',
    'selectedItemList-changed'
  ])

  const getCartItems = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await axios.get('http://26.16.186.88/api/v1/cart', {
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

  const itemRemoved = (items) => {
    state.cartItems = items
    state.selectedItems = state.cartItems
  }

  onMounted (() => {
    getCartItems()
    emits('items-loaded', state.selectedItems)
  })

  const seletedItemChanged = (item) => {

    if (!item.selected) {
      // Remove the selected item
      state.selectedItems = state.selectedItems.filter(productItem => {
        return productItem.id !== item.productId
      })
    } else {
      // Add the selected item
      const seletedItem = state.cartItems.find(productItem => {
        return productItem.id === item.productId
      })

      state.selectedItems.push(seletedItem)
    }

    emits('selectedItem-changed', state.selectedItems)
  }

  // watch change for isRemovingItems
  watch(() => props.isRemovingItems, (newVal, oldVal) => {
    state.isRemovingItems = newVal;
    state.itemsToRemove = [];
  });

  const selectItemsToRemove = (item) => {
    let itemsToRemove = state.itemsToRemove

    if (item.isSelected) {
      // Add product to remove list
      itemsToRemove.push(item.productId)
    } else {
      // Remove product from remove list
      const indexToRemove = itemsToRemove.indexOf(item.productId)
      itemsToRemove.splice(indexToRemove, 1)
    }

    emits('selectedItemList-changed', itemsToRemove)
  }

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
      :initialSelected="false"
      :isRemovingItems="state.isRemovingItems"
      :is-selected-to-remove="false"
      @selection-changed="seletedItemChanged"
      @remove="itemRemoved"
      @selected-to-remove="selectItemsToRemove"
    />
  </section>
</template>
