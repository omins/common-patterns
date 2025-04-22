// 1) The Iterator interface
interface Iterator<T> {
  hasNext(): boolean;
  next(): IteratorResult<T>;
}

// 2) A simple Array-based Iterator
class ArrayIterator<T> implements Iterator<T> {
  private index = 0;
  constructor(private items: T[]) {}

  hasNext(): boolean {
    return this.index < this.items.length;
  }

  next(): IteratorResult<T> {
    if (!this.hasNext()) {
      return { done: true, value: undefined };
    }

    return {
      done: false,
      value: this.items[this.index++],
    };
  }
}

// 3) The "Aggregate" (collection) interface
interface IterableCollection<T> {
  getIterator(): Iterator<T>;
}

// 4) A concrete collection that returns our iterator
class SimpleCollection<T> implements IterableCollection<T> {
  constructor(private items: T[]) {}

  getIterator(): Iterator<T> {
    return new ArrayIterator(this.items);
  }
}

// 5) Client code
const coll = new SimpleCollection<number>([10, 20, 30]);
const it = coll.getIterator();

let result;

do {
  result = it.next();
  console.log(result);
} while (!result.done);
