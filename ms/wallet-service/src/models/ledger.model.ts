import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ["CREDIT", "DEBIT"], required: true },
  amount: { type: Number, required: true },
  balanceAfter: { type: Number },
  note: String
}, { timestamps: true })

export const Ledger = mongoose.model("Ledger", ledgerSchema)