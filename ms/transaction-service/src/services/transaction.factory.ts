import { TransactionImplService } from "./transactionImpl.service";

export class TransactionFactory {
    static createTransaction(type: string, payload: any) {
        switch (type) {
            case 'Transafer':
                return new TransactionImplService(payload)
            default:
                throw new Error("Unsupported transaction type")
        }
    }
}