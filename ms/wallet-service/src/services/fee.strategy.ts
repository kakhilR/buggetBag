

export interface FeeStrategy {
    calculateFee(amount: number): number
}

export class NoFeeStrategy implements FeeStrategy {
    calculateFee(amount: number): number {
        return amount
    }
}

export class FixedFeeStrategy implements FeeStrategy {
    
    constructor(private fee: number){}

    calculateFee(amount: number): number {
        return amount - this.fee
    }

}

export class PercentageFeeStrategy implements FeeStrategy {
    constructor(private percentage: number){}

    calculateFee(amount: number): number {
        return amount - amount * (this.percentage / 100)
    }
}

