"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debit = exports.credit = exports.addMoney = exports.getBalance = exports.createWallet = void 0;
const wallet_service_1 = require("../services/wallet.service");
const walletService = new wallet_service_1.WalletService();
const createWallet = async (req, res) => {
    try {
        const wallet = await walletService.createWallet(req.body.userId);
        res.status(201).json(wallet);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createWallet = createWallet;
const getBalance = async (req, res) => {
    try {
        const result = await walletService.getBalance(req.params.userId);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
};
exports.getBalance = getBalance;
const addMoney = async (req, res) => {
    try {
        const wallet = await walletService.addMoney(req.body.userId, req.body.amount);
        res.status(200).json({ message: "Money added successfully", wallet });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.addMoney = addMoney;
const credit = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const wallet = await walletService.creditAmount(userId, amount);
        res.status(200).json({ message: "Amount credited", wallet });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.credit = credit;
const debit = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const wallet = await walletService.debitAmount(userId, amount);
        res.status(200).json({ message: "Amount debited", wallet });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.debit = debit;
