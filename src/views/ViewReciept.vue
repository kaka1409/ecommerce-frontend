<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()
const route = useRoute()
const receiptId = route.params.id
import hostURL from '@/configs/env'
import { useReceipt } from '@/stores/receipt'
const receiptState = useReceipt()
const fetchReceipt = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken){
      const response = await axios.get(`${hostURL}/api/v1/receipt/${receiptId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': '*/*'


      }
    })
      const responseBody = response.data
      if (responseBody.status === 200 && responseBody.data) {

        receiptState.finalPrice = responseBody.data.finalPrice
        receiptState.paymentDate = responseBody.data.paymentDate
        receiptState.visaCheckRef = responseBody.data.visaCheckRef
      } else {
        toast.error('No receipt data found')
        console.error('No receipt data found in response')
      }

    } else {
      toast.error('You need to logged in')
      console.error('You need to logged in')
    }

  } catch (err) {
    toast.error(err.response.data.message || 'Failed to fetch receipt')
    console.error('Failed to fetch receipt:', err)
  }
}
onMounted(fetchReceipt)
</script>

<template>
  <div class="min-h-screen bg-[#00FFC4] flex items-center justify-center relative px-4 py-6">
    <!-- Close Button -->
    <div
      class="absolute top-4 left-4 w-12 h-12 border-2 border-white rounded-full flex items-center justify-center cursor-pointer"
      @click="() => router.push('/home')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>

    <!-- Ticket -->
    <div class="bg-white relative rounded-t-2xl shadow-lg px-6 pt-16 pb-8 w-full max-w-xs">
      <!-- Icon -->
      <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-md">
        <div class="w-16 h-16 rounded-full bg-[#00FFC4] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-xl font-bold text-center text-gray-800 mt-4">Payment Success!</h1>

      <!-- Divider with cutout -->
      <div class="relative my-6">
        <div class="border-t border-dashed border-gray-300"></div>
        <div class="absolute -left-8 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#00FFC4] rounded-full"></div>
        <div class="absolute -right-8 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#00FFC4] rounded-full"></div>
      </div>

      <!-- Info -->
      <div class="space-y-4 text-sm text-gray-600">
        <div class="flex justify-between">
          <span>References Number</span>
          <span class="text-black font-sm">{{ receiptState.visaCheckRef }}</span>
        </div>
        <div class="flex justify-between">
          <span>Date</span>
          <span class="text-black font-medium">{{ receiptState.date }}</span>
        </div>
        <div class="flex justify-between">
          <span>Time</span>
          <span class="text-black font-medium">{{ receiptState.time }}</span>
        </div>
        <div class="flex justify-between">
          <span>Payment Method</span>
          <span class="text-black font-medium">Credit card </span>
        </div>
      </div>

      <!-- Bottom Divider -->
      <div class="border-t border-dashed border-gray-300 my-6"></div>

      <!-- Amount -->
      <div class="flex justify-between text-sm text-gray-600 pb-20">
        <span>Amount</span>
        <span class="text-black font-semibold">{{ receiptState.finalPrice }} VND</span>
      </div>

      <!-- Bottom Cutout from below -->
      <div class="absolute bottom-[-10px] left-1/2  transform -translate-x-1/2 flex space-x-2">
        <div class="w-5 h-5 bg-[#00FFC4] rounded-full" v-for="n in 11" :key="n"></div>
      </div>
    </div>
  </div>
</template>
