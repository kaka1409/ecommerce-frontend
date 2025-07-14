<script setup>
  import StarIcon from '@/assets/icons/StarIcon.vue';
  import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
  import ProductItem from '@/components/ProductItem.vue';
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/css/index.css';

  import axios from 'axios'
  import { useToast } from 'vue-toastification'; const toast = useToast()
  import { onMounted, reactive, defineProps } from 'vue';

  const state = reactive({
    isLoading: true,
    products: [],
    pageNo: 1,
    pageSize: 10,
    totalPages: 0
  })

  const props = defineProps({
    pageSize: Number
  })

  const listProducts = async (pageNo) => {
      try {
        // Radmin  http://26.16.186.88/api/v1/products
        // Tailscale    http://100.81.52.73/api/v1/products

        // show loading
        state.isLoading = true

        const accessToken = localStorage.getItem('accessToken')
        const baseURL = 'http://26.16.186.88/api/v1/products'
        const params = new URLSearchParams({
          pageNo: pageNo,
          pageSize: props.pageSize
        })
        const endPoint = `${baseURL}?${params.toString()}`;

        if (accessToken) {
          const response = await axios.get(endPoint, {
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          })

          const data = response.data

          if (data.status === 200) {

            state.products = data.data.items
            state.totalPages = data.data.totalPages

          } else {
            // Error handling
            toast.error(data.message)
            throw new Error("Error fetching products list from API")
          }
        } else {

          // Redirect to login page if not have an account
          window.location.href = "/login"
        }

      } catch (error) {
        // Error handling
        toast.error(error.response.data.message)
        throw new Error("Error fetching products list from API", error);
      } finally {
        state.isLoading = false
      }
    }

  const nextPage = () => {
    if (state.pageNo < state.totalPages) {
      state.pageNo++
      listProducts(state.pageNo)
    }
  }

  const previousPage = () => {
    if (state.pageNo > 1 && state.pageNo <= state.totalPages) {
      state.pageNo--
      listProducts(state.pageNo)
    }
  }

  onMounted( () => {
      listProducts(state.pageNo)
    }
  )

</script>

<template>
  <div class="relative top-0 left-0 w-full h-full">

    <div class="flex items-center justify-start gap-2 absolute top-0 left-0 w-full px-4 bg-white/97 backdrop-blur-sm z-10">
      <span class="font-raleway-bold font-bold text-2xl ">
        Product
      </span>

      <StarIcon class="inline-block" />
    </div>

    <div class="grid grid-cols-2 gap-2 p-4 pt-8 h-175 overflow-y-scroll">
      <Loading
        :active="state.isLoading"
        loader="dots"
        color="#07f7b6"
      />

      <ProductItem
        v-for="product in state.products"
        :key="product.id"
        :productObject="product"
      />
    </div>

    <div class="absolute bottom-32 flex items-center justify-center gap-4 left-0 w-full px-4 py-2 bg-white/90 backdrop-blur-md z-10">
      <button
        class="flex items-center justify-center w-6.5 h-full rounded-md"
        @click="previousPage"
      >
        <ChevronLeftIcon class="w-6 h-6 text-gray-500" />
      </button>

      <div>
        <span>{{ state.pageNo }} of {{ state.totalPages }}</span>
      </div>

      <button
        class="flex items-center justify-center w-6.5 h-full rounded-md "
        @click="nextPage"
      >
        <ChevronRightIcon class="w-6 h-6 text-gray-500" />
    </button>
    </div>
  </div>
</template>
