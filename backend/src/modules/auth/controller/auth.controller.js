import { loginUserService, registerUserService } from "../service/auth.service.js"

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