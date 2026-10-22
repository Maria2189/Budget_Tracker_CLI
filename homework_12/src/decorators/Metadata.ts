import 'reflect-metadata';

export function Metadata(key: string, value: unknown) {
  return (target: object, propertyKey: string | symbol): void => {
    Reflect.defineMetadata(key, value, target, propertyKey);
  };
}

export function getMetadata<T>(key: string, target: object, propertyKey: string | symbol): T | undefined {
  return Reflect.getMetadata(key, target, propertyKey) as T | undefined;
}
