// src/routes/admin.routes.ts
import express from "express";
import { detectCyclesAndFlag } from "../workers/fraud.worker";
import Transaction from "../models/transaction.model";

const router = express.Router();

// Trigger a scan manually
router.post("/scan", async (req, res) => {
  const { windowHours, maxLen, minAmount } = req.body || {};
  try {
    const result = await detectCyclesAndFlag({ windowHours, maxLen, minAmount });
    res.json({ ok: true, result });
  } catch (err: any) {
    console.error("Scan error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Summary: flagged counts and top reasons
router.get("/summary", async (req, res) => {
  try {
    const totalFlagged = await Transaction.countDocuments({ flagged: true });
    const byReason = await Transaction.aggregate([
      { $unwind: "$flagReasons" },
      { $group: { _id: "$flagReasons", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ ok: true, totalFlagged, byReason });
  } catch (err: any) {
    console.error("Summary error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
