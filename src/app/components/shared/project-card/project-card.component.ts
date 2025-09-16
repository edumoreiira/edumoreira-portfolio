import { Component, ElementRef, inject, input, output } from '@angular/core';
import { ButtonComponent } from '../../base/button.component';
import { Project } from '../../../models/project.model';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'article[app-project-card]',
  host: { 
    class: 'flex flex-col gap-3 p-5 rounded-xl',
    '[style]': '"view-transition-name: project-card-" + (project().id)'
  },
  imports: [ButtonComponent, DatePipe, NgClass],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly el = inject(ElementRef);
  readyToOpen = input(false);

  previewClick = output();
  detailsClick = output();
}
