import Employee from "../model/employee.model.js"


export const createEmployee = async (employeeData) => {
    return await Employee.create(employeeData);
}

export const fetchAllEmployee = async () => {
    return await Employee.find().sort({ createdAt: -1 });
}

export const fetchEmployeeById = async (employeeId) => {
    return await Employee.findById(employeeId);
}

export const updateEmployee = async (employeeId, employeeData) => {
    return await Employee.findByIdAndUpdate(employeeId, employeeData, {new: true, runValidators: true});
}

export const deleteEmployee = async (employeeId) => {
    return await Employee.findByIdAndDelete(employeeId);
}

export const findEmployeeByEmployeeId = async (employeeId) => {
    return await Employee.findOne({ employeeId });
}

export const findEmployeeByEmail = async (email) => {
    return await Employee.findOne({ email });
}