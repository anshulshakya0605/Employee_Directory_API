import express from "express"
import { createEmployeeValidation } from "../validation/employee.validation.js";
import { validate } from "../../../middleware/validation.middleware.js";
import { createEmployee, deleteEmployee, fetchAllEmployee, fetchEmployeeById, updateEmployee, uploadEmployeeProfileImage } from "../controller/employee.controller.js";
import upload from "../../../config/multer.js";

const router = express.Router();

router.post("/", createEmployeeValidation, validate, createEmployee )

router.get("/", fetchAllEmployee)

router.patch("/:id/profile-image", upload.single("profileImage"), uploadEmployeeProfileImage)

router.get("/:id", fetchEmployeeById)

router.put("/:id", updateEmployee)

router.delete("/:id", deleteEmployee)


export default router;