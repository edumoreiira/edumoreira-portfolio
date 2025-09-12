import { Observable, tap } from "rxjs";

import { Project } from "../models/project.model";
import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export const projectsResolver: ResolveFn<Project[] | null> = (): Observable<Project[]> => {
  const http = inject(HttpClient);
  return http.get<Project[]>('http://localhost:4200/api/projects');
}