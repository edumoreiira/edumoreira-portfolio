import { Observable, tap } from "rxjs";

import { Project } from "../models/project.model";
import { ResolveFn } from "@angular/router";
import { inject, makeStateKey, PLATFORM_ID, TransferState } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

export const projectsResolver: ResolveFn<Project[]> = (): Observable<Project[]> => {
  const http = inject(HttpClient);
  const platformId = inject(PLATFORM_ID);
  const transferState = inject(TransferState);

  const key = makeStateKey<Project[]>('projects');

  
  // Se já temos os dados no TransferState (no cliente), use-os
  if (transferState.hasKey(key)) {
    const projects = transferState.get(key, []);
    transferState.remove(key);

    return new Observable(observer => {
      observer.next(projects);
      observer.complete();
    })
  }

  const baseUrl = isPlatformServer(platformId) ? 'https://localhost:4200' : '';

  return http.get<Project[]>(`${baseUrl}/api/projects`).pipe(
    tap(projects => {
      if (isPlatformServer(platformId)) {
        transferState.set(key, projects);
      }
    })
  )
}