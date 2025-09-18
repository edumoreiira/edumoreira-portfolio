import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideLanguage } from './tokens/language.tokens';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideBaseUrl } from './tokens/general.tokens';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    provideClientHydration(withEventReplay()),
    provideLanguage(),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideBaseUrl(),
    provideMarkdown()
  ]
};
