import bcrypt from "bcryptjs";
import ApiError from "../../../utils/api-error.js";
import generateToken from "../../../utils/jwt.js";
import { createUser, findUserByEmail } from "../repository/auth.repository.js";

export const registerUserService = async (userData) => {
    const {name, email, password} = userData;

    const exitingUser = await findUserByEmail(email);

    if (exitingUser) {
        throw new ApiError(
            409,
            "Email Is Already Registered"
        )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await createUser({name, email, password:hashedPassword})

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }

}

export const loginUserService = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new ApiError(
            401,
            "Invalid Email Or Password"
        )
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "Invalid Email Or Password"
        )
    }

    const token = generateToken(
        user._id.toString(),
        user.role
    )

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    }

}