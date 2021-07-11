# Runtime Env

Runtime environment solution for Angular.

# Usage

In: `src/environments/environment.ts` (static)

```ts
export const environment = {
  production: false,
  foo: 'bar',
};

```

In:  `assets/environment.json` (dynamic, picked up at runtime, will mutate static environment)
```json
{
    "production": true,
    "foo": "baz",
}
```

In: `app.module.ts`
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ 
    BrowserModule,
    // import RuntimeEnvModule module and pass in static environment
    RuntimeEnvModule.forRoot(environment)
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

In a component (`app.component.ts` for example)
```ts
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    console.log(environment.production); // true
    console.log(environment.foo); // baz
  }
}

```