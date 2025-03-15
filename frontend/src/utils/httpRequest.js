import axios from "axios"
import { ref } from "vue"
import { handleToast } from "./handleToast"

axios.defaults.baseURL = 'https://api.devtestcode.com'

const httpRequest = () => {
    const isLoading = ref(false)

    const axiosCall = async (
        method = 'get',
        url,
        params = {},
        config = {}
    ) => {
        try {
            isLoading.value = true

            const response = await axios({ 
                method: method.toLowerCase(),
                url,
                data: params,
                headers: {
                    'Content-Type': 'application/json'
                },
                ...config
             })

            return response?.data
        } catch (error) {
            console.log('error', error)
            const errors = error?.response?.data?.message || 'Something went wrong'
            handleToast({ type: 'error', messages: errors })
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        axiosCall
    }
}

export default httpRequest