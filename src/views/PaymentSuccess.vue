<script setup>
  import BigCheckMark from '@/assets/icons/BigCheckMark.vue';
  import { useReceipt } from '@/stores/receipt.js';
  import { onMounted } from 'vue';
  import axios from 'axios';
  import hostURL from '@/configs/env';
  import { usePayment } from '@/stores/payment';
  import { useToast } from 'vue-toastification';
  const toast = useToast();
  const paymentState = usePayment();
  const receiptState = useReceipt();
  const createReceipt = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken){
      const response = await axios.post(`${hostURL}/api/v1/receipt`,{
        "visaCheckRef": paymentState.visaCheckRef
      }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': '*/*'


      }
    })
      const responseBody = response.data
      if (responseBody.status === 201 && responseBody.data) {
        receiptState.id = responseBody.data.id
      } else {
        toast.error('No receipt data found')
        console.error('No receipt data found in response')
      }

    } else {
      toast.error('You need to logged in')
      console.error('You need to logged in')
    }

  } catch (err) {
    toast.error(err.response.data.message || 'Failed to fetch receipt')
    console.error('Failed to fetch receipt:', err)
  }
}
onMounted (() => {
  createReceipt();
});

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

      <RouterLink :to="`/ViewReciept/${receiptState.id}`" class="px-4 py-3 bg-[#07f7b6] border-4 border-white w-full text-center text-lg text-white font-bold rounded-2xl">
        View your receipt
      </RouterLink>
    </div>
  </div>
</template>
