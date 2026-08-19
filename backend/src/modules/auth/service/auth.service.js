import bcrypt from "bcryptjs";
import ApiError from "../../../utils/api-error.js";
import generateToken from "../../../utils/jwt.js";
import { createUser, findUserByEmail, findUserByIdWithPassword, findUserByResetToken, saveResetToken, updateUserPassword } from "../repository/auth.repository.js";
import User from "../model/user.model.js";

export const registerUserService = async (userData) => {
    const { name, email, password } = userData;

    const exitingUser = await findUserByEmail(email);

    if (exitingUser) {
        throw new ApiError(
            409,
            "Email Is Already Registered"
        )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await createUser({ name, email, password: hashedPassword })

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

export const forgotPasswordService = async (email) => {
    const user = User.findUserByEmail(email);

    if (!user) {
        throw new ApiError(
            404,
            "User not found with this email"
        )
    }

    // Random plain token
    const resetToken = crypto
        .randomBytes(32)
        .toString("hex");

    
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const expires = new Date(
        Date.now() + 10 * 60 * 1000
    );

    await saveResetToken(
        user._id,
        hashedToken,
        expires
    );

    return {
        resetToken,
        expires
    };
}


export const resetPasswordService = async (
    token,
    newPassword
) => {

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await findUserByResetToken(
        hashedToken
    );

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired reset token"
        );
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    const updatedUser = await updateUserPassword(
        user._id,
        hashedPassword
    );

    return {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
    };
};

export const changePasswordService = async (
    userId,
    currentPassword,
    newPassword
) => {

   const user = await findUserByIdWithPassword(userId)

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    const isPasswordCorrect =
        await bcrypt.compare(
            currentPassword,
            user.password
        );

    if (!isPasswordCorrect) {
        throw new ApiError(
            400,
            "Current password is incorrect"
        );
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    await updateUserPassword(
        userId,
        hashedPassword
    );

    return;
};