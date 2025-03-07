
<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore.js'
import httpRequest from './utils/httpRequest.js'
import { TolgeeProvider, useTolgee } from '@tolgee/vue'
const { axiosCall } = httpRequest()
const userStore = useAuthStore()
const router = useRouter()
const tolgee = useTolgee(['language'])
const { isAuthenticated } = storeToRefs(userStore)
const { logout } = userStore

const logoutHandler = async () => {
  const response = await axiosCall('GET', '/users/logout', {}, { withCredentials: true })

  if (response?.success) {
    logout()
    router.push({ name: 'login' })
  }
}

const changeLanguage = (lang) => {
  tolgee.value.changeLanguage(lang)
}
</script>

<template>
  <div class="loading-line hidden" id="loading-line"></div>
  <TolgeeProvider>
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
              <router-link class="nav-link" :to="{ name: 'login' }">{{ $t('login') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'register' }">{{ $t('register') }}</router-link>
            </li>
            <li class="nav-item">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ $t('change_language') }}
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#" @click.prevent="changeLanguage('en-US')">{{ $t('english') }}</a></li>
                  <li><a class="dropdown-item" href="#" @click.prevent="changeLanguage('es-MX')">{{ $t('spanish') }}</a></li>
                </ul>
              </div>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'profile' }">{{ $t('profile') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'users' }">{{ $t('users') }}</router-link>
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
            <li class="nav-item">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ $t('change_language') }}
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#" @click.prevent="changeLanguage('en-US')">{{ $t('english') }}</a></li>
                  <li><a class="dropdown-item" href="#" @click.prevent="changeLanguage('es-MX')">{{ $t('spanish') }}</a></li>
                </ul>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <main>
      <RouterView />
    </main>
  </TolgeeProvider>
</template>

<style scoped>

</style>
