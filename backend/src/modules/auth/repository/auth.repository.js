import User from "../model/user.model.js"

export const createUser = async (userData) => {
    return await User.create(userData);
}

export const findUserByEmail = async (email) => {
    return await User.findOne({email}).select("+password");
}

export const findUserById = async (id) => {
    return await User.findById(id);
}