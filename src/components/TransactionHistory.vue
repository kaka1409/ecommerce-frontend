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
  <section>
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
