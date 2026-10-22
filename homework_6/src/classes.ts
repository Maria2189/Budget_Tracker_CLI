import { IAccount, IAccountManager, ISummary, ITransaction, TransactionType } from './types';

const TYPE_LABELS: Record<TransactionType, string> = { income: 'доход', expense: 'расход' };

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export class Transaction implements ITransaction {
  constructor(
    public readonly id: number,
    public readonly amount: number,
    public readonly type: TransactionType,
    public readonly date: string,
    public readonly description: string,
  ) {}

  toString(): string {
    return `Транзакция #${this.id}: ${this.description} (${TYPE_LABELS[this.type]} ${this.amount} ₽) | ${formatDate(this.date)}`;
  }
}

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
      TYPE_LABELS[t.type],
      `${t.amount} ₽`,
      formatDate(t.date),
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

export class AccountManager implements IAccountManager, ISummary {
  private accounts: Account[] = [];

  get income(): number {
    return this.accounts.reduce((sum: number, a: Account): number => sum + a.income, 0);
  }

  get expenses(): number {
    return this.accounts.reduce((sum: number, a: Account): number => sum + a.expenses, 0);
  }

  get balance(): number {
    return this.income - this.expenses;
  }

  addAccount(account: Account): void {
    this.accounts.push(account);
  }

  removeAccountById(accountId: number): boolean {
    const index: number = this.accounts.findIndex((a: Account): boolean => a.id === accountId);
    if (index === -1) {
      return false;
    }
    this.accounts.splice(index, 1);
    return true;
  }

  getAccountById(id: number): Account | undefined {
    return this.accounts.find((a: Account): boolean => a.id === id);
  }

  getAllAccounts(): Account[] {
    return [...this.accounts];
  }

  getSummary(accountId?: number): ISummary {
    if (accountId !== undefined) {
      const account: Account | undefined = this.getAccountById(accountId);
      return account ? account.getSummary() : { income: 0, expenses: 0, balance: 0 };
    }
    return { income: this.income, expenses: this.expenses, balance: this.balance };
  }

  getSummaryString(): string {
    return `Счетов: ${this.accounts.length} | Общий баланс: ${this.balance} ₽`;
  }

  toString(): string {
    const lines: string[] = this.accounts.map((a: Account, i: number): string => `  ${i + 1}) ${a.getSummaryString()}`);
    return ['Все счета:', ...lines, this.getSummaryString()].join('\n');
  }
}
