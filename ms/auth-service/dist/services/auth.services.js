"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
const password_strategy_1 = require("../strategies/password.strategy");
const user_factory_1 = require("./user.factory");
const userRepo = new user_repository_1.UserRepository();
const passwordStrategy = new password_strategy_1.BcryptPasswordStrategu();
class AuthService {
    async signup(userData) {
        const { email, password, name, role } = userData;
        const existingUser = await userRepo.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const passwordHash = await passwordStrategy.hashPassword(password);
        const newUser = user_factory_1.UserFactory.createUser({ email, passwordHash, name, role });
        return userRepo.create(newUser);
    }
    async login(data) {
        const { email, password } = data;
        const user = await userRepo.findByEmail(email);
        if (!user || !user.passwordHash) {
            throw new Error('Invalid email or password');
        }
        const isValidPassword = await passwordStrategy.comparePassword(password, user.passwordHash);
        if (!isValidPassword)
            throw new Error("Invalid credentials");
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return { token, user };
    }
}
exports.AuthService = AuthService;
