"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PercentageFeeStrategy = exports.FixedFeeStrategy = exports.NoFeeStrategy = void 0;
class NoFeeStrategy {
    calculateFee(amount) {
        return amount;
    }
}
exports.NoFeeStrategy = NoFeeStrategy;
class FixedFeeStrategy {
    constructor(fee) {
        this.fee = fee;
    }
    calculateFee(amount) {
        return amount - this.fee;
    }
}
exports.FixedFeeStrategy = FixedFeeStrategy;
class PercentageFeeStrategy {
    constructor(percentage) {
        this.percentage = percentage;
    }
    calculateFee(amount) {
        return amount - amount * (this.percentage / 100);
    }
}
exports.PercentageFeeStrategy = PercentageFeeStrategy;
