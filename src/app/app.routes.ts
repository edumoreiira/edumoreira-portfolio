import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LangGuard } from './guards/lang.guard';
import { ProjectsComponent } from './pages/projects/projects.component';

export const routes: Routes = [
  {
    path: ':lang',
    canActivate: [LangGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    redirectTo: 'pt-br'
  },
  {
    path: '',
    redirectTo: 'pt-br',
    pathMatch: 'full'
  },
];
