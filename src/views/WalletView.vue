<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import ViewWalletHeader from '@/components/ViewWalletHeader.vue';
import PaymentMethodsList from '@/components/PaymentMethodsList.vue';
import TransactionHistory from '@/components/TransactionHistory.vue';
import { ref } from 'vue';
import { useUserInfo } from '@/stores/userInfo'; const userInfoState = useUserInfo()

// Sample data - replace with actual API calls
const paymentMethods = ref([
  {
    id: 1,
    type: 'mastercard',
    lastFour: '1579',
    holderName: userInfoState.fullname,
    expiryDate: '12/22',
    gradient: 'from-red-500 via-orange-400 to-purple-300'
  },
  {
    id: 2,
    type: 'visa',
    lastFour: '1576',
    holderName: userInfoState.fullname,
    expiryDate: '12/22',
    gradient: 'from-blue-500 to-purple-300'
  }
]);

const transactions = ref([
  {
    id: '92287157',
    date: 'April 19 2020 12:31',
    amount: -14.00,
    type: 'purchase'
  },
  {
    id: '92287157',
    date: 'April 19 2020 12:31',
    amount: -37.00,
    type: 'purchase'
  },
  {
    id: '92287157',
    date: 'April 19 2020 12:31',
    amount: -21.00,
    type: 'purchase'
  },
  {
    id: '92287157',
    date: 'April 19 2020 12:31',
    amount: -75.00,
    type: 'purchase'
  },
  {
    id: '92287157',
    date: 'April 19 2020 12:31',
    amount: -214.00,
    type: 'purchase'
  },
  {
    id: '92287157',
    date: 'April 19 2020 12:31',
    amount: -53.00,
    type: 'purchase'
  },
    {
    id: '92287157',
    date: 'April 19 2020 12:31',
    amount: -214.00,
    type: 'purchase'
  },  {
    id: '92287157',
    date: 'April 19 2020 12:31',
    amount: -214.00,
    type: 'purchase'
  }
]);

// Event handlers
const handleAddCard = () => {
  // Add new card functionality
  console.log('Add new card clicked');
};
</script>

<template>
  <div class="relative top-0 left-0 w-full h-full">
    <!-- Header Component -->
    <ViewWalletHeader />

    <!-- Main Content Container -->
    <main class="px-4 pb-20">
      <!-- Payment Methods Section -->
      <PaymentMethodsList
        :payment-methods="paymentMethods"
        @add-card="handleAddCard"
      />

      <!-- Transaction History Section -->
      <TransactionHistory :transactions="transactions" />
    </main>

    <!-- Navigation Bar -->
    <NavigationBar />
  </div>
</template>
