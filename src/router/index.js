import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/HomeView.vue";
import Setting from "@/views/SettingView.vue";
import Login from "@/views/LoginView.vue";
import Register from "@/views/RegisterView.vue";
import ViewCart from "@/views/ViewCart.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: Home,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/setting",
      name: "setting",
      component: Setting,
    },
    {
      path: "/view-cart",
      name: "view-cart",
      component: ViewCart,
    },
  ],
});

export default router;
