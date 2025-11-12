import express from "express";
import helmet from "helmet";
import cors from "cors";
import { json } from "body-parser";
import walletRoutes from "./routes/wallet.route";

const app = express();
app.use(helmet());
app.use(cors());
app.use(json());
app.use("/api/v1/wallets", walletRoutes);

export default app;
