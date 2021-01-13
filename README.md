![build](https://github.com/ngry-project/rx/workflows/build/badge.svg?branch=master)
![unit-tests](https://github.com/ngry-project/rx/workflows/unit-tests/badge.svg?branch=master)
![code-style](https://github.com/ngry-project/rx/workflows/code-style/badge.svg?branch=master)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ngry-project/rx?logo=github)
![npm (scoped)](https://img.shields.io/npm/v/@ngry/rx?logo=npm)
![Coveralls github](https://img.shields.io/coveralls/github/ngry-project/rx?logo=jest)

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

## Quick Start

### Async tasks

Use `toTask` operator to track task's state:

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

## License

MIT
