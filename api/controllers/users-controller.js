import { validationResult } from "express-validator"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
import HttpError from "../utils/http-error.js"
import { createOrUpdatePermitUser, assignPermitRole, unassignPermitRole, checkPermissions, deletePermitUser } from "../utils/permit.js"

export const createUser = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "create", resource: "Users" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to crete users", 403))
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Validation failed, entered data is incorrect", 422))
    }

    const { name, email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email })
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    if (existingUser) {
        return next(new HttpError("User already exists", 422))
    }

    const session = await User.startSession()
    session.startTransaction()

    const hashedPassword = bcrypt.hashSync(password, 12)
    const permitId = email.split("@")[0] + Math.floor(Math.random() * 99999)
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        permit_id: permitId
    })

    try {
        await newUser.save({ session })
        await createOrUpdatePermitUser({ permitId, email, name })
        await assignPermitRole({ permitId, role: "moderator" })

        await session.commitTransaction()
        session.endSession()

    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        return next(new HttpError(err.message, 500))
    }

    res.status(201).json({
        message: "User created successfully",
        success: true
    })
}

export const getUsers = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "read", resource: "Users" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to crete users", 403))
    }

    let users

    try {
        users = await User.find({ role: { $ne: "admin" } }, '-password')
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    res.status(200).json({ message: "Users fetched successfully", data: users, success: true })
}

export const updateRole = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "changerole", resource: "Users" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to crete users", 403))
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Validation failed, entered data is incorrect", 422))
    }  
    
    const { user_permit_id, current_role, new_role } = req.body

    try {
        await assignPermitRole({ permitId: user_permit_id, role: new_role })
        await unassignPermitRole({ permitId: user_permit_id, role: current_role })
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    try {
        const user = {
            role: new_role,
        }

        await User.findByIdAndUpdate(req.params.id, { 
                $set: user
            },
            { new: true }
        )

    } catch (err) {
        return next(new HttpError('Something went wrong, try again:' + err , 500))
    }

    res.status(200).json({ message: "Role updated successfully", success: true })
}

export const updateUser = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "update", resource: "Users" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to update users", 403))
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Validation failed, entered data is incorrect", 422))
    }

    const { name, email } = req.body

    try {
        await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    name,
                    email
                }
            },
            { new: true }
        )

        await createOrUpdatePermitUser({ permitId: req.params.permit_id, email, name })
    } catch (err) {
        return next(new HttpError('Something went wrong, try again:' + err , 500))
    }

    res.status(200).json({ message: "User updated successfully", success: true })
}

export const deleteUser = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "delete", resource: "Users" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to delete users", 403))
    }

    try {
        await User.findByIdAndDelete(req.params.id)
        await deletePermitUser({ permitId: req.params.permit_id })
    } catch (err) {
        return next(new HttpError('Something went wrong, try again:' + err , 500))
    }
    
    res.status(200).json({ message: "User deleted successfully", success: true })
}

export const logOut = async (req, res, next) => {
    try {
        req.user = null
        res.clearCookie('access_token')
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    res.status(200).json({ message: "User logged out successfully", success: true })
}