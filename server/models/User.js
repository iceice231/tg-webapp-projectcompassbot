import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            default: "+7"
        },
        password: {
            type: String,
            require: true,
            unique: true,
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        address: {
            type: String,
            default: '',
        },
        birthday: {
            type: Date,
            default: Date.now(),
        },
        position: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Position",
        },
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            },
        ],
        telegramUsername: {
            type: String,
        }
    },
    {timestamps: true},
)

export default mongoose.model("User", UserSchema);