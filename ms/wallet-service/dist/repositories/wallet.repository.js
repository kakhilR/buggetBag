"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRepository = void 0;
const wallet_model_1 = require("../models/wallet.model");
class WalletRepository {
    async createWallet(userId) {
        const walletExist = await wallet_model_1.Wallet.findOne({ userId });
        if (walletExist) {
            return walletExist;
        }
        return wallet_model_1.Wallet.create({ userId, balance: 0 });
    }
    async getWalletByUserId(userId) {
        return wallet_model_1.Wallet.findOne({ userId });
    }
    async updateBalance(userId, amount) {
        return wallet_model_1.Wallet.findOneAndUpdate({ userId }, { $inc: { balance: amount } }, { new: true });
    }
}
exports.WalletRepository = WalletRepository;
