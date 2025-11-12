// src/server.ts
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import adminRoutes from "./routes/fraud.route";
import { detectCyclesAndFlag } from "./workers/fraud.worker";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/admin/fraud", adminRoutes);

const PORT = 8000;
const MONGO_URI = "mongodb://mongo:27017/finsmart_transaction";

async function start() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Fraud service connected to Mongo");

  // Periodic background scan (configurable)
//   const intervalMs = Number(process.env.FRAUD_SCAN_INTERVAL_MS || 5 * 60 * 1000); // default 5 min
//   setInterval(async () => {
//     try {
//       console.log("⚙️  Running scheduled fraud scan...");
//       const r = await detectCyclesAndFlag({
//         windowHours: Number(process.env.FRAUD_WINDOW_HOURS || 24),
//         maxLen: Number(process.env.FRAUD_MAX_LEN || 4),
//         minAmount: Number(process.env.FRAUD_MIN_AMOUNT || 0)
//       });
//       console.log("⚙️  Fraud scan result:", r);
//     } catch (err) {
//       console.error("Scheduled fraud scan failed:", err);
//     }
//   }, intervalMs);

  app.listen(PORT, () => console.log(`🚨 Fraud service listening on ${PORT}`));
}

start().catch(err => {
  console.error("Failed to start fraud service:", err);
  process.exit(1);
});
