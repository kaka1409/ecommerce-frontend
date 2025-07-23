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
      <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <div class="w-6 h-6 bg-green-400 rounded-sm"></div>
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
      <p class="font-semibold text-black-500">
        ${{ formatAmount(transaction.amount) }}
      </p>
    </div>
  </article>
</template>
