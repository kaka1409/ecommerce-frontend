<script setup>
  import BackArrowIcon from "@/assets/icons/BackArrowIcon.vue";
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  };
</script>

<template>
  <header
    class=" w-full h-15 flex items-center justify-betweens px-[19px]"
  >
    <button @click="goBack">
      <BackArrowIcon />
    </button>
    <div class="flex-1 flex items-center justify-center gap-2">
      <h1 class="text-[24px] font-semibold text-gray-900">Payment</h1>
    </div>
  </header>
</template>

