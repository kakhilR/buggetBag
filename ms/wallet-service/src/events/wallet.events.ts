import { EventEmitter } from 'events'

class WalletEventEmitter extends EventEmitter {}

export const walletEventEmitter = new WalletEventEmitter()

// Example usage
walletEventEmitter.on("balanceUpdated", (data: any) => console.log("Balance updated:", data));