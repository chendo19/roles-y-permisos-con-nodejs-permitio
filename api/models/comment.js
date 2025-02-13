import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
}, {
    timestamps: true
})

const Comment = mongoose.model("Comment", commentSchema)

commentSchema.plugin(uniqueValidator)

export default Comment