
<script setup>
    import { storeToRefs } from 'pinia'
    import { useAuthStore } from '../stores/authStore.js'
    const authStore = useAuthStore()
    const { name, role } = storeToRefs(authStore)
</script>

<template>
    <div>
        <h1>Profile - {{ name }} - {{ role }}</h1>
    </div>
</template>


<style lang="scss" scoped>

</style>