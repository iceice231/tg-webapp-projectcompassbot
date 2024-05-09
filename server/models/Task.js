import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema(
    {
        nameTask: {
            type: String,
        },
        priority: {
            type: String,
            default: "Низкий"
        },
        status: {
            type: String,
            default: "В разработке"
        },
        dataStart: {
            type: Date,
            default: Date.now()
        },
        dataEnd: {
            type: Date,
            default: Date.now()
        },
        description: {
            type: String,
            default: ""
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        responsible: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]

    },
    {timestamps: true},
)

export default mongoose.model("Task", TaskSchema);