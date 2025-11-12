import mongoose, { Mongoose } from "mongoose";
import { walletEventEmitter } from "../events/wallet.events";
import { WalletRepository } from "../repositories/wallet.repository";
import { NoFeeStrategy } from "./fee.strategy";
import { LedgerRepository } from "../repositories/ledger.repository";


const walletRepo = new WalletRepository()
const FeeStrategy = new NoFeeStrategy()
const ledgerRepo = new LedgerRepository

export class WalletService {
    async createWallet(userId: string){
        return walletRepo.createWallet(userId)
    }

    async getBalance(userId: string){
        console.log("From heer")
        const wallet = await walletRepo.getWalletByUserId(userId)
        if(!wallet){
            throw new Error("Wallet not found")
        }
        const { balance, currency } = wallet

        return { balance, currency }
    }

    async addMoney(userId: string, amount: number) {
        const newAmount = FeeStrategy.calculateFee(amount)
        const updatedWallet = await walletRepo.updateBalance(userId, newAmount)
        walletEventEmitter.emit('balanceUpdated', { userId, amount: newAmount })
        return updatedWallet
    }

    async creditAmount(userId: string, amount: number) {
        const netAmount = FeeStrategy.calculateFee(amount)
        let session: mongoose.ClientSession | null = null
        try{
            if(process.env.ENABLE_TRANSACTION === "true") {
                session = await mongoose.startSession()
                session.startTransaction()
            }
            const wallet = await walletRepo.getWalletByUserId(userId)
            if(!wallet) throw new Error('Wallet not found')
            wallet.balance += amount
            await wallet.save({session})
            await ledgerRepo.recordEntry(userId, 'CREDIT', amount, wallet.balance, session)
            if(session) await session.commitTransaction()
            walletEventEmitter.emit('balanceUpdated', {userId, amount: netAmount, type: 'CREDIT'})
            return wallet
        }catch(error) {
            console.error(error,"from credit")
            if(session) session.abortTransaction()
            throw error
        } finally {
            if(session) session.endSession()
        }
    }

    async debitAmount( userId: string, amount: number ) {
        let session: mongoose.ClientSession | null = null
        try{
            if(process.env.ENABLE_TRANSACTION === "true") {
                session = await mongoose.startSession()
                session.startTransaction()
            }
            const wallet = await walletRepo.getWalletByUserId(userId)
            if(!wallet) throw new Error('Wallet not found')
            if(wallet.balance < amount) throw new Error('Insufficeint balance')

            wallet.balance -= amount
            await wallet.save({session})
            
            await ledgerRepo.recordEntry(userId, "DEBIT", amount, wallet.balance, session)
            if(session) await session.commitTransaction()
            walletEventEmitter.emit('balanceUpdated', {userId, amount, type: 'DEBIT'})
            return wallet
        }catch(error) {
            console.error(error,"from error")
            if(session) session.abortTransaction()
            throw error
        } finally {
            if(session) session.endSession()
        }
    }
}