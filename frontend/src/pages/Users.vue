
<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { handleToast } from '../utils/handleToast'
import httpRequest from '../utils/httpRequest'
import SingleUser from '../components/SingleUser.vue'
const { axiosCall, isLoading } = httpRequest()
const users = reactive([])
const loadingLine = ref(document.getElementById('loading-line'))
const showModal = ref(false)
const editedUserId = ref(null)
const editedUserIndex = ref(null)
const editedUserPermitId = ref(null)
const userAction = ref('new')
const userForm = reactive({
    name: '',
    email: '',
    password: ''
})

const vueForm = reactive({
    size: 'md',
    displayErrors: false,
    schema: {
        name: {
          type: 'text',
          inputType: 'text',
          label: 'Name',
          attrs: {
            autofocus: true
          },
          rules: [
            'required',
            'min:2',
          ],
          fieldName: 'name',
        },
        email: {
          type: 'text',
          inputType: 'email',
          label: 'Email',
          rules: [
            'required',
            'max:255',
            'email',
          ],
          fieldName: 'email',
        },
        submit: {
          type: 'button',
          submits: true,
          buttonLabel: 'Submit',
          full: true,
        },
    },
})

onMounted(async () => {
    try {
        loadingLine.value.classList.remove('hidden')
        const response = await axiosCall('GET', '/users/get-all', {}, { withCredentials: true })

        if (response?.success) {
            users.push(...response.data)
        }
        
    } catch (error) {
        handleToast({ type: 'error', messages: error.message })
    } finally {
        loadingLine.value.classList.add('hidden')
    }
})

const deleteUserHandler = async ({ user, index }) => {
    const response = await axiosCall('DELETE', `/users/delete/${user._id}/${user.permit_id}`, {}, { withCredentials: true })

    if (response?.success) {
        users.splice(index, 1)
        handleToast({ type: 'success', messages: response.message })
    }
}

const updateRoleHandler = async ({ userDbId, userPermitID, currentRole, newRole, index }) => {
    const userData = {
        user_permit_id: userPermitID,
        current_role: currentRole,
        new_role: newRole
    }

    const response = await axiosCall('PATCH', `/users/update-role/${userDbId}`, userData, { withCredentials: true })

    if (response?.success) {
        users[index].role = newRole
        handleToast({ type: 'success', messages: response.message })
    }
}

const userProxyForm = computed({
    get() {
        return userForm
    },
    set(newvalue) {
        Object.assign(userForm, newvalue)
    }
})

const closeForm = () => {
    showModal.value = false
    userForm.name = ''
    userForm.email = ''
    userForm.password = ''
    editedUserId.value = null
    editedUserIndex.value = null
    editedUserPermitId.value = null
    userAction.value = 'new'
}

const editUserHandler = async ({ user, index }) => {
    showModal.value = true
    userForm.name = user.name
    userForm.email = user.email
    editedUserId.value = user._id
    editedUserIndex.value = index
    editedUserPermitId.value = user.permit_id
    userAction.value = 'edit'
}

const submitHandler = async () => {
    let response
    if (userAction.value === 'new') {
        userForm.password = '123123' // un string random
        response = await axiosCall('POST', '/users/create', userForm, { withCredentials: true })
    } else {
        response = await axiosCall('PATCH', `/users/update/${editedUserId.value}/${editedUserPermitId.value}`, userForm, { withCredentials: true })
    }

    if (response?.success) {
        if (userAction.value === 'new') {
            users.push({
                name: userForm.name,
                email: userForm.email,
                role: 'moderator'
            })
        } else {
            users[editedUserIndex.value].name = userForm.name
            users[editedUserIndex.value].email = userForm.email
        }

        closeForm()
        handleToast({ type: 'success', messages: response.message })
    }
}
</script>

<template>
    <div class="container my-5">
        <div class="row mb-3">
            <div class="col-4">
                <button class="btn btn-primary" @click="showModal = true">{{ $t('add_user') }}</button>
            </div>
            
        </div>
        <div class="row">
            <table  class="table">
                <thead>
                    <tr>
                        <th>{{ $t('name') }}</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <SingleUser v-for="(user, index) in users"
                        :key="index"
                        :index="index"
                        :user="user"
                        :isLoading="isLoading"
                        @delete-handler="deleteUserHandler"
                        @role-handler="updateRoleHandler"
                        @edit-handler="editUserHandler"
                    />
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal-backdrop" :class="showModal ? 'show' : ''"></div>
    <div class="form-modal" :class="showModal ? 'show' : ''">
        <div class="form-modal--header">
            <h3>{{ userAction.toUpperCase() }} USER</h3>
            <button @click="closeForm" class="btn-close"></button>
        </div>
        <div class="form-modal--footer">
            <Vueform 
                v-bind="vueForm" 
                :endpoint="false" 
                @submit="submitHandler" 
                v-model="userProxyForm" 
                sync 
            />
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>