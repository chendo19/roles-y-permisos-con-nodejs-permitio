
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import httpRequest from '../utils/httpRequest.js'
const userStore = useAuthStore()
const router = useRouter()
const { axiosCall } = httpRequest()
const userForm = reactive({
    name: '',
    email: '',
    password: ''
})

const vueForm = reactive({
    size: 'md',
    displayErrors: false,
    schema: {
        name: {
          type: 'text',
          inputType: 'text',
          label: 'Name',
          attrs: {
            autofocus: true
          },
          rules: [
            'required',
            'min:2',
          ],
          fieldName: 'name',
        },
        email: {
          type: 'text',
          inputType: 'email',
          label: 'Email',
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
    const response = await axiosCall('POST', '/auth/signup', userForm, { withCredentials: true })

    if (response?.success) {
        userStore.setUserData(response.data)
        router.push({ name: 'home' })
    }
}
</script>

<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2>Registrar</h2>
                <Vueform v-bind="vueForm" :endpoint="false" @submit="submitHandler" v-model="userForm" sync />
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>