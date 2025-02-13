import Comment from "../models/comment.js"
import { checkPermissions } from "../utils/permit.js"
import HttpError from "../utils/http-error.js"

export const getComments = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "read", resource: "Comments" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to read comments", 403))
    }

    let comments

    try {
        comments = await Comment.find()
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    res.status(200).json({ message: "Comments fetched successfully", data: comments, success: true })
}

export const createComment = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "create", resource: "Comments" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to create comments", 403))
    }

    const { content } = req.body

    const newComment = new Comment({
        content,
        creator: req.user.userId,
        post: '679ce5d6b81e75604f79642c'
    })

    try {
        await newComment.save()
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    res.status(201).json({ message: "Comment created successfully", data: newComment, success: true })
}

export const deleteComment = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "delete", resource: "Comments" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to delete comments", 403))
    }

    try {
        await Comment.findByIdAndDelete(req.params.id)
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    res.status(200).json({ message: "Comment deleted successfully", success: true })
}