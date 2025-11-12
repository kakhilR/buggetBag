"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class MongoConnection {
    constructor() { }
    static async getInstance(url) {
        if (!MongoConnection.instance) {
            MongoConnection.instance = new MongoConnection();
            await mongoose_1.default.connect(url);
            console.log("✅ Connected to MongoDB");
        }
        return MongoConnection.instance;
    }
}
exports.MongoConnection = MongoConnection;
