"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const mongo_connection_1 = require("./db/mongo.connection");
dotenv_1.default.config();
console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 8002;
(async () => {
    await mongo_connection_1.MongoConnection.getInstance(process.env.MONGO_URI);
    app_1.default.listen(PORT, () => console.log(`💰 Wallet Service running on ${PORT}`));
});
