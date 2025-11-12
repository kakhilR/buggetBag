import { Router } from "express"
import { authenticateRequest } from "@finsmart/shared/middlewares/auth.middleware"
import { authorizeService } from "@finsmart/shared/middlewares/service.middleware"
import { transfer } from "../controllers/transaction.controller"
import { idempotencyMiddleware } from "../middlewares/idempotency.middleware"

const router = Router()
router.post("/transfer", idempotencyMiddleware, transfer)

// router.post("/credit", authenticateRequest, creditWallet)
// router.post("/debit", authenticateRequest, debitWallet)

// // Internal (service-to-service)
// router.post("/internal/credit", authorizeService, creditWallet)
// router.post("/internal/debit", authorizeService, debitWallet)
// router.get("/internal/:userId", authorizeService, getWallet)


export default router