"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletEventEmitter = void 0;
const events_1 = require("events");
class WalletEventEmitter extends events_1.EventEmitter {
}
exports.walletEventEmitter = new WalletEventEmitter();
// Example usage
exports.walletEventEmitter.on("balanceUpdated", (data) => console.log("Balance updated:", data));
