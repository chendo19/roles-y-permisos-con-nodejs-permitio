
<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import httpRequest from '../utils/httpRequest.js'
import { register } from "@teamhanko/hanko-elements"

const userStore = useAuthStore()
const router = useRouter()
const { axiosCall } = httpRequest()
const hankoApi = import.meta.env.VITE_HANKO_API_URL

const userForm = reactive({
    email: '',
    password: ''
})

const vueForm = reactive({
    size: 'md',
    displayErrors: false,
    schema: {
        email: {
          type: 'text',
          inputType: 'email',
          label: 'Email',
          attrs: {
            autofocus: true
          },
          rules: [
            'required',
            'max:255',
            'email',
          ],
          fieldName: 'email',
        },
        password: {
          type: 'text',
          inputType: 'password',
          label: 'Password',
          rules: [
            'required',
            'min:6',
          ],
          fieldName: 'password',
        },
        login: {
          type: 'button',
          submits: true,
          buttonLabel: 'Login',
          full: true,
        },
    },
})

const submitHandler = async () => {
    const response = await axiosCall('POST', '/auth/login', userForm, { withCredentials: true })

    if (response?.success) {
        userStore.setUserData(response.data)
        router.push({ name: 'home' })
    }
}

const redirectAfterLogin = () => {
  router.push({ name: 'home' })
}

onMounted(() => {
  register(hankoApi)
    .catch((error) => {
      console.log('error: ', error)
    })
})
</script>

<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2>Login</h2>
                <Vueform v-bind="vueForm" :endpoint="false" @submit="submitHandler" v-model="userForm" sync />
            </div>
        </div>
    </div>

    <!-- <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
              <hanko-auth @onSessionCreated="redirectAfterLogin" />
            </div>
        </div>
    </div>-->
</template>


<style lang="scss" scoped>

</style>