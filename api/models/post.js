import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: { type: String, required: true, unique: true, minlength: 8 },
    content: { type: String, required: true },
    status: { type: String, required: true, enum: ["draft", "published", "archived"], default: "draft" },
    creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    comments: {
        type: [{ type: mongoose.Types.ObjectId, ref: "Comment", required: true }],
        default: []
    }
}, {
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)

postSchema.plugin(uniqueValidator)

export default Post