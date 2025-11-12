// src/models/transaction.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  txnId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  type: string;
  status: string;
  createdAt: Date;
  aiCategory?: string;
  aiConfidence?: number;
  riskScore?: number;
  flagged?: boolean;
  flagReasons?: string[];
}

const TransactionSchema = new Schema<ITransaction>({
  txnId: { type: String, required: true, unique: true },
  fromUserId: { type: String, required: true },
  toUserId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String },
  status: { type: String, default: "PENDING" },
  createdAt: { type: Date, default: Date.now },
  aiCategory: { type: String },
  aiConfidence: { type: Number },
  riskScore: { type: Number },
  flagged: { type: Boolean, default: false },
  flagReasons: [{ type: String }]
});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
