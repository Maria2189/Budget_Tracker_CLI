import { writeFile } from 'node:fs/promises';
import { formatCurrency } from 'budget-utils';
import { v4 as uuidv4 } from 'uuid';
import type { IAccount } from '../interfaces/IAccount';
import type { ISummary } from '../interfaces/ISummary';
import type { TransactionType } from '../interfaces/TransactionType';
import type { AccountUpdate } from '../interfaces/utility-types';
import { LogClass } from '../decorators/LogClass';
import { LogMethod } from '../decorators/LogMethod';
import { getMetadata, Metadata } from '../decorators/Metadata';
import { ReadOnly } from '../decorators/ReadOnly';
import { escapeCsvValue } from '../utils/escapeCsvValue';
import { Transaction } from './Transaction';

@LogClass
export class Account implements IAccount, ISummary {
  private static readonly CSV_HEADERS: readonly string[] = ['id', 'amount', 'type', 'date', 'description'];

  @ReadOnly
  id: string;

  @Metadata('description', 'Массив транзакций счёта')
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

  @LogMethod
  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  @LogMethod
  removeTransactionById(transactionId: string): boolean {
    const index: number = this.transactions.findIndex((t: Transaction): boolean => t.id === transactionId);
    if (index === -1) {
      return false;
    }
    this.transactions.splice(index, 1);
    return true;
  }

  @LogMethod
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
    const transactionsDescription: string = getMetadata<string>('description', this, 'transactions') ?? 'Транзакции';
    return [
      `Счёт: ${this.name}`,
      `Баланс: ${formatCurrency(this.balance)}`,
      `${transactionsDescription}: ${this.transactions.length} шт.`,
    ].join('\n');
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

  async exportTransactionsToCSV(filename: string): Promise<void> {
    const header: string = Account.CSV_HEADERS.join(',');
    const rows: string[] = this.transactions.map((t: Transaction): string =>
      [t.id, t.amount, t.type, t.date, t.description].map(escapeCsvValue).join(','),
    );
    const csv: string = [header, ...rows].join('\n') + '\n';

    try {
      await writeFile(filename, csv, 'utf-8');
    } catch (error: unknown) {
      const reason: string = error instanceof Error ? error.message : String(error);
      throw new Error(`Не удалось записать файл «${filename}»: ${reason}`);
    }
  }

  private sumByType(type: TransactionType): number {
    return this.transactions
      .filter((t: Transaction): boolean => t.type === type)
      .reduce((sum: number, t: Transaction): number => sum + t.amount, 0);
  }
}
