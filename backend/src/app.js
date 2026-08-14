import express, { urlencoded } from "express"
import cors from "cors"
import { apiReference } from "@scalar/express-api-reference"
import healthRoutes from "./modules/task/route/health.routes.js"
import taskRoutes from './modules/task/route/task.routes.js'
import errorHandler from "./middleware/error.middleware.js";
import openApiDocument from "./config/api-docs.js";
import employeeRoutes from "./modules/employee/routes/employee.route.js"

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true}));

// API Documentation
app.use("/api-docs", apiReference({spec: {content: openApiDocument}}))

app.use("/api", healthRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/employees", employeeRoutes)

app.use(errorHandler)

export default app;