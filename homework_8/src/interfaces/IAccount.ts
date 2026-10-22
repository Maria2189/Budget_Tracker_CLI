import type { ITransaction } from './ITransaction';

export interface IAccount {
  readonly id: string;
  readonly name: string;
  addTransaction(transaction: ITransaction): void;
  removeTransactionById(transactionId: string): boolean;
  getTransactions(): ITransaction[];
}
