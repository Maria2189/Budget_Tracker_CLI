import type { TransactionType } from './TransactionType';

export interface ITransaction {
  readonly id: string;
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
}
