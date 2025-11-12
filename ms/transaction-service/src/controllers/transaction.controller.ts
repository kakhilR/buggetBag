import { Request, Response } from "express"
import { TransactionService } from "../services/transaction.service"

const txnService = new TransactionService()

export const transfer = async (req: Request, res: Response) => {
    try {
        const { fromUserId, toUserId, amount } = req.body
        const result = await txnService.processTransaction({ fromUserId, toUserId, amount })

        if (result.status === "SUCCESS") {
            return res.status(200).json(result)
        }
        res.status(400).json(result)
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
}