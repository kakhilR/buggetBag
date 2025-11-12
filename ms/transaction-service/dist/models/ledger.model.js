"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ledgerSchema = new mongoose_1.default.Schema({
    entryId: { type: String, unique: true },
    txnId: { type: String, required: true },
    walletId: { type: String, required: true },
    amount: { type: Number, required: true },
    balanceAfter: { type: Number },
    note: { type: String }
}, { timestamps: true });
exports.LedgerModel = mongoose_1.default.model('LedgerEntry', ledgerSchema);
