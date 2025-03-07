import express from "express"
import { check } from "express-validator"
import { register, login, validateToken } from "../controllers/auth-controller.js"

const router = express.Router()

router.post("/register", 
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 })
    ], 
    register
)

router.post("/login", 
    [
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 })
    ], 
    login
)

router.post("/validate-token", 
    validateToken
)
export default router