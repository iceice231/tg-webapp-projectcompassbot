import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        userName: {
            type: String,
            default: ""
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        },
        textComment: {
            type: String,
            default: ""
        },
        files: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
        }]
    },
    {timestamps: true},
)

export default mongoose.model("Comment", CommentSchema);