
import { body } from "express-validator";

const createTaskValidation = [
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100})
    .withMessage(" Title must be between 3 and 100 character"),

    body("description")
    .optional()
    .trim()
];

export{
    createTaskValidation
}