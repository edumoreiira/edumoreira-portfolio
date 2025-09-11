import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ProjectCardComponent } from "../../components/shared/project-card/project-card.component";
import { GlowingBorderDirective, GlowingBorderItemDirective } from "../../directives/glowing-border.directive";
import { ActivatedRoute } from "@angular/router";
import { Project } from "../../models/project.model";
import { map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Component( {
  selector: 'page-projects',
  imports: [ProjectCardComponent, GlowingBorderDirective, GlowingBorderItemDirective],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  private readonly route = inject(ActivatedRoute);
  // fetch the resolved projects data from the route
  readonly projects = toSignal(this.route.data.pipe(
    map((data) => data['projects'] as Project[])
  ));

  

}