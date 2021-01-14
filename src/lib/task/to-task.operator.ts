import { of, OperatorFunction } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { TaskState } from './task-state';

/**
 * Represents state of async task.
 * @since 11.1.0
 * @author Alex Chugaev
 */
export function toTask<TResult, TError = unknown>(): OperatorFunction<TResult, TaskState<TResult, TError>> {
  return source => {
    return source.pipe(
      map((result: TResult) => TaskState.complete<TResult, TError>(result)),
      catchError((error: TError) => of(TaskState.error<TResult, TError>(error))),
      startWith(TaskState.pending<TResult, TError>()),
    );
  };
}
