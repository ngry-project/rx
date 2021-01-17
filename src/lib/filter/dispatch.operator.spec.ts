import { from } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { dispatch } from './dispatch.operator';

describe('dispatch', () => {
  it('should pass values through when in open mode', (done) => {
    from([1, 2, 3]).pipe(
      dispatch(true),
      toArray(),
    ).subscribe(result => {
      expect(result).toEqual([1, 2, 3]);

      done();
    });
  });

  it('should not pass values through when in closed mode', (done) => {
    from([1, 2, 3]).pipe(
      dispatch(false),
      toArray(),
    ).subscribe(result => {
      expect(result).toEqual([]);

      done();
    });
  });
});
