import { Component, input } from '@angular/core';
import { ButtonComponent } from '../../base/button.component';
import { Project } from '../../../models/project.model';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'article[app-project-card]',
  host: { 
    class: 'flex flex-col gap-3 p-5 rounded-xl',
    
  },
  imports: [ButtonComponent, DatePipe, NgClass],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();

}
