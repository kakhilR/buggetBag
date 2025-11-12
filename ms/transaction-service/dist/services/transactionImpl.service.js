"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionImplService = void 0;
const uuid_1 = require("uuid");
const transaction_repository_1 = require("../repositories/transaction.repository");
const wallet_client_1 = require("../utils/wallet.client");
const transaction_events_1 = require("../utils/transaction.events");
class TransactionImplService {
    constructor(payload) {
        this.payload = payload;
        this.walletclient = new wallet_client_1.WalletClient();
        this.transactionRepo = new transaction_repository_1.TransactionRepository();
    }
    async executeTransaction() {
        const { fromUserId, toUserId, amount } = this.payload;
        const transactionId = (0, uuid_1.v4)();
        try {
            const sufficientFunds = await this.walletclient.getWallet(fromUserId);
            if (sufficientFunds.balance < amount) {
                throw new Error("Insufficient funds");
            }
            await this.walletclient.debitWallet(fromUserId, amount);
            await this.walletclient.creditWallet(toUserId, amount);
            // Record transaction
            const transaction = await this.transactionRepo.createTransaction({
                txnId: transactionId,
                fromUserId,
                toUserId,
                amount,
                type: 'TRANSFER',
                status: 'SUCCESS'
            });
            transaction_events_1.transactionEventEmitter.emit('transactionSuccess', transaction);
            return { status: 'SUCCESS', transactionId, transaction };
        }
        catch (error) {
            // Record failed transaction
            await this.transactionRepo.createTransaction({
                txnId: transactionId,
                fromUserId,
                toUserId,
                amount,
                type: 'TRANSFER',
                status: 'FAILED',
                error: error.message
            });
            transaction_events_1.transactionEventEmitter.emit('transactionFailed', { txnId: transactionId, error: error.message });
            return { status: 'FAILED', transactionId, error: error.message };
        }
    }
}
exports.TransactionImplService = TransactionImplService;
