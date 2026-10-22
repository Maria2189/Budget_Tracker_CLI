import { Account, AccountManager, Transaction } from './classes';

console.log('🚀 Budget Tracker CLI\n');

const personalAccount = new Account(1, 'Личный бюджет');
personalAccount.addTransaction(new Transaction(1, 1000, 'income', '2023-01-01T00:00:00Z', 'Зарплата'));
personalAccount.addTransaction(new Transaction(2, 200, 'expense', '2023-01-05T00:00:00Z', 'Продукты'));
personalAccount.addTransaction(new Transaction(3, 150, 'expense', '2023-01-10T00:00:00Z', 'Коммунальные услуги'));

const manager = new AccountManager();
manager.addAccount(personalAccount);

console.log(String(personalAccount));
console.log(`\nОбщий баланс всех бюджетов: ${manager.balance} ₽`);
console.log(manager.getSummary(1));

console.log('\nТранзакции личного бюджета:');
personalAccount.getTransactions().forEach((t: Transaction): void => console.log(t.toString()));

console.log('\n' + String(manager));
