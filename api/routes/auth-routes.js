import express from "express"
import { check } from "express-validator"
import { signup, login, validateToken } from "../controllers/auth-controller.js"

const router = express.Router()

router.post("/signup", 
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 })
    ], 
    signup
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