import { Ledger } from "../models/ledger.model";

export class LedgerRepository {
    async recordEntry(userId: string, type: string, amount: number, balanceAfter: number, session?: any) {
        return Ledger.create([{userId, type, amount, balanceAfter}], {session})
    }
}