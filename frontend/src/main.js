import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router.js'
import ToastPLugin from 'vue-toast-notification'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import VueForm from '@vueform/vueform'
import vueformConfig from '../vueform.config.js'
import { Tolgee, DevTools, VueTolgee, FormatSimple } from '@tolgee/vue'
import App from './App.vue'

import './style.scss'
import 'vue-toast-notification/dist/theme-default.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    language: 'es-MX',
    apiUrl: import.meta.env.VITE_APP_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_APP_TOLGEE_API_KEY,
})

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app
.use(pinia)
.use(router)
.use(ToastPLugin)
.use(VueTolgee, { tolgee })
.use(VueForm, vueformConfig)
.mount('#app')
