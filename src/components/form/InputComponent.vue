<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <div>
    <input
      :class="`w-full
        h-15 p-2 pl-4 bg-[#f0f0f0] rounded-full
        font-poppins text-lg text-gray-900
        focus:outline-none ${props.class}`"
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
      autocomplete="off"
    >
  </div>
</template>
