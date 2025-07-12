<script setup>
  import StarIcon from '@/assets/icons/StarIcon.vue';
  // Outline version
  import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

  // Solid version
  import ProductItem from '@/components/ProductItem.vue';

  import axios from 'axios'
  import { useToast } from 'vue-toastification';

  const toast = useToast()

  const listProducts = async () => {
    try {
      // Radmin  http://26.16.186.88/api/v1/products
      // Tailscale    http://100.81.52.73/api/v1/products

      const accessToken = localStorage.getItem('accessToken')

      const response = await axios.get('http://26.16.186.88/api/v1/products?pageNo=0&pageSize=10', {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })

      const data = response.data


      if (data.status === 200) {
        console.logo(data.data)
      } else {
        toast.error(data.message)
        throw new Error("Error fetching products list from API")
      }

    } catch (error) {
      // Error handling
      toast.error(error.response.data.message)
      throw new Error("Error fetching products list from API", error);
    }
  }

</script>

<template>
  <div class="relative top-0 left-0 w-full h-full">

    <div class="flex items-center justify-start gap-2 absolute top-0 left-0 w-full px-4 bg-white/95 backdrop-blur-sm z-10">
      <span class="font-raleway-bold font-bold text-2xl ">
        Product
      </span>

      <StarIcon class="inline-block" />
    </div>

    <div class="grid grid-cols-2 gap-2 p-4 pt-8 h-175 overflow-y-scroll bg-white/90 backdrop-blur-md">
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </div>

    <div class="absolute bottom-32 flex items-center justify-center gap-4 left-0 w-full px-4 py-2 bg-white/90 backdrop-blur-md z-10">
      <div class="flex items-center justify-center w-6.5 h-full rounded-md border-1 border-[#999]">
        <ChevronLeftIcon class="w-6 h-6 text-gray-500" />
      </div>
      <div class="flex items-center justify-center w-6.5 h-full rounded-md bg-[#07f7b6] text-white font-bold">
        1
      </div>
      <div class="flex items-center justify-center w-6.5 h-full rounded-md border-1 border-[#999] font-semibold">
        2
      </div>
      <div class="flex items-center justify-center w-6.5 h-full rounded-md border-1 border-[#999] font-semibold">
        ...
      </div>
      <div class="flex items-center justify-center w-6.5 h-full rounded-md border-1 border-[#999] font-semibold">
        10
      </div>
      <div class="flex items-center justify-center w-6.5 h-full rounded-md border-1 border-[#999] font-semibold">
        <ChevronRightIcon class="w-6 h-6 text-gray-500" />
      </div>
    </div>
  </div>
</template>
