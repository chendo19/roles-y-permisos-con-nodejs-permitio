
<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { handleToast } from '../utils/handleToast'
import httpRequest from '../utils/httpRequest'
import SinglePost from '../components/SinglePost.vue'
const { axiosCall, isLoading } = httpRequest()
const posts = reactive([])
const loadingLine = ref(document.getElementById('loading-line'))
const showModal = ref(false)
const editedPostId = ref(null)
const editedPostIndex = ref(null)
const postAction = ref('new')
const postForm = reactive({
    title: '',
    content: ''
})

const vueForm = reactive({
    size: 'md',
    displayErrors: false,
    schema: {
        title: {
          type: 'text',
          inputType: 'text',
          label: 'Title',
          attrs: {
            autofocus: true
          },
          rules: [
            'required',
            'min:10',
            'max:50'
          ],
          fieldName: 'title',
        },
        content: {
          type: 'text',
          inputType: 'text',
          label: 'Content',
          rules: [
            'required',
            'max:255',
          ],
          fieldName: 'content',
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
        const response = await axiosCall('GET', '/posts/get-all', {}, { withCredentials: true })

        if (response?.success) {
            posts.push(...response.data)
        }
        
    } catch (error) {
        handleToast({ type: 'error', messages: error.message })
    } finally {
        loadingLine.value.classList.add('hidden')
    }
})

const deletePostHandler = async ({ post, index }) => {
    const response = await axiosCall('DELETE', `/posts/delete/${post._id}`, {}, { withCredentials: true })

    if (response?.success) {
        posts.splice(index, 1)
        handleToast({ type: 'success', messages: response.message })
    }
}

const postProxyForm = computed({
    get() {
        return postForm
    },
    set(newvalue) {
        Object.assign(postForm, newvalue)
    }
})

const closeForm = () => {
    showModal.value = false
    postForm.title = ''
    postForm.content = ''
    editedPostId.value = null
    editedPostIndex.value = null
    postAction.value = 'new'
}

const editPostHandler = async ({ post, index }) => {
    showModal.value = true
    postForm.title = post.title
    postForm.content = post.content
    editedPostId.value = post._id
    editedPostIndex.value = index
    postAction.value = 'edit'
}

const submitHandler = async () => {
    let response
    if (postAction.value === 'new') {
        response = await axiosCall('POST', '/posts/create', postForm, { withCredentials: true })
    } else {
        response = await axiosCall('PATCH', `/posts/update/${editedPostId.value}`, postForm, { withCredentials: true })
    }

    if (response?.success) {
        if (postAction.value === 'new') {
            posts.push({
                title: postForm.title,
                content: postForm.content
            })
        } else {
            posts[editedPostIndex.value].title = postForm.title
            posts[editedPostIndex.value].content = postForm.content
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
                <button class="btn btn-primary" @click="showModal = true">Add User</button>
            </div>
            
        </div>
        <div class="row">
            <table  class="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <SinglePost v-for="(post, index) in posts"
                        :key="index"
                        :index="index"
                        :post="post"
                        :isLoading="isLoading"
                        @delete-handler="deletePostHandler"
                        @edit-handler="editPostHandler"
                    />
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal-backdrop" :class="showModal ? 'show' : ''"></div>
    <div class="form-modal" :class="showModal ? 'show' : ''">
        <div class="form-modal--header">
            <h3>{{ postAction.toUpperCase() }} POST</h3>
            <button @click="closeForm" class="btn-close"></button>
        </div>
        <div class="form-modal--footer">
            <Vueform 
                v-bind="vueForm" 
                :endpoint="false" 
                @submit="submitHandler" 
                v-model="postProxyForm" 
                sync 
            />
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>