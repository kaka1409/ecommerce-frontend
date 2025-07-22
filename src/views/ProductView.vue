<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import hostURL from '@/configs/env';
import axios from 'axios'
import { useToast } from 'vue-toastification';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const toast = useToast();
const route = useRoute();

const state = reactive({
  isLoading: true,
  product: null,
  quantity: 1,
  currentImageIndex: 0,
  imageTransition: 'slide-right' // Track transition direction
});

const fetchProduct = async (productId) => {
  try {
    state.isLoading = true;

    const accessToken = localStorage.getItem('accessToken');
    const endpoint = `${hostURL}/api/v1/products/${productId}`;

    console.log('Fetching product with ID:', productId);
    console.log('Endpoint:', endpoint);
    console.log('Access token exists:', !!accessToken);

    if (accessToken) {
      const response = await axios.get(endpoint, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = response.data;
      console.log('API Response:', data);

      if (data.status === 200 && data.data) {
        state.product = data.data;
        state.currentImageIndex = 0; // Reset to first image when new product loads
        console.log('Product loaded:', state.product);
      } else {
        console.error('API returned error status:', data.status, data.message);
        throw new Error("Error fetching product from API");
      }
    } else {
      // Redirect to login page if not authenticated
      window.location.href = "/login";
    }

  } catch (error) {
    console.error('Full error object:', error);
    console.error('Error response:', error.response);

    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
    }
  } finally {
    state.isLoading = false;
  }
};

const nextImage = () => {
  if (state.product && state.product.assets && state.product.assets.length > 1) {
    state.imageTransition = 'slide-left';
    state.currentImageIndex = (state.currentImageIndex + 1) % state.product.assets.length;
  }
};

const prevImage = () => {
  if (state.product && state.product.assets && state.product.assets.length > 1) {
    state.imageTransition = 'slide-right';
    state.currentImageIndex = state.currentImageIndex === 0
      ? state.product.assets.length - 1
      : state.currentImageIndex - 1;
  }
};

const selectImage = (index) => {
  if (index > state.currentImageIndex) {
    state.imageTransition = 'slide-left';
  } else if (index < state.currentImageIndex) {
    state.imageTransition = 'slide-right';
  } else {
    state.imageTransition = 'fade';
  }
  state.currentImageIndex = index;
};

const decreaseQuantity = () => {
  if (state.quantity > 1) {
    state.quantity--;
  }
};

const increaseQuantity = () => {
  if (state.quantity < (state.product?.quantity || 1)) {
    state.quantity++;
  }
};

const addToCart = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const productId = state.product.id;
      const quantity = state.quantity;

      console.log('Adding to cart:', { productId, quantity });

      const response = await axios.post(
        `${hostURL}/api/v1/cart/items`,
        {
          productId: productId,
          quantity: quantity,
        },
        {
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data;
      console.log('Add to cart response:', data);

      if (response.status === 201) {
        // Success
        console.log(data.message || `Added ${quantity} item(s) to cart successfully!`);
        const cartItems = data.data?.cartItems;
        console.log("Your items in cart:", cartItems);

        // Reset quantity to 1 after successful add
        state.quantity = 1;
      } else {
        // Error
        console.error(data.message || 'Failed to add product to cart');
        console.error("Failed adding product to cart");
      }

    } else {
      console.error("Please login to add items to cart");
      console.error("No access token found in local storage");
      // Redirect to login
      window.location.href = "/login";
    }

  } catch (error) {
    console.error("Error adding product to cart:", error);

    if (error.response) {
      console.error(error.response.data?.message || 'Failed to add product to cart');
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      console.error('Network error - unable to add to cart');
    } else {
      console.error('Error adding product to cart');
    }
  }
};

onMounted(() => {
  const productId = route.params.id;
  console.log('ProductView mounted with ID:', productId);

  // Check if user is authenticated
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    toast.error('Please login to view products');
    console.log('No access token found, redirecting to login');
    window.location.href = "/login";
    return;
  }

  if (productId) {
    fetchProduct(productId);
  } else {
    console.error('No product ID provided in route params');
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="bg-white text-gray-800 pb-[100px] relative h-screen overflow-y-auto ml-[5px] font-poppins">
    <!-- Loading overlay -->
    <Loading
      v-model:active="state.isLoading"
      loader="bars"
      color="#07f7b6"
      :can-cancel="false"
      :on-cancel="() => {}"
      :is-full-page="false"
    />

    <!-- Product content - show only when not loading and product exists -->
    <div v-if="!state.isLoading && state.product">
      <!-- Product Image -->
      <div class="w-full h-[500px] mb-5 relative overflow-hidden">
        <transition
          :name="state.imageTransition"
          mode="out-in"
          :duration="{ enter: 500, leave: 300 }"
        >
          <img
            :key="state.currentImageIndex"
            :src="state.product.assets && state.product.assets.length > 0 ? state.product.assets[state.currentImageIndex].url : '/src/assets/images/productPlaceholderThumbnail.png'"
            :alt="state.product.productName"
            class="w-full h-full object-cover rounded-md"
          />
        </transition>

        <!-- Left arrow - only show if more than one image -->
        <button
          v-if="state.product.assets && state.product.assets.length > 1"
          @click="prevImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 w-10 h-10 opacity-50 hover:opacity-75 transition-opacity"
        >
          <svg class="w-6 h-5 text-white opacity-100" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <!-- Right arrow - only show if more than one image -->
        <button
          v-if="state.product.assets && state.product.assets.length > 1"
          @click="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 w-10 h-10 opacity-50 hover:opacity-75 transition-opacity"
        >
          <svg class="w-6 h-5 text-white rotate-180" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <!-- Thumbnails -->
      <div class="flex overflow-x-scroll gap-2 mb-5 px-2" v-if="state.product.assets && state.product.assets.length > 0">
        <img
          v-for="(asset, index) in state.product.assets"
          :key="asset.id"
          @click="selectImage(index)"
          :src="asset.url"
          :alt="asset.altText || `Thumbnail ${index + 1}`"
          :class="['w-20 h-20 rounded-md object-cover border-2 cursor-pointer transition-all duration-300 hover:border-[#07f7b6] hover:opacity-100 hover:scale-105',
                   index === state.currentImageIndex
                     ? 'border-[#07f7b6] shadow-lg opacity-100 scale-105'
                     : 'border-transparent opacity-60']"
        />
      </div>

      <!-- Price & Stock -->
      <div class="flex items-center justify-between px-4 font-poppins">
        <div class="text-2xl font-extrabold">${{ state.product.price.toFixed(2) }}</div>
        <span
          :class="['px-3 py-1 rounded-lg font-semibold text-sm text-white',
                   state.product.stockStatus === 'in_stock' ? 'bg-[#07f7b6]' : 'bg-red-500']"
        >
          {{ state.product.stockStatus === 'in_stock' ? `In stock: ${state.product.quantity}` : 'Out of stock' }}
        </span>
      </div>

      <!-- Product Name -->
      <h1 class="text-2xl font-bold mt-2 mb-2 font-nunito-sans px-4">{{ state.product.productName }}</h1>

      <!-- Category -->
      <p class="text-sm text-gray-400 font-nunito-sans mb-4 px-4">
        <span class="font-semibold">Category:</span> {{ state.product.productType }}
      </p>

      <!-- Description -->
      <div class="px-4">
        <p class="font-bold mb-1 text-xl">Description</p>
        <p class="text-gray-700 text-sm mb-2">
          {{ state.product.productDescription }}
        </p>
      </div>

      <!-- Quantity + Add to Cart -->
      <div class="mt-6 px-4" v-if="state.product.stockStatus === 'in_stock'">
        <div class="flex flex-col gap-4">
          <!-- Quantity Row -->
          <div class="flex items-center justify-between">
            <label class="block font-semibold text-xl">Quantity</label>
            <div class="flex items-center gap-2">
              <button
                @click="decreaseQuantity"
                class="text-black px-3 py-2 text-xl font-bold hover:bg-gray-300 transition rounded"
                :disabled="state.quantity <= 1"
              >
                -
              </button>
              <span
                class="text-lg bg-[#e7f0fd] text-black px-4 py-2 rounded-lg font-medium shadow-inner min-w-[60px] text-center"
              >
                {{ state.quantity }}
              </span>
              <button
                @click="increaseQuantity"
                class="text-black px-3 py-2 text-xl font-bold hover:bg-gray-300 transition rounded"
                :disabled="state.quantity >= state.product.quantity"
              >
                +
              </button>
            </div>
          </div>

          <!-- Add to Cart Button Row -->
          <div class="w-full">
            <button
              @click="addToCart"
              class="w-full bg-[#07f7b6] hover:bg-[#06dba1] text-white px-5 py-3 rounded-lg text-base font-semibold shadow-md transition"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Out of stock message -->
      <div class="mt-6 px-4" v-else>
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center font-poppins">
          This product is currently out of stock
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="!state.isLoading && !state.product" class="flex items-center justify-center h-full">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p class="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    </div>

  </div>
  <div class="h-[100px]"></div>
  <NavigationBar />
</template>

<style scoped>
/* Slide Left Transition */
.slide-left-enter-active {
  transition: all 0.5s ease-out;
}

.slide-left-leave-active {
  transition: all 0.3s ease-in;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Slide Right Transition */
.slide-right-enter-active {
  transition: all 0.5s ease-out;
}

.slide-right-leave-active {
  transition: all 0.3s ease-in;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Image container positioning */
.slide-left-enter-active img,
.slide-right-enter-active img,
.fade-enter-active img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
