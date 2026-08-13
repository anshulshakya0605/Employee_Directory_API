import { createTaskService, deleteTaskService, getAllTaskServices, getTaskByIdService, updateTaskService } from "../service/task.service.js"


const createTask = async (req, res, next) => {
    try {
        
        const task = await createTaskService(req.body);

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        })

    } catch (error) {
        next(error)
    }
}

const getAllTasks = async(req, res, next) => {
    try {

        const tasks = await getAllTaskServices();
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks
        })
        
    } catch (error) {
        next(error)
    }
}

export const getTaskById = async (req, res, next) => {
    try {
        const task = await getTaskByIdService(req.params.id)
        res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            data: task
        })
    } catch (error) {
        next(error)
    }
}

export const updateTaskController = async(req, res, next) => {
    try {
        const task = await updateTaskService(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "Task update successfully",
            data: task
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTaskController = async(req, res, next) => {
    try {
        const task = await deleteTaskService(req.params.id);
        res.status(200).json({
            success: true,
            message: "Task delete successfully",
        })
    } catch (error) {
        next(error)
    }
}


export {
    createTask,
    getAllTasks
}