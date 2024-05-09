import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
    {
        nameFile: {
            type: String,
            unique: true,
        },
        urlPath: {
            type: String,
            unique: true,
        },
    },
    {timestamps: true},
)

export default mongoose.model("File", FileSchema);