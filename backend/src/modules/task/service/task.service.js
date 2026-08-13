import { isValidObjectId } from "../../../utils/mongo.util.js";
import { createTask, deleteTask, fetchAllTasks, fetchTaskById, updateTask } from "../repository/task.repository.js";

const validateTaskId = (taskId) => {
    if (!isValidObjectId(taskId)) {
        const error = new Error("Invalid task id");
        error.statusCode = 400;
        throw error;
    }
}

const createTaskService = async (taskData) => {
    const task = await createTask(taskData);
    return task;
}

const getAllTaskServices = async () => {
    return fetchAllTasks();
}

export const getTaskByIdService = async(taskId) => {

    validateTaskId(taskId)

    const task = await fetchTaskById(taskId);

    if(!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    return task;
}

export const updateTaskService = async(taskId, taskData) => {
    validateTaskId(taskId)
    const task = await updateTask(taskId, taskData);

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    return task;
}

export const deleteTaskService = async(taskId)=> {
    validateTaskId(taskId)
    const task = await deleteTask(taskId);
    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    return task;
}

export {
    createTaskService,
    getAllTaskServices
}