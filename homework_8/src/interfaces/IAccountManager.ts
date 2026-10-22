import type { Account } from '../classes/Account';
import type { ISummary } from './ISummary';

export interface IAccountManager {
  addAccount(account: Account): void;
  removeAccountById(accountId: string): boolean;
  getAllAccounts(): Account[];
  getAccountById(id: string): Account | undefined;
  /** Сводка по конкретному счёту либо по всем счетам, если id не передан. */
  getSummary(accountId?: string): ISummary;
}
