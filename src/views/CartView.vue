<script setup>
  import CartItemList from '@/components/CartItemList.vue';
  import ViewCartHeader from "@/components/ViewCartHeader.vue";
  import ViewCartCheckout from "@/components/ViewCartCheckout.vue";

  import { ref } from 'vue';

  const checkout = () => {
    alert('Proceeding to checkout...')
  }

  const totalItems = ref(0)
  const totalItemsSelected = ref(0)
  const totalPrice = ref(0)

  const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => {
      return acc + item.price
    }, 0)
  }

  const updateTotalItems = (items) => {
    totalItems.value = items.length
  }

  const updateTotalItemsSelected = (items) => {
    totalItemsSelected.value = items.length
  }


</script>


<template>
  <div class="relative h-screen flex flex-col">
    <div class="absolute inset-0 w-[375px] h-[1218px] m-auto opacity-[0.08] bg-[#797979] pointer-events-none z-[1]"></div>
    <div class="relative flex flex-col h-screen justify-between z-[2]">
      <ViewCartHeader
        :totalItems="totalItems"
      />

      <CartItemList
        @items-loaded="updateTotalItems"
        @selectedItem-changed="updateTotalItemsSelected"
      />
      <div class="bg-white sticky bottom-0">
        <ViewCartCheckout
          :totalItemsSelected="totalItemsSelected"
        />
      </div>
    </div>

    <section class="border-t border-[#ccc] pt-5 text-center">
      <button
        class="bg-[#007bff] hover:bg-[#0056b3] text-white px-5 py-2.5 border-none cursor-pointer font-semibold rounded"
        @click="checkout"
      >Checkout</button>
    </section>
  </div>
</template>
