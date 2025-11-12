import mongoose from "mongoose"

const walletSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  currency: { type: String, default: "INR" }
}, { timestamps: true });

export const Wallet = mongoose.model("Wallet", walletSchema)
