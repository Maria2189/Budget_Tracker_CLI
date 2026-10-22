import 'reflect-metadata';
import { Account } from './classes/Account';
import { AccountManager } from './classes/AccountManager';
import { Transaction } from './classes/Transaction';

console.log('🚀 Budget Tracker CLI\n');

const personalAccount = new Account('Личный бюджет');
const transaction: Transaction = new Transaction(1000, 'income', '2023-01-01T00:00:00Z', 'Зарплата');

transaction.update({ amount: 1200 });
console.log('Обновлённая транзакция:');
console.log(transaction.toString());

personalAccount.addTransaction(transaction);
personalAccount.addTransaction(new Transaction(200, 'expense', '2023-01-05T00:00:00Z', 'Продукты'));
personalAccount.addTransaction(new Transaction(150, 'expense', '2023-01-09T00:00:00Z', 'Коммунальные услуги'));

const manager = new AccountManager();
manager.addAccount(personalAccount);

console.log('\n' + String(personalAccount));
console.log(`\nОбщий баланс всех бюджетов: ${manager.balance} ₽`);

console.log('\nИнформация о счёте:');
console.log(personalAccount.getSummaryString());

console.log('\nТранзакции основного счёта:');
personalAccount.getTransactions().forEach((t: Transaction): void => console.log(t.toString()));

console.log('\nПопытка изменить id счёта:');
try {
  personalAccount.id = 'hacked';
} catch (error: unknown) {
  console.log('✖', (error as Error).message);
}
console.log('id не изменился:', personalAccount.id);
