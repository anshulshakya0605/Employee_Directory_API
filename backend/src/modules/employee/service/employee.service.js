import { isValidObjectId } from "mongoose";
import { createEmployee, deleteEmployee, fetchAllEmployee, fetchEmployeeById, findEmployeeByEmail, findEmployeeByEmployeeId, updateEmployee } from "../repository/employee.repository.js"
import ApiError from "../../../utils/api-error.js";


const validateEmployeeId = (employeeId) => {
    if (!isValidObjectId(employeeId)) {
        const error = new Error("Invalid Employee Id")
        error.statusCode = 404
        throw error
    }
}

export const createEmployeeService = async (employeeData) => {

    const existingEmployeeById = await findEmployeeByEmployeeId(employeeData.employeeId);

    if(existingEmployeeById){
        throw new ApiError(
            409,
            "Employee Id Already Exists"
        )
    }

    const existingEmployeeByEmail = await findEmployeeByEmail(employeeData.email);

    if (existingEmployeeByEmail) {
        throw new ApiError(
            409, 
            "Email Already Exists"
        )
    }

    const employee = await createEmployee(employeeData);
    return employee;
}

export const fetchAllEmployeeService = async () => {
    return await fetchAllEmployee();
}

export const fetchEmployeeByIdService = async (employeeId) => {
    validateEmployeeId(employeeId)

    const employee = await fetchEmployeeById(employeeId);

    if (!employee) {
        const error = new Error("Employee Not Found")
        error.statusCode = 404
        throw error
    }

    return employee;
}

export const updateEmployeeService = async (employeeId, employeeData) => {
    validateEmployeeId(employeeId)

    const employee = await updateEmployee(employeeId, employeeData);
    if (!employee) {
        const error = new Error("Employee Not Found")
        error.statusCode = 404
        throw error
    }
    return employee
}

export const deleteEmployeeService = async (employeeId) => {
    validateEmployeeId(employeeId)

    const employee = await deleteEmployee(employeeId);
    if (!employee) {
        const error = new Error("Employee Not Found")
        error.statusCode = 404
        throw error
    }
    return employee;
}