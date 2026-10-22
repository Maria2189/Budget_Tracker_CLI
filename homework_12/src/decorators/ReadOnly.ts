export function ReadOnly(target: object, propertyKey: string | symbol): void {
  const values: WeakMap<object, unknown> = new WeakMap<object, unknown>();

  Object.defineProperty(target, propertyKey, {
    enumerable: true,
    configurable: false,
    get(this: object): unknown {
      return values.get(this);
    },
    set(this: object, value: unknown): void {
      if (values.has(this)) {
        throw new Error(`Свойство «${String(propertyKey)}» доступно только для чтения`);
      }
      values.set(this, value);
    },
  });
}
