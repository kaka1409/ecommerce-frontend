<script setup>
  import CartItemList from '@/components/CartItemList.vue';
  import ViewCartHeader from "@/components/ViewCartHeader.vue";
  import ViewCartCheckout from "@/components/ViewCartCheckout.vue";

  import { useToast } from 'vue-toastification'; const toast = useToast()
  import { ref } from 'vue';
  import axios from 'axios';



  // for checkout
  const totalItems = ref(0)
  const totalItemsSelected = ref(0)
  const subTotalPrice = ref(0)
  const totalPrice = ref(0)
  // const discount = ref(0) // future
  const isSelectedAllItems = ref(false)

  // for removing items
  const isRemovingItems = ref(false)
  const isItemsToRemoveEmpty = ref(true)
  const isAllItemsToRemoveSelected = ref(false)
  const itemsToRemove = ref([])

  const updateItemInfo = (items) => {
    updateCartHeaderTotalItems(items)
  }

  const updateChangedItemInfo = (items) => {
    updateTotalItemsSelected(items)
    calculateSubTotalPrice(items)
    calculateTotalPrice()
  }

  const updateCartHeaderTotalItems = (items) => {
    totalItems.value = items.length
  }

  const updateTotalItemsSelected = (items) => {
    totalItemsSelected.value = items.length
  }

  const calculateSubTotalPrice = (items) => {
    subTotalPrice.value = items.reduce((acc, item) => {
      return acc + item.subTotalPrice
    }, 0)
  }

  const calculateTotalPrice = () => {
    totalPrice.value = subTotalPrice.value

    // Future
    // otalPrice.value = subTotalPrice.value * discount
  }

  // Future
  // const calculateDiscount = () => {}

  const selectAllItems = (selectAllItemsState) => {
    // console.log(selectAllItemsState)

    isSelectedAllItems.value = selectAllItemsState
  }

  const toggleRemoveMode = () => {
    isRemovingItems.value = !isRemovingItems.value
  }

  const handleSelectedItemsToRemoveState = (items) => {
    itemsToRemove.value = items

    isItemsToRemoveEmpty.value = items.length === 0
    isAllItemsToRemoveSelected.value = items.length === totalItems.value
  }

  const selectAllItemsToremove = () => {
    isAllItemsToRemoveSelected.value = true
  }

  const deleleSelectedItems = async () => {
    const itemsToRemoveLength = itemsToRemove.value.length

    let endpoint = 'http://26.16.186.88/api/v1/cart'
    let body = {}

    if (itemsToRemoveLength === 1) {
      // Clear one specific item
      const itemId = itemsToRemove.value[0]

      endpoint = `http://26.16.186.88/api/v1/cart/items/${itemId}`
      body = {}

    } else if (itemsToRemoveLength < totalItems.value){
      // Clear some items

      endpoint = `http://26.16.186.88/api/v1/cart/items`
      body = {
        "cartItemIds": [...itemsToRemove.value]
      }

    } else {
      // clear all
      endpoint = `http://26.16.186.88/api/v1/cart`
      body = {}
    }

    try {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        const response = await axios.delete(endpoint,
          { // CONFIGS
            data: body,
            headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${accessToken}`
            }
          }
        )

        const axiosResponse = await response.data

        if (axiosResponse.status === 200) {
          // Success
          toast.success("Items removed from cart")
          console.log("Your cart items now", axiosResponse.data)
        } else {
          // Error
          toast.error(axiosResponse.message)
          console.log("Error removing items from cart", axiosResponse.message)
        }
      } else {
        // Error
        toast.error("No access token found")
        console.error("No access token found, make sure you have an account and logged in")
      }
    } catch (error) {
      // Error
      toast.error(error.response.data.message)
      console.error(`Error removing ${itemsToRemoveLength} items from cart`, error)
    }
  }


</script>

<template>
  <div class="relative h-screen flex flex-col">
    <div class="absolute inset-0 w-[375px] h-[1218px] m-auto opacity-[0.08] bg-[#797979] pointer-events-none z-[1]"></div>
    <div class="relative flex flex-col h-screen justify-between z-[2]">

      <!-- Header -->
      <ViewCartHeader
        :totalItems="totalItems"
      />

      <!-- Remove Items -->
      <div class="flex items-center justify-between py-2">
        <div
          class="block px-4 py-2"
          v-show="!isRemovingItems"
        >
          <button
            class="float-right text-[#06deaa] font-bold"
            @click="toggleRemoveMode"
          >Select</button>
        </div>

        <div
          v-show="isRemovingItems"
          class="flex items-center justify-between text-md w-full"
        >
          <button
            :class="['text-[#06deaa] px-4 py-1 font-bold',
              isAllItemsToRemoveSelected ? 'opacity-0' : 'opacity-100'
            ]"
            @click="selectAllItemsToremove"
          >Select all</button>

          <button
            class="font-bold px-4 py-2"
            @click="toggleRemoveMode"
          >Cancel</button>

          <button
            :class="['font-bold px-3 py-2 bg-red-500 text-white rounded-md',
              isItemsToRemoveEmpty ? 'opacity-50' : 'opacity-100'
            ]"
            :disabled="isItemsToRemoveEmpty"
            @click="deleleSelectedItems"
          >Delete selected</button>
        </div>
      </div>

      <!-- Cart item list -->
      <CartItemList
        :isRemovingItems="isRemovingItems"
        :isSelectedAllItems="isSelectedAllItems"
        @items-loaded="updateItemInfo"
        @selectedItem-changed="updateChangedItemInfo"
        @selectedItemList-changed="handleSelectedItemsToRemoveState"
      />

      <!-- Cart checkout -->
      <div class="bg-white sticky bottom-0">
        <ViewCartCheckout
          v-show="!isRemovingItems"
          :totalItemsSelected="totalItemsSelected"
          :subTotalPrice="subTotalPrice"
          :totalPrice="totalPrice"
          @selectAllItems="selectAllItems"
        />
      </div>
    </div>

  </div>
</template>

