import dotenv from "dotenv"

import { Request, Response, NextFunction } from "express"

dotenv.config()


export const authorizeService = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-service-token"]
  if (token !== process.env.SERVICE_TOKEN) {
    return res.status(403).json({ message: "Unauthorized service access" })
  }
  next()
}
