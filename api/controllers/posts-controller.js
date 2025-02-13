import { validationResult } from "express-validator"
import HttpError from "../utils/http-error.js"
import Post from "../models/post.js"
import { checkPermissions } from "../utils/permit.js"

export const getPosts = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "read", resource: "Posts" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to crete users", 403))
    }

    let posts

    try {
        posts = await Post.find()
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    res.status(200).json({ message: "Posts fetched successfully", data: posts, success: true })
}

export const createPost = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "create", resource: "Posts" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to create posts", 403))
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Validation failed, entered data is incorrect", 422))
    }

    const { title, content } = req.body

    const newPost = new Post({
        title,
        content,
        creator: req.user.userId
    })

    try {
        await newPost.save()
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    res.status(201).json({ message: "Post created successfully", data: newPost, success: true })
}

export const updatePost = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "update", resource: "Posts" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to update posts", 403))
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(new HttpError("Validation failed, entered data is incorrect", 422))
    }

    const { title, content } = req.body

    try {
        await Post.findByIdAndUpdate(req.params.id, {
                $set: {
                    title,
                    content
                }
            },
            { new: true }
        )
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    res.status(200).json({ message: "Post updated successfully", success: true })
}

export const deletePost = async (req, res, next) => {
    const isPermitted = await checkPermissions({ permitId: req.user.permit_id, action: "delete", resource: "Posts" })

    if (!isPermitted) {
        return next(new HttpError("You are not allowed to delete posts", 403))
    }

    try {
        await Post.findByIdAndDelete(req.params.id)
    } catch (err) {
        return next(new HttpError(err.message, 500))
    }

    res.status(200).json({ message: "Post deleted successfully", success: true })
}