import { DependencyList, useCallback } from 'react';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { useObservable, observerFunction } from './observable';

export function useMappedObservable<T, W>(
  observableGenerator: observerFunction<T>,
  mapperFunction: (data: T) => W,
  deps: DependencyList
): [W | undefined, any, boolean] {

  const newGenerator = useCallback(() => {
    return observableGenerator().pipe(
      map(mapperFunction),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }, [observableGenerator])

  const result = useObservable(newGenerator, deps)

  return result;
}