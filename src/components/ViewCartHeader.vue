<script setup>
  import BackArrowIcon from "@/assets/icons/BackArrowIcon.vue";
  import { defineProps } from "vue";

  const props = defineProps({
    totalItems: {
      type: Number,
      default: 0
    }
  })

</script>

<template>
  <header
    class=" w-full h-[89px] flex items-center justify-betweens px-[19px]"
  >
    <div class="absolute top-6 left-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10 w-5 h-5 text-black">
      <RouterLink to="/home">
        <BackArrowIcon />
      </RouterLink>
    </div>
    <div class="flex-1 flex items-center justify-center gap-2">
      <h1 class="text-[24px]">Cart</h1>
      <span class="text-[14px] mt-[2px]">( {{ props.totalItems >= 2 ? props.totalItems + " items" : props.totalItems + " item" }} )</span>
    </div>
  </header>
</template>

