<script setup>
import TransactionItem from './TransactionItem.vue';

defineProps({
  transactions: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="mb-0">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Transaction</h2>

    <div class="bg-white rounded-xl shadow-sm p-4 max-h-84 overflow-y-auto">
      <div class="space-y-4">
        <!-- Transaction Item -->
        <TransactionItem
          v-for="transaction in transactions"
          :key="`${transaction.id}-${transaction.date}`"
          :transaction="transaction"
        />
      </div>
    </div>
  </section>
</template>
