import mongoose, { Schema, Document } from "mongoose"

export interface IIdempotency extends Document {
    key: string
    status: string
    response: any
    createdAt: Date
}

const IdempotencySchema = new Schema<IIdempotency>({
  key: { type: String, required: true, unique: true },
  response: { type: Object, required: false },
  status: { type: String, enum: ["PENDING", "COMPLETED", "FAILED"], default: "PENDING" },
  createdAt: { type: Date, default: Date.now, expires: "1h" } 
}) 

export default mongoose.model<IIdempotency>("idempotency", IdempotencySchema)