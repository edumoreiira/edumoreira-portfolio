import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProjectCardComponent } from "../../components/shared/project-card/project-card.component";
import { GlowingBorderDirective, GlowingBorderItemDirective } from "../../directives/glowing-border.directive";

@Component( {
  selector: 'page-projects',
  imports: [ProjectCardComponent, GlowingBorderDirective, GlowingBorderItemDirective],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {

  projects = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ];

}