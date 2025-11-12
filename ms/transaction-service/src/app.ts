import express from "express";
import helmet from "helmet";
import cors from "cors";
import { json } from "body-parser";
import transactionRoutes from "./routes/transaction.routes";

const app = express();
app.use(helmet());
app.use(cors());
app.use(json());

app.use("/api/v1/transactions", transactionRoutes);

export default app;