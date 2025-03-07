<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['deleteHandler', 'editHandler'])

const emitDeleteHandler = ({ post, index }) => {
    emit('deleteHandler', { post, index })
}

const emitEditHandler = ({ post, index }) => {
    emit('editHandler', { post, index })
}

const props = defineProps({
    index: {
        type: Number,
        required: true
    },
    post: {
        type: Object,
        required: true
    },
    isLoading: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <tr>
        <td>{{ post.title }}</td>
        <td>{{ post.content }}</td>
        <td>
            <button class="btn btn-primary" :disabled="isLoading" @click="emitEditHandler({ post, index })">Edit</button>
        </td>
        <td>
            <button class="btn btn-danger" :disabled="isLoading" @click="emitDeleteHandler({ post, index })">Delete</button>
        </td>
    </tr>
</template>



<style lang="scss" scoped>

</style>    