/// <reference path="../interfaces/IAccount.ts" />
/// <reference path="../interfaces/ISummary.ts" />
/// <reference path="Transaction.ts" />

namespace BudgetTracker {
  export class Account implements IAccount, ISummary {
    private transactions: Transaction[] = [];

    constructor(
      public readonly id: number,
      public readonly name: string,
    ) {}

    get income(): number {
      return this.sumByType('income');
    }

    get expenses(): number {
      return this.sumByType('expense');
    }

    get balance(): number {
      return this.income - this.expenses;
    }

    addTransaction(transaction: Transaction): void {
      this.transactions.push(transaction);
    }

    removeTransactionById(transactionId: number): boolean {
      const index: number = this.transactions.findIndex((t: Transaction): boolean => t.id === transactionId);
      if (index === -1) {
        return false;
      }
      this.transactions.splice(index, 1);
      return true;
    }

    getTransactions(): Transaction[] {
      return [...this.transactions];
    }

    getSummary(): ISummary {
      return { income: this.income, expenses: this.expenses, balance: this.balance };
    }

    getSummaryString(): string {
      return `${this.name}: баланс ${this.balance} ₽, транзакций: ${this.transactions.length}`;
    }

    toString(): string {
      const header: string[] = ['id', 'описание', 'тип', 'сумма', 'дата'];
      const rows: string[][] = this.transactions.map((t: Transaction): string[] => [
        String(t.id),
        t.description,
        Transaction.TYPE_LABELS[t.type],
        `${t.amount} ₽`,
        Transaction.formatDate(t.date),
      ]);

      const widths: number[] = header.map((h: string, i: number): number =>
        Math.max(h.length, ...rows.map((r: string[]): number => r[i].length)),
      );
      const line = (left: string, mid: string, right: string): string =>
        left + widths.map((w: number): string => '─'.repeat(w + 2)).join(mid) + right;
      const row = (cells: string[]): string =>
        '│' + cells.map((c: string, i: number): string => ` ${c.padEnd(widths[i])} `).join('│') + '│';

      return [
        `Счёт #${this.id} «${this.name}»`,
        line('┌', '┬', '┐'),
        row(header),
        line('├', '┼', '┤'),
        ...rows.map(row),
        line('└', '┴', '┘'),
        `Доходы: ${this.income} ₽ | Расходы: ${this.expenses} ₽ | Баланс: ${this.balance} ₽`,
      ].join('\n');
    }

    private sumByType(type: TransactionType): number {
      return this.transactions
        .filter((t: Transaction): boolean => t.type === type)
        .reduce((sum: number, t: Transaction): number => sum + t.amount, 0);
    }
  }
}
