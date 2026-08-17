import e from "express";
import { createEmployeeService, deleteEmployeeService, fetchAllEmployeeService, fetchEmployeeByIdService, updateEmployeeService, uploadEmployeeProfileImageService } from "../service/employee.service.js"


export const createEmployee = async (req, res, next) => {
    try {
        
        const employee = await createEmployeeService(req.body);
        res.status(201).json({
            success: true,
            message: "Employee Created Successfully",
            data: employee
        })
    } catch (error) {
        next(error)
    }
}

export const fetchAllEmployee = async (req, res, next) => {
    try {
        
        const result = await fetchAllEmployeeService(req.query);
        res.status(200).json({
            success:true,
            message: "Employees Fetched Successfully",
            ...result
        })

    } catch (error) {
        next(error)
    }
}

export const fetchEmployeeById = async (req, res, next) => {
    try {
        
        const employee = await fetchEmployeeByIdService(req.params.id);
        res.status(200).json({
            success: true,
            message: "Employee Fetched Successfully",
            data: employee
        })

    } catch (error) {
        next(error)
    }
}

export const updateEmployee = async (req, res, next) => {
    try {
        
        const employee = await updateEmployeeService(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Employee Updated Successfully",
            data: employee
        })

    } catch (error) {
        next(error)
    }
}

export const deleteEmployee = async (req, res, next) => {
    try {
        
        const employee = await deleteEmployeeService(req.params.id);
        res.status(200).json({
            success: true,
            message: "Employee Delete Successfully",
            data: []
        })

    } catch (error) {
        next(error)
    }
}

export const uploadEmployeeProfileImage = async (req, res, next) => {
    try {
        
        const employee = await uploadEmployeeProfileImageService(req.params.id, req.file)
        return res.status(200).json({
            success: true,
            message: "Profile image uploaded successfully",
            data: employee
        })
    } catch (error) {
        next(error)
    }
}