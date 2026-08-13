import Task from "../model/task.model.js"


const createTask = async(taskData) => {
    return await Task.create(taskData);
}

const fetchAllTasks = async() => {
    return await Task.find().sort({ createdAt: -1 });
}

export const fetchTaskById = async(taskId) => {
    return await Task.findById(taskId);
}

export const updateTask = async(taskId, taskData) => {
    return await Task.findByIdAndUpdate(taskId, taskData, {new: true, runValidators: true});
}

export const deleteTask = async(taskId) => {
    return await Task.findByIdAndDelete(taskId);
}

export {
    createTask,
    fetchAllTasks
};