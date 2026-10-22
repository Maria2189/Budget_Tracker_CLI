export function calculateTotal(values: number[]): number {
  return values.reduce((sum: number, value: number): number => sum + value, 0);
}

export function calculateAverage(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return calculateTotal(values) / values.length;
}

export function formatCurrency(amount: number, symbol: string): string {
  return `${amount} ${symbol}`;
}

export function getTopValues(values: number[], count: number): number[] {
  return [...values].sort((a: number, b: number): number => b - a).slice(0, Math.max(0, count));
}

export function printSummary(values: number[]): void {
  console.log(`Всего записей: ${values.length}`);
  console.log(`Сумма: ${calculateTotal(values)}`);
  console.log(`Среднее: ${calculateAverage(values)}`);
}

const expenses: number[] = [100, 500, 1000, 2000, 800];

console.log('calculateTotal:', calculateTotal([1000, 2000, 3000]));
console.log('calculateAverage:', calculateAverage([1000, 2000, 3000]));
console.log('calculateAverage([]):', calculateAverage([]));
console.log('formatCurrency:', formatCurrency(1000, '₽'));
console.log('getTopValues:', getTopValues([100, 500, 200, 800], 2));
printSummary(expenses);
