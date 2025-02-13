import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "moderator" },
    permit_id: { type: String, required: true },
    posts: {
        type: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
        default: []
    },
    comments: {
        type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
        default: []
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
userSchema.plugin(uniqueValidator)

export default User