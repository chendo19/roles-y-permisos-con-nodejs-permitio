import express from "express"
const router = express.Router()
import { getComments, deleteComment, createComment } from "../controllers/comments-controller.js"
import { verifyToken } from "../utils/validations.js"

router.get("/get-all", 
    verifyToken, 
    getComments
)

router.post("/create", 
    verifyToken, 
    createComment
)

router.delete("/delete/:id", 
    verifyToken, 
    deleteComment
)

export default router