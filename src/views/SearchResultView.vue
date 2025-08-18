<script setup>
  // Icons and components
  import SearchIcon from '@/assets/icons/SearchIcon.vue';
  import NavigationBar from '@/components/NavigationBar.vue';
  import SearchResultList from '@/components/SearchResultList.vue';

  import { onMounted } from 'vue';

  import { useRouter } from 'vue-router'; const router = useRouter()
  import { useSearch } from '@/stores/search'; const searchState = useSearch()

  // const searchParams = new URLSearchParams(window.location.search)

  const search =  () => {
    // searchState.searchQuery = searchParams.get('keyword')
    // searchState.pageNo = parseInt(searchParams.get('pageNo'))
    // searchState.pageSize = parseInt(searchParams.get('pageSize'))

    router.push(`/search?pageNo=1&pageSize=10&keyword=${searchState.searchQuery}`)
    searchState.getSearchResults()
  }

  onMounted( () => {
      searchState.getSearchResults()
    }
  )

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
          :disabled="searchState.searchQuery === ''"
        >
          <SearchIcon />
        </button>
        <input
          class="inline-block w-[80%] p-2 focus:outline-none "
          type="text"
          placeholder="Search products"
          v-model="searchState.searchQuery"
        >
      </div>
    </div>

    <SearchResultList />

    <NavigationBar />
  </div>

</template>
