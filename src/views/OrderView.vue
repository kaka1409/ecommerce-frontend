<script setup>
  import BackArrowIcon from '@/assets/icons/BackArrowIcon.vue';
  import LocationIcon from '@/assets/icons/LocationIcon.vue';
  import PlaceholderImage from '@/assets/images/productPlaceholderThumbnail.png';

  import axios from 'axios';
  import hostURL from '@/configs/env';
  import { onMounted } from 'vue';
  import { RouterLink, useRouter } from 'vue-router'; const router = useRouter()
  import { useToast } from 'vue-toastification'; const toast = useToast()
  import { useCartItemList } from '@/stores/cartItemList'; const cartItemListState = useCartItemList()
  import { useOrder } from '@/stores/order'; const orderState = useOrder()
  import { useUserInfo } from '@/stores/userInfo'; const userInfoState = useUserInfo()

  // State
  orderState.orderitems = cartItemListState.selectedItems

  const accessToken = localStorage.getItem('accessToken')

  const getDefaultAddress = async () => {
    try {
      if (accessToken) {
        const response = await axios.get(`${hostURL}/api/v1/address/default`, {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        })

        const data = response.data

        if (data.status === 200 && data.data) {
          orderState.defaultAddress = data.data
        } else {
          console.error("Error getting address")
        }
      } else {
        toast.error("You are not logged in")
        console.error("You are not logged in")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.error(error)
    }
  }

  const placeOrder =  async () => {
    try {
      const addressID = orderState.defaultAddress.id
      const items = orderState.orderitems.map(item => {
        return {
          "cartItemId": item.id,
          "productId": item.productId,
          "quantity": item.quantity
        }
      })

      if (accessToken) {
        const response = await axios.post(`${hostURL}/api/v1/orders`,
          {
            "addressId": addressID,
            "discountPercent": 0.15,
            "items": items
          },
          {
            headers: {
              "Accept": "*/*",
              "Authorization": `Bearer ${accessToken}`,
            },
          }
        )

        const responseBody = response.data


        if (responseBody.status === 200) {
          toast.success(responseBody.message)
          console.log(responseBody.data)
          router.push(`/payment`)
        } else {
          toast.error(responseBody.message)
          console.error(responseBody.message)
        }
      } else {
        toast.error("You are not logged in")
        console.error("You are not logged in")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.error(error)
    }
  }

  onMounted(() => {
    getDefaultAddress()
  })

</script>

<template>
  <div class="max-w-sm mx-auto bg-white h-full overflow-y-scroll">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <RouterLink class="p-1" to="/cart">
        <BackArrowIcon />
      </RouterLink>
      <h1 class="text-lg font-semibold text-gray-900">Final Order</h1>
      <div class="flex space-x-1">
        <div class="w-4 h-2 bg-white rounded-sm"></div>
        <div class="w-4 h-2 bg-white rounded-sm"></div>
        <div class="w-4 h-2 bg-white rounded-sm"></div>
      </div>
    </div>

    <!-- Delivery Address -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center gap-2">
        <LocationIcon />
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900">{{ userInfoState.fullname }}</h3>
          <p class="text-sm text-gray-500">{{ userInfoState.phone }}</p>
          <p class="text-sm text-gray-500">{{ orderState.defaultAddress.addressLine }}</p>
          <p class="text-sm text-gray-500">{{ orderState.defaultAddress.city }}, {{ orderState.defaultAddress.country }}</p>
        </div>
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>

    <!-- Order Items -->
    <div class="p-2 space-y-4">

      <div
        class="flex items-center space-x-3 font-poppins p-4 w-full  shadow-[#06deaa] shadow-sm rounded-lg"
        v-for="item in orderState.orderitems"
        :key="item.id"
      >
        <img :src="item.assetUrl ? item.assetUrl : PlaceholderImage" alt="iPhone" class="w-15 h-15 rounded-lg bg-gray-100">
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
            <span class="text-sm text-gray-500">x {{ item.quantity }}</span>
          </div>
          <div class="flex items-center justify-between">
            <p class="text-md ">$ {{ item.price }}</p>
            <span class="text-md italic">{{ item.subTotalPrice }} <span class="text-sm">$</span> </span>
          </div>
        </div>
      </div>

      <!-- See more -->
      <div class="text-center">
        <button class="text-gray-500 text-sm flex items-center mx-auto">
          See more
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

    </div>

    <!-- CheapDeal Voucher -->
    <div class="px-4 py-2">
      <div class="flex items-center justify-between bg-gray-50 rounded-lg p-3">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <span class="font-medium text-gray-900">CheapDeal Voucher</span>
        </div>
        <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Payment Method -->
    <!-- <div class="p-4 border-t border-gray-200">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-medium text-gray-900">Payment method</h3>
        <button class="text-sm text-gray-500 flex items-center">
          See more
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-12 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
            <span class="text-white font-bold text-sm">VISA</span>
          </div>
          <div>
            <span class="font-medium">•••• •••• •••• 2341</span>
            <p class="text-xs text-gray-500">expires: 05/27</p>
          </div>
        </div>
        <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div> -->

    <!-- Payment Details -->
    <div class="p-4 border-t border-gray-200">
      <h3 class="font-medium text-gray-900 mb-3">Payment Details</h3>

      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">Item Total:</span>
          <span class="text-gray-900">${{ orderState.itemsTotal }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Discount:</span>
          <span class="text-gray-900">-${{ orderState.discountPrice }}</span>
        </div>
        <div class="border-t pt-2 mt-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Total Payable:</span>
            <span class="text-gray-900">${{ orderState.totalPrice }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Order Section -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div class="max-w-sm mx-auto flex items-center justify-between">
        <div class="text-center">
          <div class="text-xl font-bold text-gray-900">Total: ${{ orderState.totalPrice }}</div>
          <div class="text-sm text-gray-500">(${{ orderState.itemsTotal }}) {{orderState.discountPercent}}% discount</div>
        </div>
        <button
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg"
          @click="placeOrder"
        >
          Place order
        </button>
      </div>
    </div>

    <!-- Add padding bottom to account for fixed footer -->
    <div class="pb-24"></div>
  </div>
</template>
