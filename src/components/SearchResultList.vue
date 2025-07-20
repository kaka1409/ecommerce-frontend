<script setup>
  import SearchIcon from '@/assets/icons/SearchIcon.vue';
  import StarIcon from '@/assets/icons/StarIcon.vue';
  import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
  import ProductItem from '@/components/ProductItem.vue';
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/css/index.css';

  import hostURL from '@/configs/env';
  import axios from 'axios'
  import { onMounted, reactive, defineProps } from 'vue';
  import { useToast } from 'vue-toastification'; const toast = useToast()

  const props = defineProps({
    query: String,
    pageNo: Number,
    pageSize: Number,
    totalPages: Number
  })

  const state = reactive({
    isLoading: true,
    products: [],
    searchQuery: props.query,
    pageNo: props.pageNo,
    pageSize: props.pageSize,
    totalPages: props.totalPages
  })

  const getSearchResults = async (pageNo) => {
      try {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
          const response = await axios.get(`${hostURL}/api/v1/products?pageNo=${pageNo}&pageSize=${state.pageSize}&keyword=${state.searchQuery}`, {
            headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${accessToken}`
            }
          })

          const axiosReponse = await response.data

          if (axiosReponse.status === 200) {
            state.products = axiosReponse.data.items
            state.totalPages = axiosReponse.data.totalPages

          } else {
            toast.error(axiosReponse.message)
          }
        } else {
          toast.error("No access token found")
          console.error("No access token found, make sure you have an account and logged in")
        }

      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Connection timed out")
        }
        console.error("Error calling search API", error)
      } finally {
        state.isLoading = false
      }
    }

  const nextPage = () => {
    if (state.pageNo < state.totalPages) {
      state.pageNo++
      getSearchResults(state.pageNo)
    }
  }

  const previousPage = () => {
    if (state.pageNo > 1 && state.pageNo <= state.totalPages) {
      state.pageNo--
      getSearchResults(state.pageNo)
    }
  }

  onMounted( () => {
      getSearchResults(state.pageNo)
    }
  )

</script>

<template>
  <div class="relative top-0 left-0 w-full h-full">

    <div class="flex items-center justify-start gap-2 absolute top-0 left-0 w-full px-4 bg-white/97 backdrop-blur-sm z-10">
      <span class="font-raleway-bold font-bold text-2xl ">
        Search results
      </span>

      <StarIcon class="inline-block" />
    </div>

    <Loading
      :active="state.isLoading"
      loader="dots"
      color="#07f7b6"
    />

    <div
      v-if="state.products.length !== 0 && state.totalPages !== 0"
      class="grid grid-cols-2 gap-2 p-4 pt-8 h-175 overflow-y-scroll"
    >
      <ProductItem
        v-for="product in state.products"
        :key="product.id"
        :productObject="product"
      />
    </div>

    <div
      class="flex flex-col items-center justify-center h-[80%] p-4 text-xl font-raleway-bold text-center"
      v-else
    >
      <div class="flex items-center justify-center">
        <SearchIcon class="w-6 h-6 mr-2" />
        <span class="text-gray-500 text-lg">
          No products found,
        </span>
      </div>

      <span class="font-bold">
        Let try to search something different
      </span>
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
