import mongoose from "mongoose";
import User from "./User.js";
import Organization from "./Organization.js";


const ProjectSchema = new mongoose.Schema(
    {
        nameProject: {
            type: String,
            require: true,
        },
        dateStart: {
            type: Date,
            default: Date.now()
        },
        dateEnd: {
            type: Date,
            default: Date.now()
        },
        budget: {
            type: Number,
            default: 0,
        },
        responsible: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: ""
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            require: true
        },
        tasks: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Task"
            }
        ],
        files: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "File"
            }
        ]

    },
    {timestamps: true},
)

export default mongoose.model("Project", ProjectSchema);