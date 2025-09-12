import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/project.model';

export const projectsResolver: ResolveFn<Project[]> = (route, state) => {
  const projectsService = inject(ProjectsService); 
  return projectsService.getProjects();
};