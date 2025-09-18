import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LangGuard } from './guards/lang.guard';
import { ProjectsComponent } from './pages/projects/projects.component';
import { PagesLayoutComponent } from './pages/pages-layout.component';

export const routes: Routes = [
  {
    path: ':lang',
    component: PagesLayoutComponent,
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
