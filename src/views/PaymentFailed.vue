<script setup>
  import { XCircleIcon } from '@heroicons/vue/24/solid';

</script>

<template>
  <div class="w-full h-full p-4 flex flex-col items-center justify-center gap-4 bg-red-400 text-white font-poppins">
    <XCircleIcon class="w-40 h-40" />

    <span class="text-2xl font-bold">
      Payment Failed
    </span>

    <span class="text-center font-semibold text-sm">
      Error processing your payment, <br>
      You can try again or back to shopping
    </span>

    <div class="flex flex-col items-center gap-4 w-full mt-10">
      <RouterLink to="/payment" class="px-4 py-4 bg-white w-full text-center text-lg text-red-400 font-bold rounded-2xl">
        Try again
      </RouterLink>

      <RouterLink to="/home" class="px-4 py-3 bg-red-400 border-4 border-white w-full text-center text-lg text-white font-bold rounded-2xl">
        Back to home
      </RouterLink>
    </div>
  </div>
</template>
