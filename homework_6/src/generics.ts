export interface Identifiable {
  id: number;
}

export interface Describable {
  describe(): string;
}

function isDescribable(item: unknown): item is Describable {
  return typeof item === 'object' && item !== null && typeof (item as Partial<Describable>).describe === 'function';
}

export class GenericStorage<T extends Identifiable> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  removeById(id: number): boolean {
    const index: number = this.items.findIndex((item: T): boolean => item.id === id);
    if (index === -1) {
      return false;
    }
    this.items.splice(index, 1);
    return true;
  }

  getById(id: number): T | undefined {
    return this.items.find((item: T): boolean => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  describeAll(): void {
    this.items.forEach((item: T): void => {
      console.log(isDescribable(item) ? item.describe() : `Элемент id: ${item.id} не содержит описания.`);
    });
  }
}

export class Product implements Identifiable, Describable {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
  ) {}

  describe(): string {
    return `Product #${this.id}: ${this.name}, price: $${this.price}`;
  }
}

const productStorage = new GenericStorage<Product>();

productStorage.add(new Product(1, 'Ноутбук', 150000));
productStorage.add(new Product(2, 'Смартфон', 80000));
productStorage.add(new Product(3, 'Планшет', 50000));

console.log('--- Описание всех продуктов ---');
productStorage.describeAll();

productStorage.add({ id: 4 } as Product);
console.log('\n--- После добавления объекта без describe() ---');
productStorage.describeAll();

console.log('\ngetById(2):', productStorage.getById(2));
console.log('removeById(2):', productStorage.removeById(2));
console.log('removeById(42):', productStorage.removeById(42));
console.log('getAll():', productStorage.getAll());
