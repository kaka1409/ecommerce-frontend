<template>
  <component :is="iconComponent" />
</template>

<script setup>
import { defineAsyncComponent, computed } from 'vue'

const props = defineProps({ name: String })
const iconComponent = computed(() =>
  defineAsyncComponent(() => import(`@/assets/icons/${props.name}.vue`))
)
</script>
