"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const fraud_route_1 = __importDefault(require("./routes/fraud.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/admin/fraud", fraud_route_1.default);
const PORT = 8100;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/finsmart_transaction";
async function start() {
    await mongoose_1.default.connect(MONGO_URI);
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
