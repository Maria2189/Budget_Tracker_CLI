/// <reference path="../interfaces/ITransaction.ts" />

namespace BudgetTracker {
  export class Transaction implements ITransaction {
    static readonly TYPE_LABELS: Record<TransactionType, string> = { income: 'доход', expense: 'расход' };

    constructor(
      public readonly id: number,
      public readonly amount: number,
      public readonly type: TransactionType,
      public readonly date: string,
      public readonly description: string,
    ) {}

    static formatDate(isoDate: string): string {
      return new Date(isoDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    toString(): string {
      return `Транзакция #${this.id}: ${this.description} (${Transaction.TYPE_LABELS[this.type]} ${this.amount} ₽) | ${Transaction.formatDate(this.date)}`;
    }
  }
}
