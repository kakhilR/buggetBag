"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionFactory = void 0;
const transactionImpl_service_1 = require("./transactionImpl.service");
class TransactionFactory {
    static createTransaction(type, payload) {
        switch (type) {
            case 'Transafer':
                return new transactionImpl_service_1.TransactionImplService(payload);
            default:
                throw new Error("Unsupported transaction type");
        }
    }
}
exports.TransactionFactory = TransactionFactory;
