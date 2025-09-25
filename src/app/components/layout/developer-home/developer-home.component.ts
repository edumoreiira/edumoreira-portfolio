import { Component } from '@angular/core';
import { AboutMeComponent } from '../about-me/about-me.component';
import { AllTechsComponent } from '../all-techs/all-techs.component';
import { ProjectsCTAComponent } from '../projects-cta/projects-cta.component';

@Component({
  selector: 'app-developer-home',
  imports: [AboutMeComponent, AllTechsComponent, ProjectsCTAComponent],
  templateUrl: './developer-home.component.html',
  styleUrl: './developer-home.component.scss'
})
export class DeveloperHomeComponent {

}
