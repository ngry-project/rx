import { of, OperatorFunction } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

export interface TaskState<R> {
  result?: R;
  pending: boolean;
  complete: boolean;
  error?: unknown;
}

export function toTask<R>(): OperatorFunction<R, TaskState<R>> {
  return source => {
    return source.pipe(
      map(result => ({result, pending: false, complete: true})),
      catchError(error => of({error, pending: false, complete: false})),
      startWith({pending: true, complete: false})
    );
  };
}
