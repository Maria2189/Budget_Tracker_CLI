## Запуск

```bash
npm install
npm run build
node dist/generics.js

# или одной командой:
npm run demo
```

> **Windows, PowerShell:** если `npm` выдаёт «выполнение сценариев отключено в этой системе», выполните один раз `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` или используйте `npm.cmd` вместо `npm`, или работайте в терминале `cmd`.

## Результат

```text
--- Описание всех продуктов ---
Product #1: Ноутбук, price: $150000
Product #2: Смартфон, price: $80000
Product #3: Планшет, price: $50000

--- После добавления объекта без describe() ---
Product #1: Ноутбук, price: $150000
Product #2: Смартфон, price: $80000
Product #3: Планшет, price: $50000
Элемент id: 4 не содержит описания.

getById(2): Product { id: 2, name: 'Смартфон', price: 80000 }
removeById(2): true
removeById(42): false
getAll(): [
  Product { id: 1, name: 'Ноутбук', price: 150000 },
  Product { id: 3, name: 'Планшет', price: 50000 },
  { id: 4 }
]
```