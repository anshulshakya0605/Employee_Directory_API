import ApiError from "../utils/api-error.js"


const authorized = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next (
                new ApiError(
                    401, 
                    "Unauthorized"
                )
            )
        }

        if(!allowedRoles.includes(req.user.role)){
            return next(
                new ApiError(
                    401,
                    "You do not have permission to access this resource"
                )
            )
        }

        next();

    }
}

export default authorized;