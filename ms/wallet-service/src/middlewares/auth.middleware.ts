import { NextFunction, Request, Response } from "express";


const authorizeService = (req: Request, res: Response, next: NextFunction)  => {
    const apiKey = req.headers["x-api-key"]
    if(apiKey !== process.env.X_API_KEY) {
        return res.status(403).json({ message: "Unauthorized service access" })
    }
    next()
}

export default authorizeService