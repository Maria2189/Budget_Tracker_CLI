import { formatCurrency } from 'budget-utils';
import { v4 as uuidv4 } from 'uuid';
import type { IAccount } from '../interfaces/IAccount';
import type { ISummary } from '../interfaces/ISummary';
import type { TransactionType } from '../interfaces/TransactionType';
import type { AccountUpdate } from '../interfaces/utility-types';
import { Transaction } from './Transaction';

export class Account implements IAccount, ISummary {
  readonly id: string;
  private transactions: Transaction[] = [];

  constructor(public name: string) {
    this.id = uuidv4();
  }

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

  removeTransactionById(transactionId: string): boolean {
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

  update(update: AccountUpdate): void {
    this.name = update.name ?? this.name;
  }

  getSummary(): ISummary {
    return { income: this.income, expenses: this.expenses, balance: this.balance };
  }

  getSummaryString(): string {
    return `${this.name}: баланс ${formatCurrency(this.balance)}, транзакций: ${this.transactions.length}`;
  }

  toString(): string {
    const header: string[] = ['id', 'описание', 'тип', 'сумма', 'дата'];
    const rows: string[][] = this.transactions.map((t: Transaction): string[] => [
      t.id.slice(0, 8),
      t.description,
      Transaction.TYPE_LABELS[t.type],
      formatCurrency(t.amount),
      t.formattedDate,
    ]);

    const widths: number[] = header.map((h: string, i: number): number =>
      Math.max(h.length, ...rows.map((r: string[]): number => r[i].length)),
    );
    const line = (left: string, mid: string, right: string): string =>
      left + widths.map((w: number): string => '─'.repeat(w + 2)).join(mid) + right;
    const row = (cells: string[]): string =>
      '│' + cells.map((c: string, i: number): string => ` ${c.padEnd(widths[i])} `).join('│') + '│';

    return [
      `Счёт «${this.name}» (${this.id.slice(0, 8)})`,
      line('┌', '┬', '┐'),
      row(header),
      line('├', '┼', '┤'),
      ...rows.map(row),
      line('└', '┴', '┘'),
      `Доходы: ${formatCurrency(this.income)} | Расходы: ${formatCurrency(this.expenses)} | Баланс: ${formatCurrency(this.balance)}`,
    ].join('\n');
  }

  private sumByType(type: TransactionType): number {
    return this.transactions
      .filter((t: Transaction): boolean => t.type === type)
      .reduce((sum: number, t: Transaction): number => sum + t.amount, 0);
  }
}
