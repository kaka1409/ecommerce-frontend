<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    productObject: Object
  })

  const limitText = (text, limit) => {
    return text.length >= limit ? text.substr(0, limit) : text
  }
</script>

<template>
  <div>
    <div class="flex items-center justify-center rounded-md shawdow-lg overflow-hidden w-full h-42">
      <img class="w-full" src="https://m.media-amazon.com/images/I/61NfcHUmxBL._AC_SL1000_.jpg" alt="Product_thumbnail">
    </div>

    <div class="font-nunito-sans font-bold text-lg">
      {{ limitText(props.productObject.productName, 18) }}
    </div>

    <div class="font-nunito-sans text-xs my-1 min-h-8">
      {{ limitText(props.productObject.productDescription, 80) }}
    </div>

    <div class="font-raleway-bold font-bold">
      {{ "$" + props.productObject.price }}
    </div>
  </div>
</template>
