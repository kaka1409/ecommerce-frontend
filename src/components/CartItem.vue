<script setup>
// export default {
//   name: "CartItem",
//   props: {
//     product: {
//       type: Object,
//       required: true,
//       default: () => (
//         {
//           id: 1,
//           name: "iPhone 15 Pro Max",
//           image: "/api/placeholder/80/80",
//           price: 14.0,
//           variants: ["256 Gb", "512 Gb", "1 Tb"],
//         },
//         {
//           id: 2,
//           name: "Sample Product",
//           image: "https://via.placeholder.com/80",
//           price: 10.0,
//           variants: ["Variant 1", "Variant 2"],
//         }
//       ),
//     },
//     initialQuantity: {
//       type: Number,
//       default: 1,
//     },
//     initialSelected: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   data() {
//     return {
//       quantity: this.initialQuantity,
//       isSelected: this.initialSelected,
//       selectedVariant: this.product.variants ? this.product.variants[0] : "",
//       showRemoveButton: false,
//     };
//   },
//   methods: {
//     handleTouchStart(e) {
//       this.touchStartX = e.touches[0].clientX;
//     },
//     handleTouchMove(e) {
//       this.touchEndX = e.touches[0].clientX;
//     },
//     handleTouchEnd() {
//       const deltaX = this.touchStartX - this.touchEndX;
//       if (deltaX > 50) {
//         this.showRemoveButton = true;
//       } else if (deltaX < -50) {
//         this.showRemoveButton = false;
//       }
//     },
//     increaseQuantity() {
//       this.quantity++;
//       this.onQuantityChange();
//     },
//     decreaseQuantity() {
//       if (this.quantity > 1) {
//         this.quantity--;
//         this.onQuantityChange();
//       }
//     },
//     onQuantityChange() {
//       this.$emit("quantity-changed", {
//         productId: this.product.id,
//         quantity: this.quantity,
//       });
//     },
//     onSelectionChange() {
//       this.$emit("selection-changed", {
//         productId: this.product.id,
//         selected: this.isSelected,
//       });
//     },
//     onChangeClick() {
//       this.$emit("change-clicked", this.product.id);
//     },
//     removeItem() {
//       this.$emit("remove", this.product.id);
//     },
//     toggleRemoveButton() {
//       this.showRemoveButton = !this.showRemoveButton;
//     },
//   },
// };

  //packages
  import { defineProps } from 'vue';

  const props = defineProps({
    product: {
      type: Object,
      required: true,
      default: () => ({
        id: 1,
        name: 'iPhone 15 Pro Max',
        image: '/api/placeholder/80/80',
        price: 14.0,
        variants: ['256 Gb', '512 Gb', '1 Tb'],
      }),
    },
    initialQuantity: {
      type: Number,
      default: 1,
    },
    initialSelected: {
      type: Boolean,
      default: true,
    },
  })

  const emit = defineEmits([
    'quantity-changed',
    'selection-changed',
    'change-clicked',
    'remove',
  ])

  const quantity = (props.initialQuantity)
  const isSelected = (props.initialSelected)
  const selectedVariant = (props.product.variants?.[0] || '')
  const showRemoveButton = (false)

  let touchStartX = 0
  let touchEndX = 0

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX
  }

  function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX
  }

  function handleTouchEnd() {
    const deltaX = touchStartX - touchEndX
    if (deltaX > 50) {
      showRemoveButton.value = true
    } else if (deltaX < -50) {
      showRemoveButton.value = false
    }
  }

  function increaseQuantity() {
    quantity.value++
    onQuantityChange()
  }

  function decreaseQuantity() {
    if (quantity.value > 1) {
      quantity.value--
      onQuantityChange()
    }
  }

  function onQuantityChange() {
    emit('quantity-changed', {
      productId: props.product.id,
      quantity: quantity.value,
    })
  }

  function onSelectionChange() {
    emit('selection-changed', {
      productId: props.product.id,
      selected: isSelected.value,
    })
  }

  function onChangeClick() {
    emit('change-clicked', props.product.id)
  }

  function removeItem() {
    emit('remove', props.product.id)
  }

  function toggleRemoveButton() {
    showRemoveButton.value = !showRemoveButton.value
  }
</script>

<template>
  <div class="cart-item-container rounded-lg shadow-sm relative overflow-hidden">
    <!-- Remove Button -->
    <div
      class="absolute right-0 top-0 bottom-0 w-[97px] bg-red-500 text-white flex items-center justify-center font-poppins transition-all duration-300 z-0"
      :class="{
        'opacity-100 pointer-events-auto': showRemoveButton,
        'opacity-0 pointer-events-none': !showRemoveButton,
      }"
      @click="removeItem"
    >
      Remove
    </div>
    <div
      class="cart-item relative z-10 bg-white shadow-sm h-[160px] transition-transform duration-300"
      :class="{ 'translate-x-[-97px]': showRemoveButton }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div class="flex w-full">
        <div class="ml-auto mt-3 mr-[19px]">
          <a
            href="#"
            @click.prevent="onChangeClick"
            class="text-gray-500 text-xs font-poppins hover:text-blue-500 transition-colors"
          >
            Change
          </a>
        </div>
      </div>
      <div class="flex items-center py-3 mr-[19px] relative overflow-hidden">
        <div class="checkbox-container ml-[12px] mr-[12px]">
          <input
            type="checkbox"
            v-model="isSelected"
            class="checkbox"
            @change="onSelectionChange"
          />
          <div class="checkbox-custom">
            <svg v-if="isSelected" class="checkmark" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        </div>
        <!-- Product Image -->
        <div class="w-20 h-20 rounded overflow-hidden flex-shrink-0">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover object-top"
          />
        </div>
        <div class="flex flex-col ml-3 flex-1">
          <!-- Product Details -->
          <h3 class="text-[17px] text-[#262626] font-poppins">
            {{ product.name }}
          </h3>
          <div class="mt-1 mb-3">
            <select
              v-model="selectedVariant"
              class="w-20 h-6 text-sm text-gray-500 bg-white border border-gray-400 rounded focus:outline-none focus:border-green-500 font-poppins"
            >
              <option v-for="variant in product.variants" :key="variant" :value="variant">
                {{ variant }}
              </option>
            </select>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-sm font-semibold text-gray-700 font-poppins">
              <span class="text-xs">$</span>{{ product.price.toFixed(2) }}
            </div>
            <div class="flex items-center border border-gray-300 rounded overflow-hidden">
              <button
                class="w-5 h-5 bg-gray-100 text-gray-500 text-xs font-semibold flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="decreaseQuantity"
                :disabled="quantity <= 1"
              >
                -
              </button>
              <input
                type="number"
                v-model.number="quantity"
                class="w-8 h-5 text-center text-xs bg-white border-none focus:outline-none"
                min="1"
                @input="onQuantityChange"
              />
              <button
                class="w-5 h-5 bg-gray-100 text-gray-500 text-xs font-semibold flex items-center justify-center hover:bg-gray-200"
                @click="increaseQuantity"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.cart-item-container {
  position: relative;
  overflow: hidden;
}
</style>

<style scoped>
.container-2 .checkbox-container {
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
