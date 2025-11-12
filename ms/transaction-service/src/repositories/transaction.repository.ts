import { TransactionModel } from "../models/transaction.model"

export class TransactionRepository {
    async createTransaction(transactionData: any) {
        return TransactionModel.create(transactionData)
    }

    async findByTxnId(txnId: string) {
        return TransactionModel.findOne({ txnId });
    }
    
    async updateStatus(txnId: string, status: string) {
        return TransactionModel.findOneAndUpdate({ txnId }, { status }, { new: true });
    }
}