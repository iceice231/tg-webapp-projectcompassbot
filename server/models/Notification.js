import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
    {
        status: {
            type: Boolean,
            default: true
        },
        dateStatus: {
            type: Boolean,
            default: false
        },
        dateSuspend: {
            type: Date,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true},
)

export default mongoose.model("Notification", NotificationSchema);