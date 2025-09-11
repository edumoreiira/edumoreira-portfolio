import { Component, input } from '@angular/core';
import { ButtonComponent } from '../../base/button.component';
import { Project } from '../../../models/project.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'article[app-project-card]',
  host: { 
    class: 'flex flex-col gap-3 p-5 rounded-xl'
  },
  imports: [ButtonComponent, DatePipe],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();

}
