import { Component, ElementRef, inject, input, output, signal } from '@angular/core';
import { ButtonComponent } from '../../base/button.component';
import { Project } from '../../../models/project.model';
import { DatePipe, NgClass } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'article[app-project-card]',
  host: { 
    class: 'flex flex-col gap-3 p-5 rounded-xl relative overflow-hidden',
  },
  imports: [ButtonComponent, DatePipe, NgClass, MarkdownComponent, MatTooltipModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly el = inject(ElementRef);
  readyToOpen = signal(false); // this should be changed by parent when view-transition is ready, to avoid multiple elements with view-transitions

  previewClick = output();
  detailsClick = output();
}
