import express from "express"
import { createEmployeeValidation } from "../validation/employee.validation.js";
import { validate } from "../../../middleware/validation.middleware.js";
import { createEmployee, deleteEmployee, fetchAllEmployee, fetchEmployeeById, updateEmployee, uploadEmployeeProfileImage } from "../controller/employee.controller.js";
import upload from "../../../config/multer.js";
import authenticate from "../../../middleware/auth.middleware.js";
import authorized from "../../../middleware/authorize.middleware.js";
import Role from "../../../constant/role.constant.js";

const router = express.Router();

router.post("/", authenticate, authorized(Role.ADMIN), createEmployee )

router.get("/", authenticate, authorized(Role.ADMIN, Role.USER), fetchAllEmployee)

router.patch("/:id/profile-image", authenticate, authorized(Role.ADMIN, Role.USER), upload.single("profileImage"), uploadEmployeeProfileImage)

router.get("/:id", authenticate, authorized(Role.ADMIN, Role.USER), fetchEmployeeById)

router.put("/:id", authenticate, authorized(Role.ADMIN), updateEmployee)

router.delete("/:id", authenticate, authorized(Role.ADMIN), deleteEmployee)


export default router;