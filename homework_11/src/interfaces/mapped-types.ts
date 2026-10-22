import type { ITransaction } from './ITransaction';

export type TransactionFieldType<TField> = TField extends keyof ITransaction ? ITransaction[TField] : never;

export type OptionalTransaction<TFields extends keyof ITransaction> = {
  [K in keyof ITransaction as K extends TFields ? K : never]?: ITransaction[K];
} & {
  [K in keyof ITransaction as K extends TFields ? never : K]-?: ITransaction[K];
};

export type ReadonlyTransactionFields<TFields extends keyof ITransaction> = {
  readonly [K in keyof ITransaction as K extends TFields ? K : never]: ITransaction[K];
} & {
  [K in keyof ITransaction as K extends TFields ? never : K]: ITransaction[K];
};

export type IsIncome<T> = T extends { type: 'income' } ? true : false;

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

export type AmountType = TransactionFieldType<'amount'>;
export type UnknownType = TransactionFieldType<'unknown'>; 

export type TransactionWithOptionalDescAndDate = OptionalTransaction<'description' | 'date'>;
export type TransactionReadonlyIdAndType = ReadonlyTransactionFields<'id' | 'type'>;

export type CheckIncome1 = IsIncome<{ type: 'income'; amount: number }>;
export type CheckIncome2 = IsIncome<{ type: 'expense'; amount: number }>;
export type CheckIncome3 = IsIncome<ITransaction>; 

export type IncomeTransaction = ITransaction & { type: 'income' };

export type TypeTests = [
  Expect<Equal<AmountType, number>>,
  Expect<Equal<UnknownType, never>>,
  Expect<Equal<TransactionFieldType<'type'>, 'income' | 'expense'>>,
  Expect<Equal<CheckIncome1, true>>,
  Expect<Equal<CheckIncome2, false>>,
  Expect<Equal<CheckIncome3, false>>,
  Expect<Equal<IsIncome<IncomeTransaction>, true>>,
];

export const draft: TransactionWithOptionalDescAndDate = { id: 'draft-1', amount: 500, type: 'expense' };

export const snapshot: TransactionReadonlyIdAndType = {
  id: 'tx-1',
  amount: 1000,
  type: 'income',
  date: '2023-01-01T00:00:00Z',
  description: 'Зарплата',
};
snapshot.amount = 1200;
