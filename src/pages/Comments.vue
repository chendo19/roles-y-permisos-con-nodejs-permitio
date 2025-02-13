<script setup>
import { onMounted, reactive } from 'vue'
import { handleToast } from '../utils/handleToast'
import httpRequest from '../utils/httpRequest'
import SingleComponent from '../components/SingleComponent.vue'
const { axiosCall, isLoading } = httpRequest()
const comments = reactive([])

onMounted(async () => {
    try {
        const response = await axiosCall('GET', '/comments/get-all', {}, { withCredentials: true })
        if (response?.success) {
            comments.push(...response.data)
        }
        
    } catch (error) {
        handleToast({ type: 'error', messages: error.message })
    }
})

const deleteCommentHandler = async ({ comment, index }) => {
    const response = await axiosCall('DELETE', `/comments/delete/${comment._id}`, {}, { withCredentials: true })

    if (response?.success) {
        comments.splice(index, 1)
        handleToast({ type: 'success', messages: response.message })
    }
}
</script>

<template>
    <div class="container my-5">
        <div class="row">
            <table  class="table">
                <thead>
                    <tr>
                        <th>Contenido del mensaje</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <SingleComponent v-for="(comment, index) in comments"
                        :key="index"
                        :index="index"
                        :comment="comment"
                        :isLoading="isLoading"
                        @delete-handler="deleteCommentHandler"
                    />
                </tbody>
            </table>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>