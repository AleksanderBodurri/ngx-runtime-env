import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

export interface RuntimeEnvConfig {
  envUrl: string;
  bootstrapAppModule: 'before' | 'after';
  optional: boolean
}

const setDefaults = (config: Partial<RuntimeEnvConfig>): RuntimeEnvConfig => {
  return {
    envUrl: config.envUrl ?? '/assets/environment.json',
    bootstrapAppModule: 'after',
    optional: false
  }
}

const setRuntimeEnv = (environment: any, config: Partial<RuntimeEnvConfig> = {}) => {
  const { envUrl } = setDefaults(config);

  return {
    provide: APP_INITIALIZER,
    useFactory: (httpClient: HttpClient) => {
      
      const envLookupPromise = () => httpClient.get(envUrl).toPromise().then((runtimeEnvironment: any) => {
        Object.keys(runtimeEnvironment).forEach(key => environment[key] = runtimeEnvironment[key]);
      });

      if (config.bootstrapAppModule === 'before') {
        return () => new Promise<void>((resolve) => { envLookupPromise(); resolve() });
      }

      if (config.optional) {
        return () => new Promise<void>((resolve) => envLookupPromise().then(resolve).catch(resolve));
      }

      return () => new Promise<void>((resolve) => envLookupPromise().then(resolve));
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