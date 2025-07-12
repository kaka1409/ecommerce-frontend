<script setup>

  import { reactive } from 'vue';
  import IconLoader from './IconLoader.vue';

  const currentPath = window.location.pathname

  const checkCurrentPath = (path) => {
    return currentPath === path
  }

  const state = reactive({
    isHomePath: checkCurrentPath('/home') || checkCurrentPath('/'),
    isCartPath: checkCurrentPath('/cart'),
    isWalletPath: checkCurrentPath('/wallet'),
    ISUserPath: checkCurrentPath('/user')
  })

</script>

<template>
  <div class="absolute bottom-2 flex items-center justify-around w-full">
    <RouterLink to="/home" class="flex flex-col items-center">
      <div>
        <IconLoader :name="state.isHomePath ? 'HomeIconActive' : 'HomeIcon'"/>
      </div>

      <span
        :class="'text-xs font-poppins' + (state.isHomePath ? ' text-[#07f7b6]' : '')"
      >
        Home
      </span>
    </RouterLink>

    <RouterLink to="/cart" class="flex flex-col items-center">
      <div>
        <IconLoader :name="state.isCartPath ? 'CartIconActive' : 'CartIcon'"/>
      </div>

      <span
        :class="'text-xs font-poppins' + (state.isCartPath ? ' text-[#07f7b6]' : '')"
      >
        Cart
      </span>
    </RouterLink>

    <RouterLink to="/wallet" class="flex flex-col items-center">
      <div>
        <IconLoader :name="state.isWalletPath ? 'WalletIconActive' : 'WalletIcon'"/>
      </div>

      <span :class="'text-xs font-poppins' + (state.isWalletPath ? ' text-[#07f7b6]' : '')">
        Wallet
      </span>
    </RouterLink>

    <RouterLink to="/user" class="flex flex-col items-center">
      <div>
        <IconLoader :name="state.ISUserPath ? 'UserIconActive' : 'UserIcon'"/>
      </div>

      <span :class="'text-xs font-poppins' + (state.ISUserPath ? ' text-[#07f7b6]' : '')">
        User
      </span>
    </RouterLink>
  </div>
</template>
