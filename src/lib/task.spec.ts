import { of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { toTask } from './task';

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
        a: {
          pending: true,
          complete: false,
        },
        b: {
          pending: false,
          complete: true,
          result: 1,
        },
      };
      const input = of(1).pipe(toTask());

      helpers.expectObservable(input).toBe(diagram, values);
    });
  });

  it('should emit initial value and error state on error', () => {
    scheduler.run(helpers => {
      const diagram = '(ab|)';
      const values = {
        a: {
          pending: true,
          complete: false,
        },
        b: {
          pending: false,
          complete: false,
          error: 'Error message',
        },
      };
      const input = throwError('Error message').pipe(toTask());

      helpers.expectObservable(input).toBe(diagram, values);
    });
  });
});
