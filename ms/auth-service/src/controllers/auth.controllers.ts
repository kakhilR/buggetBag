import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";

const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({ message: "Signup successful", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ message: "Login successful", ...result });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
