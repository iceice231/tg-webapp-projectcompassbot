import mongoose from "mongoose";

const TypeReportSchema = new mongoose.Schema(
    {
        nameTypeReport: {
            type: String,
            unique: true,
        },
    },
    {timestamps: true},
)

export default mongoose.model("TypeReport", TypeReportSchema);