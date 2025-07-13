
import {createRouter, createWebHistory} from 'vue-router'

import Login from "@/views/LoginView.vue"
import Register from "@/views/RegisterView.vue"
import Home from "@/views/HomeView.vue"
import Cart from "@/views/CartView.vue"
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
