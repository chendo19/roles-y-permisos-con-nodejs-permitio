<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['deleteHandler', 'roleHandler', 'editHandler'])

const emitDeleteHandler = ({ user, index }) => {
    emit('deleteHandler', { user, index })
}

const emitEditHandler = ({ user, index }) => {
    emit('editHandler', { user, index })
}

const emitRoleHandler = ({ userDbId, userPermitID, currentRole, newRole, index }) => {
    emit('roleHandler', { userDbId, userPermitID, currentRole, newRole, index })
}

const props = defineProps({
    index: {
        type: Number,
        required: true
    },
    user: {
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
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role.toUpperCase() }}</td>
        <td>
            <button class="btn btn-primary" :disabled="isLoading" @click="emitEditHandler({ user, index })">Edit</button>
        </td>
        <td>
            <button class="btn btn-danger" :disabled="isLoading" @click="emitDeleteHandler({ user, index })">Delete</button>
        </td>
        <td>
            <button class="btn btn-secondary" :disabled="isLoading" @click="emitRoleHandler({ userDbId: user._id, userPermitID: user.permit_id, currentRole: user.role, newRole: user.role === 'editor' ? 'moderator' : 'editor', index })">
                {{ user.role === 'editor' ? 'Make Moderator' : 'Make Editor' }}
            </button>
        </td>
    </tr>
</template>



<style lang="scss" scoped>

</style>