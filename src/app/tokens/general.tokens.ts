import { isPlatformServer } from '@angular/common';
import { FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

export const provideBaseUrl = (): FactoryProvider => {
  return {
    provide: BASE_URL,
    useFactory: (platformId: object): string => {
      if (isPlatformServer(platformId)) {
        return `http://localhost:${process.env['PORT'] || 4200}`; // use a porta do ambiente ou 4200 como padrão
      }
      return '';
    },
    // tell the injector which token to use for the 'platformId' parameter
    deps: [PLATFORM_ID],
  };
};