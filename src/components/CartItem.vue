<script setup>
  import productPlaceholderImg from '@/assets/images/productPlaceholderThumbnail.png'

  //packages
  import { useToast } from 'vue-toastification'; const toast = useToast()
  import { defineProps, ref, watch } from 'vue';
  import axios from 'axios';

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

    inStockQuantity: {
      type: Number,
      default: 100,
    },

    isSelected: {
      type: Boolean,
      default: false,
    },

    isRemovingItems: {
      type: Boolean,
      default: false
    },

    isSelectedToRemove: {
      type: Boolean,
      default: false
    },

    isInRemoveAll: {
      type: Boolean,
      default: false
    },
  })

  const emit = defineEmits([
    'quantity-changed',
    'selection-changed',
    'change-clicked',
    'remove',
    'selected-to-remove'
  ])

  const variants = ['256 Gb', '512 Gb', '1 Tb'] // hard code for now

  const quantity = ref(props.initialQuantity)
  const isSelected = ref(props.isSelected) // for checkout
  const selectedVariant = ref(variants[0])
  const showRemoveButton = ref(false)

  const isRemovingItems = ref(props.isRemovingItems)
  const isSelectedToRemove = ref(props.isSelectedToRemove)

  let touchStartX = 0
  let touchEndX = 0

  // const handleTouchStart = (e) => {
  //   touchStartX = e.touches[0].clientX
  // }

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const deltaX = touchStartX - touchEndX
    // console.log(touchStartX, touchEndX)
    if (deltaX > 50) {
      showRemoveButton.value = true
    } else if (deltaX < -50) {
      showRemoveButton.value = false
    }
  }

  const increaseQuantity = (e) => {
    e.preventDefault()
    e.stopPropagation()

    quantity.value++
    changeProductQuantity(quantity.value)
  }

  const decreaseQuantity = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (quantity.value > 1) {
      quantity.value--
      changeProductQuantity(quantity.value)
    }
  }

  const inputQuantity = () => {
    quantity.value = parseInt(quantity.value)
    changeProductQuantity(quantity.value)
  }

  const validateInput = () => {
    if (quantity.value > props.inStockQuantity) {
      quantity.value = props.inStockQuantity
    }

    if (quantity.value <= 1) {
      quantity.value = 1
    }
  }


  const onSelectionChange = () => {
    emit('selection-changed', {
      productId: props.product.id,
      selected: isSelected.value,
    })
  }

  const selectItemToRemove = () => {
    if (isRemovingItems.value) {
      // update state
      isSelectedToRemove.value = !isSelectedToRemove.value

      emit('selected-to-remove', {
        productId: props.product.id,
        isSelected: isSelectedToRemove.value,
      })
    }
  }

  // const addItemtoRemoveList = () => {
  //   itemsToRemove.value.push(props.product.id)
  // }

  const changeProductQuantity = async (quantity) => {
    try {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        const response = await axios.put('http://26.16.186.88/api/v1/cart/items',
          {
            "cartItemId": props.product.id,
            "quantity": quantity
          },
          { // HEADERS
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            }
          }
        )

        const axiosResponse = await response.data

        if (axiosResponse.status === 200) {
          emit('quantity-changed', axiosResponse.data.cartItems)
          console.log(axiosResponse.message)
        } else {
          toast.error(axiosResponse.message)
        }
      } else {
        toast.error("No access token found")
        console.error("No access token found, make sure you have an account and logged in")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.error(`Error changing quantity of ${props.product.name}`, error)
    }
  }

  const removeProductFromCart = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        const response = await axios.delete(`http://26.16.186.88/api/v1/cart/items/${props.product.id}`,
          { // HEADERS
            headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${accessToken}`,
            }
          }
        )

        const axiosResponse = await response.data

        if (axiosResponse.status === 200) {
          toast.success(`${props.product.name} removed from cart`)
          emit('remove', axiosResponse.data.cartItems)
          console.log("Your cart items now", axiosResponse.data.cartItems)
        } else {
          toast.error(axiosResponse.message)
          console.error("Error removing product from cart".axiosResponse.message)
        }
      } else {
        toast.error("No access token found")
        console.error("No access token found, make sure you have an account and logged in")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.error(`Error removing ${props.product.name} from cart`, error)
    }
  }

  watch(() => props.isRemovingItems, (newVal) => {
    isRemovingItems.value = newVal;
    isSelectedToRemove.value = false
  });

  watch(() => props.isSelected, (newVal) => {
    isSelected.value = newVal
  })

  watch(() => props.isInRemoveAll, (newVal) => {
    if (isSelectedToRemove.value === false) {
      isSelectedToRemove.value = newVal
    }

    emit('selected-to-remove', {
      productId: props.product.id,
      isSelected: isSelectedToRemove.value,
    })
  })

</script>

<template>
  <div
    :class="['rounded-lg shadow-md relative border-1 mb-1 overflow-hidden',
      isSelectedToRemove ? 'border-2 border-[#06deaa] z-20 opacity-30' : 'opacity-100 border-[#eee]'
    ]"
    @click="selectItemToRemove"
  >
    <!-- Remove Button -->
    <div
      class="absolute right-0 top-0 bottom-0 w-[97px] bg-red-500 text-white flex items-center justify-center font-poppins transition-all duration-300 z-0"
      :class="{
        'opacity-100 pointer-events-auto': showRemoveButton,
        'opacity-0 pointer-events-none': !showRemoveButton,
      }"
      @click="removeProductFromCart"
    >
      Remove
    </div>
    <div
      class="cart-item relative z-10 bg-white shadow-sm h-[160px] transition-transform duration-300"
      :class="{ 'translate-x-[-97px]': showRemoveButton }"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div class="flex w-full">
        <div class="ml-auto mt-3 mr-[19px]">
          <div
            class="text-gray-500 text-xs font-poppins"
          >
            Swipe to <span class="font-light text-red-500">remove</span>
          </div>
        </div>
      </div>

      <div class="flex items-center py-3 mr-[19px] relative overflow-hidden">

        <div
          class="relative flex items-center ml-3 mr-3"
        >
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
            :src="product.assetUrl || productPlaceholderImg"
            :alt="product.name"
            class="w-full object-cover object-top"
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
              <option v-for="variant in variants" :key="variant" :value="variant">
                {{ variant }}
              </option>
            </select>
          </div>

          <div class="flex justify-between items-center">

            <div class="text-sm font-semibold text-gray-700 font-poppins">
              <span class="text-md">$</span> {{ product.price.toFixed(2) }}
            </div>

            <div class="flex items-center border border-gray-300 rounded overflow-hidden">
              <button
                class="w-5 h-5 bg-gray-100 text-gray-500 text-xs font-semibold flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="decreaseQuantity"
                :disabled="quantity <= 1"
              >-</button>

              <input
                type="number"
                v-model="quantity"
                class="w-8 h-5 text-center text-xs bg-white border-none focus:outline-none"
                min="1"
                @input="validateInput"
                @blur="inputQuantity"
              />

              <button
                class="w-5 h-5 bg-gray-100 text-gray-500 text-xs font-semibold flex items-center justify-center hover:bg-gray-200"
                @click="increaseQuantity"
              >+</button>
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>
