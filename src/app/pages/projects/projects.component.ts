import { ApplicationRef, ChangeDetectionStrategy, Component, computed, inject, Renderer2, signal } from "@angular/core";
import { ProjectCardComponent } from "../../components/shared/project-card/project-card.component";
import { GlowingBorderDirective, GlowingBorderItemDirective } from "../../directives/glowing-border.directive";
import { ActivatedRoute } from "@angular/router";
import { Project } from "../../models/project.model";
import { map } from "rxjs";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { EmButtonToggleGroupComponent } from "../../components/shared/button-toggle/em-button-toggle-group.component";
import { EmButtonToggleDirective } from "../../components/shared/button-toggle/em-button-toggle.directive";
import { FormsModule } from "@angular/forms";
import { EmButtonToggleAnimationDirective } from "../../components/shared/button-toggle/em-button-toggle-animation.directive";
import { ProjectOverlayService } from "../../services/project-overlay.service";

@Component( {
  selector: 'page-projects',
  imports: [ProjectCardComponent, GlowingBorderDirective, GlowingBorderItemDirective,
    EmButtonToggleGroupComponent, EmButtonToggleDirective, EmButtonToggleAnimationDirective, FormsModule],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent{
  private readonly route = inject(ActivatedRoute);
  readonly appRef = inject(ApplicationRef);
  private projectOverlay = inject(ProjectOverlayService);
  private renderer = inject(Renderer2);
  // 
  readonly projects = toSignal(this.route.data.pipe(
    map((data) => (data['projects'] as Project[]) || [])
  ));
  readonly openedProjectId = signal<string | null>(null);
  readonly projectFilter = signal<'pinned' | 'criacao' | 'commit'>('criacao');
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

  constructor() {
    this.projectOverlay.closed$
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.closeOverlay());
  }

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

  openOverlay(project: Project, initialView: 'details' | 'preview' = 'details', projectCard: ProjectCardComponent): void {
    const element = projectCard.el.nativeElement;
    projectCard.readyToOpen.set(true);
    this.renderer.setStyle(element, 'z-index', '9999'); // to ensure the element is above others during the transition
    // no need to reset z-index, as the openedProjectId signal change will trigger a re-render of the project card component
    
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        this.openedProjectId.set(project.id);
        this.projectOverlay.openOverlay(project, initialView);
        this.appRef.tick();
      })
    } else {
      this.projectOverlay.openOverlay(project, initialView);
    }
  }

  private closeOverlay() {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        this.openedProjectId.set(null);
        this.projectOverlay.disposeOverlay();
        this.appRef.tick();
      });
    }else {
      this.openedProjectId.set(null);
    }
  }
}
