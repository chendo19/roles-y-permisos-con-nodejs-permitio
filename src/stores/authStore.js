import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('user', () => {
    const permit_id = ref('')
    const name = ref('')
    const email = ref('')
    const role = ref('')
    const isAuthenticated = ref(false)

    function $reset() {
        permit_id.value = ''
        name.value = ''
        email.value = ''
        role.value = ''
        isAuthenticated.value = false
    }

    function setUserData(user) {
        permit_id.value = user.permit_id
        name.value = user.name
        email.value = user.email
        role.value = user.role
        isAuthenticated.value = true
    }

    function logout() {
        $reset()
    }

    return {
        permit_id,
        name,
        email,
        role,
        isAuthenticated,
        setUserData,
        logout
    }
},{
    persist: true
})