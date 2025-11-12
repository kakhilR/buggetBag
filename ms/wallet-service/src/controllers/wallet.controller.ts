import { Request, Response } from "express"
import { WalletService } from "../services/wallet.service"

const walletService = new WalletService()

export const createWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await walletService.createWallet(req.body.userId)
    res.status(201).json(wallet)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export const getBalance = async (req: Request, res: Response) => {
  try {
    const result = await walletService.getBalance(req.params.userId)
    res.status(200).json(result)
  } catch (err: any) {
    res.status(404).json({ error: err.message })
  }
}

export const addMoney = async (req: Request, res: Response) => {
  try {
    const wallet = await walletService.addMoney(req.body.userId, req.body.amount)
    res.status(200).json({ message: "Money added successfully", wallet })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export const credit = async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.body
    const wallet = await walletService.creditAmount(userId, amount)
    res.status(200).json({ message: "Amount credited", wallet })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export const debit = async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.body
    const wallet = await walletService.debitAmount(userId, amount)
    res.status(200).json({ message: "Amount debited", wallet })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}