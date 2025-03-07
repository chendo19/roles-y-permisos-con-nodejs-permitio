import { validationResult } from "express-validator"
import User from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import HttpError from "../utils/http-error.js"
import { createOrUpdatePermitUser, assignPermitRole } from "../utils/permit.js"
import { verifyTokenOnFrontend } from "../utils/validations.js"

export const register = async (req, res, next) => {
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
        return next(new HttpError("User already exists, please login instead", 422))
    }

    const session = await User.startSession()
    session.startTransaction()
    let newUser, permitId

    try {
        const hashedPassword = bcrypt.hashSync(password, 12)
        permitId = email.split("@")[0] + Math.floor(Math.random() * 99999)

        newUser = new User({
            name,
            email,
            password: hashedPassword,
            permit_id: permitId
        })

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

    let token

    try {
        token = jwt.sign(
            { 
                userId: newUser.id,
                permit_id: permitId
            }, 
                process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        )
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    const { password: hashedPass, ...userData } = newUser._doc

    res.cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true
    }).status(201).json({ message: "User signed up successfully", data: userData, success: true })
}

export const login = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Validation failed, entered data is incorrect", 422))
    }

    const { email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email })
    } catch (err) {
        return next(new HttpError("Logging in failed, please try again later", 500))
    }

    if (!existingUser) {
        return next(new HttpError("User does not exist, please register instead", 422))
    }

    if (!bcrypt.compareSync(password, existingUser.password)) {
        return next(new HttpError("Incorrect password, please try again", 422))
    }

    let token

    try {
        token = jwt.sign(
            { 
                userId: existingUser.id,
                permit_id: existingUser.permit_id
            }, 
                process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        )
    } catch (err) {
        return next(new HttpError("Logging in failed, please try again later", 500))
    }

    const { password: hashedPass, ...userData } = existingUser._doc

    res.cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true
    }).status(200).json({ message: "User logged in successfully", data: userData, success: true })
}

export const validateToken = async (req, res, next) => {
    const token = req.cookies.access_token

    if (token) {
        const isValid = await verifyTokenOnFrontend(token)
        res.status(200).json({ message: "Token validation", data: isValid })
    } else {
        res.status(200).json({ message: "Token is invalid", data: false })
    }
}