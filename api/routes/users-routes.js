import express from "express"
const router = express.Router()
import { createUser, getUsers, updateRole, updateUser, deleteUser, logOut } from "../controllers/users-controller.js"
import { verifyToken } from "../utils/validations.js"
import { check } from "express-validator"

router.get("/get-all", 
    verifyToken, 
    getUsers
)

router.post("/create", 
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 })
    ], 
    verifyToken, 
    createUser
)

router.patch("/update-role/:id",
    [
        check("user_permit_id").not().isEmpty(),
        check("current_role").not().isEmpty(),
        check("new_role").not().isEmpty(),
    ], 
    verifyToken, 
    updateRole
)

router.patch("/update/:id/:permit_id",
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
    ], 
    verifyToken, 
    updateUser
)

router.delete("/delete/:id/:permit_id",
    verifyToken, 
    deleteUser
)

router.get('/logout', verifyToken, logOut)

export default router