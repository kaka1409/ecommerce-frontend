<script setup>
  import BackArrowIcon from "@/assets/icons/BackArrowIcon.vue";
  import { defineProps } from "vue";
  import { useRouter } from 'vue-router';

  const props = defineProps({
    totalItems: {
      type: Number,
      default: 0
    }
  })
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
</script>

<template>
  <header
    class="bg-white shadow-md w-full h-15 flex items-center justify-betweens px-[19px] font-semibold"
  >

    <button @click="goBack">
      <BackArrowIcon />
    </button>
    <div class="flex-1 flex items-center justify-center gap-2">
      <h1 class="text-[24px]">Final Order</h1>
      <span class="text-[14px] mt-[2px]">( {{ props.totalItems >= 2 ? props.totalItems + " items" : props.totalItems + " item" }} )</span>
    </div>
  </header>
</template>

