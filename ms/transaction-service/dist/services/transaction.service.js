"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const transaction_factory_1 = require("./transaction.factory");
class TransactionService {
    async processTransaction(payload) {
        const transaction = transaction_factory_1.TransactionFactory.createTransaction('Transafer', payload);
        return transaction.executeTransaction();
    }
}
exports.TransactionService = TransactionService;
