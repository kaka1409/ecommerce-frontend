<script setup>
  import BigCheckMark from '@/assets/icons/BigCheckMark.vue';

</script>

<template>
  <div class="w-full h-full p-4 flex flex-col items-center justify-center gap-4 bg-[#07f7b6] text-white font-poppins">
    <BigCheckMark />

    <span class="text-2xl font-bold">
      Payment Successful
    </span>

    <span class="text-center font-semibold text-sm">
      Your order has been successfully paid, <br>
      You will receive a confirmation email shortly
    </span>

    <div class="flex flex-col items-center gap-4 w-full mt-10">
      <RouterLink to="/home" class="px-4 py-4 bg-white w-full text-center text-lg text-[#07f7b6] font-bold rounded-2xl">
        Continue Shopping
      </RouterLink>

      <RouterLink to="/wallet" class="px-4 py-3 bg-[#07f7b6] border-4 border-white w-full text-center text-lg text-white font-bold rounded-2xl">
        View your receipt
      </RouterLink>
    </div>
  </div>
</template>
