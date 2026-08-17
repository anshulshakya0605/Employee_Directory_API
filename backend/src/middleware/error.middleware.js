import multer from "multer";

const errorHandler = async (error, req, res, next) => {
    console.error(error);

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


    const statusCode = error.statusCode || 500;

   return res.status(statusCode).json({
        success: false, 
        message: error.message || "Internal server error"
    })
}

export default errorHandler;