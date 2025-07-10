<script setup>
  import axios from 'axios';
  import { reactive } from 'vue';

  const formData = reactive({
    email: '',
    password: ''
  })

  const login = async () => {
    try {
      const response = axios.post('http://100.81.52.73/api/v1/users/login',
        {
          "email": formData.email,
          "password": formData.password
        },
        {
          headers: { 'Content-Type': 'application/json'}
          // accept: */*
          // authorization: Bearer ${accesstoken}
        }
      )
      const data = await response

      if (data) {
        // Success handling here

        console.log(data)
      } else {
        // Error handling here
        throw new Error("No data received")
      }
    } catch (error) {
      throw new Error("Error logging in ", error);
    }
  }

</script>

<template>
  <div class="relative top-0 left-0 p-4">
    <!-- Top left corner bubble -->
    <div class="absolute top-0 left-0">
      <svg
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="138px"
        height="151px"
        transform="translate(-20, -90), scale(3)"
      >
        <defs>
          <pattern id="BGPattern" patternUnits="userSpaceOnUse" alignment="0 0" imageRepeat="None"/>
          <mask fill="white" id="Clip2">
            <path
            d="M 0 82.28473497563981
              C 0 44.3343325041137
              36.308516581001776
              57.85280051420972
              69 13.569460423549138
              C 101.69148724588241
              -30.713879667111446
              138 44.3343325041137
              138 82.28473497563981
              C 138 120.23511839170496
              107.10765346887084 151
              69 151  C 30.892354184897517 151
              0 120.23511839170496
              0 82.28473497563981  Z "
              fill-rule="evenodd"/>
          </mask>
        </defs>
        <g transform="matrix(1 0 0 1 -313 -209 )">
          <path
            d="M 0 82.28473497563981
            C 0 44.3343325041137
            36.308516581001776
            57.85280051420972
            69 13.569460423549138
            C 101.69148724588241
            -30.713879667111446
            138 44.3343325041137
            138 82.28473497563981
            C 138 120.23511839170496
            107.10765346887084 151
            69 151  C 30.892354184897517 151
            0 120.23511839170496
            0 82.28473497563981  Z "
            fill-rule="nonzero"
            fill="rgba(7, 247, 182, 1)"
            stroke="none"
            transform="matrix(1 0 0 1 313 209 )"
            class="fill"
          />
          <path
            d="M 0 82.28473497563981  C 0 44.3343325041137  36.308516581001776 57.85280051420972  69 13.569460423549138  C 101.69148724588241 -30.713879667111446  138 44.3343325041137  138 82.28473497563981  C 138 120.23511839170496  107.10765346887084 151  69 151  C 30.892354184897517 151  0 120.23511839170496  0 82.28473497563981  Z " stroke-
            width="0"
            fill="none"
            transform="matrix(1 0 0 1 313 209 )"
            class="stroke"
            mask="url(#Clip2)"
          />
        </g>
      </svg>
    </div>

    <!-- Overalped top left corner bubble -->
    <div class="absolute top-0 left-0">
      <svg
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="138px"
        height="151px"
        opacity="0.2"
        transform="translate(70, 0), scale(2.5), rotate(150)"
      >
        <defs>
          <pattern id="BGPattern" patternUnits="userSpaceOnUse" alignment="0 0" imageRepeat="None"/>
          <mask fill="white" id="Clip2">
            <path
            d="M 0 82.28473497563981
              C 0 44.3343325041137
              36.308516581001776
              57.85280051420972
              69 13.569460423549138
              C 101.69148724588241
              -30.713879667111446
              138 44.3343325041137
              138 82.28473497563981
              C 138 120.23511839170496
              107.10765346887084 151
              69 151  C 30.892354184897517 151
              0 120.23511839170496
              0 82.28473497563981  Z "
              fill-rule="evenodd"/>
          </mask>
        </defs>
        <g transform="matrix(1 0 0 1 -313 -209 )">
          <path
            d="M 0 82.28473497563981
            C 0 44.3343325041137
            36.308516581001776
            57.85280051420972
            69 13.569460423549138
            C 101.69148724588241
            -30.713879667111446
            138 44.3343325041137
            138 82.28473497563981
            C 138 120.23511839170496
            107.10765346887084 151
            69 151  C 30.892354184897517 151
            0 120.23511839170496
            0 82.28473497563981  Z "
            fill-rule="nonzero"
            fill="rgba(7, 247, 182, 1)"
            stroke="none"
            transform="matrix(1 0 0 1 313 209 )"
            class="fill"
          />
          <path
            d="M 0 82.28473497563981  C 0 44.3343325041137  36.308516581001776 57.85280051420972  69 13.569460423549138  C 101.69148724588241 -30.713879667111446  138 44.3343325041137  138 82.28473497563981  C 138 120.23511839170496  107.10765346887084 151  69 151  C 30.892354184897517 151  0 120.23511839170496  0 82.28473497563981  Z " stroke-
            width="0"
            fill="none"
            transform="matrix(1 0 0 1 313 209 )"
            class="stroke"
            mask="url(#Clip2)"
          />
        </g>
      </svg>
    </div>

    <!-- Small floating bubble -->
    <div class="absolute top-0 left-0">
      <svg
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="138px"
        height="151px"
        transform="translate(320, 200), rotate(208)"
      >
        <defs>
          <pattern id="BGPattern" patternUnits="userSpaceOnUse" alignment="0 0" imageRepeat="None"/>
          <mask fill="white" id="Clip2">
            <path
            d="M 0 82.28473497563981
              C 0 44.3343325041137
              36.308516581001776
              57.85280051420972
              69 13.569460423549138
              C 101.69148724588241
              -30.713879667111446
              138 44.3343325041137
              138 82.28473497563981
              C 138 120.23511839170496
              107.10765346887084 151
              69 151  C 30.892354184897517 151
              0 120.23511839170496
              0 82.28473497563981  Z "
              fill-rule="evenodd"/>
          </mask>
        </defs>
        <g transform="matrix(1 0 0 1 -313 -209 )">
          <path
            d="M 0 82.28473497563981
            C 0 44.3343325041137
            36.308516581001776
            57.85280051420972
            69 13.569460423549138
            C 101.69148724588241
            -30.713879667111446
            138 44.3343325041137
            138 82.28473497563981
            C 138 120.23511839170496
            107.10765346887084 151
            69 151  C 30.892354184897517 151
            0 120.23511839170496
            0 82.28473497563981  Z "
            fill-rule="nonzero"
            fill="rgba(7, 247, 182, 1)"
            stroke="none"
            transform="matrix(1 0 0 1 313 209 )"
            class="fill"
          />
          <path
            d="M 0 82.28473497563981  C 0 44.3343325041137  36.308516581001776 57.85280051420972  69 13.569460423549138  C 101.69148724588241 -30.713879667111446  138 44.3343325041137  138 82.28473497563981  C 138 120.23511839170496  107.10765346887084 151  69 151  C 30.892354184897517 151  0 120.23511839170496  0 82.28473497563981  Z " stroke-
            width="0"
            fill="none"
            transform="matrix(1 0 0 1 313 209 )"
            class="stroke"
            mask="url(#Clip2)"
          />
        </g>
      </svg>
    </div>

    <!-- Bottom right corner bubble -->
    <div class="absolute top-145 right-0 z-0">
      <svg
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="138px"
        height="151px"
        opacity="0.2"
        transform="translate(0, 0), scale(2.5), rotate(120)"
      >
        <defs>
          <pattern id="BGPattern" patternUnits="userSpaceOnUse" alignment="0 0" imageRepeat="None"/>
          <mask fill="white" id="Clip2">
            <path
            d="M 0 82.28473497563981
              C 0 44.3343325041137
              36.308516581001776
              57.85280051420972
              69 13.569460423549138
              C 101.69148724588241
              -30.713879667111446
              138 44.3343325041137
              138 82.28473497563981
              C 138 120.23511839170496
              107.10765346887084 151
              69 151  C 30.892354184897517 151
              0 120.23511839170496
              0 82.28473497563981  Z "
              fill-rule="evenodd"/>
          </mask>
        </defs>
        <g transform="matrix(1 0 0 1 -313 -209 )" >
          <path
            d="M 0 82.28473497563981
            C 0 44.3343325041137
            36.308516581001776
            57.85280051420972
            69 13.569460423549138
            C 101.69148724588241
            -30.713879667111446
            138 44.3343325041137
            138 82.28473497563981
            C 138 120.23511839170496
            107.10765346887084 151
            69 151  C 30.892354184897517 151
            0 120.23511839170496
            0 82.28473497563981  Z "
            fill-rule="nonzero"
            fill="rgba(7, 247, 182, 1)"
            stroke="none"
            transform="matrix(1 0 0 1 313 209 )"
            class="fill"
          />
          <path
            d="M 0 82.28473497563981  C 0 44.3343325041137  36.308516581001776 57.85280051420972  69 13.569460423549138  C 101.69148724588241 -30.713879667111446  138 44.3343325041137  138 82.28473497563981  C 138 120.23511839170496  107.10765346887084 151  69 151  C 30.892354184897517 151  0 120.23511839170496  0 82.28473497563981  Z " stroke-
            width="0"
            fill="none"
            transform="matrix(1 0 0 1 313 209 )"
            class="stroke"
            mask="url(#Clip2)"
          />
        </g>
      </svg>
    </div>

    <!-- Login form -->
    <div class="relative pt-75 z-10">
      <h1
        class="font-nunito-sans text-5xl font-bold text-gray-900 text-left "
      >Login</h1>

      <div class="mt-2 mb-10">
        <span class="font-nunito-sans text-gray-900 text-lg">Good to see you back! </span>
        <!-- Heart Emoji -->
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" width="16px" height="15px" class="inline-block">
          <defs>
            <pattern id="BGPattern" patternUnits="userSpaceOnUse" alignment="0 0" imageRepeat="None" />
            <mask fill="white" id="Clip5">
              <path d="M 16 4.237499785227165  C 16 1.908749683443517  14.073079764061099 0.022500022411078444  11.692309239423873 0  C 11.680770404919903 0  11.665386249986533 0  11.65384837322115 0  C 10.126924785197192 0  8.776925204207824 0.7875000840415441  8.000000957738587 1.9500000747035946  C 7.223078626746526 0.7875000840415441  5.873078088018571 0  4.346154499994613 0  C 4.334616623229231 0  4.319231510557272 0  4.3076936337918905 0  C 1.9269240668932517 0.022500022411078444  0 1.908749683443517  0 4.237499785227165  C 0 5.624999533102533  0.6230767112693508 7.5937502101038605  1.8384618239413097 9.213749956111638  C 4.1538470563305925 12.300001045850328  8.000000957738587 15  8.000000957738587 15  C 8.000000957738587 15  11.846156535189111 12.300001045850328  14.161540330970512 9.213749956111638  C 15.376925922511765 7.5937502101038605  16 5.624999533102533  16 4.237499785227165  Z " fill-rule="evenodd"/>
            </mask>
          </defs>
          <g transform="matrix(1 0 0 1 -220 -412 )">
            <path d="M 16 4.237499785227165  C 16 1.908749683443517  14.073079764061099 0.022500022411078444  11.692309239423873 0  C 11.680770404919903 0  11.665386249986533 0  11.65384837322115 0  C 10.126924785197192 0  8.776925204207824 0.7875000840415441  8.000000957738587 1.9500000747035946  C 7.223078626746526 0.7875000840415441  5.873078088018571 0  4.346154499994613 0  C 4.334616623229231 0  4.319231510557272 0  4.3076936337918905 0  C 1.9269240668932517 0.022500022411078444  0 1.908749683443517  0 4.237499785227165  C 0 5.624999533102533  0.6230767112693508 7.5937502101038605  1.8384618239413097 9.213749956111638  C 4.1538470563305925 12.300001045850328  8.000000957738587 15  8.000000957738587 15  C 8.000000957738587 15  11.846156535189111 12.300001045850328  14.161540330970512 9.213749956111638  C 15.376925922511765 7.5937502101038605  16 5.624999533102533  16 4.237499785227165  Z " fill-rule="nonzero" fill="rgba(7, 247, 182, 1)" stroke="none" transform="matrix(1 0 0 1 220 412 )" class="fill"/>
            <path d="M 16 4.237499785227165  C 16 1.908749683443517  14.073079764061099 0.022500022411078444  11.692309239423873 0  C 11.680770404919903 0  11.665386249986533 0  11.65384837322115 0  C 10.126924785197192 0  8.776925204207824 0.7875000840415441  8.000000957738587 1.9500000747035946  C 7.223078626746526 0.7875000840415441  5.873078088018571 0  4.346154499994613 0  C 4.334616623229231 0  4.319231510557272 0  4.3076936337918905 0  C 1.9269240668932517 0.022500022411078444  0 1.908749683443517  0 4.237499785227165  C 0 5.624999533102533  0.6230767112693508 7.5937502101038605  1.8384618239413097 9.213749956111638  C 4.1538470563305925 12.300001045850328  8.000000957738587 15  8.000000957738587 15  C 8.000000957738587 15  11.846156535189111 12.300001045850328  14.161540330970512 9.213749956111638  C 15.376925922511765 7.5937502101038605  16 5.624999533102533  16 4.237499785227165  Z " stroke-width="0" stroke-dasharray="0" stroke="rgba(121, 121, 121, 1)" fill="none" transform="matrix(1 0 0 1 220 412 )" class="stroke" mask="url(#Clip5)"/>
          </g>
        </svg>
      </div>

      <form @submit.prevent="login">
        <input
          class="w-full h-15 p-2 pl-4 bg-[#f0f0f0] rounded-full font-poppins text-lg text-gray-900 focus:outline-none "
          v-model="formData.email"
          type="email"
          name="email"
          placeholder="e.g abc123@gmail.com"
          autocomplete="off"
        >

        <input
          class="w-full h-15 p-2 mt-4 pl-4 bg-[#f0f0f0] rounded-full font-poppins text-lg text-gray-900 focus:outline-none "
          v-model="formData.password"
          type="password"
          name="password"
          placeholder="Your password"
          autocomplete="off"
        >

        <button
          class="w-full h-15 p-2 mt-8 bg-[#07f7b6] rounded-full font-poppins font-bold text-xl text-white hover:bg-white-900 "
          type="submit"
        >Login</button>
      </form>

      <RouterLink to="/" class="block mx-auto w-fit">
        <button
          class="font-poppins text-lg text-black mt-3"
        >Cancel</button>
      </RouterLink>

      <div class="block w-full mt-10">
        <RouterLink
          to="/register"
          class="block w-full flex items-center justify-center gap-2 font-poppins font-bold text-md text-[#07f7b6]"
        >
          <span>
            Don't have an account?
          </span>

          <div class="flex items-center justify-center w-8 h-8 bg-[#07f7b6] rounded-full ">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" width="14px" height="11px">
              <defs>
                <pattern id="BGPattern" patternUnits="userSpaceOnUse" alignment="0 0" imageRepeat="None"/>
                <mask fill="white" id="Clip21">
                  <path d="M 14 5.500002763711231  L 8.311406992293996 0  L 7.169025075914857 1.1627928089238728  L 10.805994133684031 4.686045586495535  L 0 4.686045586495535  L 0 6.313952571030311  L 10.805994133684031 6.313952571030311  L 7.169025075914857 9.837209033550282  L 8.311406992293996 11  L 14 5.500002763711231  Z " fill-rule="evenodd"/>
                </mask>
              </defs>
              <g transform="matrix(1 0 0 1 -271 -748 )">
                <path d="M 14 5.500002763711231  L 8.311406992293996 0  L 7.169025075914857 1.1627928089238728  L 10.805994133684031 4.686045586495535  L 0 4.686045586495535  L 0 6.313952571030311  L 10.805994133684031 6.313952571030311  L 7.169025075914857 9.837209033550282  L 8.311406992293996 11  L 14 5.500002763711231  Z " fill-rule="nonzero" fill="rgba(255, 255, 255, 1)" stroke="none" transform="matrix(1 0 0 1 271 748 )" class="fill"/>
                <path d="M 14 5.500002763711231  L 8.311406992293996 0  L 7.169025075914857 1.1627928089238728  L 10.805994133684031 4.686045586495535  L 0 4.686045586495535  L 0 6.313952571030311  L 10.805994133684031 6.313952571030311  L 7.169025075914857 9.837209033550282  L 8.311406992293996 11  L 14 5.500002763711231  Z " stroke-width="0" stroke-dasharray="0" stroke="rgba(121, 121, 121, 1)" fill="none" transform="matrix(1 0 0 1 271 748 )" class="stroke" mask="url(#Clip21)"/>
              </g>
            </svg>
          </div>
        </RouterLink>
      </div>
    </div>


  </div>
</template>
