import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema(
    {
        nameOrganization: {
            type: String,
            require: true,
            unique: true,
        },
        key: {
            type: String,
            require: true,
            unique: true,
        },
        keyDirector: {
            type: String,
            require: true,
            unique: true
        },
        personal: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        projects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project"
            }
        ]
    },
    {timestamps: true},
)

export default mongoose.model("Organization", OrganizationSchema);