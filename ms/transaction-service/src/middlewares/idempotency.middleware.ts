import Idempotency from "../models/idempotency.model"
import { Request, Response, NextFunction } from "express"

export const idempotencyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const idempotencyKey = req.headers["idempotency-key"] as string

    if (!idempotencyKey) {
        return res.status(400).json({ message: "Missing Idempotency-Key header" })
    }

    // Check if key exists
    const existing = await Idempotency.findOne({ key: idempotencyKey })

    if (existing) {
        if (existing.status === "COMPLETED") {
            return res.status(200).json(existing.response);
        } else if (existing.status === "PENDING") {
            return res.status(409).json({ message: "Transaction already in progress" })
        }
    }

    // Otherwise, register new entry
    await Idempotency.create([{ key: idempotencyKey, status: "PENDING" }]);

    // Attach helper to request
    (req as any).idempotencyKey = idempotencyKey

    next()
}
