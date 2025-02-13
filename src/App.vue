
<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore.js'
import httpRequest from './utils/httpRequest.js'
const { axiosCall } = httpRequest()
const userStore = useAuthStore()
const router = useRouter()

const { isAuthenticated } = storeToRefs(userStore)
const { logout } = userStore

const logoutHandler = async () => {
  const response = await axiosCall('GET', '/users/logout', {}, { withCredentials: true })

  if (response?.success) {
    logout()
    router.push({ name: 'login' })
  }
}
</script>

<template>
  <div class="loading-line hidden" id="loading-line"></div>
  
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">Permissions App</router-link>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <template v-if="!isAuthenticated">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'profile' }">Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'users' }">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'posts' }">Posts</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'comments' }">Comments</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logoutHandler">Logout</a>
          </li>
        </template>
      </ul>
    </div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
