"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserRepository {
    async findByEmail(email) {
        return user_model_1.User.findOne({ email });
    }
    async create(userData) {
        return user_model_1.User.create(userData);
    }
}
exports.UserRepository = UserRepository;
