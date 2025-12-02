

export type InvestmentType = 'Equity' | 'Debt' | 'Mutual Fund';

export type Investment = {
    id: any;
    name: string;
    type: InvestmentType;
    amount: number;
    purchaseDate: string;
    currentValue: number;
}