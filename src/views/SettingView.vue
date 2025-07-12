<script setup>
  // icons
  import LogoutIcon from '@/assets/icons/LogoutIcon.vue';

  import axios from 'axios';
  import { useToast } from 'vue-toastification';
  const toast = useToast()

  const logout = async () => {
    try {

      const accessToken = localStorage.getItem('accessToken')

      const response = await axios.post('http://26.16.186.88/api/v1/users/logout', {}, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })

      const data = response.data

      if (data.status === 200) {
        toast.success("Logged out successful")
        localStorage.removeItem('accessToken')

        // redirect to home page
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)

      } else {
        toast.error(data.message)
        throw new Error("Error making logout request")
      }

    } catch (error) {
        toast.error(error.response.data.message)
        throw new Error("Error making logout request", error);
    }
  }

</script>

<template>
  <div class="relative top-0 left-0 h-full">
    <div>
      Setting page
    </div>

    <!-- <button
      class="block mx-auto bg-red-500 px-4 py-2 rounded-xl text-white"
      @click="logout"
    >

      logout
    </button> -->

    <div
      class="absolute bottom-2 left-30 flex items-center justify-center gap-2 hover:cursor-pointer"
      @click="logout"
    >
      <LogoutIcon />
      <button
        class="block text-red-500 font-poppins text-lg">Logout</button>
    </div>
  </div>
</template>
