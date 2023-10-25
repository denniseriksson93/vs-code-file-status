import { SortingType } from './types';

export const afOrderBy = <T extends object, V extends SortingType>(
  items: T[],
  selector: (item: T) => V
): T[] => {
  if (!items || items.length <= 0) {
    return [];
  }

  if (typeof selector(items[0]) === 'number') {
    return [...items].sort(
      (a, b) =>
        (selector(a) as unknown as number) - (selector(b) as unknown as number)
    );
  }

  if (selector(items[0]) instanceof Date) {
    return [...items].sort(
      (a, b) =>
        (selector(a) as unknown as Date).getTime() -
        (selector(b) as unknown as Date).getTime()
    );
  }

  return [...items].sort((a, b) => {
    if (
      (selector(a) as unknown as string) > (selector(b) as unknown as string)
    ) {
      return 1;
    }

    if (
      (selector(a) as unknown as string) < (selector(b) as unknown as string)
    ) {
      return -1;
    }

    return 0;
  });
};
