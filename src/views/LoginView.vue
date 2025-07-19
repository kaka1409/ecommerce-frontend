<script setup>
  // Icons
  import HeartIcon from '@/assets/icons/HeartIcon.vue';
  import NextArrowIcon from '@/assets/icons/NextArrowIcon.vue';
  import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'

  // packages
  import { useToast } from 'vue-toastification'; const toast = useToast();
  import axios from 'axios';
  import { reactive, ref } from 'vue';
  import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
  import * as yup from 'yup';

  // Form rules
  const schema = yup.object({
    email:
      yup.string()
      .required()
      .email('Please enter a valid email'),

    password:
      yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const { meta: formMeta } = useForm({ validationSchema: schema });

  const formData = reactive({
    email: '',
    password: '',
    isFormValid: formMeta.value.valid
  })

  const isPasswordVisible = ref(false)

  const login = async () => {
    try {
      // Radmin  http://26.16.186.88/api/v1/users/login
      // Tailscale    http://100.81.52.73/api/v1/users/login

      const response = axios.post('http://26.16.186.88/api/v1/users/login',
        {
          "email": formData.email,
          "password": formData.password
        },
        {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          }
        }
      )

      const axiosResponse = await response
      const data = axiosResponse.data

      if (data.status === 200) {
        // Success
        toast.success("Logged in successful")

        // Store access token
        localStorage.setItem('accessToken', data.accessToken)

        // Redirect to home page
        setTimeout(() => {
          window.location.href = '/home'
        }, 1000)

      } else {
        // Error handling here
        toast.error(data.message)
        throw new Error("No data received")
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Connection timmed out")
      }
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
    <div class="relative pt-70 z-10">
      <h1
        class="font-nunito-sans text-5xl font-bold text-gray-900 text-left "
      >Login</h1>

      <div class="mt-2 mb-10">
        <span class="font-nunito-sans text-gray-900 text-lg">Good to see you back! </span>
        <HeartIcon />
      </div>

      <Form :validation-schema="schema" @submit="login">
        <div>
          <Field
            class="w-full h-15 p-2 pl-4 bg-[#f0f0f0] rounded-full font-poppins text-lg text-gray-900 focus:outline-none "
            v-model="formData.email"
            type="email"
            name="email"
            placeholder="e.g abc123@gmail.com"
            autocomplete="off"
          />
          <span class="text-white">
            -<ErrorMessage name="email" class="inline text-red-600 text-sm" />
          </span>
        </div>

        <div>
          <div class="flex items-center justify-start bg-[#f0f0f0] rounded-full">
            <Field
              class="w-[88%] h-15 p-2 pl-4 font-poppins text-lg text-gray-900 focus:outline-none "
              v-model="formData.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              name="password"
              placeholder="Your password"
              autocomplete="off"
            />
            <button
              type="button"
              @click="isPasswordVisible = !isPasswordVisible"
            >
              <component
                :is="isPasswordVisible ? EyeIcon : EyeSlashIcon"
                class="h-5 w-5 text-gray-500"
              />
            </button>
          </div>
          <span class="text-white">
            -<ErrorMessage name="password" class="inline text-red-600 text-sm" />
          </span>
        </div>

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
            <NextArrowIcon />
          </div>
        </RouterLink>
      </div>
    </div>


  </div>
</template>
