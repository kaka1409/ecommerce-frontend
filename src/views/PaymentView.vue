<script setup>
  import ViewPaymentHeader from '@/components/ViewPaymentHeader.vue'

  // Packages
  import  axios  from 'axios'
  import hostURL from '@/configs/env'
  import { computed } from 'vue'
  import { useToast } from 'vue-toastification'
  import { useRouter } from 'vue-router'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/css/index.css'

  // Stores
  import { useOrder } from '@/stores/order'
  import { useUserInfo } from '@/stores/userInfo'
  import { usePayment } from '@/stores/payment'

  const router = useRouter()
  const orderState = useOrder()
  const userInfoState = useUserInfo()
  const toast = useToast()
  const paymentState = usePayment()

  // Calculate final total including shipping
  const finalTotal = computed(() => {
    return (parseFloat(orderState.totalPrice)).toFixed(2)
  })

  const accessToken = localStorage.getItem('accessToken')

  const processPayment = async () => {
    try {
      const visaCheckRef = paymentState.visaCheckRef

      if (accessToken) {
        const response = await axios.post(`${hostURL}/api/v1/payments/process`,
          {
            "visaCheckReference": visaCheckRef,
          },
          {
            headers: {
              "Accept": "*/*",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
          }
        )

        const responseBody = response.data

        if (responseBody.status === 200) {
          // Success
          toast.success(responseBody.message)
          console.log(responseBody.data)
          router.push(`/payment/success`)

        } else {
          // Error
          toast.error(responseBody.message)
          console.error(responseBody.message)
          paymentState.validateMessage = responseBody.message
          router.push(`/payment/failed`)
        }
      } else {
        toast.error("You are not logged in")
        console.error("You are not logged in")
      }

    } catch (error) {
      // Error

      if (error.response) {
        toast.error(error.response.data.message)
        paymentState.validateMessage = error.response.data.message
      } else {
        toast.error(error.message)
        paymentState.validateMessage = error.message
      }
      router.push(`/payment/failed`)

    } finally {
      paymentState.isProcessing = false
    }
  }

  const makePayment = async () => {
    paymentState.isProcessing = true

    try {
      const orderCode = orderState.orderCode
      const totalAmount = finalTotal.value

      if (accessToken) {
        const response = await axios.post(`${hostURL}/api/v1/payments`,
          {
            "orderCode": orderCode,
            "totalAmount": totalAmount
          },
          {
            headers: {
              "Accept": "*/*",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
          }
        )

        const responseBody = response.data

        if (responseBody.status === 201) {
          // Success
          // toast.success(responseBody.message)
          paymentState.visaCheckRef = responseBody.data.visaCheckRef
          console.log(responseBody.data)

        } else {
          toast.error(responseBody.message)
          console.error(responseBody.message)
        }
      } else {
        toast.error("You are not logged in")
        console.error("You are not logged in")
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
      console.log(error)
    } finally {
      processPayment()
    }
  }
</script>

<template>
  <div
    v-if="paymentState.isProcessing"
    class="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center flex-col justify-center bg-white"
  >
    <span
      class="text-[#07f7b6] font-bold text-xl text-center"
    >
      Processing payment, please wait...
    </span>
    <div class="h-25 opacity-0">_</div>
    <Loading
      :active="paymentState.isProcessing"
      loader="bars"
      color="#07f7b6"
    />
  </div>

  <div class="max-w-sm mx-auto bg-gray-100 h-full overflow-y-scroll font-poppins">
    <!-- Header -->
    <ViewPaymentHeader/>

    <!-- Content with proper spacing -->
    <div class="px-4 py-6">
      <div class="space-y-4">
      <!-- Delivery Address -->
      <div class="bg-white rounded-xl shadow px-5 py-5">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Delivery Address</h2>
        <div class="border-t pt-2 flex justify-between font-semibold"></div>
        <div class="text-sm text-gray-600 space-y-1 mb-2">
          <div class="flex justify-between">
            <span>{{ userInfoState.fullname || 'Name not available' }}</span>
          </div>
          <p class="text-xs text-gray-500">{{ userInfoState.phone || 'Phone not available' }}</p>
          <p class="text-sm text-gray-500">{{ orderState.defaultAddress.addressLine || 'Address not available' }}</p>
          <p class="text-sm text-gray-500">{{ orderState.defaultAddress.city }}, {{ orderState.defaultAddress.country }}</p>
        </div>
      </div>

      <!-- Card: Visa -->
      <div class="bg-white rounded-xl shadow px-5 py-5 relative ">
        <!-- Nội dung thẻ -->
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-2xl font-semibold text-gray-800">Payment Methods</h2>
          <span class="text-xs text-gray-500">see more &gt;</span>
        </div>
        <div class="border-t pt-2 flex justify-between font-semibold"></div>
        <div class="flex items-center justify-between mb-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="VISA" class="h-6" />

        </div>
        <p class="text-gray-500 text-sm mb-1">&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 0817</p>
        <p class="text-gray-400 text-xs">Expiry Date 10/19</p>
      </div>

      <!-- Payment Details -->
      <div class="bg-white rounded-xl  shadow px-5 py-5">
        <h2 class="text-2xl font-semibold  text-gray-800 mb-2">Details</h2>
        <div class="border-t pt-2 flex justify-between font-semibold"></div>
        <div class="text-sm text-gray-600 space-y-1 mb-2">
          <div class="flex justify-between">
            <span>Item Total</span>
            <span>${{ orderState.itemsTotal }}</span>
          </div>
          <div class="flex justify-between">
            <span>Discount</span>
            <span>-${{ orderState.discountPrice }}</span>
          </div>
        </div>
        <div class=" text-1xl border-t pt-2 pb-6 flex justify-between font-semibold">
          <span>Total</span>
          <span class="text-[#07f7b6]">${{ finalTotal }}</span>
        </div>
      </div>
    </div>

    <!-- Confirm Payment Button -->
    <div class="mt-9">
      <button
        @click="makePayment"
        class="w-full bg-[#07f7b6] text-white font-semibold py-3 rounded-full text-center shadow-md"
        :disabled="paymentState.isProcessing"
      >
        PAY NOW
      </button>
    </div>
    </div> <!-- Content div -->
  </div> <!-- Main container -->
</template>
