import { TransactionFactory } from "./transaction.factory";

export class TransactionService {
    async processTransaction(payload: any) {
        const transaction = TransactionFactory.createTransaction('Transafer', payload)
        return transaction.executeTransaction()
    }
}