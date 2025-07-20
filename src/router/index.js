
import {createRouter, createWebHistory} from 'vue-router'

import Login from "@/views/LoginView.vue"
import Register from "@/views/RegisterView.vue"
import Home from "@/views/HomeView.vue"
import Search from "@/views/SearchResultView.vue"
import ProductView from '@/views/ProductView.vue'
import Cart from "@/views/CartView.vue"
import Order from "@/views/OrderView.vue"
import Wallet from "@/views/WalletView.vue"
import User from "@/views/UserView.vue"
import Setting from "@/views/SettingView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

export default router
