<script setup>
  import CartItemList from '@/components/CartItemList.vue';
  import ViewCartHeader from "@/components/ViewCartHeader.vue";
  import ViewCartCheckout from "@/components/ViewCartCheckout.vue";

  const checkout = () => {
    alert('Proceeding to checkout...')
  }

</script>


<template>
  <div class="relative h-screen flex flex-col">
    <div class="absolute inset-0 w-[375px] h-[1218px] m-auto opacity-[0.08] bg-[#797979] pointer-events-none z-[1]"></div>
    <div class="relative flex flex-col h-screen justify-between z-[2]">
      <ViewCartHeader />

      <CartItemList/>
      <div class="bg-white sticky bottom-0">
        <ViewCartCheckout />
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
