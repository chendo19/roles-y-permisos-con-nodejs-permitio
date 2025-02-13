import { permitObject } from "../config/permit.js"

export const checkPermissions = async ({ permitId, action, resource }) => {
    const permitted = await permitObject.check(permitId, action, resource)
    return permitted
}

export const createOrUpdatePermitUser = async ({ permitId, email, name }) => {
    try {
        const permitUser = await permitObject.api.syncUser({
            key: permitId,
            email,
            first_name: name,
            last_name: '',
            attributes: {}
        })

        console.log(permitUser)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const assignPermitRole = async ({ permitId, role }) => {
    try {
        await permitObject.api.assignRole(JSON.stringify({
            role,
            tenant: 'default',
            user: permitId
        }))
    } catch (error) {
        throw new Error(error.message)
    }
}

export const unassignPermitRole = async ({ permitId, role }) => {
    try {
        const unassignedRole = {
            role: role,
            tenant: 'default',
            user: permitId
        }
        const response = await permitObject.api.unassignRole(JSON.stringify(unassignedRole))
        console.log(response)
    } catch (err) {
        throw new Error(err.message)
    }
}

export const deletePermitUser = async ({ permitId }) => {
    try {
        const response = await permitObject.api.deleteUser(permitId)
        console.log(response)
    } catch (err) {
        throw new Error(err.message)
    }
}