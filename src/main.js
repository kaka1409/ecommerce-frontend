import '@/assets/main.css'
import router from '@/router'

import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
})
app.mount('#app')
