"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletClient = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const WALLET_SERVICE_URL = process.env.WALLET_SERVICE_URL;
class WalletClient {
    constructor() {
        this.baseURL = WALLET_SERVICE_URL || '';
    }
    async getWallet(userId) {
        console.log(WALLET_SERVICE_URL, "WALLET_SERVICE_URL");
        const response = await axios_1.default.get(`${this.baseURL}/${userId}/balance`);
        return response.data;
    }
    async debitWallet(userId, amount) {
        console.log('Wallet Service URL debit:', WALLET_SERVICE_URL);
        const res = await axios_1.default.post(`${this.baseURL}/debit`, { userId, amount });
        return res.data;
    }
    async creditWallet(userId, amount) {
        console.log('Wallet Service URL credit:', WALLET_SERVICE_URL);
        const res = await axios_1.default.post(`${this.baseURL}/credit`, { userId, amount });
        return res.data;
    }
}
exports.WalletClient = WalletClient;
