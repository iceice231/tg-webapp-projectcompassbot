import mongoose from "mongoose";

const PositionSchema = new mongoose.Schema(
    {
        namePosition: {
            type: String,
            unique: true,
        },
    },
    {timestamps: true},
)

export default mongoose.model("Position", PositionSchema);