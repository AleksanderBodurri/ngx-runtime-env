[![npm version](https://badge.fury.io/js/ngx-runtime-env.svg)](https://badge.fury.io/js/ngx-runtime-env)
[![AleksanderBodurri](https://circleci.com/gh/AleksanderBodurri/ngx-runtime-env.svg?style=svg)](https://app.circleci.com/pipelines/github/AleksanderBodurri/ngx-runtime-env)

# Runtime Env

Runtime environment solution for Angular.

# Install
```
npm i ngx-runtime-env
```
or
```
yarn add ngx-runtime-env
```

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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RuntimeEnvModule } from 'ngx-runtime-env';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ 
    BrowserModule,
    // import HttpClientModule
    HttpClientModule
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

# Configuration

You can configure the url (relative or absolute) that your environment can be found at in the following way:

In: `app.module.ts`
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RuntimeEnvModule } from 'ngx-runtime-env';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ 
    BrowserModule,
    HttpClientModule
    RuntimeEnvModule.forRoot(environment, {
      envUrl: '/path/to/my/config' // specify where the environment can be found
    })
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```
