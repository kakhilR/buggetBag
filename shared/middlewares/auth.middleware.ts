import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const authenticateRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: "Missing Authorization header" })

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    // @ts-ignore
    req.user = decoded
    next()
  } catch (err) {
    console.error("JWT Auth Error:", err)
    res.status(401).json({ message: "Invalid or expired token" })
  }
}
