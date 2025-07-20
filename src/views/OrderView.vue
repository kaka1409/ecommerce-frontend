<script setup>
  import { useCartItemList } from '@/stores/cartItemList'; const cartItemListState = useCartItemList()


  console.log(cartItemListState.selectedItems)

</script>

<template>
  <div>
    {{ cartItemListState.selectedItems }}
  </div>
</template>
