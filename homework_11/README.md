## Запуск

```bash
npm install
npm run typecheck   # здесь проверяются примеры типов
npm start
```

> **Windows, PowerShell:** если `npm` выдаёт «выполнение сценариев отключено в этой системе», выполните один раз `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` или используйте `npm.cmd` вместо `npm`.

## Результат

```text
🚀 Budget Tracker CLI — Conditional и Mapped Types

TransactionFieldType<"amount"> → number: 1500
TransactionFieldType<"type">   → income | expense: expense
IsIncome<{ type: "income" }>  → true
IsIncome<{ type: "expense" }> → false

Черновик (OptionalTransaction<"description" | "date">): { id: 'draft-1', amount: 500, type: 'expense' }
Черновик без описания: {
  id: 'draft-2',
  amount: 300,
  type: 'income',
  date: '2023-03-01T00:00:00Z'
}

Снимок (ReadonlyTransactionFields<"id" | "type">): {
  id: 'tx-1',
  amount: 1200,
  type: 'income',
  date: '2023-01-01T00:00:00Z',
  description: 'Зарплата'
}

Только доходы (IncomeTransaction[]):
  Зарплата: 1000 ₽
  Премия: 500 ₽
```
