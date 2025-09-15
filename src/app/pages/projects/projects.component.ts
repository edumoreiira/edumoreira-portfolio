import { AfterViewInit, ApplicationRef, ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { ProjectCardComponent } from "../../components/shared/project-card/project-card.component";
import { GlowingBorderDirective, GlowingBorderItemDirective } from "../../directives/glowing-border.directive";
import { ActivatedRoute } from "@angular/router";
import { Project } from "../../models/project.model";
import { map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { NgClass } from "@angular/common";
import { EmButtonToggleGroupComponent } from "../../components/shared/button-toggle/em-button-toggle-group.component";
import { EmButtonToggleDirective } from "../../components/shared/button-toggle/em-button-toggle.directive";
import { FormsModule } from "@angular/forms";
import { EmButtonToggleAnimationDirective } from "../../components/shared/button-toggle/em-button-toggle-animation.directive";

@Component( {
  selector: 'page-projects',
  imports: [ProjectCardComponent, GlowingBorderDirective, GlowingBorderItemDirective, NgClass,
    EmButtonToggleGroupComponent, EmButtonToggleDirective, EmButtonToggleAnimationDirective, FormsModule],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  private readonly route = inject(ActivatedRoute);
  readonly projects = toSignal(this.route.data.pipe(
    map((data) => (data['projects'] as Project[]) || [])
  ));

  projectFilter = signal<'pinned' | 'criacao' | 'commit'>('criacao');

  readonly filteredProjects = computed<Project[]>(() => {
    const projects = this.projects();
    const filter = this.projectFilter();

    if (!projects) return [];
    
    const sortedProjects = [...projects];

    switch (filter) {
      case 'pinned':
        return sortedProjects.sort((a, b) => {
          if (a.is_highlight !== b.is_highlight) return a.is_highlight ? -1 : 1;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      case 'commit':
        return sortedProjects.sort((a, b) => b.commit_count - a.commit_count);
      case 'criacao':
      default:
        return sortedProjects.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  });

  // dont use two-way-binding to allow view-transition preventing race conditions
  onFilterChange(newFilter: 'pinned' | 'criacao' | 'commit'): void {
    if (!document.startViewTransition) {
      this.projectFilter.set(newFilter);
      return;
    }
    document.startViewTransition(() => {
      this.projectFilter.set(newFilter);
    });
  }
}