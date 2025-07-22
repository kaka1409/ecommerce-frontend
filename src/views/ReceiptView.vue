<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-[#07f7b6] to-[#4affd4] flex items-center justify-center px-4 font-poppins">
    <div>
    <div class="relative bg-white w-[300px] h-[400px] rounded-t-xl pt-14 pb-6 px-6 text-gray-800">
      <!-- Check icon -->
      <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md">
        <div class="w-10 h-10 rounded-full bg-[#07f7b6] flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h2 class="text-center text-lg font-bold mb-4">Payment Success!</h2>

      <!-- Dotted Divider -->
      <div class="my-4 border-white border-t-gray-300 border-dashed border-2 my-8"></div>

      <!-- Info Section -->
      <div class="space-y-3 text-sm font-medium">
        <div class="flex justify-between">
          <span class="text-gray-400">References Number</span>
          <span>1234567891234</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-400">Date</span>
          <span>Jul 21, 2025</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-400">Time</span>
          <span>04:38 PM</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-400">Payment Method</span>
          <span>Credit card</span>
        </div>
      </div>

      <!-- Dotted Divider -->
      <div class="my-4 border-white border-t-gray-300 border-dashed border-2 my-8"></div>

      <!-- Amount -->
      <div class="flex justify-between text-sm font-medium">
        <span class="text-gray-400">Amount</span>
        <span class="text-[#111827] font-semibold">999,999,999.00 VND</span>
      </div>
    </div>
      <!-- Receipt Tear Effect -->
      <div class="mt-[-10px] flex gap-[14px] left-2 right-2 absolute align-center justify-center">
        <template v-for="i in 1" :key="i">
          <div class="w-5.5 h-5.5 rounded-full  bg-[#35fbc6]"></div>
          <div class="w-5.5 h-5.5 rounded-full  bg-[#37fbc7]"></div>
          <div class="w-5.5 h-5.5 rounded-full  bg-[#3afcc9]"></div>
          <div class="w-5.5 h-5.5 rounded-full  bg-[#3cfcca]"></div>
          <div class="w-5.5 h-5.5 rounded-full  bg-[#3efccb]"></div>
          <div class="w-5.5 h-5.5 rounded-full  bg-[#40fdcd]"></div>
          <div class="w-5.5 h-5.5 rounded-full  bg-[#42fdce]"></div>
          <div class="w-5.5 h-5.5 rounded-full  bg-[#45fed0]"></div>

        </template>
      </div>
  </div>
    <!-- Close Button -->
    <button class="absolute top-4 left-4 rounded-full p-1 border-solid border-1 border-white/80" @click="$emit('close')">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "ReceiptView",
};
</script>

<style scoped>
</style>
