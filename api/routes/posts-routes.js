import express from "express"
const router = express.Router()
import { createPost, updatePost, deletePost, getPosts } from "../controllers/posts-controller.js"
import { verifyToken } from "../utils/validations.js"
import { check } from "express-validator"

router.get("/get-all", 
    verifyToken, 
    getPosts
)

router.post("/create", 
    [
        check("title").not().isEmpty(),
        check("content").not().isEmpty()
    ], 
    verifyToken, 
    createPost
)

router.patch("/update/:id", 
    [
        check("title").not().isEmpty(),
        check("content").not().isEmpty()
    ], 
    verifyToken, 
    updatePost
)

router.delete("/delete/:id", 
    verifyToken, 
    deletePost
)

export default router