## Запуск

Нужен Node.js 18 или новее. Команды выполняются в этой папке (hw_2):

```bash
npm install
npm run build
node dist/calculation-demo.js

# или одной командой:
npm run demo
```

> **Windows, PowerShell:** если `npm` выдаёт «выполнение сценариев отключено в этой системе», выполните один раз `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` или используйте `npm.cmd` вместо `npm`, или работайте в терминале `cmd`.

## Результат

```text
Доход за месяц:      120000
Расходы за месяц:    85000
Сбережения:          20000
Чистый доход:        35000
Остаток после сбережений: 15000
```
