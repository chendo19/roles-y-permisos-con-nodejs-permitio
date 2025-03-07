
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import httpRequest from '../utils/httpRequest.js'
const userStore = useAuthStore()
const router = useRouter()
const { axiosCall, isLoading } = httpRequest()
const userForm = reactive({
    name: '',
    email: '',
    password: ''
})

const submitHandler = async () => {
    const response = await axiosCall('POST', '/auth/register', userForm, { withCredentials: true })

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
                <Vueform :endpoint="false" @submit="submitHandler" v-model="userForm" :display-errors="false" sync>
                  <TextElement
                    name="name"
                    input-type="text"
                    :rules="[
                      'required',
                      'max:255',
                    ]"
                    placeholder="Name"
                    field-name="Name"
                  />
                  <TextElement
                    name="email"
                    input-type="email"
                    :rules="[
                      'required',
                      'max:255',
                      'email',
                    ]"
                    placeholder="Email"
                    field-name="Email"
                  />
                  <TextElement
                    name="password"
                    input-type="password"
                    :rules="[
                      'required',
                      'min:6',
                    ]"
                    field-name="Password"
                    placeholder="Password"
                  />
                  <ButtonElement
                    name="register"
                    :submits="true"
                    :button-label="isLoading ? '' : 'Register'"
                    :full="true"
                    :disabled="isLoading"
                  ></ButtonElement>
                </Vueform>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>