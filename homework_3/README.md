## Запуск

Нужен Node.js 18 или новее. Команды выполняются в этой папке:

```bash
npm install
npm run build
node dist/functions.js

# или одной командой:
npm run demo
```

> **Windows, PowerShell:** если `npm` выдаёт «выполнение сценариев отключено в этой системе», выполните один раз `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` или используйте `npm.cmd` вместо `npm`, или работайте в терминале `cmd`.

## Результат

```text
calculateTotal: 6000
calculateAverage: 2000
calculateAverage([]): 0
formatCurrency: 1000 ₽
getTopValues: [ 800, 500 ]
Всего записей: 5
Сумма: 4400
Среднее: 880
```
