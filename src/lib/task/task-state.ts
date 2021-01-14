/**
 * Represents state of async task.
 * @since 11.1.0
 * @author Alex Chugaev
 */
export class TaskState<TResult, TError = unknown> {
  static initial<TResult = unknown, TError = unknown>(): TaskState<TResult, TError> {
    return new TaskState<TResult, TError>();
  }

  static pending<TResult = unknown, TError = unknown>(): TaskState<TResult, TError> {
    return new TaskState<TResult, TError>(true);
  }

  static complete<TResult = unknown, TError = unknown>(result?: TResult): TaskState<TResult, TError> {
    return new TaskState<TResult, TError>(false, true, false, result);
  }

  static error<TResult = unknown, TError = unknown>(error?: TError): TaskState<TResult, TError> {
    return new TaskState<TResult, TError>(false, false, true, undefined, error);
  }

  private constructor(
    readonly pending = false,
    readonly complete = false,
    readonly failed = false,
    readonly result?: TResult,
    readonly error?: TError,
  ) {
  }
}
