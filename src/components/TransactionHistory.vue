<script setup>
  import TransactionItem from './TransactionItem.vue';
  import { useTransactionHistory } from '@/stores/transactionHistory';

  const transactionHistoryState = useTransactionHistory();

</script>

<template>
  <section>
    <div
      class="bg-white rounded-xl shadow-sm max-h-84 overflow-y-auto"
      @scroll="transactionHistoryState.handleScroll"
    >
      <div class="space-y-4">
        <!-- Transaction Item -->
        <TransactionItem
          v-for="transaction in transactionHistoryState.transactions"
          :key="`${transaction.id}-${transaction.date}`"
          :transaction="transaction"
        />
      </div>
    </div>
  </section>
</template>
