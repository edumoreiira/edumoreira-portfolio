import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
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
    EmButtonToggleGroupComponent, EmButtonToggleDirective, EmButtonToggleAnimationDirective ,FormsModule],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  private readonly route = inject(ActivatedRoute);
  // fetch the resolved projects data from the route
  readonly projects = toSignal(this.route.data.pipe(
    map((data) => data['projects'] as Project[])
  ));
  // projects = signal<Project[]>([]);

  data = signal('');

}