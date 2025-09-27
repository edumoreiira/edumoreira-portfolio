import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutMeComponent } from '../about-me/about-me.component';
import { AllTechsComponent } from '../all-techs/all-techs.component';
import { ProjectsCTAComponent } from '../projects-cta/projects-cta.component';
import { IntersectionObserverDirective } from '../../../directives/intersection-observer.directive';

@Component({
  selector: 'app-developer-home',
  imports: [AboutMeComponent, AllTechsComponent, ProjectsCTAComponent, IntersectionObserverDirective],
  templateUrl: './developer-home.component.html',
  styleUrl: './developer-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperHomeComponent {

}
