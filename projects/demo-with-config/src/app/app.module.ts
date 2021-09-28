import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RuntimeEnvModule } from 'ngx-runtime-env';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RuntimeEnvModule.forRoot(environment, {
       envUrl: '/assets/path/to/config/runtime-env.json',
       bootstrapAppModule: 'after'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
