import express, { urlencoded } from "express"
import cors from "cors"
import { apiReference } from "@scalar/express-api-reference"
import healthRoutes from "./modules/task/route/health.routes.js"
import taskRoutes from './modules/task/route/task.routes.js'
import errorHandler from "./middleware/error.middleware.js";
import openApiDocument from "./config/api-docs.js";
import employeeRoutes from "./modules/employee/routes/employee.route.js"
import authRoutes from "./modules/auth/routes/auth.route.js"
import { fileURLToPath } from "url"
import path from "path"

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true}));

// API Documentation
app.use("/api-docs", apiReference({spec: {content: openApiDocument}}))

app.use("/api", healthRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))
app.use("/api/employees", employeeRoutes)

app.use("/api/auth", authRoutes)

app.use(errorHandler)

export default app;