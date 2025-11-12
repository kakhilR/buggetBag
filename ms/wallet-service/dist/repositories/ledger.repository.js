"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerRepository = void 0;
const ledger_model_1 = require("../models/ledger.model");
class LedgerRepository {
    async recordEntry(userId, type, amount, balanceAfter, session) {
        return ledger_model_1.Ledger.create([{ userId, type, amount, balanceAfter }], { session });
    }
}
exports.LedgerRepository = LedgerRepository;
