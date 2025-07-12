<template>
  <div class="bg-white shadow-sm pb-5">
    <!-- Voucher -->
    <div
      class="flex items-center justify-between border-b border-gray-200 rounded-lg px-1 py-3 mb-4"
    >
      <div class="flex items-center gap-2 text-gray-800 font-poppins">
        <div class="w-[29px] h-[29px]">
          <img src="../../images/view_cart/u2324.png" alt="" />
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
          Subtotal (3 items selected) :
        </span>
        <span class="text-sm font-semibold text-gray-800 font-poppins">$42,00</span>
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
      <div class="checkbox-container ml-[12px] mr-[12px]">
        <input type="checkbox" v-model="isSelected" class="checkbox" @change="onSelectionChange" />
        <div class="checkbox-custom">
          <svg v-if="isSelected" class="checkmark" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <span class="ml-[4px]">Select all</span>
      </div>
      <button
        class="bg-[#06deaa] hover:bg-green-500 transition-colors text-white px-4 py-2 rounded-lg text-sm font-semibold font-poppins"
      >
        Checkout (3)
      </button>
    </div>
  </div>
</template>

<style scoped>
.checkbox-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 12px;
  margin-right: 12px;
}

.checkbox {
  opacity: 0;
  position: absolute;
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 2px 2px 2px 2px;
  border-radius: 4px;
  background-color: #07f7b6;
  box-sizing: border-box;
}

.checkbox-custom {
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  transition: all 0.2s ease;
}

.checkbox:checked + .checkbox-custom {
  background: #07f7b6;
  border-color: #07f7b6;
}

.checkmark {
  width: 16px;
  height: 16px;
  fill: white;
}
</style>

<script>
export default {
  name: "ViewCartCheckout",
  data() {
    return {
      isSelected: this.initialSelected,
    };
  },
  methods: {
    onSelectionChange() {
      this.$emit("selection-changed", {
        productId: this.product.id,
        selected: this.isSelected,
      });
    },
  },
};
</script>
