import mongoose from "mongoose";
import Role from "../../../constant/role.constant.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },

    passwordResetToken: {
        type: String,
        select: false
    },

    passwordResetExpires: {
        type: Date,
        select: false
    }
},

    {
        timestamps: true
    }

)

const User = mongoose.model("User", userSchema);

export default User;