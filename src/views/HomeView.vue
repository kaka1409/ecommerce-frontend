<script setup>
  // Components
  import NavigationBar from '@/components/NavigationBar.vue';
  import ProductList from '@/components/ProductList.vue';

</script>

<template>

  <div class="relative top-0 left-0 w-full h-full">

    <div class="flex items-center justify-between  ư-full p-4">
      <span class="inline block font-black text-2xl">
        LOGO
      </span>

      <!-- Search -->
      <input
        class="inline-block p-2 pl-4 w-60 bg-[#f8f8f8] rounded-full font-poppins text-md text-gray-900 focus:outline-none "
        type="text"
        placeholder="Search products ..."
      >
    </div>

    <ProductList />

    <NavigationBar />
  </div>

</template>
