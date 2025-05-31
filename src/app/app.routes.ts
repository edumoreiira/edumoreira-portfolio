import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LangGuard } from './guards/lang.guard';

export const routes: Routes = [
  {
    path: ':lang/home',
    component: HomeComponent,
    canActivate: [LangGuard]
  },
  {
    path: '',
    redirectTo: 'pt-br/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pt-br/home'
  }
];
