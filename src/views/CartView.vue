<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import CartItem from "@/components/CartItem.vue";
  import ViewCartHeader from "@/components/ViewCartHeader.vue";
  import ViewCartCheckout from "@/components/ViewCartCheckout.vue";


  const loading = ref(true)
  const error = ref(null)
  const cartItem = {
    "id": 1,
    "productId": 1,
    "name": "Iphone 16 pro max",
    "image": "../../images/view_cart/u2261_div.jpg",
    "quantity": 1,
    "variants": ["256 Gb", "512 Gb", "1 Tb"],
    "price": 1000.00,
    "subTotalPrice": 1000.00
  }
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await axios.get('http://26.16.186.88/api/v1/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*',
        },
      })
      console.log(res.data.data)
      const data = res.data.data.cartItems
      cartItem.id = data[0].id
      cartItem.productId = data[0].productId
      cartItem.name = data[0].name
      cartItem.quantity = data[0].quantity
      cartItem.price = data[0].price
      cartItem.subTotalPrice = data[0].subTotalPrice
    } catch (err) {
      console.error('Error when load the cart:', err)
      error.value = "Can't load the cart. Please try again later"
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchCart)



  const updateQuantity = ({ productId, quantity }) => {
    if (cartItem.id === productId) {
      cartItem.quantity = quantity;
    }
  }

  const updateSelection = ({ productId, selected }) => {
    console.log('Prodcut ID:', productId, 'Selected:', selected)
  }

  const handleChangeClick = (productId) => {
    console.log('Change chilcked for Product ID:', productId)
  }

  const checkout = () => {
    alert('Proceeding to checkout...')
  }

</script>


<template>
  <div class="relative h-screen flex flex-col">
    <div class="absolute inset-0 w-[375px] h-[1218px] m-auto opacity-[0.08] bg-[#797979] pointer-events-none z-[1]"></div>
    <div class="relative flex flex-col h-screen justify-between z-[2]">
      <ViewCartHeader />

      <section class="overflow-y-auto flex-1">
        <CartItem
          :product="cartItem"
          :initialQuantity="cartItem.quantity"
          :initialSelected="true"
          @quantity-changed="updateQuantity"
          @selection-changed="updateSelection"
          @change-clicked="handleChangeClick"
        />
      </section>
      <div class="bg-white sticky bottom-0">
        <ViewCartCheckout />
      </div>
    </div>

    <section class="border-t border-[#ccc] pt-5 text-center">
      <button
        class="bg-[#007bff] hover:bg-[#0056b3] text-white px-5 py-2.5 border-none cursor-pointer font-semibold rounded"
        @click="checkout"
      >Checkout</button>
    </section>
  </div>
</template>
