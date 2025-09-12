import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model'; // seu modelo de projeto
import { BASE_URL } from '../tokens/general.tokens';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);

  getProjects(): Observable<Project[]> {
    const url = `${this.baseUrl}/api/projects`;
    return this.http.get<Project[]>(url);
  }
}