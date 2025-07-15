<script setup>
  import VoucherIcon from '@/assets/icons/VoucherIcon.vue';

  import { defineProps, ref, defineEmits } from 'vue';

  const props = defineProps({
    initialSelected: {
      type: Boolean,
      default: true,
    },
    totalItemsSelected: {
      type: Number,
      default: 0
    },
    subTotalPrice: {
      type: Number,
      default: 0
    }
  })


  const emit = defineEmits([
    'selection-changed',
  ])

  const isSelected = ref(props.initialSelected)

  const onSelectionChange = () => {
    emit('selection-changed', {
      productId: props.product.id,
      selected: isSelected.value,
    })
  }

  const formatSubTotal = (total) => {
    return Math.ceil(total).toFixed(2)
  }


</script>

<template>
  <div class="bg-white shadow-sm pb-5">
    <!-- Voucher -->
    <div
      class="flex items-center justify-between border-b border-gray-200 rounded-lg px-1 py-3 mb-4"
    >
      <div class="flex items-center gap-2 text-gray-800 font-poppins">
        <div class="w-[29px] h-[29px]">
          <VoucherIcon />
        </div>
        <span class="text-[13px] font-poppin">CheapDeal Voucher</span>
      </div>
      <div class="flex items-center gap-2 w-[151px] h-[45px] border-2 border-green-400 rounded">
        <button
          placeholder="Select or input code"
          class="text-center text-[13px] text-[#797979] py-1 ml-[10px]"
        >
          Select or input code
        </button>
        <div class=""><img src="../../images/view_cart/u2328.svg" alt="" /></div>
      </div>
    </div>

    <div class="pl-[12px] pr-[12px]">
      <!-- Subtotal -->
      <div class="flex justify-between items-center mb-1">
        <span class="text-sm text-gray-700 font-medium font-poppins">
          Subtotal ({{ props.totalItemsSelected >= 2 ? props.totalItemsSelected + " items" : props.totalItemsSelected + " item" }}) :
        </span>
        <span class="text-sm font-semibold text-gray-800 font-poppins">$ {{ formatSubTotal(props.subTotalPrice) }}</span>
      </div>

      <!-- Total -->
      <div class="flex justify-between items-center mb-3 mt-3">
        <div class="text-lg font-bold font-poppins">Total:</div>
        <div class="text-right flex items-center gap-3">
          <div class="text-xs text-gray-400 font-poppins">
            <span class="line-through">($42,00)</span>
            <span> 15% discount</span>
          </div>

          <div class="text-2xl font-bold text-gray-800 font-poppins">$35,70</div>
        </div>
      </div>
    </div>

    <!-- Select All + Checkout -->
    <div class="flex items-center justify-between border-t border-gray-200 pt-4">
      <div class="relative flex items-center ml-3 mr-3">
        <input
          type="checkbox"
          v-model="isSelected"
          class="opacity-0 absolute w-5 h-5 p-0.5 rounded cursor-pointer"
          @change="onSelectionChange"
        />
        <div
          :class="[
            'w-6 h-6 border-2 rounded flex items-center justify-center transition-all duration-200 ease-in-out',
            isSelected ? 'bg-[#07f7b6] border-[#07f7b6]' : 'border-gray-200'
          ]"
        >
          <svg v-if="isSelected" class="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>
      <button
        class="bg-[#06deaa] hover:bg-green-500 transition-colors text-white px-4 py-2 rounded-lg text-sm font-semibold font-poppins"
      >
        Checkout ({{ props.totalItemsSelected }})
      </button>
    </div>
  </div>
</template>

