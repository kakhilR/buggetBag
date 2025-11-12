import { v4 as uuidv4 } from 'uuid'

import { TransactionRepository } from "../repositories/transaction.repository"
import { WalletClient } from "../utils/wallet.client"
import { transactionEventEmitter } from '../utils/transaction.events'
import  IIdempotency  from '../models/idempotency.model'


export class TransactionImplService {
    walletclient = new WalletClient()
    transactionRepo = new TransactionRepository()
    constructor(private payload : any) {}

    async executeTransaction() {
        const { fromUserId, toUserId, amount } = this.payload
        const transactionId = uuidv4()
        try{
            const senderWallet = await this.walletclient.getWallet(fromUserId)
            const receiverWallet = await this.walletclient.getWallet(toUserId)
            if(!senderWallet || !receiverWallet) {
                throw new Error("One or both users do not have a wallet")
            }
            // const sufficientFunds = await this.walletclient.getWallet(fromUserId)

            if(senderWallet.balance < amount) {
                throw new Error("Insufficient funds")
            }


            await this.walletclient.debitWallet(fromUserId, amount)
            await this.walletclient.creditWallet(toUserId, amount)

            const transaction = await this.transactionRepo.createTransaction({
                txnId: transactionId,
                fromUserId,
                toUserId,
                amount,
                type: 'TRANSFER',
                status: 'SUCCESS'
            })
            transactionEventEmitter.emit('transactionSuccess', transaction)
            // await IIdempotency.updateOne(
            //     { key: (req as any).idempotencyKey },
            //     { status: "COMPLETED" }
            // )
            return { status: 'SUCCESS', transactionId, transaction }
        }catch(error: any){
            console.error(error, "Transaction Error")
            // Record failed transaction
            await this.transactionRepo.createTransaction({
                txnId: transactionId,
                fromUserId,
                toUserId,
                amount,
                type: 'TRANSFER',
                status: 'FAILED',
                error: error.message
            })
            transactionEventEmitter.emit('transactionFailed', { txnId: transactionId, error: error.message })
            // await IIdempotency.updateOne(
            //     { key: (req as any).idempotencyKey },
            //     { status: "FAILED" }
            // )
            return { status: 'FAILED', transactionId, error: error.message }
        }
    }
}