import { Router } from "express"
import { createWallet, getBalance, addMoney, credit, debit } from "../controllers/wallet.controller"
import { authenticateRequest } from "@finsmart/shared/middlewares/auth.middleware"


const router = Router()
router.post("/", authenticateRequest, createWallet)
router.get("/:userId/balance", authenticateRequest, getBalance)
router.post("/add-money", authenticateRequest, addMoney)
router.post("/credit", authenticateRequest, credit);
router.post("/debit", authenticateRequest, debit);
export default router