import './assets/main.css'
import router from '@/router'

import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { LoadingPlugin } from 'vue-loading-overlay';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
})
app.use(LoadingPlugin);
app.use(createPinia())
app.mount('#app')
