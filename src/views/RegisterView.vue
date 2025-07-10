<script setup>
  import axios from 'axios';
  import { reactive, ref } from 'vue';
  import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
  import * as yup from 'yup';

  // Form rules
  const schema = yup.object({
    username:
      yup.string()
      .required('Username is required'),

    email:
      yup.string()
      .required()
      .email('Please enter a valid email'),

    password:
      yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/,
        'Password must contain uppercase letters, numbers, and special characters'
      )
      .min(8, 'Password must be at least 8 characters'),

    confirmPassword:
      yup.string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),

    fullname:
      yup.string()
      .required('Fullname is required'),

    dob:
      yup.date()
      .required('Date of birth is required'),

    location:
      yup.string()
      .required('Location is required'),

    phone:
      yup.string()
      .required('Phone number is required')
  });

  const { meta: formMeta } = useForm({ validationSchema: schema });

  const state = reactive({
    step: 1,
    isFormValid: formMeta.value.valid
  })

  // Get current date in format YYYY-MM-DD
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const formData = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    dob: `${year}-${month}-${day}`,
    gender: 'male',
    location: '',
    phone: ''
  })

  const onSubmit = () => {
    console.log('form submitted')

    if (state.step === 1) {
      console.log("set step to 2")
      setRegisterStep(2)
    } else if (state.step === 2) {
      console.log("register")
      console.log(formData)
      // register()
    }
  }

  const setRegisterStep = (step) => {
    state.step = step
  }

  const register = async () => {
    try {
      const response = axios.post('http://100.81.52.73/api/v1/users/register',
        { // BODY
          "username": formData.username,
          "email": formData.email,
          "password": formData.password,
          "fullname": formData.fullname,
          "dateOfBirth": formData.dob,
          "gender": formData.gender,
          "address": formData.location,
          "phone": formData.phone
        },
        { // HEADERS
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          }
        }
      )

      const data = await response

      if (data.status === 200) {
        // Success handling
        window.location.href = "/login"

        // Toast message maybe

      } else {
        // Error handling
        throw new Error("No data received")
      }

    } catch (error) {
      // Error handling
      throw new Error("Error making register request", error);
    }
  }

</script>

<template>
  <div class="relative top-0 left-0 p-4">

    <!-- Back to login page -->
    <RouterLink
      v-if="state.step === 1"
      to="/login"
      class="relative top-0 left-0 z-10"
    >
      <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" width="25px" height="25px">
        <defs>
          <pattern id="BGPattern" patternUnits="userSpaceOnUse" alignment="0 0" imageRepeat="None"/>
          <mask fill="white" id="Clip67">
            <path d="M 25 14  L 25 11  L 5.984375 11  L 14.710937499999998 2.2109375  L 12.5 0  L 0 12.5  L 12.5 25  L 14.710937499999998 22.7890625  L 5.984375 14  L 25 14  Z " fill-rule="evenodd"/>
          </mask>
        </defs>
        <g transform="matrix(1 0 0 1 -30 -19 )">
          <path d="M 25 14  L 25 11  L 5.984375 11  L 14.710937499999998 2.2109375  L 12.5 0  L 0 12.5  L 12.5 25  L 14.710937499999998 22.7890625  L 5.984375 14  L 25 14  Z " fill-rule="nonzero" fill="rgba(0, 0, 0, 1)" stroke="none" transform="matrix(1 0 0 1 30 19 )" class="fill"/>
          <path d="M 25 14  L 25 11  L 5.984375 11  L 14.710937499999998 2.2109375  L 12.5 0  L 0 12.5  L 12.5 25  L 14.710937499999998 22.7890625  L 5.984375 14  L 25 14  Z " stroke-width="0" stroke-dasharray="0" stroke="rgba(255, 255, 255, 0)" fill="none" transform="matrix(1 0 0 1 30 19 )" class="stroke" mask="url(#Clip67)"/>
        </g>
      </svg>
    </RouterLink>

    <!-- Back to step 1 -->
    <button
      v-if="state.step === 2"
      @click="setRegisterStep(1)"
      class="block relative top-0 left-0 z-10"
    >
      <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" width="25px" height="25px">
        <defs>
          <pattern id="BGPattern" patternUnits="userSpaceOnUse" alignment="0 0" imageRepeat="None"/>
          <mask fill="white" id="Clip67">
            <path d="M 25 14  L 25 11  L 5.984375 11  L 14.710937499999998 2.2109375  L 12.5 0  L 0 12.5  L 12.5 25  L 14.710937499999998 22.7890625  L 5.984375 14  L 25 14  Z " fill-rule="evenodd"/>
          </mask>
        </defs>
        <g transform="matrix(1 0 0 1 -30 -19 )">
          <path d="M 25 14  L 25 11  L 5.984375 11  L 14.710937499999998 2.2109375  L 12.5 0  L 0 12.5  L 12.5 25  L 14.710937499999998 22.7890625  L 5.984375 14  L 25 14  Z " fill-rule="nonzero" fill="rgba(0, 0, 0, 1)" stroke="none" transform="matrix(1 0 0 1 30 19 )" class="fill"/>
          <path d="M 25 14  L 25 11  L 5.984375 11  L 14.710937499999998 2.2109375  L 12.5 0  L 0 12.5  L 12.5 25  L 14.710937499999998 22.7890625  L 5.984375 14  L 25 14  Z " stroke-width="0" stroke-dasharray="0" stroke="rgba(255, 255, 255, 0)" fill="none" transform="matrix(1 0 0 1 30 19 )" class="stroke" mask="url(#Clip67)"/>
        </g>
      </svg>
    </button>

    <div class="absolute top-0 left-0 z-0">
      <svg
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="138px"
        height="151px"
        opacity="0.2"
        transform="translate(0, -50), scale(2.5), rotate(150)"
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

    <div class="absolute top-0 left-0">
      <svg
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="138px"
        height="151px"
        transform="translate(320, 100), scale(1.5)"
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

    <div class="relative pt-25 z-10">
      <h1
        class="font-nunito-sans text-5xl font-bold text-gray-900 text-left "
      >
        Create account
      </h1>

      <div class="mt-4 mb-10">
        <span class="font-nunito-sans text-gray-900 text-xl">Step {{ state.step }} of 2</span>
      </div>

      <!-- Register Form -->
      <Form :validation-schema="schema" @submit="onSubmit">

        <!-- Step 1 -->
        <div v-show="state.step === 1">
          <div>
            <Field
              class="w-full h-15 p-2 mt-4 pl-4 bg-[#f0f0f0] rounded-full font-poppins text-lg text-gray-900 focus:outline-none "
              name="username"
              as="input"
              placeholder="Enter your username"
              autocomplete="off"
              v-model="formData.username"
            />
            <span class="text-white">
              -<ErrorMessage name="username" class="inline text-red-600 text-sm" />
            </span>
          </div>

          <div>
            <Field
              class="w-full h-15 p-2 pl-4 bg-[#f0f0f0] rounded-full font-poppins text-lg text-gray-900 focus:outline-none "
              name="email"
              type="email"
              as="input"
              placeholder="Enter your email"
              autocomplete="off"
              v-model="formData.email"
            />
            <span class="text-white">
              -<ErrorMessage name="email" class="inline text-red-600" />
            </span>
          </div>

          <div>
            <Field
              class="w-full h-15 p-2 pl-4 bg-[#f0f0f0] rounded-full font-poppins text-lg text-gray-900 focus:outline-none "
              name="password"
              type="password"
              as="input"
              placeholder="Enter your password"
              autocomplete="off"
              v-model="formData.password"
            />
            <span class="text-white">
              -<ErrorMessage name="password" class="inline text-red-600 text-sm" />
            </span>
          </div>

          <div>
            <Field
              class="w-full h-15 p-2 pl-4 bg-[#f0f0f0] rounded-full font-poppins text-lg text-gray-900 focus:outline-none "
              name="confirmPassword"
              type="password"
              as="input"
              placeholder="Enter your confirmPassword"
              autocomplete="off"
              v-model="formData.confirmPassword"
            />
            <span class="text-white">
              -<ErrorMessage name="confirmPassword" class="inline text-red-600 text-sm" />
            </span>
          </div>

          <button
            class="w-full h-15 p-2 mt-4 bg-[#07f7b6] rounded-full font-poppins font-bold text-xl text-white hover:bg-white-900 "
          >Next</button>
        </div>

        <!-- Step 2 -->
        <div v-if="state.step === 2">

          <div>
            <Field
              class="w-full h-15 p-2 pl-4 bg-[#f0f0f0] rounded-full font-poppins text-lg text-gray-900 focus:outline-none "
              name="fullname"
              as="input"
              placeholder="Enter your fullname"
              autocomplete="off"
              v-model="formData.fullname"
            />
            <span class="text-white">
              -<ErrorMessage name="fullname" class="inline text-red-600 text-sm" />
            </span>
          </div>

          <div>
            <div class="inline-block">
              <Field
                class="w-50 h-15 p-2 pl-4 bg-[#f0f0f0] rounded-full font-poppins text-lg text-gray-900 focus:outline-none  "
                name="dob"
                type="date"
                as="input"
                placeholder="Date of birth"
                autocomplete="off"
                v-model="formData.dob"
              />
              <span class="text-white">
                -<ErrorMessage name="dob" class="inline text-red-600 text-sm" />
              </span>
            </div>

            <div class="inline-block float-right w-30 h-15 bg-[#f0f0f0] rounded-4xl font-poppins text-lg text-gray-900">
              <div class="relative top-0 left-0 h-full">
                <select
                  v-model="formData.gender"
                  class="inline-block appearance-none float-right p-4 w-full h-full focus:outline-none"
                  name="gender"
                >
                  <option class="" value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <!-- Dropdown icon -->
                <div class="absolute top-5 right-2 h-full">
                  <svg class="transform -translate-y-1/2 mt-3 w-5 h-5 text-gray-500 my-au" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

              </div>
            </div>
          </div>

          <div>
            <Field
              class="w-full h-15 p-2 mt-4 pl-4 bg-[#f0f0f0] rounded-full font-poppins text-lg text-gray-900 focus:outline-none "
              name="location"
              as="input"
              placeholder="Enter your location"
              autocomplete="off"
              v-model="formData.location"
            />
            <span class="text-white">
              -<ErrorMessage name="location" class="inline text-red-600 text-sm" />
            </span>
          </div>

          <div>
            <Field
              class="w-full h-15 p-2 pl-4 bg-[#f0f0f0] rounded-full font-poppins text-lg text-gray-900 focus:outline-none "
              name="phone"
              as="input"
              placeholder="Enter your phone"
              autocomplete="off"
              v-model="formData.phone"
            />
            <span class="text-white">
              -<ErrorMessage name="phone" class="inline text-red-600 text-sm" />
            </span>
          </div>

          <button
            class="w-full h-15 p-2 mt-8 bg-[#07f7b6] rounded-full font-poppins font-bold text-xl text-white hover:bg-white-900 "
            type="submit"
          >Done</button>

        </div>

      </Form>

      <RouterLink to="/" class="block mx-auto w-fit">
        <button
          class="font-poppins text-lg text-black mt-3"
        >Cancel</button>
      </RouterLink>

    </div>
  </div>
</template>
