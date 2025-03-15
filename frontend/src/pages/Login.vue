
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import httpRequest from '../utils/httpRequest.js'

const userStore = useAuthStore()
const router = useRouter()
const { axiosCall, isLoading } = httpRequest()

const userForm = reactive({
    email: '',
    password: ''
})

const submitHandler = async () => {
    const response = await axiosCall('POST', '/auth/login', userForm, { withCredentials: true })

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
                <h2>{{ $t('login') }}</h2>
                <form @submit.prevent="submitHandler">
                  <input v-model="userForm.email" placeholder="Email" type="email" class="form-control mb-3">
                  <input v-model="userForm.password" type="password" placeholder="Password" class="form-control mb-3">
                  <button type="submit" :disabled="isLoading" class="btn btn-primary">
                    {{ isLoading ? 'Loading...' : 'Login' }}
                  </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>