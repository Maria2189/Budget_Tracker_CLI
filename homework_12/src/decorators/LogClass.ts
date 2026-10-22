import { inspect } from 'node:util';

type Constructor = new (...args: any[]) => object;

export function LogClass<T extends Constructor>(target: T): T {
  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      const printableArgs: string = args.map((arg: unknown): string => inspect(arg, { depth: 0 })).join(', ');
      console.log(`Создан экземпляр класса ${target.name} с аргументами: ${printableArgs}`);
    }
  };
}
