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
        dateStart: {
            type: Date,
            default: Date.now()
        },
        dateEnd: {
            type: Date,
            default: Date.now()
        },
        description: {
            type: String,
            default: ""
        },
        comment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        responsible: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        filesDocuments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
        }],
        filesTechnical: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "File"
            }
        ]

    },
    {timestamps: true},
)

export default mongoose.model("Task", TaskSchema);