import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import ToastPLugin from 'vue-toast-notification'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import VueForm from '@vueform/vueform'
import vueformConfig from './../vueform.config.js'
import App from './App.vue'

import './style.scss'
import 'vue-toast-notification/dist/theme-default.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/modal'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app.use(pinia).use(router).use(ToastPLugin).use(VueForm, vueformConfig).mount('#app')
