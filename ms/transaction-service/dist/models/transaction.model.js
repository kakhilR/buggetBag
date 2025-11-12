"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    txnId: { type: String, unique: true },
    fromUserId: { type: String },
    toUserId: { type: String },
    fromWalletId: { type: String },
    toWalletId: { type: String },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['CREDIT', 'DEBIT', 'TRANSFER'], required: true },
    status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
    metadata: { type: mongoose_1.default.Schema.Types.Mixed }
}, { timestamps: true });
exports.TransactionModel = mongoose_1.default.model('Transaction', transactionSchema);
