import { Component } from "@angular/core";

@Component({
  selector: 'app-project-card-skeleton',
  host: {
    class: 'flex flex-col gap-3 p-5 rounded-xl bg-neutral-950 border border-neutral-800'
  },
  template: `
  <div class="flex items-center gap-3 animate-pulse"> 
    <div class="h-10 w-10 bg-neutral-800 rounded-full"></div>
    <div class="h-6 bg-neutral-800 rounded w-1/2"></div>
  </div>
  <div class="animate-pulse">
    <div class="h-4 bg-neutral-800 rounded w-3/4 mb-2"></div>
    <div class="h-4 bg-neutral-800 rounded w-full mb-2"></div>
  </div>
  <div class="mt-auto flex justify-between animate-pulse">
    <div class="h-5 bg-neutral-800 rounded w-1/3"></div>
    <div class="h-5 bg-neutral-800 rounded w-1/4"></div>
  </div>
  `
})
export class ProjectCardSkeletonComponent {}