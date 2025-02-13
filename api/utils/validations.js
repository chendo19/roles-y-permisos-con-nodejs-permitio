import HttpError from "./http-error.js"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    if (!token) {
        return next(new HttpError("Authentication failed", 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return next(new HttpError("Invalid token", 401))
    }
}

export const verifyTokenOnFrontend = async (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}