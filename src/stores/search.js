import { defineStore } from "pinia";

import hostURL from '@/configs/env';
import axios from 'axios'

import { useToast } from 'vue-toastification'; const toast = useToast()

export const useSearch = defineStore("search", {
  state: () => {
    return {
      isLoading: true,
      products: [],
      searchQuery: "",
      pageNo: 1,
      pageSize: 10,
      totalPages: 0
    }
  },

  getters: {

  },

  actions: {
    async getSearchResults() {
      this.isLoading = true

      try {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
          const response = await axios.get(`${hostURL}/api/v1/products?pageNo=${this.pageNo}&pageSize=${this.pageSize}&keyword=${this.searchQuery}`, {
            headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${accessToken}`
            }
          })

          const axiosReponse = await response.data

          if (axiosReponse.status === 200) {
            this.products = axiosReponse.data.items
            this.totalPages = axiosReponse.data.totalPages

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
            toast.error(error.name + ": " + error.message)
          }
          console.error("Error calling search API", error)
      } finally {
        this.isLoading = false
      }
    }
  }
})
