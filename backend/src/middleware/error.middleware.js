
const errorHandler = async (error, req, res, next) => {
    console.error(error);
    
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