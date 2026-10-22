/// <reference path="ISummary.ts" />
/// <reference path="../classes/Account.ts" />

namespace BudgetTracker {
  export interface IAccountManager {
    addAccount(account: Account): void;
    removeAccountById(accountId: number): boolean;
    getAllAccounts(): Account[];
    getAccountById(id: number): Account | undefined;
    /** Сводка по конкретному счёту либо по всем счетам, если id не передан. */
    getSummary(accountId?: number): ISummary;
  }
}
