import { Account } from './classes/Account';
import { Transaction } from './classes/Transaction';
import type { ITransaction } from './interfaces/ITransaction';
import {
  draft,
  snapshot,
  type AmountType,
  type CheckIncome1,
  type CheckIncome2,
  type IncomeTransaction,
  type OptionalTransaction,
  type TransactionFieldType,
} from './interfaces/mapped-types';

console.log('🚀 Budget Tracker CLI — Conditional и Mapped Types\n');

const amount: AmountType = 1500; 
const kind: TransactionFieldType<'type'> = 'expense';
console.log('TransactionFieldType<"amount"> → number:', amount);
console.log('TransactionFieldType<"type">   → income | expense:', kind);

const check1: CheckIncome1 = true;
const check2: CheckIncome2 = false;
console.log('IsIncome<{ type: "income" }>  →', check1);
console.log('IsIncome<{ type: "expense" }> →', check2);

console.log('\nЧерновик (OptionalTransaction<"description" | "date">):', draft);
const quickDraft: OptionalTransaction<'description'> = { id: 'draft-2', amount: 300, type: 'income', date: '2023-03-01T00:00:00Z' };
console.log('Черновик без описания:', quickDraft);

console.log('\nСнимок (ReadonlyTransactionFields<"id" | "type">):', snapshot);

const account = new Account('Личный бюджет');
account.addTransaction(new Transaction(1000, 'income', '2023-01-01T00:00:00Z', 'Зарплата'));
account.addTransaction(new Transaction(200, 'expense', '2023-01-05T00:00:00Z', 'Продукты'));
account.addTransaction(new Transaction(500, 'income', '2023-01-20T00:00:00Z', 'Премия'));

const isIncomeTransaction = (t: ITransaction): t is IncomeTransaction => t.type === 'income';
const all: ITransaction[] = account.getTransactions();
const incomes: IncomeTransaction[] = all.filter(isIncomeTransaction);
console.log('\nТолько доходы (IncomeTransaction[]):');
incomes.forEach((t: IncomeTransaction): void => console.log(`  ${t.description}: ${t.amount} ₽`));
