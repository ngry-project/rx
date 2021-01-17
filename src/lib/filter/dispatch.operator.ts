import { MonoTypeOperatorFunction } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';

/**
 * Filters stream of values in either open or closed mode.
 *
 * - When **open**, emitted values will pass through without changes.
 * - When **closed**, emitted values won't pass through.
 *
 * @example Open mode
 * ```ts
 * from([1,2,3])
 *   .pipe(dispatch(true))
 *   .subscribe(console.log);
 * // Prints 1, 2, 3 then completes
 * ```
 *
 * @example Closed mode
 * ```ts
 * from([1,2,3])
 *   .pipe(dispatch(false))
 *   .subscribe(console.log);
 * // Ignores values, thus prints nothing and completes
 * ```
 *
 * @param open Whether operator should pass values or not
 * @since 11.5.0
 * @author Alex Chugaev
 */
export function dispatch<T>(open: boolean): MonoTypeOperatorFunction<T> {
  return source => {
    return open ? source : source.pipe(ignoreElements());
  };
}
