<script setup>
  import axios from 'axios'
  import { useToast } from 'vue-toastification'; const toast = useToast()
  import { defineProps } from 'vue';

  const props = defineProps({
    productObject: Object
  })

  const limitText = (text, limit) => {
    return text.length >= limit ? text.substr(0, limit) : text
  }

  const getThumbnail = () => {
    return props.productObject.assets[0] ? props.productObject.assets[0].url : ""
  }

  const addToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const productId = props.productObject.id;
        const quantity = 1;
        const response = axios.post(
          "http://26.16.186.88/api/v1/cart/items",
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

        const axiosResponse = await response;
        const message = axiosResponse.data.message

        if (axiosResponse.status === 201) {
          // Success
          toast.success(message)
          const cartItems = axiosResponse.data.data.cartItems;
          console.log("Your items in cart:", cartItems);
        }  else {
          // Error
          toast.error(message)
          console.error("Failed adding product to cart")
        }

      } else {
        toast.error("No access token found")
        console.error("No access token found in your local storage, make sure have have an account and logged in")
      }

    } catch (error) {
      toast.error(error.response.data.message)
      console.error("Error adding product to cart:", error);
    }
  };

</script>

<template>
  <RouterLink :to="'/product/' + props.productObject.id">
    <div class="shadow-md rounded-lg p-4 border-1 border-[#eee]">
      <div class="flex items-center justify-center rounded-md shawdow-lg overflow-hidden w-full h-42">
        <img class="w-full" :src="getThumbnail()" alt="Product_thumbnail">
      </div>

      <div class="font-nunito-sans font-bold text-lg line-clamp-1">
        {{ limitText(props.productObject.productName, 15) }}
      </div>

      <div class="font-nunito-sans text-xs my-1 min-h-8 line-clamp-2">
        {{ limitText(props.productObject.productDescription, 80) }}
      </div>

      <div class="flex items-center justify-between">
        <div class="font-raleway-bold font-bold">
          {{ "$" + props.productObject.price }}
        </div>
        <button
          class="flex items-center justify-center w-6 h-6 bg-[#07f7b6] rounded-md text-lg text-white font-bold"
          @click="addToCart"
        >+</button>
      </div>
    </div>
  </RouterLink>
</template>
