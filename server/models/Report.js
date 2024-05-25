import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
    {
        typeReport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TypeReport"
        },
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        dateCompilation: {
            type: Date,
            default: Date.now()
        },
        nameReport: {
            type: String,
        },
        filesReport: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
        }],
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
        },
    },
    {timestamps: true},
)

export default mongoose.model("Report", ReportSchema);