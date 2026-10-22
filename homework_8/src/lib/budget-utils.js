export function formatCurrency(amount, symbol = '₽') {
  const formatted = Number(amount).toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatted + ' ' + symbol;
}
