import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { lang: 'pt-br' },
        { lang: 'en-us' }
      ];
    },
  },
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
