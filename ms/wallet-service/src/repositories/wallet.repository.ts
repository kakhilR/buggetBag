import { Wallet } from "../models/wallet.model";


export class WalletRepository {
    async createWallet(userId: string) {
        const walletExist = await Wallet.findOne({userId})
        if(walletExist){
            return walletExist
        }
        return Wallet.create({userId, balance: 0})
    }

    async getWalletByUserId(userId: string){
        return Wallet.findOne({userId})
    }

    async updateBalance(userId: string, amount: number){
        return Wallet.findOneAndUpdate(
            {userId}, { $inc: { balance: amount } }, { new: true }
        )
    }
}