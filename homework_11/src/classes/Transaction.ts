import { formatCurrency } from 'budget-utils';
import moment from 'moment';
import 'moment/locale/ru';
import { v4 as uuidv4 } from 'uuid';
import type { ITransaction } from '../interfaces/ITransaction';
import type { TransactionType } from '../interfaces/TransactionType';
import type { TransactionUpdate } from '../interfaces/utility-types';

export class Transaction implements ITransaction {
  static readonly TYPE_LABELS: Readonly<Record<TransactionType, string>> = { income: 'доход', expense: 'расход' };

  readonly id: string;

  constructor(
    public amount: number,
    public type: TransactionType,
    public date: string,
    public description: string,
  ) {
    this.id = uuidv4();
  }

  get formattedDate(): string {
    return moment(new Date(this.date)).locale('ru').format('LL');
  }

  update(update: TransactionUpdate): void {
    this.amount = update.amount ?? this.amount;
    this.type = update.type ?? this.type;
    this.date = update.date ?? this.date;
    this.description = update.description ?? this.description;
  }

  toString(): string {
    return `Транзакция ${this.id.slice(0, 8)}: ${this.description} (${Transaction.TYPE_LABELS[this.type]} ${formatCurrency(this.amount)}) | ${this.formattedDate}`;
  }
}
