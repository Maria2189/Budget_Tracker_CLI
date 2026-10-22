import { formatCurrency } from 'budget-utils';
import type { IAccountManager } from '../interfaces/IAccountManager';
import type { ISummary } from '../interfaces/ISummary';
import type { Account } from './Account';

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

  removeAccountById(accountId: string): boolean {
    const index: number = this.accounts.findIndex((a: Account): boolean => a.id === accountId);
    if (index === -1) {
      return false;
    }
    this.accounts.splice(index, 1);
    return true;
  }

  getAccountById(id: string): Account | undefined {
    return this.accounts.find((a: Account): boolean => a.id === id);
  }

  getAllAccounts(): Account[] {
    return [...this.accounts];
  }

  getSummary(accountId?: string): ISummary {
    if (accountId !== undefined) {
      const account: Account | undefined = this.getAccountById(accountId);
      return account ? account.getSummary() : { income: 0, expenses: 0, balance: 0 };
    }
    return { income: this.income, expenses: this.expenses, balance: this.balance };
  }

  getSummaryString(): string {
    return `Счетов: ${this.accounts.length} | Общий баланс: ${formatCurrency(this.balance)}`;
  }

  toString(): string {
    const lines: string[] = this.accounts.map((a: Account, i: number): string => `  ${i + 1}) ${a.getSummaryString()}`);
    return ['Все счета:', ...lines, this.getSummaryString()].join('\n');
  }
}
