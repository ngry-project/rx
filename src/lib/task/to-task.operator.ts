import { of, OperatorFunction } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { TaskState } from './task-state';

export function toTask<TResult, TError = unknown>(): OperatorFunction<TResult, TaskState<TResult, TError>> {
  return source => {
    return source.pipe(
      map((result: TResult) => TaskState.complete<TResult, TError>(result)),
      catchError((error: TError) => of(TaskState.error<TError, TResult>(error))),
      startWith(TaskState.pending<TResult, TError>()),
    );
  };
}
