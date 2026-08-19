import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";
import createAdmin from "./config/admin.seed.js";


dotenv.config();

const PORT = process.env.PORT || 5001;

await connectDB();

await createAdmin();

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);    
})