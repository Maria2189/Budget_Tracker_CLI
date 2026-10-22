import { inspect } from 'node:util';

type AnyMethod = (this: unknown, ...args: unknown[]) => unknown;

const preview = (value: unknown): string => inspect(value, { depth: 0, breakLength: Infinity });

export function LogMethod(_target: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const original: AnyMethod = descriptor.value as AnyMethod;

  descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
    console.log(`Вызов метода ${propertyKey} с аргументами: ${args.map(preview).join(', ') || '—'}`);
    const result: unknown = original.apply(this, args);
    console.log(`Метод ${propertyKey} вернул: ${preview(result)}`);
    return result;
  };

  return descriptor;
}
