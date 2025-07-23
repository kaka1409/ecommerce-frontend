<script setup>
import PaymentMethodCard from './PaymentMethodCard.vue';

defineProps({
  paymentMethods: {
    type: Array,
    required: true
  }
})

defineEmits(['add-card'])
</script>

<template>
  <section class="mb-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>

    <!-- Cards Container -->
    <div class="overflow-x-auto scrollbar-hide">
      <div class="flex space-x-4 pb-2">
        <!-- Credit Card -->
        <PaymentMethodCard
          v-for="card in paymentMethods"
          :key="card.id"
          :card="card"
        />
      </div>
    </div>

    <!-- Add New Card Button -->
    <button
      @click="$emit('add-card')"
      class="w-full h-[45px] bg-[#07f7b6] rounded-xl flex items-center justify-center text-white font-semibold text-lg hover:bg-green-500 transition-colors mt-4 mb-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 45 45"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          fill="#ffffff"
          d="M 41.828125 19.652344 L 25.125 19.652344 L 25.125 2.949219 C 25.125 1.417969 23.871094 0.167969 22.339844 0.167969 C 20.808594 0.167969 19.554688 1.417969 19.554688 2.949219 L 19.554688 19.652344 L 2.851562 19.652344 C 1.320312 19.652344 0.0664062 20.90625 0.0664062 22.4375 C 0.0664062 23.96875 1.320312 25.222656 2.851562 25.222656 L 19.554688 25.222656 L 19.554688 41.925781 C 19.554688 43.457031 20.808594 44.710938 22.339844 44.710938 C 23.871094 44.710938 25.125 43.457031 25.125 41.925781 L 25.125 25.222656 L 41.828125 25.222656 C 43.359375 25.222656 44.613281 23.96875 44.613281 22.4375 C 44.613281 20.90625 43.359375 19.652344 41.828125 19.652344 Z"
        />
      </svg>
    </button>
  </section>
</template>
