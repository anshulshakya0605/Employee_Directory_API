
import mongoose from "mongoose"


const employeeSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        designation: {
            type: String,
            required: true,
            trim: true
        },

        department: {
            type: String,
            required: true,
            trim: true
        },

        salary: {
            type: Number,
            required: true
        },

        joiningDate: {
            type: Date,
            required: true
        },

        profileImage: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;