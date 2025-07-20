<script setup>
  // Icons and components
  import SearchIcon from '@/assets/icons/SearchIcon.vue';
  import NavigationBar from '@/components/NavigationBar.vue';
  import SearchResultList from '@/components/SearchResultList.vue';

  import { reactive } from 'vue';

  const searchParams = new URLSearchParams(window.location.search)

  // console.log(searchParams.get('keyword'))

  const state = reactive({
    searchQuery: searchParams.get('keyword'),
    searchResults: [],
    totalPages: 0,
    pageNo: parseInt(searchParams.get('pageNo')),
    pageSize: parseInt(searchParams.get('pageSize'))
  })

  const search =  () => {
    window.location.href = `/search?pageNo=1&pageSize=10&keyword=${state.searchQuery}`
  }

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

    <SearchResultList
      :query="state.searchQuery"
      :pageNo="state.pageNo"
      :pageSize="state.pageSize"
      :totalPages="state.totalPages"
    />

    <NavigationBar />
  </div>

</template>
