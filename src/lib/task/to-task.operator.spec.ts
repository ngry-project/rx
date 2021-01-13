import { of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { toTask } from './to-task.operator';
import { TaskState } from './task-state';

describe('toTask', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should emit initial value and complete state on success', () => {
    scheduler.run(helpers => {
      const diagram = '(ab|)';
      const values = {
        a: TaskState.pending(),
        b: TaskState.complete(1),
      };
      const input = of(1).pipe(toTask());

      helpers.expectObservable(input).toBe(diagram, values);
    });
  });

  it('should emit initial value and error state on error', () => {
    scheduler.run(helpers => {
      const diagram = '(ab|)';
      const values = {
        a: TaskState.pending(),
        b: TaskState.error('Error message'),
      };
      const input = throwError('Error message').pipe(toTask());

      helpers.expectObservable(input).toBe(diagram, values);
    });
  });
});
