"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authorizeService = (req, res, next) => {
    const token = req.headers["x-service-token"];
    if (token !== process.env.SERVICE_TOKEN) {
        return res.status(403).json({ message: "Unauthorized service access" });
    }
    next();
};
exports.authorizeService = authorizeService;
