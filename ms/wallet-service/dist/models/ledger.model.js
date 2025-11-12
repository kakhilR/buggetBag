"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ledger = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ledgerSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ["CREDIT", "DEBIT"], required: true },
    amount: { type: Number, required: true },
    balanceAfter: { type: Number },
    note: String
}, { timestamps: true });
exports.Ledger = mongoose_1.default.model("Ledger", ledgerSchema);
