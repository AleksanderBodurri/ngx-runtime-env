import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

const setRuntimeEnv = (environment: any) => {
  return {
    provide: APP_INITIALIZER,
    useFactory: (httpClient: HttpClient) => {
      return async () => {
        await httpClient.get('/assets/environment.json').toPromise().then((runtimeEnvironment: any) => {
          Object.keys(runtimeEnvironment).forEach(key => environment[key] = runtimeEnvironment[key]);
        });
      };
    },
    deps: [HttpClient],
    multi: true
  }
}

@NgModule()
export class RuntimeEnvModule {
  static forRoot(environment: any): ModuleWithProviders<RuntimeEnvModule> {
    return {
      ngModule: RuntimeEnvModule,
      providers: [
        setRuntimeEnv(environment)
      ]
    };
  }
}