<script setup>
defineProps({
  card: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="relative flex-shrink-0 w-[280px] h-[155px] rounded-xl overflow-hidden shadow-md">
    <!-- Card Background -->
    <div :class="`w-full h-full bg-gradient-to-r ${card.gradient} p-4 text-white relative`">
      <!-- Settings Icon -->
      <div class="absolute top-4 right-4">
        <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            fill="#0055ff"
            stroke="#0055ff"
          >
            <path
              d="M262.29,192.31a64,64,0,1,0,57.4,57.4A64.13,64.13,0,0,0,262.29,192.31ZM416.39,256a154.34,154.34,0,0,1-1.53,20.79l45.21,35.46A10.81,10.81,0,0,1,462.52,326l-42.77,74a10.81,10.81,0,0,1-13.14,4.59l-44.9-18.08a16.11,16.11,0,0,0-15.17,1.75A164.48,164.48,0,0,1,325,400.8a15.94,15.94,0,0,0-8.82,12.14l-6.73,47.89A11.08,11.08,0,0,1,298.77,470H213.23a11.11,11.11,0,0,1-10.69-8.87l-6.72-47.82a16.07,16.07,0,0,0-9-12.22,155.3,155.3,0,0,1-21.46-12.57a16,16,0,0,0-15.11-1.71l-44.89,18.07a10.81,10.81,0,0,1-13.14-4.58l-42.77-74a10.8,10.8,0,0,1,2.45-13.75l38.21-30a16.05,16.05,0,0,0,6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16,16,0,0,0-6.07-13.94l-38.19-30A10.81,10.81,0,0,1,49.48,186l42.77-74a10.81,10.81,0,0,1,13.14-4.59l44.9,18.08a16.11,16.11,0,0,0,15.17-1.75A164.48,164.48,0,0,1,187,111.2a15.94,15.94,0,0,0,8.82-12.14l6.73-47.89A11.08,11.08,0,0,1,213.23,42h85.54a11.11,11.11,0,0,1,10.69,8.87l6.72,47.82a16.07,16.07,0,0,0,9,12.22,155.3,155.3,0,0,1,21.46,12.57,16,16,0,0,0,15.11,1.71l44.89-18.07a10.81,10.81,0,0,1,13.14,4.58l42.77,74a10.8,10.8,0,0,1-2.45,13.75l-38.21,30a16.05,16.05,0,0,0-6.05,14.08C416.17,247.67,416.39,251.83,416.39,256Z"
              style="fill:none;stroke:#0055ff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
            />
          </svg>
        </div>
      </div>

      <!-- Card Brand Logo -->
      <div class="absolute top-4 left-4">
        <div v-if="card.type === 'mastercard'" class="flex space-x-1">
          <div class="w-6 h-6 bg-red-500 rounded-full"></div>
          <div class="w-6 h-6 bg-orange-400 rounded-full -ml-3"></div>
        </div>
        <div v-else-if="card.type === 'visa'" class="text-xl font-bold">
          VISA
        </div>
      </div>

      <!-- Card Number Display -->
      <div class="absolute bottom-12 left-4">
        <div class="flex space-x-2 text-lg font-mono">
          <span>••••</span>
          <span>••••</span>
          <span>••••</span>
          <span>{{ card.lastFour }}</span>
        </div>
      </div>

      <!-- Card Holder Information -->
      <div class="absolute bottom-4 left-4 flex justify-between w-full pr-8">
        <div>
          <p class="text-sm font-medium">{{ card.holderName }}</p>
        </div>
        <div class="text-right">
          <p class="text-sm">{{ card.expiryDate }}</p>
        </div>
      </div>
    </div>
  </article>
</template>
