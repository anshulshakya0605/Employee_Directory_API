import { validate } from "../../../middleware/validation.middleware.js";
import { createTask, deleteTaskController, getAllTasks, getTaskById, updateTaskController } from "../controller/task.controller.js";
import { createTaskValidation } from "../validation/task.validation.js";

import express from "express"

const router = express.Router();

router.post
    ("/",
        createTaskValidation,
        validate,
        createTask
    )



router.get("/", getAllTasks)

router.get("/:id", getTaskById)

router.put("/:id", updateTaskController)

router.delete("/:id", deleteTaskController)

export default router;