import Role from "../constant/role.constant.js";
import User from "../modules/auth/model/user.model.js";
import bcrypt from "bcryptjs";

const createAdmin = async () => {
    try {
        
        const adminEmail = "admin@gmail.com";
        const exitingAdmin = await User.findOne({email: adminEmail})
        if (exitingAdmin) {
            console.log("Admin Already Exists");
            return;
        }

        const hashedPassword = await bcrypt.hash('123456', 10);

        await User.create({
            name: "Admin",
            email: adminEmail,
            password: hashedPassword,
            role: Role.ADMIN
        })

        console.log("Admin Created Successfully");
        

    } catch (error) {
        console.error("Admin Creation Failed ", error.message);
    }
}

export default createAdmin