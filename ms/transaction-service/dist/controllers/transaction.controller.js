"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = void 0;
const transaction_service_1 = require("../services/transaction.service");
const txnService = new transaction_service_1.TransactionService();
const transfer = async (req, res) => {
    try {
        const { fromUserId, toUserId, amount } = req.body;
        const result = await txnService.processTransaction({ fromUserId, toUserId, amount });
        if (result.status === "SUCCESS") {
            return res.status(200).json(result);
        }
        res.status(400).json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.transfer = transfer;
