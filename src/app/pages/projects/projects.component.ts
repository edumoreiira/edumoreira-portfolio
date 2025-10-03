import { AnimationCallbackEvent, ApplicationRef, ChangeDetectionStrategy, Component, computed, inject, Renderer2, signal } from "@angular/core";
import { ProjectCardComponent } from "../../components/shared/project-card/project-card.component";
import { GlowingBorderDirective, GlowingBorderItemDirective } from "../../directives/glowing-border.directive";
import { Project } from "../../models/project.model";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { EmButtonToggleGroupComponent } from "../../components/shared/button-toggle/em-button-toggle-group.component";
import { EmButtonToggleDirective } from "../../components/shared/button-toggle/em-button-toggle.directive";
import { FormsModule } from "@angular/forms";
import { EmButtonToggleAnimationDirective } from "../../components/shared/button-toggle/em-button-toggle-animation.directive";
import { ProjectOverlayService } from "../../services/project-overlay.service";
import { ProjectsService } from "../../services/projects.service";
import { IntersectionObserverDirective } from "../../directives/intersection-observer.directive";
import { ProjectCardSkeletonComponent } from "../../components/shared/project-card/project-card-skeleton.component";
import { LANGUAGE_APPLICATION } from "../../tokens/language.tokens";

@Component( {
  selector: 'page-projects',
  imports: [ProjectCardComponent, GlowingBorderDirective, GlowingBorderItemDirective,
    EmButtonToggleGroupComponent, EmButtonToggleDirective, EmButtonToggleAnimationDirective, FormsModule,
    IntersectionObserverDirective, ProjectCardSkeletonComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent{
  readonly lg = inject(LANGUAGE_APPLICATION);
  private readonly projectService = inject(ProjectsService);
  readonly appRef = inject(ApplicationRef);
  private projectOverlay = inject(ProjectOverlayService);
  private renderer = inject(Renderer2);
  // 
  readonly projects = toSignal(this.projectService.getProjects());
  readonly viewTransitionItems = signal<Set<string>>(new Set());
  readonly openedProjectId = signal<string | null>(null);
  readonly projectFilter = signal<'pinned' | 'criacao' | 'commit'>('criacao');
  readonly isLoading = computed(() => this.projects() === undefined);
  readonly isEntryAnimated = signal(false);
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
    this.addAllViewTransitionItems();
    document.startViewTransition(() => {
      this.projectFilter.set(newFilter);
    }).finished.then(() => this.removeAllViewTransitionItems());
  }

  openOverlay(project: Project, initialView: 'details' | 'preview' = 'details', projectCard: ProjectCardComponent): void {
    const element = projectCard.el.nativeElement;
    projectCard.readyToOpen.set(true);
    this.addViewTransitionItem(project.id);
    this.renderer.setStyle(element, 'z-index', '9999'); // to ensure the element is above others during the transition
    // no need to reset z-index, as the openedProjectId signal change will trigger a re-render of the project card component
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        this.openedProjectId.set(project.id); // it removes the opened project card from DOM to animate the project overlay
        this.projectOverlay.openOverlay(project, initialView);
        this.appRef.tick();
      })
    } else {
      this.openedProjectId.set(project.id);
      this.projectOverlay.openOverlay(project, initialView);
    }
  }

  private closeOverlay() {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        this.openedProjectId.set(null);
        this.projectOverlay.disposeOverlay();
        this.appRef.tick();
      }).finished.then(() => this.removeAllViewTransitionItems());
    }else {
      this.openedProjectId.set(null);
      this.projectOverlay.disposeOverlay();
    }
  }

  protected onEntryAnimation(event: AnimationCallbackEvent) {
    if (this.isEntryAnimated()) return;
    event.target.classList.add('project-fade-in');
    event.target.addEventListener('animationend', () => {
      this.isEntryAnimated.set(true);
      event.animationComplete();
    }, { once: true });
  }

  private addViewTransitionItem(id: string): void {
    const currentSet = this.viewTransitionItems();
    const newSet = new Set(currentSet);
    newSet.add(id);
    this.viewTransitionItems.set(newSet);
  }

  private addAllViewTransitionItems(): void {
    const projects = this.projects();
    if (!projects) return;
    const newSet = new Set<string>();
    projects.forEach(p => newSet.add(p.id));
    this.viewTransitionItems.set(newSet);
  }

  private removeViewTransitionItem(id: string): void {
    const currentSet = this.viewTransitionItems();
    currentSet.delete(id);
    this.viewTransitionItems.set(currentSet);
  }

  private removeAllViewTransitionItems(): void {
    this.viewTransitionItems.set(new Set());
  }
}
