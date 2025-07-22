<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import ViewWalletHeader from '@/components/ViewWalletHeader.vue';
import { ref } from 'vue';

// Sample data - replace with actual API calls
const paymentMethods = ref([
  {
    id: 1,
    type: 'mastercard',
    lastFour: '1579',
    holderName: 'AMANDA MORGAN',
    expiryDate: '12/22',
    gradient: 'from-red-500 via-orange-400 to-purple-300'
  },
  {
    id: 2,
    type: 'visa',
    lastFour: '1576',
    holderName: 'AMANDA MORGAN',
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
  }
]);

// Helper functions for template
const formatAmount = (amount) => {
  return Math.abs(amount).toFixed(2);
};

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
      <section class="mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>

        <!-- Cards Container -->
        <div class="overflow-x-auto scrollbar-hide">
          <div class="flex space-x-4 pb-2">
            <!-- Credit Card -->
            <article
              v-for="card in paymentMethods"
              :key="card.id"
              class="relative flex-shrink-0 w-[280px] h-[155px] rounded-xl overflow-hidden shadow-md"
            >
              <!-- Card Background -->
              <div :class="`w-full h-full bg-gradient-to-r ${card.gradient} p-4 text-white relative`">
                <!-- Settings Icon -->
                <div class="absolute top-4 right-4">
                  <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#0055ff"
                      stroke="#0055ff"
                    >
                      <path
                        d="M262.29,192.31a64,64,0,1,0,57.4,57.4A64.13,64.13,0,0,0,262.29,192.31ZM416.39,256a154.34,154.34,0,0,1-1.53,20.79l45.21,35.46A10.81,10.81,0,0,1,462.52,326l-42.77,74a10.81,10.81,0,0,1-13.14,4.59l-44.9-18.08a16.11,16.11,0,0,0-15.17,1.75A164.48,164.48,0,0,1,325,400.8a15.94,15.94,0,0,0-8.82,12.14l-6.73,47.89A11.08,11.08,0,0,1,298.77,470H213.23a11.11,11.11,0,0,1-10.69-8.87l-6.72-47.82a16.07,16.07,0,0,0-9-12.22,155.3,155.3,0,0,1-21.46-12.57,16,16,0,0,0-15.11-1.71l-44.89,18.07a10.81,10.81,0,0,1-13.14-4.58l-42.77-74a10.8,10.8,0,0,1,2.45-13.75l38.21-30a16.05,16.05,0,0,0,6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16,16,0,0,0-6.07-13.94l-38.19-30A10.81,10.81,0,0,1,49.48,186l42.77-74a10.81,10.81,0,0,1,13.14-4.59l44.9,18.08a16.11,16.11,0,0,0,15.17-1.75A164.48,164.48,0,0,1,187,111.2a15.94,15.94,0,0,0,8.82-12.14l6.73-47.89A11.08,11.08,0,0,1,213.23,42h85.54a11.11,11.11,0,0,1,10.69,8.87l6.72,47.82a16.07,16.07,0,0,0,9,12.22,155.3,155.3,0,0,1,21.46,12.57,16,16,0,0,0,15.11,1.71l44.89-18.07a10.81,10.81,0,0,1,13.14,4.58l42.77,74a10.8,10.8,0,0,1-2.45,13.75l-38.21,30a16.05,16.05,0,0,0-6.05,14.08C416.17,247.67,416.39,251.83,416.39,256Z"
                        style="fill:none;stroke:#0055ff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Card Brand Logo -->
                <div class="absolute top-4 left-4">
                  <div v-if="card.type === 'mastercard'" class="flex space-x-1">
                    <div class="w-6 h-6 bg-red-500 rounded-full"></div>
                    <div class="w-6 h-6 bg-orange-400 rounded-full -ml-3"></div>
                  </div>
                  <div v-else-if="card.type === 'visa'" class="text-xl font-bold">
                    VISA
                  </div>
                </div>

                <!-- Card Number Display -->
                <div class="absolute bottom-12 left-4">
                  <div class="flex space-x-2 text-lg font-mono">
                    <span>••••</span>
                    <span>••••</span>
                    <span>••••</span>
                    <span>{{ card.lastFour }}</span>
                  </div>
                </div>

                <!-- Card Holder Information -->
                <div class="absolute bottom-4 left-4 flex justify-between w-full pr-8">
                  <div>
                    <p class="text-sm font-medium">{{ card.holderName }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm">{{ card.expiryDate }}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Add New Card Button -->
        <button
          @click="handleAddCard"
          class="w-full h-[45px] bg-green-400 rounded-xl flex items-center justify-center text-white font-semibold text-lg hover:bg-green-500 transition-colors mt-4 mb-8"
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

      <!-- Transaction History Section -->
      <section>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Transaction</h2>

        <div class="bg-white rounded-xl shadow-sm p-4">
          <div class="space-y-4">
            <!-- Transaction Item -->
            <article
              v-for="transaction in transactions"
              :key="`${transaction.id}-${transaction.date}`"
              class="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
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
          </div>
        </div>
      </section>
    </main>

    <!-- Navigation Bar -->
    <NavigationBar />
  </div>
</template>
