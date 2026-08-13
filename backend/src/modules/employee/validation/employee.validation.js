import { body } from "express-validator";


export const createEmployeeValidation = [
    body("employeeId")
    .trim()
    .notEmpty()
    .withMessage("Employee Id Is Required"),

    body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name Is Required")
    .isLength({ min: 3, max: 50})
    .withMessage("First Name Must Be 2 and 50 Characters"),

    body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last Name Is Required")
    .isLength({ min: 3, max: 50})
    .withMessage("Last Name Must Be 2 and 50 Characters"),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email Is Required")
    .isEmail()
    .withMessage("Please Provide A Valid Email"),

    body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone Number Is Required"),

    body("designation")
    .trim()
    .notEmpty()
    .withMessage("Designation Is Required"),

    body("department")
    .trim()
    .notEmpty()
    .withMessage("Department Is Required"),

    body("salary")
    .trim()
    .notEmpty()
    .withMessage("Salary Is Required")
    .isFloat({ min: 0 })
    .withMessage("Salary Must Be A Valid Positive Number"),

    body("joiningDate")
    .notEmpty()
    .withMessage("Joining Date Is Required")
    .isISO8601()
    .withMessage("Joining Date Must Be A Valid Number"),

];

