<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['deleteHandler'])

const emitDeleteHandler = ({ comment, index }) => {
    emit('deleteHandler', { comment, index })
}

const props = defineProps({
    index: {
        type: Number,
        required: true
    },
    comment: {
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
        <td>{{ comment.content }}</td>
        <td>
            <button class="btn btn-danger" :disabled="isLoading" @click="emitDeleteHandler({ comment, index })">Delete</button>
        </td>
    </tr>
</template>



<style lang="scss" scoped>

</style>