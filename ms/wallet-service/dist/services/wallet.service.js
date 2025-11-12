"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const wallet_events_1 = require("../events/wallet.events");
const wallet_repository_1 = require("../repositories/wallet.repository");
const fee_strategy_1 = require("./fee.strategy");
const ledger_repository_1 = require("../repositories/ledger.repository");
const walletRepo = new wallet_repository_1.WalletRepository();
const FeeStrategy = new fee_strategy_1.NoFeeStrategy();
const ledgerRepo = new ledger_repository_1.LedgerRepository;
class WalletService {
    async createWallet(userId) {
        return walletRepo.createWallet(userId);
    }
    async getBalance(userId) {
        const wallet = await walletRepo.getWalletByUserId(userId); // Await the promise
        if (!wallet) {
            throw new Error("Wallet not found");
        }
        const { balance, currency } = wallet;
        return { balance, currency };
    }
    async addMoney(userId, amount) {
        const newAmount = FeeStrategy.calculateFee(amount);
        const updatedWallet = await walletRepo.updateBalance(userId, newAmount);
        wallet_events_1.walletEventEmitter.emit('balanceUpdated', { userId, amount: newAmount });
        return updatedWallet;
    }
    async creditAmount(userId, amount) {
        const netAmount = FeeStrategy.calculateFee(amount);
        let session = null;
        try {
            if (process.env.ENABLE_TRANSACTION === "true") {
                session = await mongoose_1.default.startSession();
                session.startTransaction();
            }
            const wallet = await walletRepo.getWalletByUserId(userId);
            if (!wallet)
                throw new Error('Wallet not found');
            wallet.balance += amount;
            await wallet.save({ session });
            await ledgerRepo.recordEntry(userId, 'CREDIT', amount, wallet.balance, session);
            if (session)
                await session.commitTransaction();
            wallet_events_1.walletEventEmitter.emit('balanceUpdated', { userId, amount: netAmount, type: 'CREDIT' });
            return wallet;
        }
        catch (error) {
            if (session)
                session.abortTransaction();
            throw error;
        }
        finally {
            if (session)
                session.endSession();
        }
    }
    async debitAmount(userId, amount) {
        let session = null;
        try {
            if (process.env.ENABLE_TRANSACTION === "true") {
                session = await mongoose_1.default.startSession();
                session.startTransaction();
            }
            const wallet = await walletRepo.getWalletByUserId(userId);
            if (!wallet)
                throw new Error('Wallet not found');
            if (wallet.balance < amount)
                throw new Error('Insufficeint balance');
            wallet.balance -= amount;
            await wallet.save({ session });
            await ledgerRepo.recordEntry(userId, "DEBIT", amount, wallet.balance, session);
            if (session)
                await session.commitTransaction();
            wallet_events_1.walletEventEmitter.emit('balanceUpdated', { userId, amount, type: 'DEBIT' });
            return wallet;
        }
        catch (error) {
            if (session)
                session.abortTransaction();
            throw error;
        }
        finally {
            if (session)
                session.endSession();
        }
    }
}
exports.WalletService = WalletService;
