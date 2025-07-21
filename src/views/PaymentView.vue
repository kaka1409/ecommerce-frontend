<script setup>
  import { computed } from 'vue'
  import { useOrder } from '@/stores/order'
  import { useUserInfo } from '@/stores/userInfo'
  import ViewPaymentHeader from '@/components/ViewPaymentHeader.vue'

  const orderState = useOrder()
  const userInfoState = useUserInfo()

  const shippingFee = 2

  // Calculate final total including shipping
  const finalTotal = computed(() => {
    return (parseFloat(orderState.totalPrice) + shippingFee).toFixed(2)
  })

  const processPayment = () => {
    // Handle payment processing logic here
    console.log('Processing payment for total:', finalTotal.value)
    // You can add API call here to process the payment
  }
</script>

<template>
  <div class="max-w-sm mx-auto bg-[#F2F6FF] h-full overflow-y-scroll font-poppins">
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
            <span>Shipping Fee</span>
            <span>${{ shippingFee }}</span>
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
      <button @click="processPayment" class="w-full bg-[#07f7b6] text-white font-semibold py-3 rounded-full text-center shadow-md">
        PAY NOW
      </button>
    </div>
    </div> <!-- Content div -->
  </div> <!-- Main container -->
</template>
