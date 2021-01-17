[![build](https://github.com/ngry-project/rx/workflows/build/badge.svg?branch=master)](https://github.com/ngry-project/rx/actions?query=workflow%3Abuild)
[![unit-tests](https://github.com/ngry-project/rx/workflows/unit-tests/badge.svg?branch=master)](https://github.com/ngry-project/rx/actions?query=workflow%3Aunit-tests)
[![code-style](https://github.com/ngry-project/rx/workflows/code-style/badge.svg?branch=master)](https://github.com/ngry-project/rx/actions?query=workflow%3Acode-style)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/ngry-project/rx?logo=github)](https://github.com/ngry-project/rx/releases)
[![npm (scoped)](https://img.shields.io/npm/v/@ngry/rx?logo=npm)](https://www.npmjs.com/package/@ngry/rx)
[![Coveralls github](https://img.shields.io/coveralls/github/ngry-project/rx?logo=jest)](https://coveralls.io/github/ngry-project/rx)

## Description

Reactive extensions for Angular.

## Installation

Using NPM:

```bash
npm i @ngry/rx
```

Using Yarn:

```bash
yarn add @ngry/rx
```

## Documentation

### `toTask` operator

Use `toTask` operator to wrap original `Observable<T>` into the `Observable<TaskState<T>>`.

`TaskState` is an immutable structure that indicates async task's `pending` / `complete` / `failed` state and holds
task `result` or `error`.

```ts
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TaskState, toTask } from '@ngry/rx';

export class ExampleService {
  constructor(private http: HttpClient) {
  }

  get(): Observable<TaskState<Entity>> {
    return this.http.get<Entity>('...').pipe(
      toTask(),
    );
  }
}
```

Then in your component:

```ts
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { TaskState } from '@ngry/rx';

@Component({
  selector: 'x-example',
  template: `
  <ng-container *ngIf="state$ | async as state">
    <p *ngIf="state.pending">Loading...</p>
    <pre *ngIf="state.complete">{{ state.result | json }}</pre>
  </ng-container>
  `
})
export class ExampleComponment {
  readonly state$: Observable<TaskState<Entity>>

  constructor(
    private service: ExampleService,
  ) {
    this.state$ = service.get();
  }
}
```

### `ofType` operator

Use `ofType` operator to filter values by certain type(s) (it uses `instanceof` operator to filter values stream).

```ts
export class Load {
  constructor(readonly id: number) {
  }
}

export class Loaded {
  constructor(readonly cart: Cart) {
  }
}

export class CartEffects extends EffectsProvider {
  constructor(
    actions: Actions,
    service: CartService,
  ) {
    super([
      actions.pipe(
        // 👇 Bypass only actions of type Load
        ofType(Load),
        switchMap(action => service.load(action.id)),
        map(cart => new Loaded(cart)),
      ),
    ]);
  }
}
```

### `dispatch` operator

Use `dispatch` operator to control whether values must pass through this point of stream or not.

Open mode

```ts
from([1,2,3])
  .pipe(dispatch(true))
  .subscribe(console.log);
// Prints 1, 2, 3 then completes
```

Closed mode

```ts
from([1,2,3])
  .pipe(dispatch(false))
  .subscribe(console.log);
// Ignores values, thus prints nothing and completes
```
## License

MIT
