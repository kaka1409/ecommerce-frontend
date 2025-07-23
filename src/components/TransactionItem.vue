<script setup>
defineProps({
  transaction: {
    type: Object,
    required: true
  }
})

// Helper functions for template
const formatAmount = (amount) => {
  return Math.abs(amount).toFixed(2);
};
</script>

<template>
  <article class="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <!-- Transaction Icon and Details -->
    <div class="flex items-center space-x-3">
      <div :class="transaction.status === 'failed' ?
      'w-10 h-10 bg-red-100 rounded-full flex items-center justify-center' :
      'w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'">
        <!-- Success Icon - Check Mark -->
        <svg v-if="transaction.status !== 'failed'" class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <!-- Fail Icon - X Mark -->
        <svg v-if="transaction.status === 'failed'" class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </div>

      <div>
        <h3 class="font-medium text-gray-900">
          Order #{{ transaction.id }}
        </h3>
        <p class="text-sm text-gray-500">
          {{ transaction.date }}
        </p>
      </div>
    </div>

    <!-- Transaction Amount -->
    <div class="text-right">
      <p :class="transaction.status === 'failed' ? 'font-semibold text-red-500' : 'font-semibold text-black-500'">
        ${{ formatAmount(transaction.amount) }}
      </p>
    </div>
  </article>
</template>
