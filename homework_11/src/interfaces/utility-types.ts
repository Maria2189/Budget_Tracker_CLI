import type { Transaction } from '../classes/Transaction';
import type { IAccount } from './IAccount';
import type { ITransaction } from './ITransaction';
import type { TransactionType } from './TransactionType';

//Частичное обновление
export type TransactionUpdate = Partial<Omit<ITransaction, 'id'>>;
export type AccountUpdate = Partial<Pick<IAccount, 'name'>>;

//Обязательные поля и исключения
export type CompleteTransaction = Required<ITransaction>;
export type TransactionWithoutDescription = Omit<ITransaction, 'description'>;

//Выборка ключевых полей
export type TransactionPreview = Pick<ITransaction, 'id' | 'amount' | 'type' | 'date'>;
export type AccountInfo = Pick<IAccount, 'id' | 'name'>;

//Словарь лимитов по типам транзакций
export type CategoryLimits = Record<TransactionType, number>;

export const limits: Readonly<CategoryLimits> = {
  income: 10000,
  expense: 5000,
};

//Типы на основе конструктора класса
export type TransactionConstructorParams = ConstructorParameters<typeof Transaction>;
export type TransactionInstance = InstanceType<typeof Transaction>;

//Описание, допускающее null
export type NullableDescription = Omit<ITransaction, 'description'> & {
  description: string | null;
};
