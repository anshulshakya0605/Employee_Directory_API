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

export const findUserByIdWithPassword = async (id) => {
    return await User.findById(id).select("+password")
}

export const findUserByResetToken = async (hashedToken) => {
    return await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {
            $gt: Date.now()
        }
    }).select("+password +passwordResetToken +passwordResetExpires")
}

export const updateUserPassword = async (userId, hashedPassword) => {
 return await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
    $unset : {
        passwordResetToken: "",
        passwordResetExpires: ""
    }
 },
 {
            new: true
        }
)
}

export const saveResetToken = async (
    userId,
    hashedToken,
    expires
) => {

    return await User.findByIdAndUpdate(
        userId,
        {
            passwordResetToken: hashedToken,
            passwordResetExpires: expires
        },
        {
            new: true
        }
    );
};