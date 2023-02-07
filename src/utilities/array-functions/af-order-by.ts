import { SortingType } from './types';

export const afOrderBy = <T extends object, V extends SortingType>(
  items: T[],
  selector: (item: T) => V
): T[] => {
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
};
