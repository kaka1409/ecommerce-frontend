<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    productObject: Object
  })

  const limitText = (text, limit) => {
    return text.length >= limit ? text.substr(0, limit) : text
  }

  const getThumbnail = () => {
    return props.productObject.assets[0] ? props.productObject.assets[0].url : ""
  }


</script>

<template>
  <div class="shadow-md rounded-lg p-4 border-1 border-[#eee]">
    <div class="flex items-center justify-center rounded-md shawdow-lg overflow-hidden w-full h-42">
      <img class="w-full" :src="getThumbnail()" alt="Product_thumbnail">
    </div>

    <div class="font-nunito-sans font-bold text-lg line-clamp-1">
      {{ limitText(props.productObject.productName, 15) }}
    </div>

    <div class="font-nunito-sans text-xs my-1 min-h-8 line-clamp-2">
      {{ limitText(props.productObject.productDescription, 80) }}
    </div>

    <div class="flex items-center justify-between">
      <div class="font-raleway-bold font-bold">
        {{ "$" + props.productObject.price }}
      </div>
      <button class="flex items-center justify-center w-5 h-5 bg-[#07f7b6] rounded-sm text-white font-black">
        +
      </button>
    </div>

  </div>
</template>
