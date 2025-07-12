<script setup>
  // Components
  import NavigationBar from '@/components/NavigationBar.vue';

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

    <button
      class="bg-gray-500 p-2 text-white rounded-lg"
      @click="listProducts"
    >
      Get products
    </button>

    <NavigationBar />
  </div>

</template>
