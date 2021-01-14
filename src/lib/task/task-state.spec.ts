import { TaskState } from './task-state';

describe('TaskState', () => {
  describe('initial', () => {
    it('should create initial state', () => {
      const state: TaskState<number> = TaskState.initial();

      expect(state).toEqual({
        pending: false,
        complete: false,
        failed: false,
      });
    });
  });

  describe('pending', () => {
    it('should create pending state', () => {
      const state: TaskState<number> = TaskState.pending();

      expect(state).toEqual({
        pending: true,
        complete: false,
        failed: false,
      });
    });
  });

  describe('complete', () => {
    it('should create complete state without result', () => {
      const state: TaskState<number> = TaskState.complete();

      expect(state).toEqual({
        pending: false,
        complete: true,
        failed: false,
      });
    });

    it('should create complete state with result', () => {
      const state: TaskState<number> = TaskState.complete(123);

      expect(state).toEqual({
        pending: false,
        complete: true,
        failed: false,
        result: 123,
      });
    });
  });

  describe('error', () => {
    it('should create complete state without result', () => {
      const state: TaskState<number> = TaskState.error();

      expect(state).toEqual({
        pending: false,
        complete: false,
        failed: true,
      });
    });

    it('should create complete state with result', () => {
      const state: TaskState<number> = TaskState.error(123);

      expect(state).toEqual({
        pending: false,
        complete: false,
        failed: true,
        error: 123,
      });
    });
  });
});
