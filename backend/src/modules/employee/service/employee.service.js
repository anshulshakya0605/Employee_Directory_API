import { isValidObjectId } from "mongoose";
import { createEmployee, deleteEmployee, fetchAllEmployee, fetchEmployeeById, findEmployeeByEmail, findEmployeeByEmployeeId, updateEmployee, uploadProfileEmployeeImage } from "../repository/employee.repository.js"
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

export const fetchAllEmployeeService = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const shortBy = query.shortBy || "createdAt";

    const order = query.order === "asc" ? 1 : -1;

    const filter = {};

    // filter
    if (query.department) {
        filter.department = query.department;
    }
    if (query.designation) {
        filter.designation = query.designation
    }

    // searching 

    if (query.search) {
        filter.$or = [
            {
                firstName: {
                    $regex: query.search,
                    $options: "i"
                }
            },
            {
                lastName: {
                    $regex: query.search,
                    $options: "i"
                }
            },
            {
                email: {
                    $regex: query.search,
                    $options: "i"
                }
            },
            {
                employeeId: {
                    $regex: query.search,
                    $options: "i"
                }
            }
        ];
    }

    const {employees, totalEmployees} = await fetchAllEmployee(filter, skip, limit, shortBy, order);
    
    return {
        data: employees,
        pagination : {
            currentPage: page,
            totalPage: Math.ceil(totalEmployees/limit),
            totalItems: totalEmployees,
            itemsPerPage: limit
        }
    }

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

    const employee = await fetchEmployeeById(employeeId);

    if (!employee) {
        throw new ApiError(
            404,
            "Employee Not Found"
        )
    }

    if (employeeData.employeeId) {
        const existingEmployee = await findEmployeeByEmployeeId(employeeData.employeeId);
        if (existingEmployee && existingEmployee._id.toString() !== employeeId) {
            throw new ApiError(
                404,
                "Employee Id Already Exists"
            )
        }
    }

    if(employeeData.email){
        const existingEmployee = await findEmployeeByEmail(employeeData.email);
        if (existingEmployee && existingEmployee._id.toString() !== employeeId) {
            throw new ApiError(
                404,
                "Email Already Exists"
            )
        }
    }
    return await updateEmployee(employeeId, employeeData);
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

export const uploadEmployeeProfileImageService = async (employeeId, file) => {

    validateEmployeeId(employeeId)

    const employee = await fetchEmployeeById(employeeId);

    if(!employee){
        throw new ApiError(
            404, 
            "Employee Not Found"
        )
    }
    if (!file) {
        throw new ApiError(
            404,
            "Profile Images Is Required"
        )
    }

    const profileImage = `/uploads/${file.filename}`;

    const updatedEmployee = await uploadProfileEmployeeImage(employeeId, profileImage)

    console.log("Employee ID:", employeeId);
console.log("Uploaded File:", file);
console.log("Profile Image Path:", profileImage);
console.log("Updated Employee:", updatedEmployee);

    return updatedEmployee;

}