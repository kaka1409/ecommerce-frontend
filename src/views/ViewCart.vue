<template>
  <div id="view-cart">
    <div class="overlay"></div>
    <div class="content flex flex-col h-screen justify-between">
      <ViewCartHeader />

      <section class="cart-items overflow-y-auto flex-1">
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

    <!-- <section class="checkout">
      <button @click="checkout">Checkout</button>
    </section> -->
  </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";
import ViewCartHeader from "@/components/ViewCartHeader.vue";
import ViewCartCheckout from "@/components/ViewCartCheckout.vue";
export default {
  name: "ViewCart",
  components: {
    CartItem,
    ViewCartHeader,
    ViewCartCheckout,
  },
  data() {
    return {
      cartItem: {
        id: 1,
        name: "Iphone 15 Pro Max",
        image: "../../images/view_cart/u2261_div.jpg", // bạn có thể đổi ảnh khác tùy thích
        price: 1400,
        quantity: 1,
        variants: ["256 Gb", "512 Gb", "1 Tb"],
      },
    };
  },
  methods: {
    updateQuantity({ productId, quantity }) {
      if (this.cartItem.id === productId) {
        this.cartItem.quantity = quantity;
      }
    },
    updateSelection({ productId, selected }) {
      console.log(`Product ID: ${productId}, Selected: ${selected}`);
    },
    handleChangeClick(productId) {
      console.log(`Change clicked for Product ID: ${productId}`);
    },
    checkout() {
      alert("Proceeding to checkout...");
    },
  },
};
</script>

<style scoped>
#view-cart {
  position: relative;
  height: 100vh; /* chiếm toàn bộ chiều cao */
  display: flex;
  flex-direction: column;
}

.overlay {
  width: 375px;
  height: 1218px;
  margin: auto;
  opacity: 0.08;
  background-color: #797979;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
}

/* Wrapper giúp căn giữa cart item */

.checkout {
  border-top: 1px solid #ccc;
  padding-top: 20px;
  text-align: center;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
</style>
