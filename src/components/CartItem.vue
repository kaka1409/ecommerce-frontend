<script setup>

  //packages
  import { defineProps, ref } from 'vue';

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

  const quantity = ref(props.initialQuantity)
  const isSelected = ref(props.initialSelected)
  const selectedVariant = ref(props.product.variants?.[0] || '')
  const showRemoveButton = ref(false)

  let touchStartX = 0
  let touchEndX = 0

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const deltaX = touchStartX - touchEndX
    if (deltaX > 50) {
      showRemoveButton.value = true
    } else if (deltaX < -50) {
      showRemoveButton.value = false
    }
  }

  const increaseQuantity = () => {
    quantity.value++
    onQuantityChange()
  }

  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      quantity.value--
      onQuantityChange()
    }
  }

  const onQuantityChange = () => {
    emit('quantity-changed', {
      productId: props.product.id,
      quantity: quantity.value,
    })
  }

  const onSelectionChange = () => {
    emit('selection-changed', {
      productId: props.product.id,
      selected: isSelected.value,
    })
  }

  const onChangeClick = () => {
    emit('change-clicked', props.product.id)
  }

  const removeItem = () => {
    emit('remove', props.product.id)
  }

  // const toggleRemoveButton = () => {
  //   showRemoveButton.value = !showRemoveButton.value
  // }
</script>

<template>
  <div class="cart-item-container rounded-lg shadow-sm relative overflow-hidden" >
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
