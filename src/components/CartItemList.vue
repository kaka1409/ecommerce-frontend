<script setup>
  import CartItem from './CartItem.vue';

  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useToast } from 'vue-toastification'; const toast = useToast

  const loading = ref(true)
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
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (res.status === 200) {
        const data = res.data.data.cartItems
        // cartItem.id = data[0].id
        // cartItem.productId = data[0].productId
        // cartItem.name = data[0].name
        // cartItem.quantity = data[0].quantity
        // cartItem.price = data[0].price
        // cartItem.subTotalPrice = data[0].subTotalPrice

        console.log(data)
      } else {
        toast.error(res.data.message)
        console.error('Error when load the cart:', res)
      }
    } catch (err) {
      toast.error(err.response.data.message)
      console.error('Error when load the cart:', err)
    } finally {
      loading.value = false
    }
  }

  onMounted (
    fetchCart
  )

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


</script>

<template>
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
</template>
