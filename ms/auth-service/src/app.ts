import express from "express"
import helmet from "helmet"
import cors from "cors"
import { json } from "body-parser"
import authRoutes from "./routes/auth.routes"

const app = express()
app.use(helmet())
app.use(cors())
app.use(json())

app.use("/api/v1/auth", authRoutes)

export default app
