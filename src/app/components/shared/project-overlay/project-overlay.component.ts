import { Component, input } from '@angular/core';
import { Project } from '../../../models/project.model';
import { DatePipe, NgClass } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-project-overlay',
  host: {
    class:'w-full bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden relative'
  },
  imports: [NgClass, DatePipe, MarkdownComponent],
  templateUrl: './project-overlay.component.html',
  styleUrl: './project-overlay.component.scss'
})
export class ProjectOverlayComponent {
  project = input.required<Project>();

}
