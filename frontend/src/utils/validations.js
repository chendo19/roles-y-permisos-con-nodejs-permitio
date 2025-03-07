import httpRequest from './httpRequest.js'
const { axiosCall } = httpRequest()

export const validateRouteToken = async () => {
    const response = await axiosCall('POST', '/auth/validate-token', {}, { withCredentials: true })
    return response?.data
}
    