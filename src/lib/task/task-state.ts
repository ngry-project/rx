/**
 * Represents state of async task.
 * @since 11.1.0
 * @author Alex Chugaev
 */
export class TaskState<TResult, TError = unknown> {

  /**
   * Creates initial state.
   * @since 11.2.1
   */
  static initial<TResult = unknown, TError = unknown>(): TaskState<TResult, TError> {
    return new TaskState<TResult, TError>();
  }

  /**
   * Creates pending state.
   * @since 11.1.0
   */
  static pending<TResult = unknown, TError = unknown>(): TaskState<TResult, TError> {
    return new TaskState<TResult, TError>(true);
  }

  /**
   * Creates complete state.
   * @param result Optional task result
   * @since 11.1.0
   */
  static complete<TResult = unknown, TError = unknown>(result?: TResult): TaskState<TResult, TError> {
    return new TaskState<TResult, TError>(false, true, false, result);
  }

  /**
   * Creates failed state.
   * @param error Optional task error
   * @since 11.1.0
   */
  static error<TResult = unknown, TError = unknown>(error?: TError): TaskState<TResult, TError> {
    return new TaskState<TResult, TError>(false, false, true, undefined, error);
  }

  /**
   * Indicates task is pending.
   * @since 11.1.0
   */
  readonly pending: boolean;

  /**
   * Indicates task is complete.
   * @since 11.1.0
   */
  readonly complete: boolean;

  /**
   * Indicates task is failed.
   * @since 11.2.1
   */
  readonly failed: boolean;

  /**
   * Gets task result.
   * @since 11.1.0
   */
  readonly result?: TResult;

  /**
   * Gets task error.
   * @since 11.1.0
   */
  readonly error?: TError;

  private constructor(
    pending = false,
    complete = false,
    failed = false,
    result?: TResult,
    error?: TError,
  ) {
    this.pending = pending;
    this.complete = complete;
    this.failed = failed;
    this.result = result;
    this.error = error;
  }
}
