"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/admin.routes.ts
const express_1 = __importDefault(require("express"));
const fraud_worker_1 = require("../workers/fraud.worker");
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const router = express_1.default.Router();
// Trigger a scan manually
router.post("/scan", async (req, res) => {
    const { windowHours, maxLen, minAmount } = req.body || {};
    try {
        const result = await (0, fraud_worker_1.detectCyclesAndFlag)({ windowHours, maxLen, minAmount });
        res.json({ ok: true, result });
    }
    catch (err) {
        console.error("Scan error:", err);
        res.status(500).json({ ok: false, error: err.message });
    }
});
// Summary: flagged counts and top reasons
router.get("/summary", async (req, res) => {
    try {
        const totalFlagged = await transaction_model_1.default.countDocuments({ flagged: true });
        const byReason = await transaction_model_1.default.aggregate([
            { $unwind: "$flagReasons" },
            { $group: { _id: "$flagReasons", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json({ ok: true, totalFlagged, byReason });
    }
    catch (err) {
        console.error("Summary error:", err);
        res.status(500).json({ ok: false, error: err.message });
    }
});
exports.default = router;
