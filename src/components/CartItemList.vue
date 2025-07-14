<script setup>
  import CartItem from './CartItem.vue';

  import { reactive, onMounted, defineEmits } from 'vue';
  import axios from 'axios';
  import { useToast } from 'vue-toastification'; const toast = useToast()

  const state = reactive({
    cartItems: [],
    selectedItems: [],
    isLoading: true
  })

  const emits = defineEmits([
    'items-loaded',
    'selectedItem-changed'
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
        state.selectedItems = data

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

  onMounted (() => {
    getCartItems()
    emits('items-loaded', state.cartItems)
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
</script>

<template>
  <section class="overflow-y-auto flex-1">
    <CartItem
      v-for="cartItem in state.cartItems"
      :key="cartItem.id"
      :product="cartItem"
      :initialQuantity="cartItem.quantity"
      :initialSelected="true"
      @selection-changed="seletedItemChanged"
    />
  </section>
</template>
