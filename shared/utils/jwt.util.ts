import jwt from "jsonwebtoken"

export const generateToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" })

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!)
