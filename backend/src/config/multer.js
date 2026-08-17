import multer from "multer";
import path from "path";
import ApiError from "../utils/api-error.js";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "_" + Math.round(Math.random() * 1E9);

        const extension = path.extname(file.originalname);

        cb(null, uniqueName + extension);
    }
});

const fileFilter = (req, file, cb) => {
    const allowTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if(allowTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new ApiError(400, "Only JPEG, JPG, PNG and WEBP images are allowed"), false)
    }
}

const upload = multer({
    storage, fileFilter, limits: {fileSize: 5 * 1024 * 1024}
})

export default upload;