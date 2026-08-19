import jwt from "jsonwebtoken"
import ApiError from "../utils/api-error.js";


const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new ApiError(
                401,
                "Unauthorized Access"
            )
        }

        if(!authHeader.startsWith("Bearer ")){
            throw new ApiError(
                401,
                "Invalid Authorization Token Formate"
            )
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new ApiError(
                401,
                "Authorization token is required"
            )
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        next();

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return next(
                new ApiError(
                401,
                "Invalid Token"
                )
            )
        }

        if(error.name === "TokenExpiredError"){
            return next(
                new ApiError(
                    401,
                    "Token Expired. Please Logged-In Again"
                )
    
            )
        }
        next(error)
    }

}

export default authenticate