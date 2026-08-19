import multer from "multer";

const errorHandler = async (error, req, res, next) => {
    console.error(error);

    if(error.statusCode){
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }

    // Multer error 
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
           return res.status(400).json({
                success:false,
                message: "File Size Cannot Exceed 5 MB"
            })
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
           return res.status(400).json({
                success: false,
                message: "Unexpected File Failed"
            })
        }

        return res.status(400).json({
            success: false,
            message: error.message
        })

    }
    
    // MongoDB Duplicate Key Error
    if (error.code === 11000) {

        const field = Object.keys(
            error.keyPattern
        )[0];

        return res.status(409).json({
            success: false,
            message: `${field} already exists`
        });
    }

     // Mongoose Validation Error
    // =========================

    if (error.name === "ValidationError") {

        const errors =
            Object.values(error.errors)
                .map(item => item.message);

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    // Invalid MongoDB ObjectId
    // =========================

    if (error.name === "CastError") {

        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

     // JWT Errors
    // =========================

    if (error.name === "JsonWebTokenError") {

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    if (error.name === "TokenExpiredError") {

        return res.status(401).json({
            success: false,
            message: "Token expired. Please login again"
        });
    }

    const statusCode = error.statusCode || 500;

   return res.status(statusCode).json({
        success: false, 
        message: error.message || "Internal server error"
    })
}

export default errorHandler;