<script setup>
  // Icons and components
  import SearchIcon from '@/assets/icons/SearchIcon.vue';
  import NavigationBar from '@/components/NavigationBar.vue';
  import ProductList from '@/components/ProductList.vue';

  import { onMounted, reactive } from 'vue';
  import { useToast } from 'vue-toastification'; const toast = useToast()
  import hostURL from '@/configs/env';
  import axios from 'axios';
  import { useUserInfo } from '@/stores/userInfo'; const userInfoState = useUserInfo()

  const state = reactive({
    searchQuery: '',
  })

  const search =  () => {
    window.location.href = `/search?pageNo=1&pageSize=10&keyword=${state.searchQuery}`
  }

  const accessToken = localStorage.getItem('accessToken')
  const getCurrentUserInfo = async () => {
    try {
      if (accessToken) {
        const response = await axios.get(`${hostURL}/api/v1/users/current`, {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`
          }
        })

        const responseBody = response.data
        // console.log(responseBody)

        if (responseBody.status === 200 && responseBody.data) {
          userInfoState.username = responseBody.data.username
          userInfoState.fullname = responseBody.data.fullName
          userInfoState.phone = responseBody.data.phoneNumber
          userInfoState.email = responseBody.data.email
          userInfoState.address = responseBody.data.address
        } else {
          console.error("Error getting address")
        }
      } else {
        toast.error("You are not logged in")
        console.error("You are not logged in")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.error(error)
    }
  }

  onMounted(() => {
    getCurrentUserInfo()
  })

</script>

<template>

  <div class="relative top-0 left-0 w-full h-full">

    <div class="flex items-center justify-between w-full p-4">
      <div class="flex flex-col gap-0 ">
        <span class="font-black text-sm">
          CHEAP
        </span>

        <span class="inline block font-black text-2xl mt-[-12.5px]">
          DEAL
        </span>
      </div>

      <!-- Search -->
      <div class="flex items-center justify-center w-60 bg-[#f8f8f8] rounded-full font-poppins text-md text-gray-900 ">
        <button
          @click="search"
          :disabled="state.searchQuery === ''"
        >
          <SearchIcon />
        </button>
        <input
          class="inline-block w-[80%] p-2 focus:outline-none "
          type="text"
          placeholder="Search products"
          v-model="state.searchQuery"
        >
      </div>
    </div>

    <ProductList
      :pageSize="10"
    />

    <NavigationBar />
  </div>

</template>
