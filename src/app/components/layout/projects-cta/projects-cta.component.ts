import { Component, computed, inject } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { GlowingBorderDirective, GlowingBorderItemDirective } from '../../../directives/glowing-border.directive';
import { InfiniteScrollingComponent } from '../../utils/infinite-scrolling/infinite-scrolling.component';
import { Project } from '../../../models/project.model';
import { RouterLink } from '@angular/router';
import { DocumentListenerService } from '../../../services/document-listener.service';

interface ProjectColumn {
  column: Project[];
}

@Component({
  selector: 'app-projects-cta',
  host: {
    class: 'transform-3d'
  },
  imports: [ProjectCardComponent, GlowingBorderDirective, GlowingBorderItemDirective, InfiniteScrollingComponent, RouterLink],
  templateUrl: './projects-cta.component.html',
  styleUrl: './projects-cta.component.scss'
})
export class ProjectsCTAComponent {
  private readonly projectsService = inject(ProjectsService);
  protected readonly documentListener = inject(DocumentListenerService)
  protected readonly projects = toSignal(this.projectsService.getProjects());

  protected projectColumns = computed<ProjectColumn[]>(() => {
    const allProjects = this.projects();
    if (!allProjects?.length) {
      return [{ column: [] }, { column: [] }, { column: [] }];
    }

    // 1. sort all projects by creation date (newest first)
    const sortedProjects = [...allProjects].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // 2. separate into mutable lists of highlighted and normal projects
    const highlighted = sortedProjects.filter(p => p.is_highlight);
    const normal = sortedProjects.filter(p => !p.is_highlight);

    const column1: Project[] = [];
    const column2: Project[] = [];

    // 3. build column 1 with the pattern [highlight, normal, normal]
    // it takes the newest available from each list, ensuring no repeats
    if (highlighted.length > 0) column1.push(highlighted.shift()!);
    if (normal.length > 0) column1.push(normal.shift()!);
    if (normal.length > 0) column1.push(normal.shift()!);

    // 4. build column 2 with the pattern [normal, normal, highlight]
    if (normal.length > 0) column2.push(normal.shift()!);
    if (normal.length > 0) column2.push(normal.shift()!);
    if (highlighted.length > 0) column2.push(highlighted.shift()!);
    
    // 5. build column 3 with the rest, sorted by date
    const remainingProjects = [...highlighted, ...normal].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const column3 = remainingProjects.slice(0, 3);

    // 6. return the final structure
    return [
      { column: column1 },
      { column: column2 },
      { column: column3 },
    ];
  });
}