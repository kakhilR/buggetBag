"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const transaction_model_1 = require("../models/transaction.model");
class TransactionRepository {
    async createTransaction(transactionData) {
        return transaction_model_1.TransactionModel.create(transactionData);
    }
    async findByTxnId(txnId) {
        return transaction_model_1.TransactionModel.findOne({ txnId });
    }
    async updateStatus(txnId, status) {
        return transaction_model_1.TransactionModel.findOneAndUpdate({ txnId }, { status }, { new: true });
    }
}
exports.TransactionRepository = TransactionRepository;
