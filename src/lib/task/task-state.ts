export class TaskState<TResult, TError = unknown> {
  static pending<TResult, TError = unknown>(): TaskState<TResult, TError> {
    return new TaskState<TResult, TError>(true, false);
  }

  static complete<TResult, TError = unknown>(result?: TResult): TaskState<TResult, TError> {
    return new TaskState<TResult, TError>(false, true, result);
  }

  static error<TError, TResult = unknown>(error: TError): TaskState<TResult, TError> {
    return new TaskState<TResult, TError>(false, true, undefined, error);
  }

  constructor(
    readonly pending = false,
    readonly complete = false,
    readonly result?: TResult,
    readonly error?: TError
  ) {
  }
}
