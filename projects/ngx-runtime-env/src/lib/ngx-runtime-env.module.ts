import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

export interface RuntimeEnvConfig {
  envUrl: string;
}

const setDefaults = (config: Partial<RuntimeEnvConfig>): RuntimeEnvConfig => {
  return {
    envUrl: config.envUrl ?? '/assets/environment.json'
  }
}

const setRuntimeEnv = (environment: any, config: Partial<RuntimeEnvConfig> = {}) => {
  const { envUrl } = setDefaults(config);

  return {
    provide: APP_INITIALIZER,
    useFactory: (httpClient: HttpClient) => {
      return async () => {
        await httpClient.get(envUrl).toPromise().then((runtimeEnvironment: any) => {
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
  static forRoot(environment: any, config: Partial<RuntimeEnvConfig> = {}): ModuleWithProviders<RuntimeEnvModule> {
    return {
      ngModule: RuntimeEnvModule,
      providers: [
        setRuntimeEnv(environment, config)
      ]
    };
  }
}