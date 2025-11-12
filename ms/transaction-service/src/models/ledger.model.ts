import mongoose2 from 'mongoose'


const ledgerSchema = new mongoose2.Schema({
entryId: { type: String, unique: true },
txnId: { type: String, required: true },
walletId: { type: String, required: true },
amount: { type: Number, required: true },
balanceAfter: { type: Number },
note: { type: String }
}, { timestamps: true })


export const LedgerModel = mongoose2.model('LedgerEntry', ledgerSchema)