## Запуск

```bash
npm install
npm run build
npm start
```

> **Windows, PowerShell:** если `npm` выдаёт «выполнение сценариев отключено в этой системе», выполните один раз `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` или используйте `npm.cmd` вместо `npm`, или работайте в терминале `cmd`.

## Результат

```text
🚀 Budget Tracker CLI

Список всех бюджетов: [
  {
    id: 1,
    name: 'Личный бюджет',
    transactions: [ [Object], [Object], [Object] ],
    addTransaction: [Function: addTransaction],
    removeTransactionById: [Function: removeTransactionById],
    getTransactions: [Function: getTransactions]
  }
]
Сводная информация о бюджете: { income: 1000, expenses: 350, balance: 650 }
Удаление транзакции #2: true
Сводка после удаления: { income: 1000, expenses: 150, balance: 850 }
Список всех бюджетов после удаления: []
```
