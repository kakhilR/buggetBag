"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const auth_services_1 = require("../services/auth.services");
const authService = new auth_services_1.AuthService();
const signup = async (req, res) => {
    try {
        const user = await authService.signup(req.body);
        res.status(201).json({ message: "Signup successful", user });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.status(200).json({ message: "Login successful", ...result });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.login = login;
