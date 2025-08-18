<script setup>
  import NavigationBar from '@/components/NavigationBar.vue';
  import ViewWalletHeader from '@/components/ViewWalletHeader.vue';
  import PaymentMethodsList from '@/components/PaymentMethodsList.vue';
  import TransactionHistory from '@/components/TransactionHistory.vue';

  import { onMounted, computed } from 'vue';
  import { useUserInfo } from '@/stores/userInfo';
  import { useTransactionHistory } from '@/stores/transactionHistory';
  import hostURL from '@/configs/env.js';
  import axios from 'axios';

  const userInfoState = useUserInfo()
  const transactionHistoryState = useTransactionHistory()

  // Computed property for card holder name that updates when userInfo changes
  const cardHolderName = computed(() => {
    const name = userInfoState.fullname || 'NAME NOT AVAILABLE';
    return formatCardHolderName(name);
  });

  // Helper function to format date


  // Helper function to sanitize and format card holder name
  const formatCardHolderName = (name) => {
    if (!name) return '';

    // Vietnamese character mapping to basic Latin
    const vietnameseMap = {
      'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a',
      'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a',
      'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
      'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e',
      'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
      'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
      'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o',
      'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o',
      'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
      'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u',
      'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
      'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
      'đ': 'd',
      // Uppercase variants
      'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A',
      'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A',
      'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
      'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E',
      'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
      'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
      'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O',
      'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O',
      'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
      'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U',
      'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
      'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
      'Đ': 'D'
    };

    // Convert Vietnamese characters to basic Latin
    let converted = name;
    for (const [vietnamese, latin] of Object.entries(vietnameseMap)) {
      converted = converted.replace(new RegExp(vietnamese, 'g'), latin);
    }

    // Keep only letters and spaces, remove other special characters
    const sanitized = converted.replace(/[^a-zA-Z\s]/g, '');

    // Convert to uppercase and trim extra spaces
    return sanitized.toUpperCase().replace(/\s+/g, ' ').trim();
  };

  // Sample data - replace with actual API calls
  const paymentMethods = computed(() => [
    {
      id: 1,
      type: 'mastercard',
      lastFour: '1579',
      holderName: cardHolderName.value,
      expiryDate: '12/30',
      gradient: 'from-red-600 via-orange-400 to-purple-300'
    },
    {
      id: 2,
      type: 'visa',
      lastFour: '1576',
      holderName: cardHolderName.value,
      expiryDate: '8/30',
      gradient: 'from-blue-500 to-purple-300'
    }
  ]);

  // Get current user info from API
  const getCurrentUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const response = await axios.get(`${hostURL}/api/v1/users/current`, {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const responseBody = response.data;

        if (responseBody.status === 200 && responseBody.data) {
          userInfoState.username = responseBody.data.username;
          userInfoState.fullname = responseBody.data.fullName;
          userInfoState.phone = responseBody.data.phoneNumber;
          userInfoState.email = responseBody.data.email;
          userInfoState.address = responseBody.data.address;
        } else {
          console.error("Error getting user info");
        }
      } else {
        console.error("You are not logged in");
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // Fetch transactions from API



  // Load data on component mount
  onMounted(() => {
    getCurrentUserInfo();
    transactionHistoryState.getTransactions();
  });

  // Event handlers
  const handleAddCard = () => {
    // Add new card functionality
    console.log('Add new card clicked');
  };
</script>

<template>
  <div class="relative top-0 left-0 w-full h-full font-poppins">
    <!-- Header Component -->
    <ViewWalletHeader />

    <!-- Main Content Container -->
    <main class="px-4 pb-20">
      <!-- Payment Methods Section -->
      <PaymentMethodsList
        :payment-methods="paymentMethods"
        @add-card="handleAddCard"
      />

      <h2 class="text-lg font-semibold text-gray-900 mb-4">Transactions</h2>

      <!-- Transaction History Section -->
      <div v-if="transactionHistoryState.isLoadingTransactions" class="text-center py-8">
        <p class="text-gray-500">Loading transactions...</p>
      </div>

      <div v-else-if="transactionHistoryState.transactionsError" class="text-center py-8">
        <p class="text-red-500 mb-4">Error loading transactions: {{ transactionHistoryState.transactionsError }}</p>
        <button
          @click="transactionHistoryState.getTransactions()"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>

      <TransactionHistory
        v-else
      />
    </main>

    <!-- Navigation Bar -->
    <NavigationBar />
  </div>
</template>
