import mongoose from 'mongoose'


const transactionSchema = new mongoose.Schema({
    txnId: { type: String, unique: true },
    fromUserId: { type: String },
    toUserId: { type: String },
    fromWalletId: { type: String },
    toWalletId: { type: String },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['CREDIT', 'DEBIT', 'TRANSFER'], required: true },
    status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
    metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true })

export const TransactionModel = mongoose.model('Transaction', transactionSchema)