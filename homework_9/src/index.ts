import { Account } from './classes/Account';
import { AccountManager } from './classes/AccountManager';
import { Transaction } from './classes/Transaction';
import {
  limits,
  type AccountInfo,
  type TransactionConstructorParams,
  type TransactionInstance,
  type TransactionPreview,
} from './interfaces/utility-types';

console.log('🚀 Budget Tracker CLI\n');

const personalAccount = new Account('Личный бюджет');
const transaction: Transaction = new Transaction(1000, 'income', '2023-01-01T00:00:00Z', 'Зарплата');

transaction.update({ amount: 1200 });
console.log('Обновлённая транзакция:');
console.log(transaction.toString());

personalAccount.addTransaction(transaction);
personalAccount.addTransaction(new Transaction(200, 'expense', '2023-01-05T00:00:00Z', 'Продукты'));
personalAccount.addTransaction(new Transaction(150, 'expense', '2023-01-09T00:00:00Z', 'Коммунальные услуги'));

personalAccount.update({ name: 'Основной счёт' });
const info: AccountInfo = { id: personalAccount.id, name: personalAccount.name };
console.log('\nОбновлённый счёт:', info);

const manager = new AccountManager();
manager.addAccount(personalAccount);

console.log('\n' + String(personalAccount));
console.log(`\nОбщий баланс всех бюджетов: ${manager.balance} ₽`);

console.log('\nТранзакции основного счёта:');
personalAccount.getTransactions().forEach((t: Transaction): void => console.log(t.toString()));

const previews: TransactionPreview[] = personalAccount
  .getTransactions()
  .map(({ id, amount, type, date }: Transaction): TransactionPreview => ({ id, amount, type, date }));
console.log('\nКраткий вид транзакций:', previews);

console.log('\nЛимит пополнений:', limits.income);
console.log('Лимит трат:', limits.expense);

const transactionParams: TransactionConstructorParams = [500, 'expense', '2023-02-01T00:00:00Z', 'Покупка'];
const newTransaction: TransactionInstance = new Transaction(...transactionParams);
console.log(newTransaction.toString());
