import { formatCurrency } from 'budget-utils';
import moment from 'moment';
import 'moment/locale/ru';
import { v4 as uuidv4 } from 'uuid';
import type { ITransaction } from '../interfaces/ITransaction';
import type { TransactionType } from '../interfaces/TransactionType';

export class Transaction implements ITransaction {
  static readonly TYPE_LABELS: Readonly<Record<TransactionType, string>> = { income: 'доход', expense: 'расход' };

  readonly id: string;

  constructor(
    public readonly amount: number,
    public readonly type: TransactionType,
    public readonly date: string,
    public readonly description: string,
  ) {
    this.id = uuidv4();
  }

  get formattedDate(): string {
    return moment(new Date(this.date)).locale('ru').format('LL');
  }

  toString(): string {
    return `Транзакция ${this.id.slice(0, 8)}: ${this.description} (${Transaction.TYPE_LABELS[this.type]} ${formatCurrency(this.amount)}) | ${this.formattedDate}`;
  }
}
