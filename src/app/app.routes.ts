import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LangGuard } from './guards/lang.guard';
import { ProjectsComponent } from './pages/projects/projects.component';
import { PagesLayoutComponent } from './pages/pages-layout.component';
import { FreelancerHomeComponent } from './components/layout/freelancer-home/freelancer-home.component';
import { DeveloperHomeComponent } from './components/layout/developer-home/developer-home.component';
import { HomeGuard } from './guards/home.guard';

export const routes: Routes = [
  {
    path: ':lang',
    component: PagesLayoutComponent,
    canActivate: [LangGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [HomeGuard],
        children: [
          { path: 'freelancer', component: FreelancerHomeComponent },
          { path: 'developer', component: DeveloperHomeComponent },
        ],
      },
      { path: 'projects', component: ProjectsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    redirectTo: 'pt-br',
  },
  {
    path: '',
    redirectTo: 'pt-br',
    pathMatch: 'full',
  },
];
