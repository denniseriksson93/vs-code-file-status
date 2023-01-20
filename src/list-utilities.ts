type SortingType = string | number | Date;
type RecordKeyType = string | number | symbol;

export class ListUtilities {
  public static orderBy<T extends SortingType>(items: T[]): T[];
  public static orderBy<T extends object, V extends SortingType>(
    items: T[],
    selector: (item: T) => V
  ): T[];
  public static orderBy<T extends SortingType | object, V extends SortingType>(
    items: T[],
    selector?: (item: T) => V
  ): T[] {
    if (!items || items.length <= 0) {
      return [];
    }

    const selectorWithFallback =
      selector ?? ((item: SortingType | object) => item);

    if (typeof selectorWithFallback(items[0]) === 'number') {
      return [...items].sort(
        (a, b) =>
          (selectorWithFallback(a) as unknown as number) -
          (selectorWithFallback(b) as unknown as number)
      );
    }

    if (selectorWithFallback(items[0]) instanceof Date) {
      return [...items].sort(
        (a, b) =>
          (selectorWithFallback(a) as unknown as Date).getTime() -
          (selectorWithFallback(b) as unknown as Date).getTime()
      );
    }

    return [...items].sort((a, b) => {
      if (
        (selectorWithFallback(a) as unknown as string) >
        (selectorWithFallback(b) as unknown as string)
      ) {
        return 1;
      }

      if (
        (selectorWithFallback(a) as unknown as string) <
        (selectorWithFallback(b) as unknown as string)
      ) {
        return -1;
      }

      return 0;
    });
  }

  public static orderByDescending<T extends SortingType>(items: T[]): T[];
  public static orderByDescending<T extends object, V extends SortingType>(
    items: T[],
    selector: (item: T) => V
  ): T[];
  public static orderByDescending<
    T extends SortingType | object,
    V extends SortingType
  >(items: T[], selector?: (item: T) => V): T[] {
    if (!items || items.length <= 0) {
      return [];
    }

    const selectorWithFallback =
      selector ?? ((item: SortingType | object) => item);

    if (typeof selectorWithFallback(items[0]) === 'number') {
      return [...items].sort(
        (a, b) =>
          (selectorWithFallback(b) as unknown as number) -
          (selectorWithFallback(a) as unknown as number)
      );
    }

    if (selectorWithFallback(items[0]) instanceof Date) {
      return [...items].sort(
        (a, b) =>
          (selectorWithFallback(b) as unknown as Date).getTime() -
          (selectorWithFallback(a) as unknown as Date).getTime()
      );
    }

    return [...items].sort((a, b) => {
      if (
        (selectorWithFallback(b) as unknown as string) >
        (selectorWithFallback(a) as unknown as string)
      ) {
        return 1;
      }

      if (
        (selectorWithFallback(b) as unknown as string) <
        (selectorWithFallback(a) as unknown as string)
      ) {
        return -1;
      }

      return 0;
    });
  }

  public static distinct<T>(items: T[]): T[] {
    return [...new Set(items)];
  }

  public static distinctBy<T extends object, V>(
    items: T[],
    selector: (item: T) => V
  ): T[] {
    return [...new Map(items.map((item) => [selector(item), item])).values()];
  }

  public static sum(items: number[]): number {
    return items.reduce((prev, curr) => prev + curr, 0);
  }

  public static sumBy<T extends object>(
    items: T[],
    selector: (item: T) => number
  ): number {
    return items.reduce((prev, curr) => prev + selector(curr), 0);
  }

  public static min(items: number[]): number {
    return Math.min(...items);
  }

  public static minBy<T extends object, V extends SortingType>(
    items: T[],
    selector: (item: T) => V
  ): T {
    return this.orderBy(items, selector)[0];
  }

  public static max(items: number[]): number {
    return Math.max(...items);
  }

  public static maxBy<T extends object, V extends SortingType>(
    items: T[],
    selector: (item: T) => V
  ): T {
    return this.orderByDescending(items, selector)[0];
  }

  public static groupBy<T extends object, V extends RecordKeyType>(
    items: T[],
    selector: (item: T) => V
  ): Record<V, T[]> {
    return items.reduce((prev, curr) => {
      (prev[selector(curr)] = prev[selector(curr)] ?? []).push(curr);
      return prev;
    }, {} as Record<V, T[]>);
  }

  public static partition<T>(items: T[], size: number): T[][] {
    if (size < 1) {
      throw new Error('size should not be less than 1');
    }

    const partitionsToReturn: T[][] = [];

    for (let i = 0; i < items.length; i += size) {
      partitionsToReturn.push(items.slice(i, i + size));
    }

    return partitionsToReturn;
  }
}
