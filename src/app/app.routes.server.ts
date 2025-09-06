import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang/home',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { lang: 'pt-br' },
        { lang: 'en-us' }
      ];
    },
  }
];
