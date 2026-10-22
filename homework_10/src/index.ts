import { Account } from './classes/Account';
import { AccountManager } from './classes/AccountManager';
import { Transaction } from './classes/Transaction';

async function main(): Promise<void> {
  console.log('🚀 Budget Tracker CLI\n');

  const personalAccount = new Account('Личный бюджет');
  personalAccount.addTransaction(new Transaction(1000, 'income', '2023-01-01T00:00:00Z', 'Зарплата'));
  personalAccount.addTransaction(new Transaction(200, 'expense', '2023-01-05T00:00:00Z', 'Продукты, бытовая химия'));
  personalAccount.addTransaction(new Transaction(150, 'expense', '2023-01-09T00:00:00Z', 'Кафе "Уют"'));

  const manager = new AccountManager();
  manager.addAccount(personalAccount);
  console.log(String(personalAccount));

  try {
    await personalAccount.exportTransactionsToCSV('main_account.csv');
    console.log('\n✔ Транзакции экспортированы в main_account.csv');
  } catch (error: unknown) {
    console.log('В процессе записи произошла ошибка:', (error as Error).message);
  }

  try {
    await personalAccount.exportTransactionsToCSV('no-such-dir/account.csv');
  } catch (error: unknown) {
    console.log('✖ В процессе записи произошла ошибка:', (error as Error).message);
  }
}

void main();
