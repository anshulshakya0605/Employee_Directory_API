import { changePasswordService, forgotPasswordService, loginUserService, registerUserService, resetPasswordService } from "../service/auth.service.js"

export const registerUser = async (req, res, next) => {
    try {
        
        const user = await registerUserService(req.body);
        // console.log("user", user)
        return res.status(201).json({
            success: true,
            message: "User Register Successfully",
            data: user
        })

    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        
        const {email, password} = req.body;

        const result = await loginUserService(email, password);

        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        
        const { email } = req.body;

        const result = await forgotPasswordService(email);
        return res.status(200).json({
            success: true,
            message: "Password reset token generated successfully",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        
        const { token } = req.params;
        const { newPassword } = req.body;

        const result = await resetPasswordService(token, newPassword);

        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

export const changePassword = async (req, res, next) => {
    try {
        
        const {currentPassword, newPassword} = req.body;

        const result = await changePasswordService(req.user.userId, currentPassword, newPassword);
        return res.status(200).json({
            success: true,
            message: "Password Change Successfully",
        })

    } catch (error) {
        next(error)
    }
}