"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionEventEmitter = void 0;
const events_1 = require("events");
class TransactionEvents extends events_1.EventEmitter {
}
exports.transactionEventEmitter = new TransactionEvents();
exports.transactionEventEmitter.on('transactionSuccess', (data) => {
    console.log('Transaction Successfull: ', data);
});
exports.transactionEventEmitter.on('transactionFailed', (data) => {
    console.log('Transaction Failed: ', data);
});
