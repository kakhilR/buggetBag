"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
class UserFactory {
    static createUser({ email, passwordHash, name, role }) {
        if (role === 'ADMIN')
            return { name, email, passwordHash, role: 'ADMIN' };
        return { name, email, passwordHash, role: 'USER' };
    }
}
exports.UserFactory = UserFactory;
